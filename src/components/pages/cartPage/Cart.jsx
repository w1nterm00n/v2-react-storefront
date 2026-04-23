import React, { useState, useEffect } from 'react';
import Footer from '../../fragments/Footer';
import Navbar from '../../fragments/Navbar';
import styles from './cart.module.scss';
import { API_KEY, API_URL, TEST_CART_ID } from '../../../constants';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartData, setCartData] = useState([]);

    //delete item function
    const deleteCartProduct = async (id_item) => {
      console.log("item deleted: ", id_item);
      try {
        // Load cart contents.
        await fetch(`${API_URL}/store/carts/${TEST_CART_ID}/line-items/${id_item}`, {
          method: 'DELETE',
          headers: { "x-publishable-api-key": API_KEY },
        });
        window.dispatchEvent(new Event("cartUpdated")); 
        window.dispatchEvent(new Event("cartAmountUpdated"));
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };
    //update item function
    const incrementItem = async (id_item, quantity_item) => {
      try {
        await fetch(`${API_URL}/store/carts/${TEST_CART_ID}/line-items/${id_item}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-publishable-api-key": API_KEY
          },
          body: JSON.stringify({
            quantity: quantity_item + 1,
          })
        });
        window.dispatchEvent(new Event("cartAmountUpdated"));
        window.dispatchEvent(new Event("cartUpdated")); 
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };

    const decrementItem = async (id_item, quantity_item) => {
      try {
        await fetch(`${API_URL}/store/carts/${TEST_CART_ID}/line-items/${id_item}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-publishable-api-key": API_KEY
          },
          body: JSON.stringify({
            quantity: quantity_item - 1,
          })
        });
        window.dispatchEvent(new Event("cartUpdated")); 
        window.dispatchEvent(new Event("cartAmountUpdated"));
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };
    

    //get all cart items
      useEffect(() => {
        const loadCartProducts = async () => {
          try {
            // Load cart contents.
            const cartProductsJSON = await fetch(`${API_URL}/store/carts/${TEST_CART_ID}`, {
              headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await cartProductsJSON.json();
            const cartProducts = data.cart.items;
            setCartItems(cartProducts);
            setCartData(data.cart);
            console.log("Cart data updated");
            console.log(cartItems); // State updates asynchronously, so this may log the previous value.
          } catch (err) {
            console.error("Failed to load product:", err);
          }
        };
    
        loadCartProducts();


        // Update cart contents without reloading the page.
        const handleCartDataUpdate = () => {
          loadCartProducts();
        };
        window.addEventListener("cartUpdated", handleCartDataUpdate);
        return () => {
            window.removeEventListener("cartUpdated", handleCartDataUpdate);
        };
        // Update cart contents.
      }, 
      []);




  return (
    <div className='content-wrapper d-flex flex-column min-vh-100'>
    <Navbar></Navbar>
    <div className={`container py-5 flex-grow-1 ${styles.cart_container}`}>
        <h2 className="mb-4">Cart</h2>

        {cartItems.map((cartItem) => (
        <div key={cartItem.id} className={`row border-bottom py-3 align-items-center ${styles.cart_item}`}>
            <div className="col-md-2">
            <img src={cartItem.thumbnail} className={`img-fluid ${styles.product_image}`} alt="Product" />
            </div>
            <div className="col-md-4">
            <a href={`/products/${cartItem.product.id}`}>
            {cartItem.product_title}
            </a>
            <p className="text-muted">{cartItem.product_subtitle}</p>
            </div>

            <div className="d-flex align-items-center gap-2 col-md-3">
            <button className="btn btn-outline-primary" onClick={() => decrementItem(cartItem.id, cartItem.quantity)}>-</button>
            <input
              type="text"
              className="form-control text-center"
              value={cartItem.quantity}
              min={1}
              readOnly
              style={{ width: 60 }}
            />
            <button className="btn btn-outline-primary" onClick={() => incrementItem(cartItem.id, cartItem.quantity)}>+</button>
          </div>




            <div className={`col-md-2 ${styles.money_block}`}>
            <strong>{(cartItem.unit_price / 100).toFixed(2)} RUB</strong>
            </div>
            <div className={`col-md-1 ${styles.delete_block}`}>
            <button className="btn btn-danger btn-sm" onClick={() => deleteCartProduct(cartItem.id)}>Remove</button>
            </div>
        </div>
      ))}


        <div className="text-end mt-4">
            <h6>Subtotal before taxes: {(cartData.subtotal / 100).toFixed(2)} RUB</h6>
            <p>Tax 20%: {(cartData.tax_total / 100).toFixed(2)} RUB</p>  
            <h2>Total: {(cartData.total / 100).toFixed(2)} RUB</h2>
            <button className="btn btn-success">Checkout</button>
        </div>
    </div>

    <Footer></Footer>
    </div>
  );
};

export default Cart;

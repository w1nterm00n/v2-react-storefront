import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../../constants';
import { fetchCart } from '../../lib/cart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import styles from './fragments.module.scss';

const Navbar = () => {
  const [query, setQuery] = useState('');

// Fetch the cart item count.
    const [totalAmountOfItems, setTotalAmountOfItems] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token') || null;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      fetch(`${API_URL}/store/products`, {
        headers: { "x-publishable-api-key": API_KEY },
      })
        .then(res => res.json())
        .then(data => {
          setAllProducts(data.products);
        });
    }, []);

    useEffect(() => {
        const loadCartProductsAmount = async () => {
          try {
            const data = await fetchCart();
            let cartItemsAmount = 0;
            data.cart.items.forEach(cartItem => {
                cartItemsAmount = cartItemsAmount + cartItem.quantity;
            });
            setTotalAmountOfItems(cartItemsAmount);
          } catch (err) {
            console.error("Failed to load product:", err);
          }
        };
    
        loadCartProductsAmount();

        // Update the cart counter without reloading the page.
        const handleCartAmountUpdate = () => {
            loadCartProductsAmount();
        };
        window.addEventListener("cartAmountUpdated", handleCartAmountUpdate);
        return () => {
            window.removeEventListener("cartAmountUpdated", handleCartAmountUpdate);
        };
        // Update the cart counter.
    }, []);

  function handleSearch (e) {
    e.preventDefault();
    const q = query.toLowerCase().trim();
    const results = allProducts.filter(p =>
      p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
    navigate('/products/search', { state: { results } });
  }

  // Request the current customer's name and profile data.
    useEffect(() => {
      if (!token) return;

      const loadUserName = async () => {
        fetch(`${API_URL}/store/customers/me`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'x-publishable-api-key': API_KEY
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error('Failed to get customer:', error);
        });
        
      };
      loadUserName();
    }, [token]);
  // Request the current customer's name.

  // Apply the active style to the current navbar link.
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `nav-item nav-link ${isActive ? styles.active_link : ''}`;
  };
  // Apply the active style to the current navbar link.
  
  return (

  <div className="container-fluid shadow-sm" style={{paddingTop: '0px'}}>



  <div className={styles.navbar_container}>
    <nav className="navbar navbar-light bg-white navbar-expand-xl">
      <Link to="/" className={styles.navbar_logo}>
        <img src="/src/assets/img/fragments/logo.svg" alt="logo"/>
      </Link>
      
      <button
        onClick={() => setIsOpen(!isOpen)} className={styles.burger_btn}
      >
        <FaBars className="text-primary" />
      </button>
      
      <div className={`navbar-collapse ${isOpen ? 'show' : 'collapse'}`} id="navbarCollapse">
        <div className={`navbar-nav mx-auto ${styles.navbar_links}`}>
          <Link to="/" className={getLinkClass('/')} style={{marginLeft: "200px"}}>
            Home
          </Link>
          <Link to="/products" className={getLinkClass('/products')}>
            Products
          </Link>
          <Link to="/sales" className={getLinkClass('/sales')}>
            Deals
          </Link>
          <Link to="/contacts" className={getLinkClass('/contacts')}>
            Contacts
          </Link>
        </div>
        <div className="d-flex m-3 me-0">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                  className={`form-control me-2 ${styles.search_input}`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn" type="submit">
                <img src="/src/assets/img/fragments/search.svg" alt="search icon" style={{fontSize: '24px'}}/>
              </button>
          </form>

        {token ? (
          <Link to="/user/account" style={{margin: '6px'}}>
            <img src="/src/assets/img/fragments/user.svg" alt="user icon" style={{fontSize: '24px'}}/>
          </Link>
        ) : (
          <Dropdown align="end" className='d-flex' style={{marginLeft: '10px'}}>
          <Dropdown.Toggle
            variant="link"
            className="border-0 bg-transparent p-0"
            style={{ boxShadow: 'none' }}
          >
          <img src="/src/assets/img/fragments/user.svg" alt="user icon" style={{fontSize: '24px'}}/>
          </Dropdown.Toggle>

        <Dropdown.Menu className={`bg-white ${styles.dropdown_auth}`}>
            <Dropdown.Item as={Link} to="/user/auth">Sign in</Dropdown.Item>
            <Dropdown.Item as={Link} to="/user/create">Create account</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )}

        <Link to="/cart" className={`btn position-relative ${styles.cart_link}`}>
            <img src="/src/assets/img/fragments/cart.svg" alt="user icon" style={{fontSize: '24px'}}/>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {totalAmountOfItems}
            </span>
        </Link>

        </div>
      </div>
    </nav>
  </div>

</div>

  );
};

export default Navbar;

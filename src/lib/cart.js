import { API_KEY, API_URL, REGION_ID } from "../constants";

const CART_ID_STORAGE_KEY = "medusa_cart_id";

const storeHeaders = {
  "Content-Type": "application/json",
  "x-publishable-api-key": API_KEY,
};

export const clearCartId = () => {
  localStorage.removeItem(CART_ID_STORAGE_KEY);
};

export const getOrCreateCartId = async () => {
  const existingCartId = localStorage.getItem(CART_ID_STORAGE_KEY);

  if (existingCartId) {
    return existingCartId;
  }

  const response = await fetch(`${API_URL}/store/carts`, {
    method: "POST",
    headers: storeHeaders,
    body: JSON.stringify({
      region_id: REGION_ID,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create cart: ${response.status}`);
  }

  const data = await response.json();
  const cartId = data.cart?.id;

  if (!cartId) {
    throw new Error("Cart response did not include an id.");
  }

  localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
  return cartId;
};

export const fetchCart = async () => {
  const cartId = await getOrCreateCartId();
  const response = await fetch(`${API_URL}/store/carts/${cartId}`, {
    headers: { "x-publishable-api-key": API_KEY },
  });

  if (response.status === 404) {
    clearCartId();
    return fetchCart();
  }

  if (!response.ok) {
    throw new Error(`Failed to load cart: ${response.status}`);
  }

  return response.json();
};

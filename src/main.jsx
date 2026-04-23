import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from 'react'
import Cart from './components/pages/cartPage/Cart.jsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUserPage from './components/pages/createUserPage/CreateUserPage.jsx';
import AuthUserPage from './components/pages/authPage/AuthUserPage.jsx';
import './assets/styles/custom-bootstrap.scss';
import PersonalAccountPage from './components/pages/personalAccountPage/PersonalAccountPage.jsx';
import '/src/assets/icons.js';
import MainPage from './components/pages/mainPage/MainPage.jsx';
import ProductPage from './components/pages/productPage/ProductPage.jsx';
import ProductList from './components/pages/catalogPage/ProductList.jsx';
import SearchedProducts from './components/fragments/SearchedProducts.jsx';
import SalesPage from './components/pages/salesPage/SalesPage.jsx';
import ContactPage from './components/pages/contactPage/contactPage.jsx';
const router = createBrowserRouter([
  {
    path: "/", 
    element: <MainPage />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/sales",
    element: <SalesPage />,
  },
  {
    path: "/contacts",
    element: <ContactPage />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "/products/search",
    element: <SearchedProducts />,
  },
  {
    path: "user/create",
    element: <CreateUserPage />
  },
  {
    path: "user/auth",
    element: <AuthUserPage />
  },
  {
    path: "user/account",
    element: <PersonalAccountPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

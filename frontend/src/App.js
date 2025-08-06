import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inquiry from './pages/Inquiry';
import GetQuote from './pages/GetQuote';
import Order from './pages/user/Order';
import ProductCategory from './pages/ProductCategory';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Inquiries from './pages/admin/Inquiries';
import AllUsers from './pages/admin/AllUsers';
import ManageOrders from './pages/admin/ManageOrders';
import AddProduct from './pages/admin/AddProduct';
import AddTestimonial from './pages/admin/AddTestimonial';
import QuoteResponse from './pages/admin/QuoteResponse';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import MyOrders from './pages/user/MyOrders';
import TrackOrder from './pages/user/TrackOrder';
import MyInquiries from './pages/user/MyInquiries';
import MyQuotations from './pages/user/MyQuotations';
import HelpCenter from './pages/user/HelpCenter';

import './App.css';

//Protected Route Component
function ProtectedRoute({ element, allowedRole }) {
  const role = localStorage.getItem('role');
  return role === allowedRole ? element : <Navigate to="/" />;
}

function AppWrapper() {
  const location = useLocation();
  const { cartItems } = useCart();
  const { darkMode } = useTheme();

  const hideFooterRoutes = ['/inquiry'];

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/details/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/Cart" element={<Cart />} />
        <Route
          path="/order"
          element={cartItems.length > 0 ? <Order /> : <Navigate to="/products" />}
        />

        {/* User Protected Routes */}
        <Route
          path="/user/dashboard"
          element={<ProtectedRoute element={<UserDashboard />} allowedRole="user" />}
        >
          <Route index element={<Navigate to="user-dashboard" />} />
          <Route path="user-dashboard" element={<div><h1>Welcome to user Dashboard</h1></div>} />
          <Route path="MyOrders" element={<MyOrders />} />
          <Route path="MyInquiries" element={<MyInquiries />} />
          <Route path="TrackOrder" element={<TrackOrder />} />
          <Route path="MyQuotations" element={<MyQuotations />} />
          <Route path="HelpCenter" element={<HelpCenter />} />
        </Route>

        {/*  Admin Protected Routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />}
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<div><h1>Welcome to Admin Dashboard</h1></div>} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-testimonial" element={<AddTestimonial />} />
          <Route path="Quote-response" element={<QuoteResponse />} />
        </Route>
      </Routes>

      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AWd7SqcNFx93pOQWsqkyysX5xr2kum5o0DwYDSA369TCE9WZhKCvR-pDedwGCrHIhbIPAZZaH4URFoGy", 
        currency: "USD",
      }}
    >
      <ThemeProvider>
        <CartProvider>
          <Router>
            <AppWrapper />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
}

export default App;

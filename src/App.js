import "./App.css";
import LandingPage from "./Pages/E-Commerce/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/E-Commerce/Login";
import { CartProvider } from "./components/E-Commerce/ContextReducer";
import Cart from "./Pages/E-Commerce/Cart";
import Profile from "./Pages/E-Commerce/Profile";
import ManageProduct from "./Admin/ManageProduct";
import BillingForm from "./Pages/Billing/BillingForm";
import TermsAndConditions from "./components/E-Commerce/TermsAndConditions";
import MainPage from "./Pages/E-Commerce/MainPage";
import EnhancedSignUp from "./Pages/E-Commerce/SignUpLatest";
import ProductDetails from "./components/E-Commerce/ProductOpen";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/shop" element={<LandingPage />} />
            <Route path="/SignUp" element={<EnhancedSignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-manage" element={<ManageProduct />} />
            <Route path="/add-new-bill" element={<BillingForm />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/product" element={<ProductDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

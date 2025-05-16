import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ManageProduct from "./Admin/ManageProduct";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-manage" element={<ManageProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

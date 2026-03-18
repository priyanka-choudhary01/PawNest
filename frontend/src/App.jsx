import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Cart from './pages/cart'
import Shop from './pages/shop'
import FAQ from "./pages/FAQ";
import Product from "./pages/product";
import './App.css'
import Checkout from "./pages/checkout";
import Auth from "./pages/Auth";
import Orders from "./pages/orders";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/faq" element={<FAQ/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path="/signup" element={<Auth/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/product/check/:id" element={<Product />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto";
import Signin from "./components/sign/signIn/page";
import Signup from "./components/sign/signUp/page";
import Forgetpassword from "./components/sign/forgetPassword/page";
import Resetpassword from "./components/sign/forgetPassword//resetPassword/page";
import Home from "./components/home/main/page";
import Productlist from "./components/home/productList/page";
import Productdetail from "./components/home/productDetail/page";
import Payment from "./components/payment/page";
import Notfound from "./components/notfound/page";
import { CartProvider } from "./hooks/useCart.hook/cartProvider/page";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/productlist/:category" element={<Productlist />} />
          <Route path="/product/:productId" element={<Productdetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

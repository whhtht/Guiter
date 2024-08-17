import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto";
import Signin from "./components/sign/signIn/page";
import Signup from "./components/sign/signUp/page";
import Forgetpassword from "./components/sign/forgetPassword/page";
import Resetpassword from "./components/sign/forgetPassword//resetPassword/page";
import Home from "./components/home/main/page";
import Productlist from "./components/home/productList/page";
import Productdetail from "./components/home/productDetail/page";
import Notfound from "./components/notfound/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/forgetPassword" element={<Forgetpassword />} />
        <Route path="/resetPassword" element={<Resetpassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:category" element={<Productlist />} />
        <Route path="/home/:category/:productId" element={<Productdetail />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;

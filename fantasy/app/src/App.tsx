import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto";
import SignIn from "./components/signIn/page";
import SignUp from "./components/signUp/page";
import ForgetPassword from "./components/forgetPassword/page";
import ResetPassword from "./components/forgetPassword//resetPassword/page";
import Home from "./components/home/page";
import ProductList from "./components/productList/page";
import ProductDetail from "./components/productDetail/page";
import NotFound from "./components/notfound/page";
import Layout from "./components/layout/page";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:category" element={<ProductList />} />
          <Route
            path="/home/:category/:productId"
            element={<ProductDetail />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

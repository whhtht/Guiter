import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto";
import Signup from "./components/sign/signUp/page";
import Forgetpassword from "./components/sign/forgetPassword/page";
import Resetpassword from "./components/sign/forgetPassword//resetPassword/page";
import Notfound from "./components/notfound/page";
import CartProvider from "./provider/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/*" element={<CartProvider />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;

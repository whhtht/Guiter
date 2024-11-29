import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto";
import Signin from "./components/sign/signin/page";
import Signup from "./components/sign/signup/page";
import Verification from "./components/sign/signup/verification/page";
import Signout from "./components/sign/signout/callback/page";
import ResetCode from "./components/sign/signreset/page";
import Provider from "./provider/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/verification" element={<Verification />} />
        <Route path="/signin/resetcode" element={<ResetCode />} />
        <Route path="/signout/callback" element={<Signout />} />
        <Route path="/*" element={<Provider />} />
      </Routes>
    </Router>
  );
}

export default App;

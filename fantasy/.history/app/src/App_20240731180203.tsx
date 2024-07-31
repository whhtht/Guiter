import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn/page';
import SignUp from './components/signUp/page';
import Homepage from './components/home/page';
import ForgetPassword from './components/forgetPassword/page';
import ResetPassword from './components/forgetPassword/resetPassword/page';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/forgetpassword/resetpassword" element={<ResetPassword />} />
        </Routes>
      </Router>
  );
}

export default App;
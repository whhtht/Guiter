import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/page';
import SignUp from './components/SignUp/page';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
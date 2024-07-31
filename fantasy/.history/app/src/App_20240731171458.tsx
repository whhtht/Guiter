import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn/page';
import SignUp from './components/signUp/page';
import 

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
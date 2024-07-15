import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn/page';
import SignUp from './components/signUp/page';
import NextPage from './components/NextPage/page';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/nextpage" element={<NextPage />} />
        </Routes>
      </Router>
  );
}

export default App;
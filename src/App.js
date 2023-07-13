import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TopBar from './components/TopBar';
import HomePage from './components/Home';
import RegistrationPage from './components/Registration';
import LoginForm from './components/Login';
import AccountPage from './components/Account';
import LoginChallengeForm from './components/LoginChallenge';

function App() {
  return (
    <Router>
      <div className="app">
          <TopBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-user" element={<RegistrationPage />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/challenge' element={<LoginChallengeForm />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

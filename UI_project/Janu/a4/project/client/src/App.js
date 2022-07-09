import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';
import HomePage from './components/pages/HomePage';

import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Navigate to="/home" />} /> 
              <Route path="profile" element={<Profile />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="home" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;

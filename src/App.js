import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import EmailPage from './pages/EmailPage';
import RegisterPage from './pages/RegisterPage';
import SendMessagePage from './pages/SendMessagePage';

function App() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <Router>
            <Routes>
              {/* <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              /> */}
               <Route path="/home" element={<HomePage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<EmailPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/send" element={<SendMessagePage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

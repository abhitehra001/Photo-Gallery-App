import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './components/LoginPage';
import Register from './components/RegisterPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

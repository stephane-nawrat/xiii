import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';  // ← AJOUTER
import ApiHealthTest from './tests/ApiHealthTest';
import ApiLoginTest from './tests/ApiLoginTest';
import SpinnerTest from './tests/SpinnerTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/test" element={<ApiHealthTest />} />
        <Route path="/test/login" element={<ApiLoginTest />} />
        <Route path="/test/spinner" element={<SpinnerTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
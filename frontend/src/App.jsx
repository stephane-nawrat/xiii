import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ApiHealthTest from './tests/ApiHealthTest';
import ApiLoginTest from './tests/ApiLoginTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<ApiHealthTest />} />
        <Route path="/test/login" element={<ApiLoginTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
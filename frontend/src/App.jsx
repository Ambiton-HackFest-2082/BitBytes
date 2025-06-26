import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration/>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Registration />} />
    </Routes>
  );
}

export default App;

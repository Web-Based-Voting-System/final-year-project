import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Guest/Login';
import Admin from './Pages/Auth/Admin';
import ElectionCategory from './Pages/Auth/ElectionCategory';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Login/>} /> 
        <Route path='/admin-page' element={<Admin/>} /> 
        <Route path='/admin-page/categories/:id' element={<ElectionCategory/>} /> 
      </Routes>
  );
}

export default App;

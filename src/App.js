import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/Guest/HomePage';
import LoginPage from './Pages/Guest/LoginPage';
import SignupPage from './Pages/Guest/SignupPage';
import CategoriesPage from './Pages/Auth/CategoriesPage';
import VotingPage from './Pages/Auth/VotingPage';
import VotingResultsPage from './Pages/Auth/VotingResultsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/categories' element={<CategoriesPage/>} />
      <Route path='/candidates' element={<VotingPage/>} />
      <Route path='/results' element={<VotingResultsPage/>} />
    </Routes>
  );
}

export default App;

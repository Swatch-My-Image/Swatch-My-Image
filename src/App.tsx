import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import Login from './components/Login';
import Signup from './components/Signup';

function App(): JSX.Element {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/homepage' element={<HomePage />}/>
      </Routes>
    </div>
  );
}

export default App;

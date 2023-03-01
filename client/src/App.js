import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Socials from './components/About';

function App() {
  return (
    <div className=' flex flex-col'>

    <Routes>
      
      <Route path='/' element={<Home />} /> 
      <Route path='/socials' element={<Socials />} /> 


    </Routes>
    </div>
  );
}

//changes

export default App;

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Socials from './components/About';
import Image from './components/Image';

function App() {
  return (
    <div className=' flex flex-col'>

    <Routes>
      
      <Route path='/' element={<Home />} /> 
      <Route path='/socials' element={<Socials />} /> 
      <Route path='/image-gen' element={<Image />} />


    </Routes>
    </div>
  );
}

//changes

export default App;

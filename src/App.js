import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header.js';
import LeftSide from './component/Leftside/LeftSide.js';
import MainContent from './component/MainContent/MainContent.js';
import { useState,useEffect } from 'react';
function App() {
 
  const [activeComponent, setActiveComponent] = useState('Notice');

  const Buttonclick = (componentName) => {
    setActiveComponent(componentName);
  };
  

  return (
    <div className="App">
      <Header onButtonClick={Buttonclick}/>
      <div style={{
        display:"flex"
      }} >
      <LeftSide />
      <MainContent activeComponent={activeComponent}/>
      </div>
    </div>
  );
}

export default App;

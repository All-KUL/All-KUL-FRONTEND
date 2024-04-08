import konkukPic from "../../image/ku_pics.png"
import Notice from "./Notice";
import Registartion from "./registration";
import Check from "./check"
import { useState } from "react";
import "../../index.css"
import Evaluation from "./Evaluation";
import MainContent from "../MainContent/MainContent";
export default function Header({onButtonClick }){
  
  const [activeButton, setActiveButton] = useState('Notice');

  const handleButtonClick = (componentName) => {
    setActiveButton(componentName);
  };

    return (
    <nav>
        <div style={{ position:"relative" ,display: "flex"}} className="konkuk_pic">
          <img
            className="ku_pic"
            alt="konkuk_pic"
            src={konkukPic}
          />
          <span className="konkuk_pic_text">수강신청연습</span>
           
          <Notice       
    onClick={() => {
    handleButtonClick('Notice');
    onButtonClick('Notice');
    }}
           style={{ 
            borderBottom: activeButton === 'Notice' ? '3px solid #28a745' : 'none' ,
            color: activeButton === 'Notice' ? '#28a745' : 'black', 
            marginLeft:"400px"
            }}/>

           <Registartion
           
           onClick={() => {
            handleButtonClick('Registration');
            onButtonClick('Registration');
            }}     
            style={{ borderBottom: activeButton === 'Registration' ? '3px solid #28a745' : 'none',
           color: activeButton === 'Registration' ? '#28a745' : 'black'  }}/>
          
           <Check
           onClick={() => {
            handleButtonClick('Check');
            onButtonClick('Check');
            }}
           style={{ borderBottom: activeButton === 'Check' ? '3px solid #28a745' : 'none',
           color: activeButton === 'Check' ? '#28a745' : 'black'}}/>
           <Evaluation
           onClick={() => {
            handleButtonClick('Evaluation');
            onButtonClick('Evaluation');
            }}
           style={{ borderBottom: activeButton === 'Evaluation' ? '3px solid #28a745' : 'none',
           color: activeButton === 'Evaluation' ? '#28a745' : 'black',  }}/>
           
        </div>
        <div style={{
    borderBottom: "2px solid #E9E9E9",
    lineHeight: "0.1em",
    width: "1510px",
}}/>

        </nav>
        
    
      );
}
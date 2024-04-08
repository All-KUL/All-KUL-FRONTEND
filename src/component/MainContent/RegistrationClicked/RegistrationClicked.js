import { useState } from "react";
import "../../../index.css";
import DoRegistration from "./DoRegistration";
export default function RegistrationClicked() {

    const [buttonName,setButtonName]=useState('register');
    const [code, setCode] = useState(""); // code 상태를 useState로 관리
    const [inputText, setInputText] = useState("");
      
    const handleButtonClick = (buttonName) => {
        setButtonName(buttonName);
      };
      
      const activeButton = () => {
        if (inputText.length === 4) {
            alert(`${inputText} 추가 완료`);
            setCode(inputText);
        } else {
            alert("잘못된 입렵 값입니다.");
        }
        setInputText(""); // 입력 상태 초기화
    }
      const activeEnter = (e) => {
        if(e.key === "Enter") {
          activeButton();
          e.target.value = ""; // 입력값 초기화
        }
      }

      
    return (
        <div>

        <div style={{ display: "flex" }}>
                <button className="select_button_Container"
                onClick={()=>handleButtonClick('register')}
                style={{
                    marginLeft: "312px",
                    cursor: "pointer",
                    fontSize:"13px",
                    color: buttonName === 'register' ? '#FFFFFF' : 'black', 
                    backgroundColor: buttonName === 'register' ? '#4BAB26' : '#F5F5F5', 
                }}>
                수강 신청
            </button>
         
            <button className="select_button_Container"
                onClick={()=>handleButtonClick('check')}
                
                style={{
                    marginLeft:"2px",
                    cursor: "pointer", // 클릭시 글자색 흰색
                    fontSize:"13px",
                    color: buttonName === 'check' ? '#FFFFFF' : 'black', 
                    backgroundColor: buttonName === 'check' ? '#4BAB26' : '#F5F5F5', 
                
                }}>
                개설과목 조회
            </button>

            <button className="select_button_Container"
                onClick={()=>handleButtonClick('schedule')}
               
               style={{
                    marginLeft:"2px",
                    cursor: "pointer",// 클릭시 글자색 흰색
                    fontSize:"13px",
                    color: buttonName === 'schedule' ? '#FFFFFF' : 'black', 
                    backgroundColor: buttonName === 'schedule' ? '#4BAB26' : '#F5F5F5', 
                
               }}>
                개인강의시간표
            </button>
            
            
            <text
            style={{
                fontSize:"13px",
                fontWeight:"bold",
                marginTop:"27px",
                marginLeft:"270px",
                whiteSpace:"nowrap"
            }}
            >빠른수강신청</text>
            
            
            <input type="text"  
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
            placeholder="과목번호 (4자리)"
            value={inputText}
            style={{
            outlineColor:"#ECECEC",
           height:"20px",
           width:"150px",
           marginTop:"25px",
           marginLeft:"5px",
           borderRadius:"3px",
           border: "2px solid #ECECEC",
       }}/>

        <button
        onClick={activeButton}
        style={{
            backgroundColor:"#005128",
            height:"24px",
           width:"60px",
           marginTop:"25px",
           marginLeft:"5px",
           color:"#FFFFFF",
           borderRadius:"3px",
           cursor:"grab"
        }}>신청



        </button>

         </div>
        <div style={{    
            borderBottom: "1px solid black",
            lineHeight: "0.1em",
                width:"1180px",
                marginLeft: "312px",
                }}/>
            <DoRegistration  inputText={code}/>
    </div>

    );
}

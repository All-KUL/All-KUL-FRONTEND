import { useState } from "react";
import "../../../index.css";
export default function NoticeClicked() {

    return (
        <div style={{ display: "flex" }}>
            <div style={{display:"flex",flexDirection:"column"}}>
            <button className="select_button_Container"
                style={{
                    marginLeft: "312px",
                    cursor: "pointer",
                    backgroundColor: "#4BAB26", // 클릭시 배경색 초록 state써서 onclick
                    color: "#FFFFFF", // 클릭시 글자색 흰색
                    fontSize:"13px",
                }}>
                시스템 이용법
            </button>
            
            <div style={{    
            borderBottom: "1px solid black",
            lineHeight: "0.1em",
                width:"1180px",
                marginLeft: "312px",
                }}/>
            <div  style={{
                    marginLeft: "312px",
                    border: "1px solid #E7E7E7",
                    width:"1180px",
                    height:"372px",
                    marginTop:"10px",
                    borderRadius:"8px"
               }}>
                <p 
                style={{
                    fontWeight:"bold",
                    fontSize:"8",
                    marginLeft:"32px"
            }}> All-kul 사용법</p>
            <text style={{
                marginLeft:"10px"
            }}> 수강신청 화이이티티티티이ㅣ티이티ㅣㅇ</text>
            
            </div>

        </div>
        </div>
    );
}

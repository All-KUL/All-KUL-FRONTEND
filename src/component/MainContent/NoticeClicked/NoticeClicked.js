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
         
         
            <p style={{
                marginLeft:"10px"
            }}>1. 조회 및 추가 접속</p>
            <p style={{
                marginLeft:"20px"
            }}>-연습하고자 하는 강의 생성을 해주세요.(과목번호, 교과목명, 개설학과, 수용인원을 입력해주세요)</p>
         
            <p style={{
                marginLeft:"10px"
            }}>2. 난이도 설정 </p>
         
            <p style={{
                marginLeft:"20px"
            }}>-연습하고자 하는 난이도를 설정해주세요(상,중,하)</p>
         
            <p style={{
                marginLeft:"10px"
            }}>3. 서버 시간 확인 </p>
            
            
            <p style={{
                marginLeft:"20px"
            }}>-서버 시간을 확인 후, 수강신청 시간이 되면 과목번호 4자리를 입력하여 수강신청 하세요</p>
         

            </div>

        </div>
        </div>
    );
}

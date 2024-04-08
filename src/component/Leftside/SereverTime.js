import HorizonLine from "../horizontal";
import GetTime from "./GetTime";
import LiveTimeContainer from "./GetTime"
export default function ServerTime({text}) {
  return (
    <div style={{ 
      display: "block", 
      width: "256px", 
      height: "97px", 
      border: "1px solid #70BB53",
      marginTop: "13px",
      borderRadius: "8px", 
      backgroundColor: "#ffffff",
    }}>
      <span style={{  
        display: "inline-block", // inline 요소에서 inline-block으로 변경
        paddingTop:"20px",
        paddingLeft:"15px",
        color:"##9C9C9C",
        fontSize:"12px"// 여백 추가
      }}>서버 시간 <GetTime/>
      </span>
      <HorizonLine/>
      <span style={{  
        display: "inline-block", // inline 요소에서 inline-block으로 변경
        paddingLeft:"60px",
        fontSize:"13px"// 여백 추가
      }}>시간적 오차 발생 가능</span>
    </div>
  );
}

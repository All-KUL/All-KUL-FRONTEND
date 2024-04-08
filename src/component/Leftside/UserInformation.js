import HorizonLine from "../horizontal";

export default function UserInfo(){
    return(
        <div style={{ 
            display: "block", 
            width: "256px", 
            height: "440px", 
            border: "1px solid #70BB53",
            marginTop: "13px",
            borderRadius: "8px", 
            backgroundColor: "#ffffff",
          }}>
            <span style={{
                display: "inline-block", // inline 요소에서 inline-block으로 변경
                fontSize:"13px",
                paddingTop:"10px",
                paddingLeft:"10px"
            }}>이름 </span>
            <HorizonLine/>
        </div>
    )
}
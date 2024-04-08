import ServerTime from "./SereverTime";
import UserInfo from "./UserInformation";

export default function LeftsideBackground(){
    return(
        <div style={{
            backgroundColor:"#F5F5F5",
            display:"flex",
            flexDirection:"column",
            width:"280px",
            height:"800px",
            position:"absolute",
            top:"120px",
            left:"0",
            alignItems:"center"
        }}>
        <ServerTime/>
        <UserInfo/>
        </div>

)
}
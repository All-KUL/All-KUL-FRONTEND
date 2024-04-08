import "../../index.css"
export default function Registartion({style,onClick}){
    return(
        <>
        <button className="header-button" style={style} onClick={onClick}>수강신청</button>          
        </>
    )
}
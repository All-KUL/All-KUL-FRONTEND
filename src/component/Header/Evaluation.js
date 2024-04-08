import "../../index.css"
export default function Evaluation({style,onClick}){

    return(
        <>
        <button className="header-button" style={style} onClick={onClick}>강의평</button>    
        </>
    )
}
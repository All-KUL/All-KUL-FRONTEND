import "../../index.css"

export default function Check({style,onClick}){

    return(
        <>
        <button className="header-button" style={style} onClick={onClick}>조회</button>    
        </>
    )
}
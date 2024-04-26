import { useEffect } from "react";
import "../../../index.css";
import Addlecture from "./Add/Addlecture";
import Getlecture from "./Get/Getlecture";

export default function ButtonClicked({ activeComponent }){
    
    useEffect(() => {
       console.log('Active component:', activeComponent);
     }, [activeComponent]); // activeComponent 값이 변경될 때마다 useEffect가 실행됨
   

     //화면 이동 페이지
    return(
     <div>
        {activeComponent === 'Add' && <Addlecture />}
        {activeComponent === 'Get' && <Getlecture />}
     </div>
  )   
 }
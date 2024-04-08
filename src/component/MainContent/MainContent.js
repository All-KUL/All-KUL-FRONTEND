import { useEffect } from "react";
import NoticeClicked from "./NoticeClicked/NoticeClicked";
import CheckClicked from "./CheckClicked/CheckClicked";
import EvaluationClicked from "./EvaluationClicked/EvaluationClicked";
import Registrationclicked from "./RegistrationClicked/RegistrationClicked"
export default function MainContent({ activeComponent }){
   useEffect(() => {
      console.log('Active component:', activeComponent);
    }, [activeComponent]); // activeComponent 값이 변경될 때마다 useEffect가 실행됨
  
   return(
    <div>
       {activeComponent === 'Notice' && <NoticeClicked />}
      {activeComponent === 'Registration' && <Registrationclicked/>}
      {activeComponent === 'Check' && <CheckClicked />}
      {activeComponent === 'Evaluation' && <EvaluationClicked />}
    </div>
 )   
}
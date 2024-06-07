import { useState } from "react";
import "../../../index.css";
import DoRegistration from "./DoRegistration";
import CourseCheck from "./CourseCheck";
import PersonalSchedule from "./PersonalSchedule";

export default function RegistrationClicked() {
    const [buttonName, setButtonName] = useState('register');

    const handleButtonClick = (buttonName) => {
        setButtonName(buttonName);
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <button className="select_button_Container"
                    onClick={() => handleButtonClick('register')}
                    style={{
                        marginLeft: "312px",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: buttonName === 'register' ? '#FFFFFF' : 'black',
                        backgroundColor: buttonName === 'register' ? '#4BAB26' : '#F5F5F5',
                    }}>
                    수강 신청
                </button>

                <button className="select_button_Container"
                    onClick={() => handleButtonClick('check')}
                    style={{
                        marginLeft: "2px",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: buttonName === 'check' ? '#FFFFFF' : 'black',
                        backgroundColor: buttonName === 'check' ? '#4BAB26' : '#F5F5F5',
                    }}>
                    개설과목 조회
                </button>

                <button className="select_button_Container"
                    onClick={() => handleButtonClick('schedule')}
                    style={{
                        marginLeft: "2px",
                        cursor: "pointer",
                        fontSize: "13px",
                        color: buttonName === 'schedule' ? '#FFFFFF' : 'black',
                        backgroundColor: buttonName === 'schedule' ? '#4BAB26' : '#F5F5F5',
                    }}>
                    개인강의시간표
                </button>
            </div>

            {buttonName === 'register' && <DoRegistration />}
            {buttonName === 'check' && <CourseCheck />}
            {buttonName === 'schedule' && <PersonalSchedule />}
        </div>
    );
}

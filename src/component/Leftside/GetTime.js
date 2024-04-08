
import React, { useState, useEffect } from 'react';
export default function GetTime(){
    const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간

    useEffect(() => {
      // 1초마다 현재 시간 업데이트
      const interval = setInterval(() => {
        setCurrentTime(new Date()); // 현재 시간을 다시 가져와서 상태 업데이트
      }, 1000);
  
      // 컴포넌트가 언마운트될 때 interval을 정리
      return () => clearInterval(interval);
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정
  
    // 현재 시간을 시간, 분, 초로 변환하는 함수
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0'); // 시
      const minutes = date.getMinutes().toString().padStart(2, '0'); // 분
      const seconds = date.getSeconds().toString().padStart(2, '0'); // 초
      return `${hours}:${minutes}:${seconds}`;
    };
    const formatDate = (date) => {
        const year = date.getFullYear(); // 년도
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
        const day = date.getDate().toString().padStart(2, '0'); // 일
        return `${year}-${month}-${day}`;
      };
    return (
      <>
        <span style={{
            color:"black",
            marginLeft:"5px",
            fontWeight:"bold"
        }}>{formatDate(currentTime)} {formatTime(currentTime)}</span>
      </>
    );
}
import { useState } from "react";
import "../../../index.css";
export default function NoticeClicked() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          className="select_button_Container"
          style={{
            marginLeft: "312px",
            cursor: "pointer",
            backgroundColor: "#4BAB26", // 클릭시 배경색 초록 state써서 onclick
            color: "#FFFFFF", // 클릭시 글자색 흰색
            fontSize: "13px",
          }}
        >
          시스템 이용법
        </button>

        <div
          style={{
            marginLeft: "312px",
            border: "1px solid #E7E7E7",
            width: "1180px",
            height: "372px",
            marginTop: "10px",
            borderRadius: "8px",
            padding: "16px", // 내용과 테두리 사이의 여백을 주기 위해 패딩을 추가
            overflowY: "auto", // 내용이 많을 경우 스크롤을 할 수 있게 설정
          }}
        >
          <p className="notice-title">✅매크로 프로그램 방지</p>
          <ul className="notice-list">
            <li>
              매크로프로그램 사용을 방지하기 위하여 저장을{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>50회</span>{" "}
              이상 시도하면 화면에 나타나는 문자열을 입력하고 계속 사용
            </li>
            <li>
              문자열 입력시{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>5회</span> 이상
              틀리면 자동 로그아웃
            </li>
          </ul>
          <p className="notice-title">✅멀티로그인시 처리기능 방지</p>
          <ul className="notice-list">
            <li>중복 로그인 방지(One Device) 및 멀티 탭 중복 방지</li>
          </ul>
          <p className="notice-title">✅팝업차단 해제</p>
          <ul className="notice-list">
            <li>팝업차단 설정이 해제 되지 않았을 경우 팝업차단을 해제</li>
            <li>
              팝업차단 해제 방법으로 브라우저에서
              “도구/인터넷옵션/팝업차단설정/” 현재 사이트의 팝업을 항상 “허용”
            </li>
          </ul>
          <p className="notice-title">✅모니터 해상도</p>
          <ul className="notice-list">
            <li>
              수강신청시스템은 최소 해상도는 1440*900 이며 1920*1024 해상도에
              최적화 되어 있으며 그 이상의 해상도로 화면 설정
            </li>
          </ul>
          <p className="notice-title">✅브라우저</p>
          <ul className="notice-list">
            <li>크롬, 파이어폭스, 사파리 브라우저에 최적화 되있습니다.</li>
            <li>
              인터넷 익스플로러는 보안상의 이유로 11 버전이상으로 업그레이드
              하시기를 바랍니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

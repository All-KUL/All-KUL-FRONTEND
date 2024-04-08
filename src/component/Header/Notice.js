import "../../index.css"
export default function Notice({ style, onClick }) {
    return (
      <button className="header-button" style={style} onClick={onClick}>
        공지사항
      </button>    
    );
  }
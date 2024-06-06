import React, { useEffect } from "react";
import "../../../index.css";
import Login from "./Login";
import Manual from "./Manual";

export default function DoNotice({ activeComponent }) {
  useEffect(() => {
    console.log('Active component:', activeComponent);
  }, [activeComponent]);

  return (
    <div>
      {activeComponent === 'Login' && <Login />}
      {activeComponent === 'Manual' && <Manual />}
    </div>
  );
}

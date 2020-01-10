import React from "react";
import WebRTCState from "./common/webrtc-connection-state";
import "./css/style.css";
export default function Client({ currentUser, name, target}) {
  return (
    <div className="client">
      <div className="client-top"></div>

      <div className="client-bottom">
        <WebRTCState />
      </div>
    </div>
  );
}

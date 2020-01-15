import React from "react";
import FileSelectorView from "../../file-reader/ui-components/file-selector-view";
import CircularPercentageBar from "./CircularPercentageBar";
import "./css/style.css";

export default function FileTransferView({
  handleSendMessage,
  uiState,
  handleFileChange
}) {
  const {
    fileSelected,
    remoteOfferRecieved,
    sendingFile,
    recievingFile,
    sendingComplete,
    recievingComplete
  } = uiState;
  function sendOffer() {
    debugger;
    handleSendMessage("file-offer");
  }

  function sendAnswer() {
    handleSendMessage("file-answer");
  }

  function sendDecline() {
    handleSendMessage("file-decline");
  }

  function sendCancel() {
    handleSendMessage("file-cancel");
  }

  if (recievingFile) {
    return (
      <div className="file-transfer">
        <div>
          <CircularPercentageBar percent={50} />
        </div>
        <div className="btn-container">
          <button onClick={sendCancel}>Cancel Recieving</button>
        </div>
      </div>
    );
  }

  if (sendingFile) {
    return (
      <div className="file-transfer">
        <CircularPercentageBar percent={50} />

        <div className="btn-container">
          <button onClick={sendCancel}>Cancel Sending</button>
        </div>
      </div>
    );
  }

  if (recievingComplete) {
    return (
      <div className="file-transfer">
        <div>Recieving Complete</div>
        <div>
          <button>Ok</button>
        </div>
      </div>
    );
  }

  if (sendingComplete) {
    return (
      <div className="file-transfer">
        <div>Sending Complete</div>
        <div>
          <button>Ok</button>
        </div>
      </div>
    );
  }
  if (remoteOfferRecieved) {
    return (
      <div className="file-transfer">
        <div className="btn-container">
          <button onClick={sendAnswer}>Accept</button>
          <button onClick={sendDecline}>Decline</button>
        </div>
      </div>
    );
  }

  if (!fileSelected) {
    return <FileSelectorView handleFileChange={handleFileChange} />;
  }

  return (
    <div className="file-transfer">
      <div className="btn-container">
        <button onClick={sendOffer}>Send File</button>
        <button onClick={sendOffer}>Cancel</button>
      </div>
    </div>
  );
}

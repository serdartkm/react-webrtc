import React,{useState, useRef,useEffect} from "react";
import FileSelectorView from "../../file-reader/ui-components/file-selector-view";
import CircularPercentageBar from "./CircularPercentageBar";
import "./css/style.css";

export default function FileTransferView({
  handleSendMessage,
  uiState,
  handleFileChange,
  downloadProgress,
  closeDataChannel,
  assembledFile,
  remoteFileInfo,
  readProgress
}) {
  const {
    fileSelected,
    remoteOfferRecieved,
    sendingFile,
    recievingFile,
    sendingComplete,
    recievingComplete,
    haveLocalOffer
  } = uiState;
  const [haveLocalAnswer,setHaveLocalAnswer]= useState(false);

  const fileLinkRef =useRef(null);
   


  useEffect(()=>{
    if(assembledFile && remoteFileInfo ){
      fileLinkRef.current.href = URL.createObjectURL(assembledFile)
      fileLinkRef.current.download=remoteFileInfo.name;
    }
  },[assembledFile,remoteFileInfo])

  function sendOffer() {
    handleSendMessage("file-offer");
  }

  function sendAnswer() {
    setHaveLocalAnswer(true);
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
          <CircularPercentageBar percent={downloadProgress} />
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
        <CircularPercentageBar percent={readProgress} />

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
        <a href="/"  ref={fileLinkRef}>Download file</a>
        </div>
      </div>
    );
  }

  if (sendingComplete) {
    return (
      <div className="file-transfer">
        <div>Sending Complete</div>
        <div>
          <button onClick={closeDataChannel}>Ok</button>
        </div>
      </div>
    );
  }
  if (remoteOfferRecieved) {
    return (
      <div className="file-transfer">
        <div className="btn-container">
          <button disabled={haveLocalAnswer} onClick={sendAnswer}>Accept</button>
          <button disabled={haveLocalAnswer} onClick={sendDecline}>Decline</button>
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
        <button disabled={haveLocalOffer}  onClick={sendOffer}>Send File</button>
        <button  disabled={haveLocalOffer} onClick={sendOffer}>Cancel</button>
      </div>
    </div>
  );
}

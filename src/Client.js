import React from "react";
import WebRTCState from "./common/webrtc-connection-state";
import FileTransferView from './file-transfer/ui-components/file-transfer-view';
import FileSelectorView from './file-reader/ui-components/file-selector-view';
import usePusherSignaling from './signaling/pusher/usePusherSignaling'
import useFileReader from './file-reader/useFileReader';
import useWebRTC from './file-transfer/use-webrtc';
import ErrorMessage from './ErrorMessage';
import "./css/style.css";
export default function Client({ currentUser, name, target,roomId='0d3729a6-d4c2-4af0-8e7a-1efc9ea0f428'}) {

  const {signalingMessage, sendSignalingMessage,error: signalingError}= usePusherSignaling({currentUser,roomId,target,name})
  const {handleFileChange, file, error:readerError, readProgress} = useFileReader()
  const {handleSendMessage, error:webRTCError, state} =useWebRTC({sendSignalingMessage,signalingMessage})

  if(signalingError){
    return <ErrorMessage error={signalingError}/>
  }
  else if(webRTCError){
    return <ErrorMessage error={webRTCError} />
  }
  else if(readerError){
    return <ErrorMessage error={readerError} />
  }
  return (
    <div className="client">
      <div className="client-top">
        {!file &&  <FileSelectorView handleFileChange={handleFileChange} />}
        {file && <FileTransferView state={state} handleSendMessage={handleSendMessage} readProgress={readProgress} />}
      </div>
      <div className="client-bottom">
        <WebRTCState signalingState={state.signalingState} connectionState={state.connectionState} iceConnectionState={state.iceConnectionState} iceGatheringState={state.iceGatheringState} />
      </div>
    </div>
  );
}

/* eslint-disable indent */
import React from 'react'
import CallAnimation from './CallAnimation';
import DisplayMediaStream from './DisplayMediaStream';
import './css/style.css';
const style = {
  btn: {
    padding: 5,
  
    width: 100
  }
};
export default function VideoChatView({ remoteMediaStream,localMediaStream, uiState, target, name,mediaSize , handleSendMessage }) {
  const {calling,recievingCall, connected, connecting,callBtnVisible,answerBtnVisible,cancellBtnVisible,declineBtnVisible,ignoreBtnVisible, endBtnVisible } =uiState;

  const { remoteStreamSize, localStreamSize } = mediaSize;
  function sendOffer (){
    handleSendMessage('offer');
  }

  function sendAnswer (){
    handleSendMessage('answer');
  }
  function sendEnd (){
    handleSendMessage('end');
  }
  function sendDecline (){
    handleSendMessage('decline');
  }

  function sendIgnore (){
    handleSendMessage('ignore');
  }
  function sendCancel (){
    handleSendMessage('cancel');
  }
  return (
    <div className="video-chat-view">

      <div className="media-container">
        <div className="local-media">
        {connected && <DisplayMediaStream name={name} style={{ backgroundColor: 'blue' }} width={localStreamSize.width} mediaStream={localMediaStream} title="local"/>}
        </div>
        <div className="remote-media">
          {connected && <DisplayMediaStream name={target} style={{ backgroundColor: 'blue' }} width={remoteStreamSize.width} height={remoteStreamSize.height} mediaStream={remoteMediaStream} title="remote" />}
        </div>
      </div>
      <div className="call-animation">
      { !connected && (
        <CallAnimation
	calling={calling}
	recievingCall={recievingCall}
	target={target}
        />
      )}
      </div>
      <div className="button-container">
          {
           callBtnVisible &&  <button disabled={connecting} style={style.btn} onClick={sendOffer}>
              Call
            </button>
}
          {answerBtnVisible && (
            <button style={style.btn}   onClick={sendAnswer}>
              Answer
            </button>
          )}
          {declineBtnVisible && (
            <button style={style.btn}  onClick={sendDecline}>Decline</button>
          )}
             {endBtnVisible && (
            <button style={style.btn}  onClick={sendEnd}>End</button>
          )}
             {ignoreBtnVisible&& (
            <button style={style.btn}  onClick={sendIgnore}>Ignore</button>
          )}
              {cancellBtnVisible && (
            <button style={style.btn} onClick={sendCancel}>
              Cancel
            </button>
          )}
        </div>
    </div>
  );
}

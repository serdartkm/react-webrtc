
import React from 'react'
import TextChatView from './text-chat/ui-components/TextChatView'
import useWebRTC from './text-chat/webrtc/use-webrtc'
import iceServers from './text-chat/webrtc/ice-servers'
import usePusherSignaling from './signaling/pusher/usePusherSignaling'
import WebRTCState from "./common/webrtc-connection-state";
import ErrorMessage from './ErrorMessage';
import './css/style.css'
export default function Client ({currentUser,roomId='0d3729a6-d4c2-4af0-8e7a-1efc9ea0f428',target,name}){
    const {signalingMessage, sendSignalingMessage,error: signalingError }= usePusherSignaling({currentUser,roomId,target,name})
    const {	initiateOffer,error : webRTCError,message,connected,sendMessage,state} = useWebRTC({name,signalingMessage,sendSignalingMessage,iceServers})

		if(signalingError){
			return <ErrorMessage error ={signalingError} />
		}
		else if (webRTCError){
			return <ErrorMessage error ={webRTCError} />
		}

return (<div className ="client">
     <div className="client-top">
     <TextChatView  sendMessage={sendMessage} state ={state} remoteMessage={message} connected={connected} initiateOffer={initiateOffer}/>
     </div>
     <div className="client-bottom">
        <WebRTCState signalingState ={state.signalingState} connectionState={state.connectionState} iceConnectionState={state.iceConnectionState}iceGatheringState={state.iceGatheringState}  />
      </div>
</div>)
}



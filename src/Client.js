import React from 'react'
import TextChatView from './text-chat/ui-components/TextChatView'
import useWebRTC from './text-chat/webrtc/use-webrtc'
import iceServers from './text-chat/webrtc/ice-servers'
import usePusherSignaling from './signaling/pusher/usePusherSignaling'
import './css/style.css'
export default function Client ({currentUser,roomId,target,name}){
    const {signalingMessage, sendSignalingMessage,error: signalingError }= usePusherSignaling({currentUser,roomId,target,name})
    const {	initiateOffer,
		error : webRTCError,
		data,
		open,
		sendData,} = useWebRTC({signalingMessage,sendSignalingMessage,iceServers})
return <div className ="client">
    <TextChatView />
</div>
}
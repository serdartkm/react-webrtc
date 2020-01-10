import React from 'react'
import TextChatView from './text-chat/ui-components/TextChatView'
import useWebRTC from './text-chat/webrtc/use-webrtc'
import usePusherSignaling from './signaling/pusher/usePusherSignaling'
import './css/style.css'
export default function Client ({currentUser,roomId,target,name}){
    const {signalingMessage, sendSignalingMessage,error }= usePusherSignaling({currentUser,roomId,target,name})
    const {} = useWebRTC({signalingMessage,sendSignalingMessage,})
return <div className ="client">
    <TextChatView />
</div>
}
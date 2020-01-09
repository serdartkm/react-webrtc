import usePusherSignaling from '../../signaling/pusher/usePusherSignaling';
import iceServers from './ice-servers';
import useWebRTC from './use-webrtc';

export default function  useWebRTCPusherApp ({ mediaConstraints,currentUser, roomId, name,target   }) {

	const { message, sendMessage,error: pusherError }  = usePusherSignaling({ currentUser,roomId, target,name });
	const { handleSendMessage ,state, webRTCError,remoteMediaStream,localMediaStream } =useWebRTC({ sendMessage,message, mediaConstraints,iceServers });
	
	return  { handleSendMessage,remoteMediaStream,state,pusherError,webRTCError,localMediaStream };
}
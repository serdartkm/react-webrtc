import React from 'react';
import usePusherSignaling from '../../signaling/pusher/usePusherSignaling';
import useWebRTC from '../webrtc/use-webrtc';
import iceServers from '../webrtc/ice-servers';
import VideoChatView from '../ui-components/VideoChatView';
import RTCStateView from '../ui-components/RTCStateView';
import useUIState from '../webrtc/use-ui-state';
const mediaSize ={
	localStreamSize: { height: 100, width: 100 },
	remoteStreamSize: { height: 250, width: 250 }
};

const mediaConstraints ={ video: true,audio: false };
export default function Client  ({ name,target,currentUser }){

	const { signalingMessage, sendSignalingMessage,error: pusherError }  = usePusherSignaling({ currentUser,roomId: '0d3729a6-d4c2-4af0-8e7a-1efc9ea0f428', target,name });
	const { handleSendMessage ,state, webRTCError,remoteMediaStream,localMediaStream } =useWebRTC({ sendSignalingMessage,signalingMessage, mediaConstraints,iceServers });
	const { uiState } =useUIState({ state });
	return (
		<div style={{ height: '25vh', width: 600, margin: 5 }}>
			<VideoChatView name={name} target={target} mediaSize={mediaSize} handleSendMessage={handleSendMessage} state={state} localMediaStream={localMediaStream}
				uiState={uiState}
				remoteMediaStream={remoteMediaStream} pusherError={pusherError}
				webRTCError={webRTCError}
			/>
			<div>{webRTCError && webRTCError.message}</div>
			<div>{pusherError && pusherError.message}</div>
			<RTCStateView  {...state} />
		</div>
	);

}
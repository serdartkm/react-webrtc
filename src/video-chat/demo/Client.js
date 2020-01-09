import React from 'react';
import useWebRTCPusherApp from '../webrtc/use-webrtc-pusher-app';
import VideoChatView from '../ui-components/VideoChatView';
import RTCStateView from '../ui-components/RTCStateView';
import useVideoChatUiState from '../webrtc/use-ui-state';
const mediaSize ={
	localStreamSize: { height: 100, width: 100 },
	remoteStreamSize: { height: 250, width: 250 }
};

const mediaConstraints ={ video: true,audio: false };
// const roomId ='96d32222-d450-4341-9dc0-b3eccec9e37f' ;
export default function Client  ({ name,target,currentUser }){

	const { handleSendMessage,state,remoteMediaStream,localMediaStream, pusherError,webRTCError } =useWebRTCPusherApp({ currentUser, roomId: '0d3729a6-d4c2-4af0-8e7a-1efc9ea0f428', name,target,mediaConstraints });
	const { uiState } =useVideoChatUiState({ state });
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
import React, { useEffect, useState } from 'react';

export default function useWebRTCState ({ pc, sendMessage }){
   
	const [signalingState,setSignalingState] =useState(null);
	const [connectionState,setConnectionState]=useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [remoteMediaStream, setRemoteMediaStream] = useState(null);

	useEffect(() => {
		if (pc){
			pc.onicecandidate = function(e) {
				if (e.candidate){
					sendMessage({ sdp: e.candidate,type: 'ice' });
				}
			  };
			  pc.onconnectionstatechange = () => {
				setConnectionState(pc.connectionState);
			};
			pc.onsignalingstatechange = () => {
				setSignalingState(pc.signalingState);
			};
			pc.oniceconnectionstatechange = () => {
				setIceConnectionState(pc.iceConnectionState);
			};
			pc.onicegatheringstatechange = () => {
				setIceGatheringState(pc.iceGatheringState);
			};
			pc.ontrack = e => {
				setRemoteMediaStream(e.streams[0]);
			};
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[pc]);
    
	return { signalingState,connectionState,iceConnectionState,iceGatheringState, remoteMediaStream };
}
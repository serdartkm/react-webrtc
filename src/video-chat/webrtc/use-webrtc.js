import React,{ useState,useEffect } from 'react';
import useWebRTCEvents from './use-webrtc-events';

export default function useWebRTC ({ iceServers, message,sendMessage, mediaConstraints }){

	const [pc,setPc] =useState(null);
	const { signalingState,connectionState,iceConnectionState,iceGatheringState, remoteMediaStream } =useWebRTCEvents({ pc,sendMessage });
	const [error,setError] =useState(null);
	const [localMediaStream,setLocalMediaStream] =useState(null);
	const [remoteIceCandidates,setRemoteIceCandidates]=useState([]);
	const [isCaller,setCaller] =useState(false);
	const [remoteOffer, setRemoteOffer]= useState(null);

	useEffect(() => {
		if (signalingState==='closed'){
			resetState();
			debugger;
		}
	},[resetState, signalingState]);

	useEffect(() => {
		if (iceConnectionState==='disconnected'){
			resetState();
		}
	},[iceConnectionState, resetState]);
	useEffect(() => {
		if (connectionState==='failed'){
			resetState();

		}
	},[connectionState, resetState]);

	useEffect(() => {
		if (isCaller && pc){
			createSDP('offer');
		}
	},[createSDP, isCaller, pc]);
	
	useEffect(() => {
		function messageRecived(){
			switch (message.type){
				case 'answer':
					setRemoteSdp(message.sdp.sdp, 'answer');
					break;
				case 'ice':
					setRemoteIce(message.sdp);
					break;
				case 'end':
					pc.close();
					  break;
				case 'decline':
					pc.close();
					  break;
				case 'ignore':
					pc.close();
					 break;
					 case 'cancel':
					pc.close();
				 	debugger;
                         break;
                         default:
			}
		}
		if (message && pc){
			messageRecived();
		}
	},[message, pc, setRemoteIce, setRemoteSdp]);

	useEffect(() => {
		if (message && message.type ==='offer'){
			setPc(new RTCPeerConnection(iceServers));
			setRemoteOffer(message.sdp.sdp);
		}
	},[iceServers, message]);

	useEffect(() => {
		if (remoteOffer && pc){
			setRemoteSdp(remoteOffer,'offer');
		}
	},[remoteOffer, pc, setRemoteSdp]);
	
	function setRemoteSdp(sdp, type){
		if ((type==='answer' && pc.localDescription) || type==='offer'){
			pc.setRemoteDescription(sdp)
				.then(() => {
					if (remoteIceCandidates.length >0){
						for ( let ice in remoteIceCandidates){
							if (ice){
								pc.addIceCandidate(remoteIceCandidates[ice]);
							}
						}
					}
				})
				.catch((err) => {
				// eslint-disable-next-line no-debugger
					debugger;
					setError(err);
				});
		}
	}
	function setRemoteIce(sdp){
		if (pc.remoteDescription){
			pc.addIceCandidate(sdp);
		}
		else {
			setRemoteIceCandidates((prev) => [...prev,message.sdp]);
		}
	}
	function createAnswer (){
	
		createSDP('answer');
	}
	function createOffer (){
		
		setPc(new RTCPeerConnection(iceServers));
		setCaller(true);
	}
	function createSDP(type){
		navigator.mediaDevices.getUserMedia(mediaConstraints)
			.then((stream) => {
				stream
					.getVideoTracks()
					.forEach(t => pc.addTrack(t,stream));
				setLocalMediaStream(stream);
			})
			.then(() =>  type==='answer' ? pc.createAnswer() : pc.createOffer() )
			.then((sdp) => {
				pc.setLocalDescription(sdp);
			
			})
			.then(() => {
				sendMessage({ sdp: pc.localDescription,type });
			})
			.catch((err) => {
			// eslint-disable-next-line no-debugger
				debugger;
			});
	}
	function closeConnection (type){
		switch (type){
			case 'decline':
				sendMessage({ type: 'decline' });
				pc.close();
				resetState();
				break;
			case  'end':
				sendMessage({ type: 'end' });
				pc.close();
			
				break;
			case 'ignore':
				pc.close();
				resetState();
				break;
			case 'cancel':
				sendMessage({ type: 'cancel' });
				pc.close();
			
				  break;
		}
	}
	function resetState (){
		if (pc){
			pc.onicecandidate =null;
			pc.onconnectionstatechange = null;
			pc.onsignalingstatechange = null;
			pc.oniceconnectionstatechange = null;
			pc.onicegatheringstatechange = null;
			pc.ontrack = null;
			setError(null);
			setRemoteOffer(null);
			setCaller(false);
			setRemoteIceCandidates([]);

		
			setPc(null);
		}
	}
	function handleSendMessage (type){
		switch (type){
			case 'offer':
				createOffer();
				break;
			case 'answer':
				createAnswer();
				break;
			case 'decline':
				closeConnection('decline');
				break;
			case 'end':
				closeConnection('end');
				break;
			case 'ignore':
				closeConnection('ignore');
				break;
			case 'cancel':
				closeConnection('cancel');
                break;
                default:
		}
	}

	return { webRTCError: error, state: { connectionState,signalingState, iceGatheringState,iceConnectionState },localMediaStream,remoteMediaStream, handleSendMessage };
}
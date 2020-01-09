/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React,{ useState,useEffect, useCallback } from 'react';
import useWebRTCEvents from './use-webrtc-events';

export default function useWebRTC ({ iceServers, signalingmessage,sendSignalingMessage, mediaConstraints }){

	const [pc,setPc] =useState(null);
	const { signalingState,connectionState,iceConnectionState,iceGatheringState, remoteMediaStream } =useWebRTCEvents({ pc,sendSignalingMessage });
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
	},[signalingState]);

	useEffect(() => {
		if (iceConnectionState==='disconnected'){
			resetState();
		}
	},[iceConnectionState]);
	useEffect(() => {
		if (connectionState==='failed'){
			resetState();

		}
	},[connectionState]);

	useEffect(() => {
		if (isCaller && pc){
			createSDP('offer');
		}
	},[isCaller, pc]);
	
	useEffect(() => {
		function messageRecived(){
			switch (signalingmessage.type){
				case 'answer':
					setRemoteSdp(signalingmessage.sdp.sdp, 'answer');
					break;
				case 'ice':
					setRemoteIce(signalingmessage.sdp);
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
		if (signalingmessage && pc){
			messageRecived();
		}
	},[signalingmessage, pc]);

	useEffect(() => {
		if (signalingmessage && signalingmessage.type ==='offer'){
			setPc(new RTCPeerConnection(iceServers));
			setRemoteOffer(signalingmessage.sdp.sdp);
		}
	},[iceServers, signalingmessage]);

	useEffect(() => {
		if (remoteOffer && pc){
			setRemoteSdp(remoteOffer,'offer');
		}
	},[remoteOffer, pc]);
	
	const setRemoteSdp = useCallback((sdp, type)=>{
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
	}) 
	function setRemoteIce(sdp){
		if (pc.remoteDescription){
			pc.addIceCandidate(sdp);
		}
		else {
			setRemoteIceCandidates((prev) => [...prev,signalingmessage.sdp]);
		}
	}
	function createAnswer (){
	
		createSDP('answer');
	}
	function createOffer (){
		
		setPc(new RTCPeerConnection(iceServers));
		setCaller(true);
	}
	const createSDP =useCallback((type)=>{
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
				sendSignalingMessage({ sdp: pc.localDescription,type });
			})
			.catch((err) => {
			// eslint-disable-next-line no-debugger
				debugger;
			});
	})
	function closeConnection (type){
		switch (type){
			case 'decline':
				sendSignalingMessage({ type: 'decline' });
				pc.close();
				resetState();
				break;
			case  'end':
				sendSignalingMessage({ type: 'end' });
				pc.close();
			
				break;
			case 'ignore':
				pc.close();
				resetState();
				break;
			case 'cancel':
				sendSignalingMessage({ type: 'cancel' });
				pc.close();
			
				  break;
				  default:
		}
	}
	const resetState =useCallback(()=>{
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
	})
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
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
export default function useWebRTCDataChannel({
	sendSignalingMessage,
	signalingMessage,
	iceServers,
	name
}) {
	const [pc, setPc] = useState(null);
	const [error, setError] = useState(null);
	const [remoteIceCandidates, setRemoteIceCandidates] = useState([]);
	const [remoteOffer, setRemoteOffer] = useState(null);
	const [initiator, setInitiator] = useState(false);
	const [connected,setConnected] =useState(false);
	const [message,setMessage]= useState(false);
	const [datachannel,setDatachannel]=useState(null);
	const [signalingState, setSignalingState] = useState(null);
	const [connectionState, setConnectionState] = useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);

	useEffect(() => {
		if (signalingMessage) {
			switch (signalingMessage.type) {
				case 'offer':
				
					remoteOfferRecieved(signalingMessage.sdp);
					break;
				case 'answer':
					remoteAnswerRecieved(signalingMessage.sdp);
					break;
				case 'ice':
				
					remoteIceRecieved(signalingMessage.sdp);
					break;
				default:
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signalingMessage]);

	useEffect(() => {
		if (pc && remoteOffer) {
		
			pc.ondatachannel = (event) => {
				let channel = event.channel;
			    channel.onopen = () => {
					setConnected(true);
				};
				channel.onmessage = (event) => {
					debugger
					setMessage(JSON.parse(event.data));
				};
				channel.onclose =() => {
					setConnected(false);
	
				};
				channel.onerror = (err) => {
					setError(err);
				};
				setDatachannel(channel);
			  };
			  pc.setRemoteDescription(remoteOffer.sdp)
			  .then(() => {
				  if (remoteIceCandidates.length > 0) {
					  for (let ice in remoteIceCandidates) {
						  if (ice) {
							  pc.addIceCandidate(remoteIceCandidates[ice]);
						
						  }
					  }
				  }
			  })
			  .then(()=> {
			
				initiateAnswer()})
			  .catch(err => {
				  debugger;
				  setError(err)});
		
		}
	}, [pc, remoteOffer]);



	useEffect(() => {
		if (pc && initiator) {
		
			let channel = pc.createDataChannel('chat');
			channel.onopen = () => {
				setConnected(true);
			};
			channel.onmessage = (event) => {
				debugger
				setMessage(JSON.parse(event.data));
			};
			channel.onclose =() => {
				setConnected(false);
			};
			channel.onerror = (err) => {
				setError(err);
			};
			setDatachannel(channel) ;
		
		}
	}, [initiator, pc]);
	useEffect(() => {
		if (pc && datachannel && initiator ){
		
			pc.createOffer()
				.then(offer => pc.setLocalDescription(offer))
				.then(() => {
				
					sendSignalingMessage({ type: 'offer', sdp: pc.localDescription })})
				.catch(err => {
					debugger;
					setError(err)});
		}
	},[datachannel,initiator,pc]);

	function remoteOfferRecieved(offer) {

		createRTCPeerConnection();
		setRemoteOffer(offer);
	}

	function remoteAnswerRecieved(answer) {
	
		if (pc.setLocalDescription  && pc.remoteDescription===null) {
			pc.setRemoteDescription(answer.sdp)
				.then(() => {
					if (remoteIceCandidates.length > 0) {
						for (let ice in remoteIceCandidates) {
							if (ice) {
								pc.addIceCandidate(remoteIceCandidates[ice]);
							}
						}
					}
				})
				
				.catch(err => {
					debugger;
					setError(err)});
		}
	}

	function remoteIceRecieved(ice) {
	
		if ( pc && pc.remoteDescription) {
			pc.addIceCandidate(ice);
		}
		else {
			setRemoteIceCandidates(prev => [...prev, signalingMessage.sdp]);
		}
	}
	
	function initiateOffer() {
	if (pc ===null){
		createRTCPeerConnection();
		setInitiator(true);
	}
	
	}

	function initiateAnswer() {
		pc.createAnswer()
			.then(answer => pc.setLocalDescription(answer))
			.then(() => {
			 
				sendSignalingMessage({ type: 'answer', sdp: pc.localDescription })})
			.catch(err => setError(err));
	}

	function createRTCPeerConnection() {
	
		let peerCon = new RTCPeerConnection(iceServers);
		peerCon.onicecandidate = function(e) {
			if (e.candidate) {
				sendSignalingMessage({ sdp: e.candidate, type: 'ice' });
			}
		};
		peerCon.onconnectionstatechange = () => {
			setConnectionState(peerCon.connectionState);
		};
		peerCon.onsignalingstatechange = () => {
			setSignalingState(peerCon.signalingState);
		};
		peerCon.oniceconnectionstatechange = () => {
			setIceConnectionState(peerCon.iceConnectionState);
		};
		peerCon.onicegatheringstatechange = () => {
			setIceGatheringState(peerCon.iceGatheringState);
		};
		setPc(peerCon);
	}

	
	function sendMessage (value){
		const localMessage ={sender:name,message:value}
		setMessage(localMessage);
		datachannel.send(JSON.stringify(localMessage));
	}
	return {
		initiateOffer,
		error,
		message,
		connected,
		sendMessage,
		state: {
			signalingState,
			iceGatheringState,
			iceConnectionState,
			connectionState
		}
	};
}

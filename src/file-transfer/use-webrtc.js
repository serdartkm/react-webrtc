import React, {useEffect, useState} from 'react'
import iceServers from './ice-servers';

export default function useWebRTC ({signalingMessage,sendSignalingMessage,message, readProgress,startReadingFileBySlice, fileChunk}){
    const [pc, setPc] = useState(null);
    const [error, setError] = useState(null);
    const [remoteIceCandidates, setRemoteIceCandidates] = useState([]);
	const [remoteOffer, setRemoteOffer] = useState(null);
	const [initiator, setInitiator] = useState(false);
	const [connected,setConnected] =useState(false);
	const [datachannel,setDatachannel]=useState(null);
	const [signalingState, setSignalingState] = useState(null);
	const [connectionState, setConnectionState] = useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
    const [iceGatheringState, setIceGatheringState] = useState(null);
    

    useEffect(()=>{
        if(fileChunk){
            
        }
    },[fileChunk])

    useEffect(()=>{
        if(pc && initiator){
            debugger; //4
            let channel = pc.createDataChannel('chat');
			channel.onopen = () => {
				setConnected(true);
			};
			channel.onmessage = (event) => {
				debugger
			//	setMessage(JSON.parse(event.data));
			};
			channel.onclose =() => {
				setConnected(false);
			};
			channel.onerror = (err) => {
				setError(err);
			};
            setDatachannel(channel) ;
            
        }
    },[pc,initiator])

    useEffect(()=>{
        if(pc && datachannel && initiator){
            debugger; //5
            pc.createOffer()
            .then((localOffer)=> {
                debugger;  //6
                pc.setLocalDescription(localOffer);
            })
            .then(()=>{
                debugger; //7
                sendSignalingMessage({type:'file-offer', sdp:pc.localDescription})

            })
            .catch((err)=>{
                debugger;
                setError(err);
            })
        }
    },[datachannel,pc,initiator])


    useEffect(()=>{

        if(pc && remoteOffer){
            debugger; //11
            pc.ondatachannel = (event) => {
                let channel = event.channel;
                channel.onopen = () => {
                    setConnected(true);
                };
                channel.onmessage = (event) => {
                    debugger
                   // setMessage(JSON.parse(event.data));
                };
                channel.onclose =() => {
                    setConnected(false);
    
                };
                channel.onerror = (err) => {
                    setError(err);
                };
                setDatachannel(channel);
              };

        }
   
    },[pc, remoteOffer])


    

    useEffect(()=>{
        if(pc && remoteOffer && datachannel){
            debugger ; //12
            pc.setRemoteDescription(remoteOffer)
            .then(()=>{
                debugger; //13
                return pc.createAnswer()
            })
            .then((localAnswer)=>{
                debugger; //14
                pc.setLocalDescription(localAnswer);
            })
            .then(() => {
                debugger; //15
                if (remoteIceCandidates.length > 0) {
                    for (let ice in remoteIceCandidates) {
                        if (ice) {
                            pc.addIceCandidate(remoteIceCandidates[ice]);
                        }
                    }
                }
            })
            .catch((err)=>{
                debugger;
                setError(err);
            })
        }
    }
,[pc,remoteOffer,datachannel])
    useEffect(()=>{
        if(message){
            sendMessage();
        }
    },[message])

    useEffect(()=>{
        if(signalingMessage){
            switch(signalingMessage.type){
                case 'file-offer':
                    createRTCPeerConnection(iceServers)
                    setRemoteOffer(signalingMessage.sdp);
                    debugger; //8
                    break;
                case 'file-answer':
                    remoteAnswerRecieved(signalingMessage.sdp)
                    break;
                case 'file-decline':
                    break;
                case 'file-end':
                    break;
                case 'file-start':
                    break;
                case 'ice':
                    remoteIceRecieved(signalingMessage.sdp)
                    break;
                default:
            }
        }
    },[signalingMessage])

 



    function sendMessage (){

    }
    


    function createLocalOffer (){
        debugger; //2
        createRTCPeerConnection()
        setInitiator(true);
    }

    function sendLocalAnswer (){
        sendSignalingMessage({type:'file-answer', sdp:pc.localDescription})
    }

    function createRTCPeerConnection(){
        debugger; //3  //10
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

    function remoteAnswerRecieved (answer){
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

    function remoteIceRecieved (ice){
        if ( pc && pc.remoteDescription) {
			pc.addIceCandidate(ice);
		}
		else {
			setRemoteIceCandidates(prev => [...prev, signalingMessage.sdp]);
		}
    }

    function handleSendMessage (type){
        switch(type){
            case 'file-offer':
                debugger; // 1
            createLocalOffer();
            break;
            case 'file-answer':
            sendLocalAnswer();
            break;
            case 'file-decline':
            break;
            default:
        }
    }

    return {handleSendMessage, state:{iceConnectionState,iceGatheringState,connectionState,signalingState},error}
}
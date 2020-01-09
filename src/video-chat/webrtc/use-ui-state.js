import React, { useEffect,useState } from 'react';

export default function useUIState ({ state }){
	const { connectionState, signalingState, iceConnectionState } =state;

	const [ calling,setCalling ]= useState(false);
	const [recievingCall,setRecievingCall ]= useState(false);
	const [ callEnded,setCallEnded ] =useState(false);
	const [ connected,setConnected ]=useState(false);
	const [ connecting,setConnecting ]= useState(false);

	const [ callBtnVisible,setCallBtnVisible ]=useState(true);
	const [ answerBtnVisible,setAnswerBtnVisible ]=useState(false);
	const [ cancellBtnVisible,setCancellBtnVisible ]=useState(false);
	const [ declineBtnVisible,setDeclineBtnVisible]= useState(false);
	const [ ignoreBtnVisible,setIgnoreBtnVisible ]=useState(false);
	const [ endBtnVisible,setEndBtnVisible ]=useState(false);
	// const { failed,setFailed } =useState(false);
    
	useEffect(() => {
		if (signalingState==='have-local-offer'){
			setCalling(true);
		}
		else if (signalingState==='have-remote-offer'){
			setRecievingCall(true);
		}

	},[signalingState]);
	useEffect(() => {
		if (calling){

			setAnswerBtnVisible(false);
			setDeclineBtnVisible(false);
			setIgnoreBtnVisible(false);
			setCancellBtnVisible(true);
			setCallBtnVisible(false);
			setEndBtnVisible(false);
		}
     
	},[calling]);

	useEffect(() => {
		if (recievingCall){
			setAnswerBtnVisible(true);
			setDeclineBtnVisible(true);
			setIgnoreBtnVisible(true);
    
			setCancellBtnVisible(false);
			setCallBtnVisible(false);
			setEndBtnVisible(false);
		}
	
    
	},[recievingCall]);
	useEffect(() => {
		if (connectionState==='connected'){
			setConnected(true);
		}
		else if (connectionState ==='connecting'){
			setConnecting(true);
		}
	},[connectionState]);
	useEffect(() => {
		if (connected){
			setAnswerBtnVisible(false);
			setDeclineBtnVisible(false);
			setIgnoreBtnVisible(false);
			setCancellBtnVisible(false);
			setCallBtnVisible(false);
			setEndBtnVisible(true);
		}
	},[connected]);
	useEffect(() => {
		if (iceConnectionState==='closed'  || iceConnectionState==='disconnected'){
			setCallEnded(true);
			setCalling(false);
			setRecievingCall(false);
			setConnected(false);
			setConnecting(false);
            
			setAnswerBtnVisible(false);
			setDeclineBtnVisible(false);
			setIgnoreBtnVisible(false);
			setCancellBtnVisible(false);
			setCallBtnVisible(true);
			setEndBtnVisible(false);
          
			
		}
	},[iceConnectionState]);

    
	return { uiState: { callEnded,calling,recievingCall, connected, connecting,callBtnVisible,answerBtnVisible,cancellBtnVisible,declineBtnVisible,ignoreBtnVisible, endBtnVisible } };
}
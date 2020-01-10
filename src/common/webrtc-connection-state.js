import React, {useEffect,useState} from 'react'
import StateTable from './state-table';
export default function RTCStateView ({state  }){
    const {signalingState,connectionState,iceConnectionState,iceGatheringState} =state
	const [rtcPeerConStates, setRtcPeerConStates]= useState([]);

	useEffect(() => {
		if (iceConnectionState==='closed'){
			setRtcPeerConStates([]);
		}
	},[iceConnectionState]);
	useEffect(() => {
	
		const newState ={
			signalingState: { state: signalingState,changed: false },
			connectionState: { state: connectionState,changed: true },
			iceGatheringState: { state: iceGatheringState,changed: false },
			iceConnectionState: { state: iceConnectionState,changed: false },
			timestamp: { time: new Date().toLocaleTimeString() }
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
		
	
	},[connectionState]);
    
	useEffect(() => {
		const newState ={
			signalingState: { state: signalingState,changed: false },
			connectionState: { state: connectionState,changed: false },
			iceGatheringState: { state: iceGatheringState,changed: false },
			iceConnectionState: { state: iceConnectionState,changed: true },
			timestamp: { time: new Date().toLocaleTimeString()  }
        
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
	},[iceConnectionState]);
	useEffect(() => {
		const newState ={
			signalingState: { state: signalingState,changed: false },
			connectionState: { state: connectionState,changed: false },
			iceGatheringState: { state: iceGatheringState,changed: true },
			iceConnectionState: { state: iceConnectionState,changed: false },
			timestamp: { time: new Date().toLocaleTimeString()   }
        
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
	},[iceGatheringState]);
	useEffect(() => {
		const newState ={
			signalingState: { state: signalingState,changed: true },
			connectionState: { state: connectionState,changed: false },
			iceGatheringState: { state: iceGatheringState,changed: false },
			iceConnectionState: { state: iceConnectionState,changed: false },
			timestamp: { time: new Date().toLocaleTimeString()   }
        
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
	},[signalingState]);

	return (
		<div style={{ height: 150 }}>
			<h3>RTCPeerConnection state</h3>
			<StateTable rtcPeerConStates={rtcPeerConStates} />
		</div>
		
	);
}
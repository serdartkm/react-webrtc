import React from 'react';
import WebRTCConnectionState from '../../common/webrtc-connection-state'

export default {
  title: 'WebRTCConnectionState',
};

const state ={
    signalingState:'',connectionState:'',iceConnectionState:'',iceGatheringState:''
}

export const webRTCConnectionState = () => <div style={{height:200}}><WebRTCConnectionState  state={state}/></div> 

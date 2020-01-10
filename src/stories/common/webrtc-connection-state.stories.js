import React from 'react';
import WebRTCConnectionState from '../../common/webrtc-connection-state'

export default {
  title: 'WebRTCConnectionState',
};

const state ={
    signalingState:'',connectionState:'',iceConnectionState:'',iceGatheringState:''
}

export const webRTCConnectionState = () => <WebRTCConnectionState  state={state}/>

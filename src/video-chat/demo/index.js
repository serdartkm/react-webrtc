/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './style.css';
import ConnectingToPusher from '../../signaling/pusher/ConnectingToPusher';
import Client from './Client';
import usePusher,{ getPusherConfig } from '../../signaling/pusher/usePusher';
export default function App () {


	const { currentUser: gon } = usePusher(getPusherConfig({ userId: 'gon' }));
	const { currentUser: kon } = usePusher(getPusherConfig({ userId: 'kon' }));


	if (gon && kon)

		return (<div>
			<h1 style={{ textAlign:'center' }}>WebRTC Video Chat sample</h1>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Client currentUser={gon} name="gon" target="kon" />
				<Client currentUser={kon} name="kon" target="gon"  />
			</div></div>);
	
	return <ConnectingToPusher />;
}

//master
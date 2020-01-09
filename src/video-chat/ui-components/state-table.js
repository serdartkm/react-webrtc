import React from 'react';
import   './style.css';

export default function StateTable ({ rtcPeerConStates }){
	return (
		<table className="zebra">
			<thead>
				<tr>
					<th>ConnectionState</th>
					<th>SignalingState</th>
					<th>iceGatheringState</th>
					<th>iceConnectionState</th>
					<th>Timestamp</th>
				</tr>
			</thead>
			<tbody>
				{rtcPeerConStates && rtcPeerConStates.map((s, i) => (<tr key={i}>
					<td style={{ backgroundColor: s.connectionState.changed===true ? 'orange' :'yellow' }}>{s.connectionState.state}</td>
					<td style={{ backgroundColor: s.signalingState.changed===true ? 'orange' :'yellow' }}>{s.signalingState.state}</td>
					<td style={{ backgroundColor: s.iceGatheringState.changed===true ? 'orange' :'yellow' }}>{s.iceGatheringState.state}</td>
					<td style={{ backgroundColor: s.iceConnectionState.changed===true ? 'orange' :'yellow' }}>{s.iceConnectionState.state}</td>
					<td>{s.timestamp.time}</td>
				</tr>))}
			
			
			</tbody>
		</table>
	);
}
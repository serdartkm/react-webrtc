import React,{ useEffect, useState }  from 'react';

const ProgressCircle = ({ selected }) => (
	<div style={{
		height: 6,
		width: 6,
		padding: 3,
		borderRadius: 50,
		margin: 4,
		textAlign: 'center',
		backgroundColor: selected ? '#2e7d32' : '#9fa8da'
	}}
	/>
);

export default function ProgressLoader ({ calling, recievingCall,target }) {
	const [selected,setSelected]= useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (calling){
				if (selected === 0) {
					setSelected(1);
				}
				else if (selected === 1) {
					setSelected(2);
				}
				else if (selected === 2) {
					setSelected(3);
				}
				else if (selected === 3) {
					setSelected(4);
				}
				else if (selected === 4) {
					setSelected(5);
				}
				else if (selected === 5) {
					setSelected(6);
				}
				else if (selected === 6) {
					setSelected(0);
				}
			}
			if (recievingCall){
				
				if (selected === 0) {
					setSelected(6);
				}
				else if (selected === 6) {
					setSelected(5);
				}
				else if (selected === 5) {
					setSelected(4);
				}
				else if (selected === 4) {
					setSelected(3);
				}
				else if (selected === 3) {
					setSelected(2);
				}
				else if (selected === 2) {
					setSelected(1);
				}
				else if (selected === 1) {
					setSelected(0);
				}
			}
		
		}, 100);
		return () => {
			clearInterval(interval);
		};
	},[selected,calling, recievingCall]);

	return (
		<div  style={{ display: 'flex',flexDirection: 'column',alignItems: 'center', alignContent: 'center' }}>
			<div>{calling && <div>Calling to ...{target}</div>}</div>
			<div>
				<ProgressCircle selected={selected === 6} />
				<ProgressCircle selected={selected === 5} />

				<ProgressCircle selected={selected === 4} />
				<ProgressCircle selected={selected === 3} />
				<ProgressCircle selected={selected === 2} />
				<ProgressCircle selected={selected === 1} />
				<ProgressCircle selected={selected === 0} />
			</div>
		
			<div>{recievingCall && <div>Recieving a call from ...{target}</div>}</div>
		</div>
		
	);
}



import React,{ useEffect, useState }  from 'react';
import './css/style.css'
const ProgressCircle = ({ selected }) => (
	<div style={{
		height: 2,
		width: 3,
		padding: 2,
		borderRadius: 25,
		margin: 3,
		textAlign: 'center',
		backgroundColor: selected ? '#5c6bc0' : '#e8eaf6'
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
		<div className="call-animation">
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



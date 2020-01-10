import React,{ useRef, useEffect }  from 'react';
import './css/style.css';
export default function DisplayMediaStream ({ mediaStream, width, height,style, name }) {
	const videoRef =useRef(null);


	useEffect(() => {
		if (mediaStream !==null){
			videoRef.current.srcObject =mediaStream;
		}
		else if (videoRef.current.srcObject && mediaStream===null){
			videoRef.current.srcObject.getTracks().forEach(t => t.stop());
			videoRef.current.srcObject=null;
		}
	},[mediaStream]);

	 if (mediaStream !==null){
		return (<div style={{ height: '100%', width: '100%', display: 'flex' ,justifyContent: 'center',position: 'relative' }}><video  width={width} autoPlay  ref={videoRef} /></div>);
	
	}
	return null;
	
}
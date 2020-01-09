/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import getlocalUserMedia from './getMediaStream';
export default function useLocalMediaStream (mediaStreamConstraints) {
	
	
	const [localMediaStream,setLocalMediaStream]= useState(null);

	const [error,setError]=useState(null);

	function getLocalMedia (){
		getlocalUserMedia(mediaStreamConstraints,(error,media) => {
			if (error){
				setError(error);
				
			}
			else {
				setLocalMediaStream(media);
				
			}
		});

	}
	function removeLocalMedia(){
		setLocalMediaStream(null);
	}
	
	return { error,localMediaStream,getLocalMedia, removeLocalMedia };

}
let mediaStream =null;

export default async  function getMediaStream (mediaStreamConstraints,cb){

	try {
       
		mediaStream =await  navigator.mediaDevices.getUserMedia(mediaStreamConstraints);
		cb(null,mediaStream);
	}
	catch (error) {
  
		cb(error,null);
	}


}
import  { useEffect, useState } from 'react';


export default function useFileAssembler ({fileChunk,fileInfo}){


    const [downloadProgress,setDownloadProgress]=useState(0);
    const [assembledFile,setAssembledFile]= useState(null);
    const [bytesRecieved,setBytesRecieved]= useState(0);
    const [incomingFileData,setIncomingFileData]= useState([]);

    useEffect(()=>{

        if(fileChunk){
            setIncomingFileData(prevState => [...prevState,fileChunk])
            setBytesRecieved(prevState => prevState + fileChunk.byteLength)
        }
    },[fileChunk])
    useEffect(()=>{
        if(bytesRecieved>0){
         
            let progress =((bytesRecieved * 100)/ fileInfo.size ).toFixed()
            setDownloadProgress(Number.parseInt(progress))
      
        }
     
        if(fileInfo && bytesRecieved=== fileInfo.size){
            debugger;
            setAssembledFile( new Blob(incomingFileData))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[bytesRecieved,fileInfo])

 

    return {downloadProgress,assembledFile}
}
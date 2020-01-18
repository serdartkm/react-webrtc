/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react';

export default function useFileAssembler ({fileChunk,fileInfo}){

    const [downloadProgress,setDownloadProgress]=useState(0);
    const [assembledFile,setAssembledFile]= useState(null);
    const [bytesRecieved,setBytesRecieved]= useState(0);
    const [incomingFileData,setIncomingFileData]= useState([]);

    // 1. After file chunk recieved push it to IncomingFileData
    useEffect(()=>{

        if(fileChunk){
            setIncomingFileData(prevState => [...prevState,fileChunk])
            let progress =(((bytesRecieved + fileChunk.byteLength)/ fileInfo.size)*100).toFixed()
            // let downloadProgress = (((bytesRecieved + e.data.byteLength) / incomingFileInfo.fileSize) * 100).toFixed()
             setDownloadProgress(Number.parseInt(progress))
        }
    },[fileChunk])
//2. After filechunk is inserted into incomingFileData increment bytesRecieved
useEffect(()=>{
    if(incomingFileData.length>0){
      
        setBytesRecieved(prevState => prevState + fileChunk.byteLength)
    }

},[incomingFileData])
 
//3.After bytesRecived increases set downloadProgress
useEffect(()=>{
    //4. if bytesRecieved equals to file size convert to Blob
    if(fileInfo && bytesRecieved=== fileInfo.size){
          const assembled =new Blob(incomingFileData, {type:fileInfo.type})
   
        setAssembledFile(assembled)
    }

},[bytesRecieved])



    return {downloadProgress,assembledFile}
}
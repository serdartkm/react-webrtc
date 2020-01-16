import React,{useState,useEffect} from 'react'


export default function useUIState ({state, file, readProgress, downloadProgress}){
    const {signalingState} = state
    const [sendingFile,setSendingFile]= useState(false);
    const [recievingFile,setRecievingFile]= useState(false);
    const [fileSelected,setFileSelected]= useState(false);
    const [remoteOfferRecieved,setRemoteOfferRecived]= useState(false);
    const [sendingComplete,setSendingComplete]= useState(false);
    const [recievingComplete,setRecievingComplete]= useState(false);

useEffect(()=>{
if(file){
    setFileSelected(true);
}
else{
    setFileSelected(false);
}
},[file])

useEffect(()=>{
    if(signalingState==='have-remote-offer'){
        setRemoteOfferRecived(true)
    }
},[signalingState])

useEffect(()=>{
  
    if(readProgress>0){
       
        setSendingFile(true);
    }
    if(readProgress===100){
       setSendingComplete(true);
       setSendingFile(false);
    }
},[readProgress])

useEffect(()=>{
    if(downloadProgress>0){
    setRecievingFile(true);
    }

    if(downloadProgress===100){
        setRecievingFile(false);
        setRecievingComplete(true);
       
    }
},[downloadProgress])

    return {uiState:{sendingFile,recievingFile,fileSelected, remoteOfferRecieved,sendingComplete,recievingComplete}}
}
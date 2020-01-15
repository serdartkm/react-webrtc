import React from 'react'
import FileTransferView from '../../file-transfer/ui-components/file-transfer-view'

const style ={
    root:{
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
}

export default {
    title:'FileTransferView'
}



export const defaultState =()=>{
    return <div style={style.root}><FileTransferView uiState ={{recievingComplete:false, sendingComplete:false, fileSelected:false,connectionState:'',signalingState:''}}/></div> 
}

export const fileSelected =()=>{
    return <div style={style.root}><FileTransferView uiState ={{ recievingComplete:false, sendingComplete:false,fileSelected:true,connectionState:'',signalingState:''}}/></div> 
}

export const fileOfferRecieved =()=>{
    return <div style={style.root}><FileTransferView uiState ={{recievingComplete:false, sendingComplete:false,remoteOfferRecieved:true,fileSelected:false,connectionState:'connected',signalingState:''}}/></div> 
}

export const sendingFile =()=>{
    return <div style={style.root}><FileTransferView uiState ={{recievingComplete:false, sendingComplete:false,recievingFile:false,sendingFile:true ,remoteOfferRecieved:false,fileSelected:false,connectionState:'connected',signalingState:''}}/></div> 
}

export const recievingFile =()=>{
    return <div style={style.root}><FileTransferView uiState ={{downloadProgress:50 ,recievingFile:true,recievingComplete:false, sendingComplete:false,sendingFile:false,remoteOfferRecieved:false,fileSelected:false,connectionState:'connected',signalingState:''}}/></div> 
}

export const recievingComplete =()=>{
    return <div style={style.root}><FileTransferView uiState ={{ recievingComplete:true, sendingComplete:false, recievingFile:false,sendingFile:false,remoteOfferRecieved:false,fileSelected:false,connectionState:'connected',signalingState:''}}/></div> 
}

export const sendlingComplete =()=>{
    return <div style={style.root}><FileTransferView uiState ={{sendingComplete:true, recievingFile:false,sendingFile:false,remoteOfferRecieved:false,fileSelected:false,connectionState:'connected',signalingState:''}}/></div> 
}
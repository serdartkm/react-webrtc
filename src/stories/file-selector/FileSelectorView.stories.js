import React from 'react'
import FileSelectorView from '../../file-reader/ui-components/file-selector-view'
import FileInfo from '../../file-reader/ui-components/file-info-view'

const style ={
    root:{
        height:'100vh',
        display:'flex',
        flexDirection:'column'

    }
}

export default {
    title: 'FileSelectorView'
}


export const initialState =()=>{

    return <div style ={style.root}><FileSelectorView /></div> 

}

export const withFileInfo =()=>{

    return <div style ={style.root}>
        
        <FileSelectorView />
        <FileInfo />
        </div> 

}
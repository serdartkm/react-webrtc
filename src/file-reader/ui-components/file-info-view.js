import React from 'react';
import './css/style.css'
export default function SelectedFileInfo ({files}){
    debugger
return <div className="file-info-table">
    <div className="file-info-header">
        <div className="file-info-col">File Name</div>
        <div className="file-info-col">File Size</div>
        <div className="file-info-col">File Type</div>
    </div>
    {files && files.map((f,i)=> 
    
(<div className="file-info-row" key={i}>
    
    <div className="file-info-col" >{f.name}</div>
    <div className="file-info-col" >{f.size}</div>
    <div className="file-info-col" >{f.type}</div>
    </div>))}</div>
}
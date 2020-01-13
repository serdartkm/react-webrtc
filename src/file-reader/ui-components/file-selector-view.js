import React, {useRef} from  'react'

import './css/style.css'
export default function FileSelectorView ({handleFileChange}){

    const fileInputRef = useRef(null);


    function handleFileSelection(){
 if(fileInputRef.current){
     fileInputRef.current.click();
 }
    }

    return <div className="file-selector">
        <input onChange={handleFileChange} type='file' id="fileElem" ref={fileInputRef}/>
        <button onClick={handleFileSelection}>Select File</button>
    </div>
}
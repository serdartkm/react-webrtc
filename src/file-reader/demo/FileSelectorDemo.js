import React, {useState} from 'react'
import FileInfoView from '../ui-components/file-info-view'
import FileSelectorView from '../ui-components/file-selector-view'
import './css/style.css'
export default function FileSelectorDemo (){

    const [files,setFiles]= useState([]);

    function handleFileChange (e){
        debugger
        setFiles([...e.target.files])
    }


    return (
        <div className="file-selector-demo">
            <FileSelectorView handleFileChange={handleFileChange} />
            <FileInfoView files={files} />
        </div>
    )
}

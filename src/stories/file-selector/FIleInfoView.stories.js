import React from 'react'
import FileInfoView from '../../file-reader/ui-components/file-info-view';
export default {
    title :'FileInfoView'
}


export const fileInfoView =()=>{
    return <FileInfoView files={[{size:'10MB',name:"MyImage",type:'JPEG'}]} />
}
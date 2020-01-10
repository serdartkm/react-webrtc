import React from 'react'
import Client from './Client';
export default function Demo ({title}){
    return <div className="root">
<h1 className="demo-title">{title}</h1>
        <div className="demo">
        <Client />
        <Client />
        </div>
    
    </div>
}
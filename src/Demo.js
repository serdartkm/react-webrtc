import React from 'react'
import Client from './Client';
import usePusher,{ getPusherConfig } from '.';
import ErrorMessage from './ErrorMessage'
export default function Demo ({title}){
    const { currentUser: gon , error:gonError } = usePusher(getPusherConfig({ userId: 'gon' }));
    const { currentUser: kon, error:konError } = usePusher(getPusherConfig({ userId: 'kon' }));
    
    if(gonError){
        return <ErrorMessage error ={gonError}/>
    }
    else if (konError){
        return <ErrorMessage error ={konError} />
    }

    else if (gon && kon){
        return <div className="root">
        <h1 className="demo-title">{title}</h1>
                <div className="demo">
                <Client currentUser={gon} name="gon" target="kon" />
                <Client currentUser={kon} name="kon" target="gon" />
                </div>
            </div>
    }
    return <ErrorMessage error ={{message:"Unexpected error"}} />

  
}
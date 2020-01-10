import React from 'react'
import Client from './Client';
import usePusher,{ getPusherConfig } from './signaling/pusher/usePusher';
import ErrorMessage from './ErrorMessage'
export default function Demo ({title, clientOneName,clientTwoName}){
    const { currentUser: clientOne , error:clientOneError } = usePusher(getPusherConfig({ userId: clientOneName }));
    const { currentUser: clientTwo, error:clientTwoError } = usePusher(getPusherConfig({ userId: clientTwoName }));
    
    if(clientOneError){
        return <ErrorMessage error ={clientOneError}/>
    }
    else if (clientTwoError){
        return <ErrorMessage error ={clientTwoError} />
    }

    else if (clientOne && clientTwo){
        return <div className="root">
        <h1 className="demo-title">{title}</h1>
                <div className="demo">
                <Client currentUser={clientOne} name={clientOneName} target={clientTwoName} />
                <Client currentUser={clientTwo} name={clientTwoName} target={clientOneName} />
                </div>
            </div>
    }
    return <div className="loading"><h2>Loading...</h2></div>

  
}
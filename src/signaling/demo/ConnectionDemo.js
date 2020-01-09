import React from 'react';
import usePusher,{getPusherConfig} from '../pusher/usePusher' 
import ConnectingToPusher from '../pusher/ConnectingToPusher'
import './style.scss'
export default function ConnectionDemo (){

    const {currentUser,pusherError,connecting}= usePusher (getPusherConfig({userId:'signaler'}))

    if(pusherError){
    return <div>Pusher error:{pusherError.message}</div>
    }
    else if(connecting){
        return <ConnectingToPusher />
    }
    else if(currentUser){
        return <div className="connected">Connected to pusher as {currentUser.id}</div>
    }

return <div >Something went wrong !</div>
}
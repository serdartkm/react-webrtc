import React,{useState,useEffect} from 'react';
import './style.css';
export default function TextChatView ({ remoteMessage,sendMessage, state, initiateOffer, connected }){
	const { connectionState }=state;
	const [message,setMessage] =useState('');
	const [messages,setMessages]= useState([]);
	const [ready,setReady]=useState(false);
	useEffect(() => {
		if (remoteMessage){
			debugger
			setMessages(prev => [...prev,remoteMessage]);
		}
	},[remoteMessage]);

	useEffect(() => {
		if (message){
			if (message.length>0 && connectionState==='connected'){
				setReady(true);
			}
			else {
				setReady(false);
			}
		}
	},[message,state]);
	function handleChange (e) {
		setMessage(e.target.value);
	}

  function handleSendMessage(){
	  sendMessage(message)
	  setMessage('');
  }
	return (<div className="root">
		<div className="message-container">{messages && messages.map((m, i) => <div key={i} className="message">{m.sender}: {m.message}</div>)}</div>
		<div className="controls">
			<input onFocus={initiateOffer} onChange={handleChange} value={message} type="text" placeholder="Enter message" />
			<button disabled={!ready} onClick={handleSendMessage}>Send</button>
		</div>
	</div>);
    
}
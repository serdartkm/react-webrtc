import { useState, useEffect } from 'preact/hooks';

export default function PusherSignaling({ currentUser, roomId, target,name,closed }) {
	const [message, setMessage] = useState(null);
	const [error,setError]=useState(null);
	const [partialMessage,setPartialMessage]= useState(null);
	const [messages,setMessages]= useState([]);
	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: m => {
						const msg =JSON.parse(m.parts[0].payload.content);
						
						if (msg.target ===name){
							if (msg.type==='offer' || msg.type==='answer'){
								setPartialMessage(msg);
							}
							else {
								setMessage(msg.msg);
							
								if (msg.msg.type ==='end' || msg.msg.type==='cancel'){
									setMessages([]);
									setPartialMessage(null);
									setError(null);
								
								debugger;
								}
							
							}
						}
					}
				},
				messageLimit: 0
			});
		}
	}, [currentUser]);

	useEffect(() => {
		if (partialMessage){
		
			if (messages.length===0){
				setMessages([partialMessage]);
			
			}
			else if (messages.length>0) {
				const msg =messages.find( element => element.id===partialMessage.id);
				let fullContent =null;
			
				if (msg === undefined){
					setMessages([partialMessage]);
				
				}
				else
				if (msg && msg.order==='first'){
					fullContent =  msg.content+partialMessage.content;
					setMessage({ sdp: JSON.parse(fullContent), type: msg.type });
					setMessages(prev => [...prev.filter(e => e.id ===partialMessage.id)]) ;
				}
				else if (msg && msg.order==='second') {
					fullContent =  partialMessage.content+msg.content;
					setMessage({ sdp: JSON.parse(fullContent), type: msg.type });
					setMessages(prev => [...prev.filter(e => e.id ===partialMessage.id)]) ;
				}
				//	console.log('fullContent', fullContent);
				
			}
		}
	},[partialMessage]);

	function sendMessage(msg) {

		if (msg !== null && msg !== undefined && (msg.type ==='offer' || msg.type==='answer')) {
		
			
			const fullContent = JSON.stringify(msg);
			const id = new Date().getTime();
			const fisrtPart = { content: fullContent.substring(0,(fullContent.length /2)), id, order: 'first', target,name, type: msg.type };
			const secondPart ={ content: fullContent.substring((fullContent.length/2)), id,order: 'second',target,name, type: msg.type };

	
			currentUser
				.sendSimpleMessage({
					text: JSON.stringify( fisrtPart),
					roomId: currentUser.rooms[0].id
				})
				.then(response => currentUser.sendSimpleMessage({
					text: JSON.stringify( secondPart),
					roomId: currentUser.rooms[0].id
				})
				)
				.catch(e => {
					setError(e);
					// eslint-disable-next-line no-debugger
					debugger;
				});
		}
		else {
	
			currentUser
				.sendSimpleMessage({
					text: JSON.stringify({ msg,target,name }),
					roomId: currentUser.rooms[0].id
				})
				.then(() => {
					if (msg.type==='end'){
						setMessages([]);
						setPartialMessage(null);
						setError(null);
					
					}
				})
				.catch(e => {
					setError(e);
					// eslint-disable-next-line no-debugger
					debugger;
				});
		}
		
	}

	return { message, sendMessage,error };
	
}

import React from 'react';
import TextChatView from '../../text-chat/ui-components/TextChatView';
export default {
  title: 'TextChatView',
};

const readyState={
    connectionState: 'connected'
};

export function ready (){

	return <TextChatView state={readyState} messageRecieved={{ sender: 'Dan', message: 'hello' }} />;
}

export function preparing (){

	return <TextChatView state={readyState} messageRecieved={{ sender: 'Dan', message: 'hello' }} />;
}
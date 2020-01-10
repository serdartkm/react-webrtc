import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import TextChatDemo from './text-chat/demo/TextChatDemo'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TextChatDemo />, document.getElementById('root'));
=======
import Demo from './Demo'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Demo title="Demo Title" />, document.getElementById('root'));
>>>>>>> demo

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

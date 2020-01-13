import React from "react";

export default function FileTransferView({handleSendMessage}) {
    function sendMessage (){
        handleSendMessage('file-offer')
    }
    
  return (
    <div>
      <button onClick={sendMessage}>Send File</button>
    </div>
  );
}

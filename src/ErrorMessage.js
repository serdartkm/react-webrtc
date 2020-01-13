import React from 'react'
import './css/style.css'
export default function ErrorMessage ({error}){

return <div className="error-message-contaner"> <h2 className="error-message">{error && error.message}</h2></div>
}
import React from 'react'
import './ChatBot.css'

const ChatBot = () => {
  return (
    <div className='chatbot'>
      <div className="chatbot-top">
        Chat with our Bot
      </div>
      <div className="chatbot-middle">
        <p>Message1</p>
        <p>Message2</p>
      </div>
      <div className="chatbot-bottom">
        <form>
          <input type="text" placeholder='type your query' />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatBot

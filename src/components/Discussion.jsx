import React, { useState } from 'react';
import '../styles/discussion.css';

const Discussion = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="discussion">
      <h2>Обговорення</h2>
      
      <div className="messages">
        {messages.length === 0 ? (
          <p>Немає повідомлень, будьте першим!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <p>{msg}</p>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleMessageSubmit}>
        <textarea 
          value={newMessage} 
          onChange={handleMessageChange} 
          placeholder="Напишіть ваше повідомлення..."
        />
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
};

export default Discussion;
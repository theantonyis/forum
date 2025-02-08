import React, { useState, useEffect } from 'react';
import "../styles/discussion.css"

const Discussion = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState(''); // You can set a static username or get it dynamically

    return (
        <div className="discussion">
            <h2>Обговорення</h2>
            <div className="messages">
                {messages.length === 0 ? (
                    <p>Немає повідомлень, будьте першим!</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="message">
                            <p><strong>{msg.author}</strong>: {msg.content}</p>
                            <small>{new Date(msg.timestamp).toLocaleString()}</small>
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
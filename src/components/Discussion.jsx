import React, { useState, useEffect } from 'react';

const Discussion = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState(''); // You can set a static username or get it dynamically

    // Fetch messages from the backend
    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Handle message input change
    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    // Handle message submission
    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        if (newMessage.trim()) {
            try {
                const response = await fetch('http://localhost:5000/api/addMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: newMessage,
                        author,
                    }),
                });

                if (response.ok) {
                    // Reset message input field
                    setNewMessage('');
                    // Fetch updated messages from the server
                    await fetchMessages();
                } else {
                    console.error('Failed to add message');
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        // Fetch messages on component mount
        fetchMessages();
    }, []);

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

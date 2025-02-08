import React, { useState, useEffect } from 'react';
import "../styles/discussion.css"

<<<<<<< HEAD
const Discussion = (discussions) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createDiscussion({ title, content });
        setTitle('');
        setContent('');
    };
=======
const Discussion = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState(''); // You can set a static username or get it dynamically
>>>>>>> 568d8ebb4142ed295f1f85bae4333b93c6b30e4b

    return (
        <div className="discussion">
            <h2>Обговорення</h2>
            <ul id="discussionsList">
                {/*{discussions.map((discussion, index) => (
                    <li key={index}>
                        <h3>{discussion.title}</h3>
                        <p>{discussion.content}</p>
                    </li>
                ))}*/}
            </ul>

            <form id="createDiscussionForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    id="content"
                    placeholder="Текст обговорення"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Створити обговорення</button>
            </form>
        </div>
    );
};

export default Discussion;
import React, { useState, useEffect } from 'react';
import "../styles/discussion.css"

const Discussion = (discussions) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createDiscussion({ title, content });
        setTitle('');
        setContent('');
    };

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
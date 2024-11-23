import React, { useState } from 'react';

const DiscussionForm = ({ createDiscussion }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createDiscussion({ title, content });
        setTitle('');
        setContent('');
    };

    return (
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
    );
};

export default DiscussionForm;

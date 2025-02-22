import React, { useState } from 'react';
import "../styles/discussion.css"

const Discussion = () => {
    // Стан для заголовка та контенту форми
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Стан для списку обговорень
    const [discussions, setDiscussions] = useState([]);

    // Функція для обробки форми і додавання нового обговорення
    const handleSubmit = (e) => {
        e.preventDefault();

        // Додаємо нове обговорення в список
        setDiscussions([
            ...discussions,
            { title, content }
        ]);

        // Очищаємо форму після відправки
        setTitle('');
        setContent('');
    };

    return (
        <div className="discussion">
            <h2>Обговорення</h2>

            {/* Виведення всіх обговорень */}
            <ul id="discussionsList">
                {discussions.map((discussion, index) => (
                    <li key={index}>
                        <h3>{discussion.title}</h3>
                        <p>{discussion.content}</p>
                    </li>
                ))}
            </ul>

            {/* Форма для створення нового обговорення */}
            <form id="createDiscussionForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Оновлення заголовка
                    required
                />
                <textarea
                    id="content"
                    placeholder="Текст обговорення"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Оновлення контенту
                    required
                ></textarea>
                <button type="submit">Створити обговорення</button>
            </form>
        </div>
    );
};

export default Discussion;
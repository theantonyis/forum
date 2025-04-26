import React, { useState } from 'react';
import "@/styles/discussion.css"

const CreateDiscussion = () => {
    // Стан для заголовка та контенту форми
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [discussions, setDiscussions] = useState([]);
    const [username, setUsername] = useState(''); // You can get this from session/context or props


    // Функція для обробки форми і додавання нового обговорення
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        console.log('Token:', token);

        if (!token) {
            alert('You must be logged in to create a discussion');
            return;
        }

        const newDiscussion = { content, title, username };

        try {
            // Make the POST request to the /api/addDiss route
            const response = await fetch('/api/addDiss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: 'New discussion', title: 'CreateDiscussion Title' }),
            });

            if (response.ok) {
                // If the request is successful, update the list of discussions
                const createdDiscussion = await response.json();
                setDiscussions([...discussions, createdDiscussion]);
            } else {
                console.error('Failed to add discussion');
            }

            // Clear the form after submission
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error submitting discussion:', error);
        }
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

export default CreateDiscussion;
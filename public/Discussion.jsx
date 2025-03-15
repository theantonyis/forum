import React, { useState, useEffect } from 'react';
import "../styles/discussion.css"

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]);

    // Завантаження даних при монтуванні компонента
    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await fetch('/api/getDiscussions');
                const data = await response.json();
                setDiscussions(data); // Припускаємо, що сервер повертає список обговорень
            } catch (error) {
                console.error('Помилка при завантаженні обговорень:', error);
            }
        };

        fetchDiscussions();
    }, []);

    return (
        <div className="discussion-list">
            <h2>Обговорення</h2>

            {/* Виведення всіх обговорень */}
            <ul id="discussionsList">
                {discussions.map((discussion, index) => (
                    <li key={index} className="discussion-item">
                        <p className="username">{discussion.username}</p>
                        <h3>{discussion.title}</h3>
                        <p>{discussion.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DiscussionList;

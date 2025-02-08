import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Компонент для окремого повідомлення
const Message = ({ message }) => {
  return (
    <div className="message">
      <p>{message.content}</p>
      <small>{message.author}</small>
    </div>
  );
};

// Компонент для обговорення в окремій темі
const Thread = ({ thread }) => {
  const [messageContent, setMessageContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageContent.trim()) {
      thread.messages.push({
        content: messageContent,
        author: "Guest",
      });
      setMessageContent(""); // Очистити поле
    }
  };

  return (
    <div className="thread">
      <h2>{thread.title}</h2>
      <div className="messages">
        {thread.messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Напишіть ваше повідомлення"
        />
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
};

// Компонент для створення нової теми
const NewThreadForm = ({ addThread }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addThread({ title, messages: [] });
      setTitle(""); // Очистити поле
    }
  };

  return (
    <div className="new-thread-form">
      <h3>Створити нову тему</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок теми"
        />
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

// Компонент для хедера з кнопкою виходу
const Header = () => {
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = 'token=; Max-Age=0';

    // Redirect to the login page using navigate()
    navigate('/login');

    // Log a message for debugging purposes
    console.log("Logged out");
  };

  return (
    <header className="header">
      <h1>Forum</h1>
      <button className="link" id="logout" onClick={handleLogout}>Logout</button>
    </header>
  );
};

// Основний компонент форуму
const Forum = () => {
  const [threads, setThreads] = useState([]);

  const addThread = (newThread) => {
    setThreads([...threads, newThread]);
  };

  return (
    <div className="forum">
      <Header /> {/* Додаємо компонент Header */}
      
      <NewThreadForm addThread={addThread} />

      <div className="threads">
        {threads.length > 0 ? (
          threads.map((thread, index) => (
            <Thread key={index} thread={thread} />
          ))
        ) : (
          <p>Немає створених тем.</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
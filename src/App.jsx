import React, { useState } from 'react';
import Header from './components/Header';
import DiscussionForm from './components/DiscussionForm';
import DiscussionsList from './components/DiscussionsList';

const App = () => {
    const [discussions, setDiscussions] = useState([]);

    const createDiscussion = (newDiscussion) => {
        setDiscussions([...discussions, newDiscussion]);
    };

    return (
        <main>
            <Header />
            <h2>Список обговорень</h2>
            <DiscussionsList discussions={discussions} />

            <h2>Створити нове обговорення</h2>
            <DiscussionForm createDiscussion={createDiscussion} />
        </main>
    );
};

export default App;

import React from 'react';

const DiscussionsList = ({ discussions }) => {
    return (
        <ul id="discussionsList">
            {discussions.map((discussion, index) => (
                <li key={index}>
                    <h3>{discussion.title}</h3>
                    <p>{discussion.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default DiscussionsList;

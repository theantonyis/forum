import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DiscussionPage() {
    const router = useRouter();
    const { id } = router.query;
    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/discussions/${id}`)
                .then(res => setDiscussion(res.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    if (!discussion) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{discussion.title}</h1>
            <p className="mb-4">{discussion.description}</p>
            <p className="text-sm text-gray-500">Author: {discussion.author?.username}</p>
        </div>
    );
}
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DiscussionPage() {
    const router = useRouter();
    const { id } = router.query;
    const [discussion, setDiscussion] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/discussions/${id}`)
                .then(res => {
                    setDiscussion(res.data);
                    setComments(res.data.comments || []);
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleCommentSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/discussions/${id}/comments`, { content: comment });
            setComments([...comments, res.data]);
            setComment('');
        } catch (err) {
            console.error('Failed to post comment:', err);
        }
    };

    if (!discussion) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{discussion.title}</h1>
            <p className="mb-4">{discussion.description}</p>
            <p className="text-sm text-gray-500 mb-6">Author: {discussion.author?.username}</p>

            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleCommentSubmit}
                >
                    Submit Comment
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                {comments.map((c, index) => (
                    <div key={index} className="mb-2 border-b pb-2">
                        <p>{c.content}</p>
                        <p className="text-xs text-gray-500">by {c.author?.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewDiscussion() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch('http://localhost:5000/api/discussions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                router.push('/');
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Failed to create discussion');
            }
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Discussion</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="border w-full p-2"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="border w-full p-2"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create</button>
            </form>
        </div>
    );
}
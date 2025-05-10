import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/discussions')
            .then(res => setDiscussions(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Discussions</h1>
            <ul>
                {discussions.map((d) => (
                    <li key={d._id} className="border-b py-2">
                        <Link href={`/discussion/${d._id}`} className="text-blue-600 hover:underline">
                            {d.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
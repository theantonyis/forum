import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader2, MessageCircle } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Discussions() {
    const router = useRouter();
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchDiscussions = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/discussions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDiscussions(response.data);
                setError("");
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load discussions. Please try again."
                );
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("authToken");
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussions();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
                <MessageCircle className="w-14 h-14 text-red-500 mb-4" />
                <p className="mb-6 text-lg font-semibold text-red-600">{error}</p>
                <Button onClick={() => router.reload()}>Retry</Button>
            </div>
        );
    }

    if (discussions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
                <MessageCircle className="w-14 h-14 text-gray-400 mb-4" />
                <h2 className="mb-2 text-2xl font-semibold">No discussions yet</h2>
                <p className="mb-6 text-gray-500">Be the first to start a new discussion!</p>
                <Link href="/new-discussion" passHref legacyBehavior>
                    <Button as="a">New Discussion</Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="mb-8 text-4xl font-bold text-center">Discussions</h1>

            <ScrollArea className="h-[600px] rounded-lg border border-gray-200">
                <div className="space-y-4 p-4">
                    {discussions.map(({ _id, title, description, createdAt }) => (
                        <Card
                            key={_id}
                            className="cursor-pointer hover:bg-blue-50 transition"
                            onClick={() => router.push(`/discussion/${_id}`)}
                        >
                            <CardHeader>
                                <CardTitle className="text-blue-700">{title}</CardTitle>
                                {description && (
                                    <CardDescription className="line-clamp-2">
                                        {description}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <time
                                    dateTime={createdAt}
                                    className="text-sm text-gray-500"
                                >
                                    Created on {new Date(createdAt).toLocaleDateString()}
                                </time>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </main>
    );
}

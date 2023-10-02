"use client";
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const [submitting, setsubmitting] = useState(false);
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [post, setPost] = useState({ prompt: "", tag: "", });

    const UpdatePrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true);

        if (!promptId) return alert("Prompt id not Found")

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if (res.ok) {
                router.push('/');
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            setsubmitting(false)
        }
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    
    return (
        <Form
            type="edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={UpdatePrompt}
        />
    )
}

export default EditPrompt
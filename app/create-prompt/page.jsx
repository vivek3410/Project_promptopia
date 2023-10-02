"use client";
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const CreatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
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
  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={CreatePrompt}
    />
  )
}

export default CreatePrompt
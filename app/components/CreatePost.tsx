import React, { useState } from 'react';
import { Card, Button } from '@tremor/react';

async function createPost(postData: any, accessToken: any) {
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(postData)
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Post created:', data);
      return { success: true, data };
    } else {
      return { success: false, error: data.message || 'Failed to create post' };
    }
  } catch (error: any) {
    console.error('Error creating post:', error);
    return {
      success: false,
      error: error.message || 'Failed to create post due to an exception'
    };
  }
}

const CreatePost = ({ session }: any) => {
  const [postData, setPostData] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await createPost(postData, session.accessToken);
    setIsSubmitting(false);

    if (result.success) {
      setPostData({ title: '', content: '' });
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Create Post
        </Button>
      </form>
    </Card>
  );
};

export default CreatePost;

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
    <Card className="bg-white shadow-lg rounded-lg p-6 my-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Create Post
        </Button>
      </form>
    </Card>
  );
};

export default CreatePost;

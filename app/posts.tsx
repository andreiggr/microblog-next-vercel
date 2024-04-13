'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button, Card, Title } from '@tremor/react';

const Posts = () => {
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState(0); // Pagination state
  const pageSize = 10;
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPosts() {
      if (session) {
        const offset = page * pageSize;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/posts?limit=${pageSize}&offset=${offset}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts.');
        }
      }
    }

    fetchPosts();
  }, [page, session]);

  const handleUserPage = (user: string) => {
    //go to user page to see posts
  };

  return (
    <div>
      <Title>{posts?.totalCount} Total Posts</Title>
      <Button onClick={() => handleUserPage(session?.user?.name as string)}>
        My posts
      </Button>

      {posts?.items?.length > 0 &&
        posts?.items.map((post: any, index: number) => (
          <Card key={index}>
            <Title>{post.title}</Title>
            <p>{post.content}</p>
            <Button
              onClick={() => handleUserPage(post.author.firstName as string)}
            >
              Created by: {post.author.firstName} at {post.author.created}
            </Button>
          </Card>
        ))}
      <Button onClick={() => setPage((prev) => Math.max(0, prev - 1))}>
        Previous
      </Button>
      <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
    </div>
  );
};

export default Posts;

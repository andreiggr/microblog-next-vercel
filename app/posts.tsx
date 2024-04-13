'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { PostsListing } from './components';

const Posts = () => {
  const [posts, setPosts] = useState<any>({});
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const { data: session } = useSession();
  const router = useRouter();

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
          const res = await response.json();
          setPosts(res);
        } else {
          console.error('Failed to fetch posts.');
        }
      }
    }

    fetchPosts();
  }, [page, session]);

  const handleUserPage = (user: number) => {
    router.push(`/user/${user}`);
  };

  return (
    <>
      <Button
        onClick={() => handleUserPage(session?.user?.id as number)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        My posts
      </Button>

      <PostsListing
        data={posts}
        changePage={setPage}
        page={page}
        pageSize={pageSize}
      />
    </>
  );
};

export default Posts;

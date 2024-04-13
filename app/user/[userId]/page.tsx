'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from '@tremor/react';
import { useSession } from 'next-auth/react';
import { CreatePost, PostsListing } from '../../components';

async function fetchUserPosts(
  userId: string,
  token: string,
  pageSize: number,
  offset: number
) {
  if (userId) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/posts?limit=${pageSize}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch user posts');
      return [];
    }
  }
}

const UserPostsPage = () => {
  const path = usePathname();
  const [posts, setPosts] = useState<any>('');
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const { data: session } = useSession();

  const pathSegments = path.split('/');
  const userIdFromPath: any = pathSegments[2];

  const isSessionUserPage =
    session?.user?.id && userIdFromPath && session?.user?.id === userIdFromPath;

  useEffect(() => {
    const fetchPosts = async () => {
      if (userIdFromPath && session?.accessToken) {
        const offset = page * pageSize;

        const data = await fetchUserPosts(
          userIdFromPath,
          session.accessToken,
          pageSize,
          offset
        );
        setPosts(data);
      }
    };

    fetchPosts();
  }, [userIdFromPath, session, page, pageSize]);

  return (
    <div>
      <Title>Posts by User: {userIdFromPath}</Title>
      {isSessionUserPage && <CreatePost session={session} />}
      {posts ? (
        <PostsListing
          data={posts}
          changePage={setPage}
          page={page}
          pageSize={pageSize}
        />
      ) : (
        'No posts yet'
      )}
    </div>
  );
};

export default UserPostsPage;

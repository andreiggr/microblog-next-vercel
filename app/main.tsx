'use client';
import { Card, Title, Button } from '@tremor/react';
import { signIn, useSession } from 'next-auth/react';
import Posts from './posts';

const Main = () => {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn();
  };
  return (
    <>
      {session ? (
        <>
          <Title>
            Hello <strong>{session.user?.name}</strong>
          </Title>
          <Card className="mt-6">
            <Posts />
          </Card>
        </>
      ) : (
        <Card className="mt-6">
          <Button onClick={handleLogin}>Login to see posts</Button>
        </Card>
      )}
    </>
  );
};

export default Main;

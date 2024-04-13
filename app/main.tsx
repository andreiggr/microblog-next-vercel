'use client';
import { Card, Title, Button } from '@tremor/react';
import { signIn, useSession } from 'next-auth/react';

const Main = () => {
  const { data: session } = useSession()
  
  const handleLogin = () => {
    signIn();
  };
  return (
    <>
      <Title>Hello</Title>
      {session ? (
        <Card className="mt-6">
          {/* <Posts /> */}
          will be posts listing
        </Card>
      ) : (
        <Card className="mt-6">
          <Button onClick={handleLogin}>Login to see posts</Button>
        </Card>
      )}
    </>
  );
};

export default Main;

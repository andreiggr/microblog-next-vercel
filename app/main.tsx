'use client';
import { Card, Title, Button } from '@tremor/react';
import { signIn, useSession } from 'next-auth/react';
import Posts from './posts';
import { useRouter } from 'next/navigation';

const Main = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    signIn();
  };

  const handleRegister = () => {
    router.push('/register');
  };
  return (
    <>
      {session ? (
        <>
          <Title className="text-2xl font-semibold text-gray-800">
            Hello <strong>{session.user?.name}</strong>
          </Title>
          <Card className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <Posts />
          </Card>
        </>
      ) : (
        <Card className="mt-6 max-w-xs">
          <div className="flex flex-col">
            <Button className="max-w-xs" onClick={handleLogin}>
              Login to see posts
            </Button>
            <Button className="mt-6 max-w-xs" onClick={handleRegister}>
              Register
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default Main;

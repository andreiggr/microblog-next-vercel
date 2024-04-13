import Main from './main';


declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: number;
      name: string;
    };
  }
}

function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Main />
    </main>
  );
}

export default IndexPage;

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const username = credentials?.username ?? '';
        const password = credentials?.password ?? '';

        if (!username || !password) {
          throw new Error('Username and password are required');
        }

        const authUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users/auth`;
        try {
          const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          });

          const user = await response.json();

          if (response.ok) {
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.username,
              accessToken: user.accessToken
            };
          } else {
            throw new Error(user.message || 'Authentication failed');
          }
        } catch (error: any) {
          console.error('Login error:', error);
          throw new Error(error.message || 'There was an error logging in');
        }
      },
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // error: '/auth/error' //  TODO: a custom error page
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    }
  }
});

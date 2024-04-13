import './globals.css';

// import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import SessionWrapper from './sessionWrapper';

export const metadata = {
  title: 'Microblog',
  description: 'Microblog'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en" className="h-full bg-gray-50">
        <body className="h-full">
          <Suspense>
            <Nav />
          </Suspense>
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}

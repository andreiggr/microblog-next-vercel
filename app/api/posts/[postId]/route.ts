import { NextResponse } from 'next/server';

export async function DELETE(req: any) {
  const postId = req.nextUrl.pathname.split('/').pop();
  const authToken = req.headers.get('authorization');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: authToken
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return new NextResponse(JSON.stringify(errorData), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error during DELETE operation:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

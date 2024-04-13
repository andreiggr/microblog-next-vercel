import { NextResponse } from 'next/server';

export async function POST(req: any) {
  try {
    const authToken = req.headers.get('authorization');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken
      },
      body: await req.text()
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new NextResponse(JSON.stringify(errorData), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error during POST operation:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

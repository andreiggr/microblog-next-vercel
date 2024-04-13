import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(await req.json())
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error during fetch operation:', error);
    return NextResponse.json(
      { errors: [{ detail: 'Internal server error' }] },
      { status: 500 }
    );
  }
}

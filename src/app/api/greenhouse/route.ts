import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
const headers = {
  'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
  'Content-Type': 'application/json'
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('id');

  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://harvest.greenhouse.io/v1/jobs/${jobId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Greenhouse API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job data' },
      { status: 500 }
    );
  }
}
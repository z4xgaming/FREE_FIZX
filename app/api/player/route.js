// app/api/player/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  const region = searchParams.get('region') || 'IND';

  if (!uid) {
    return NextResponse.json(
      { error: 'UID parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Using jinix6 free API (no API key needed)
    const url = `https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region}&uid=${uid}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching player data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player data. Please check UID and region.' },
      { status: 500 }
    );
  }
  }

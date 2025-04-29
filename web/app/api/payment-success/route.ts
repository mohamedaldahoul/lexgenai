import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'No session ID provided' },
      { status: 400 }
    );
  }

  try {
    // For testing purposes, we'll use a predictable pattern:
    // - First 3 checks return "processing"
    // - After that, return success
    const checkCount = parseInt(sessionId.split('_').pop() || '0', 10);
    
    if (checkCount < 3) {
      // Simulate processing state
      return NextResponse.json({
        success: false,
        status: 'processing',
        message: 'Document is still being generated',
      });
    } else {
      // Simulate success
      return NextResponse.json({
        success: true,
        download_url: '/api/download-document?session_id=' + sessionId,
      });
    }
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 
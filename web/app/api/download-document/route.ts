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
    // Create a simple test PDF
    const pdfContent = `%PDF-1.4
1 0 obj
<</Type /Catalog /Pages 2 0 R>>
endobj
2 0 obj
<</Type /Pages /Kids [3 0 R] /Count 1>>
endobj
3 0 obj
<</Type /Page /Parent 2 0 R /Resources <<>> /MediaBox [0 0 612 792] /Contents 4 0 R>>
endobj
4 0 obj
<</Length 44>>
stream
BT /F1 24 Tf 100 700 Td (Test Document) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000056 00000 n
0000000111 00000 n
0000000179 00000 n
trailer
<</Size 5 /Root 1 0 R>>
startxref
233
%%EOF`;

    return new NextResponse(pdfContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="test_document.pdf"',
      },
    });
  } catch (error) {
    console.error('Document download error:', error);
    return NextResponse.json(
      { error: 'Failed to download document' },
      { status: 500 }
    );
  }
} 
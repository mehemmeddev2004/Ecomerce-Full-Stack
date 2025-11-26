import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://etor.onrender.com/api/products';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function proxyToBackend(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    const authHeader = request.headers.get('authorization');
    if (authHeader) headers['Authorization'] = authHeader;

    const body = request.method !== 'GET' ? await request.text() : undefined;
    
    const backendUrl = `${BACKEND_URL}/${id}`;
    console.log(`[API] ${request.method} ${backendUrl}`);
    if (body) console.log(`[API] Body:`, body);

    const response = await fetch(backendUrl, {
      method: request.method,
      headers,
      body,
    });

    const responseText = await response.text();
    console.log(`[API] Response Status: ${response.status}`);
    console.log(`[API] Response Body:`, responseText.substring(0, 500));
    
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('[API] JSON Parse Error:', responseText);
      return NextResponse.json(
        { message: 'Backend server xətası - JSON cavab gözlənilirdi', details: responseText.substring(0, 200) },
        { status: 502, headers: corsHeaders }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { message: 'Şəbəkə xətası', error: error instanceof Error ? error.message : 'Unknown' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export const GET = proxyToBackend;
export const POST = proxyToBackend;
export const PUT = proxyToBackend;
export const DELETE = proxyToBackend;

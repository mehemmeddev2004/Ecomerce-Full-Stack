import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://etor.onrender.com/api/category';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function proxyToBackend(request: NextRequest, path: string = '') {
  try {
    const url = new URL(request.url);
    const queryString = url.search;
    const backendUrl = `${BACKEND_URL}${path}${queryString}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    const authHeader = request.headers.get('authorization');
    if (authHeader) headers['Authorization'] = authHeader;

    const response = await fetch(backendUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' ? await request.text() : undefined,
    });

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { message: 'Backend server xətası' },
        { status: 502, headers: corsHeaders }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Şəbəkə xətası', error: error instanceof Error ? error.message : 'Unknown' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export const GET = (req: NextRequest) => proxyToBackend(req);
export const POST = (req: NextRequest) => proxyToBackend(req);
export const PUT = (req: NextRequest) => proxyToBackend(req);
export const DELETE = (req: NextRequest) => proxyToBackend(req);

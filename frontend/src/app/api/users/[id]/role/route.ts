import { NextResponse } from 'next/server';

import { getApiBaseUrl } from '@/lib/get-api-base-url';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/users/${id}/role`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    const responseText = await response.text();

    if (!responseText) {
      return new NextResponse(null, { status: response.status });
    }

    return new NextResponse(responseText, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json({ message: 'Failed to reach the backend API.' }, { status: 502 });
  }
}

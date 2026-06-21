export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const expiry = url.searchParams.get('expiry');
  const signature = url.searchParams.get('sig');

  if (!expiry || !signature) {
    return new Response('Missing or invalid link', { status: 403 });
  }

  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const expectedSig = await sign(expiry, SIGNING_SECRET);

  if (signature !== expectedSig) {
    return new Response('Invalid link', { status: 403 });
  }

  if (Date.now() > parseInt(expiry, 10)) {
    return new Response('This link has expired. Please request a new one.', { status: 403 });
  }

  const fileUrl = `https://downloads.codagaming.xyz/${expiry}.${signature}`;
  const fileRes = await fetch(fileUrl);

  if (!fileRes.ok || !fileRes.body) {
    return new Response('Could not fetch file', { status: 502 });
  }

  return new Response(fileRes.body, {
    headers: {
      'Content-Disposition': `attachment; filename="codagaming-game.zip"`,
      'Content-Type': fileRes.headers.get('content-type') || 'application/octet-stream',
    },
  });
}

async function sign(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sigBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const expiry = Date.now() + 90 * 1000; // 90 second window
  const signature = await sign(expiry.toString(), SIGNING_SECRET);

  const downloadUrl = `/download?expiry=${expiry}&sig=${signature}`;
  return Response.redirect(new URL(downloadUrl, req.url), 302);
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

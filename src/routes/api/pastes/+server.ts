import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, platform }) => {
	const form = await request.formData();
	const content = form.get('content') as string;
	const expiration = form.get('expiration') as string;

	if (!platform?.env.R2_BUCKET || !platform?.env.KV) {
		return new Response('R2_BUCKET/KV is not defined', { status: 500 });
	}
	const { R2_BUCKET, KV } = platform.env;
	const id =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	await R2_BUCKET.put(id, content);
	//expiration is a string, e.g 1h, 1d, 1w, 1m
	const expirationTime = new Date();
	const expirationValue = parseInt(expiration);
	if (expiration.includes('h')) {
		expirationTime.setHours(expirationTime.getHours() + expirationValue);
	} else if (expiration.includes('d')) {
		expirationTime.setDate(expirationTime.getDate() + expirationValue);
	} else if (expiration.includes('w')) {
		expirationTime.setDate(expirationTime.getDate() + expirationValue * 7);
	} else if (expiration.includes('m')) {
		expirationTime.setMonth(expirationTime.getMonth() + expirationValue);
	}

	await KV.put(id, expirationTime.toISOString());

	return new Response(
		JSON.stringify({
			message: 'Paste created',
			id,
			expiration: expirationTime.toISOString()
		}),
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
};

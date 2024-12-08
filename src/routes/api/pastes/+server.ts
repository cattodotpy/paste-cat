import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, platform }) => {
	const form = await request.formData();
	const content = form.get('content') as string;
	const expiration = form.get('expiration') as string;
	if (!platform?.env.PASTES) {
		return new Response('KV is not defined', { status: 500 });
	}
	const { PASTES } = platform.env;
	const id =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

	//expiration is a string, e.g 1h, 1d, 1w, 1m
	console.log(expiration);

	const expirationTime = new Date();

	if (expiration.endsWith('h')) {
		expirationTime.setHours(expirationTime.getHours() + parseInt(expiration));
	} else if (expiration.endsWith('d')) {
		expirationTime.setDate(expirationTime.getDate() + parseInt(expiration));
	} else if (expiration.endsWith('w')) {
		expirationTime.setDate(expirationTime.getDate() + 7 * parseInt(expiration));
	} else if (expiration.endsWith('m')) {
		expirationTime.setMonth(expirationTime.getMonth() + parseInt(expiration));
	} else {
		return new Response('Invalid expiration', { status: 400 });
	}

	await PASTES.put(id, content);

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

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, platform }) => {
	if (!platform?.env.R2_BUCKET) {
		return new Response('R2_BUCKET is not defined', { status: 500 });
	}
	const { R2_BUCKET } = platform.env;

	const id = url.searchParams.get('id');

	if (!id) {
		return new Response('ID is required', { status: 400 });
	}

	const data = await R2_BUCKET.get(id);

	if (!data) {
		return new Response('Not found', { status: 404 });
	}

	let body = await data.text();

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, platform }) => {
	if (!platform?.env.PASTES) {
		return new Response('KV is not defined', { status: 500 });
	}
	const { PASTES } = platform.env;

	const id = url.searchParams.get('id');

	if (!id) {
		return new Response('ID is required', { status: 400 });
	}

	const data = await PASTES.get(id);

	if (!data) {
		return new Response('Not found', { status: 404 });
	}

	return new Response(data, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};

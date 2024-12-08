import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, platform }) => {
	if (!platform?.env.PASTES) {
		return new Response('KV is not defined', { status: 500 });
	}
	const { PASTES } = platform.env;

	const id = params.id;

	if (!id) {
		return new Response('ID is required', { status: 400 });
	}

	const body = await PASTES.get(id);

	if (!body) {
		return new Response('Not found', { status: 404 });
	}

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};

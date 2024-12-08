import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ params }) => {
	const { id } = params;
	const res = await fetch(`/api/pastes/${id}`);
	if (!res.ok) {
		return {
			status: `${res.status} ${res.statusText}`,
			error: new Error(await res.text())
		};
	}

	const text = await res.text();
	const body = text
		.split('\n')
		.map((line) => {
			return line.replace(/^(.*)$/, '<span>$1</span>');
		})
		.join('\n');

	return {
		props: {
			body
		}
	};
};

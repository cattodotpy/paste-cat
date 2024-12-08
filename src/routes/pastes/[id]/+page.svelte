<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let copied = $state(false);

	const copyToClipboard = () => {
		if (!data.paste) return;
		navigator.clipboard.writeText(data.paste.text);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};
</script>

{#if data.error}
	<p>{data.error}</p>
{/if}

{#if data.paste}
	<div class="m-10 space-y-4">
		<h1 class="text-2xl font-bold">Paste {data.paste.id}</h1>
		<div class="rounded-md border bg-gray-100 p-4">
			<pre class="whitespace-pre-wrap">{data.paste.text}</pre>
		</div>
		<div class="flex items-center justify-between">
			<button
				onclick={copyToClipboard}
				class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				{copied ? 'Copied!' : 'Copy to Clipboard'}
			</button>
		</div>
	</div>
{/if}

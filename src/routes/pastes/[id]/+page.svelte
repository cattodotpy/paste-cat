<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if data.error}
	<p>{data.status}</p>
	<p>{data.error.message}</p>
{:else if data.props.body}
	<pre>{data.props.body}</pre>
{:else}
	<p>Not found</p>
{/if}

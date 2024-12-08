<script lang="ts">
	export let error = '';
	export let isSubmitting = false;

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const form = event.target;
		if (!(form instanceof HTMLFormElement)) return;
		const formData = new FormData(form);

		isSubmitting = true;
		error = '';

		try {
			const response = await fetch('/api/pastes', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				form.reset();
			} else {
				error = `An error occurred: ${response.statusText}: ${await response.text()}`;
			}
		} catch (e) {
			if (e instanceof Error) {
				error = `An error occurred: ${e.message}`;
			} else {
				error = 'An unknown error occurred';
			}
		}

		isSubmitting = false;
	};
</script>

<div class="h-full w-full">
	<div class="flex h-full items-center justify-center">
		<form on:submit={handleSubmit} class="w-3/4 space-y-4">
			<div>
				<label for="content" class="block text-sm font-medium text-gray-700"> Paste Content </label>
				<textarea
					id="content"
					name="content"
					rows={10}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter your paste content here..."
					required
				></textarea>
			</div>
			<div>
				<label for="expiration" class="block text-sm font-medium text-gray-700"> Expiration </label>
				<select
					id="expiration"
					name="expiration"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				>
					<option value="1h">1 hour</option>
					<option value="1d">1 day</option>
					<option value="1w">1 week</option>
					<option value="1m">1 month</option>
					<option value="never">Never</option>
				</select>
			</div>
			<div>
				<button
					type="submit"
					disabled={isSubmitting}
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
				>
					{isSubmitting ? 'Creating...' : 'Create Paste'}
				</button>
			</div>
			<!-- {error && (
              <div class="text-red-600 text-sm">{error}</div>
            )} -->

			{#if error}
				<div class="text-sm text-red-600">{error}</div>
			{/if}
		</form>
	</div>
</div>

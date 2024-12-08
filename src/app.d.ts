// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: {
				PASTES: KVNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};

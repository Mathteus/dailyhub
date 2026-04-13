// biome-ignore lint/suspicious/noExplicitAny: qny type
type Constructor<T = any> = new (...args: any[]) => T;

export function compareTypes<T>(
	obj: unknown,
	types: Constructor<T>[],
): obj is T {
	return types.some((type) => obj instanceof type);
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

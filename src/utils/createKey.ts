/** @ignore */
export function createKey(keyLength?: number): string {
	return Math.random().toString(36).substr(2, keyLength);
}

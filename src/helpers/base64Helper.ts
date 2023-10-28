export default class Base64Helper {
	public static encode(value: string): string {
		return btoa(value);
	}

	public static decode(b64: string): string {
		return atob(b64);
	}
}

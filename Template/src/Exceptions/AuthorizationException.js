export class AuthorizationException extends Error {
	constructor(message) {
		super(message);
		this.name = "AuthorizationException";
	}
}
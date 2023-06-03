export class InvalidUserInputException extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidUserInputException";
	}
}
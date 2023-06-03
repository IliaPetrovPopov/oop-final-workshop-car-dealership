import { User } from "./User.js";

export class Comment {
	static CONTENT_MIN_LENGTH = 3;
	static CONTENT_MAX_LENGTH = 200;
	static CONTENT_LENGTH_ERROR_MESSAGE = `Content must be between ${Comment.CONTENT_MIN_LENGTH} and ${Comment.CONTENT_MAX_LENGTH} characters long!`;

	/**
	 * @type {User}
	 */
	#author;

	/**
	 * @type {string}
	 */
	#content;

	/**
	 * Creates a new comment.
	 * 
	 * @param {string} content
	 * @param {User} author
	 */
	constructor(content, author) {
		this.#setContent(content);
		this.#setAuthor(author);
	}

	/**
	 * Gets the text content of the comment.
	 * 
	 * @returns {string} The content of the comment.
	 */
	get content() {
		return this.#content;
	}

	/**
	 * Gets the the author of the comment.
	 * 
	 * @returns {User}
	 */
	get author() {
		return this.#author;
	}

	/**
	 * Prints the comment by returning a string representation that contains the text content and the username of the author.
	 * 
	 * @returns {string} The string representation of the comment.
	 */
	print() {
		const builder = [];

		builder.push("----------");
		builder.push(`${this.content}`);
		builder.push(`User: ${this.author.username}`);
		builder.push("----------");

		return builder.join("\n");
	}

	/**
	 * Sets the text content of the comment.
	 * 
	 * @param {string} content - The content of the comment.
	 * 
	 * @throws {Error} If the content is less than 3 or more than 200 characters long.
	 */
	#setContent(content) {
		// TODO: Implement validation

		this.#content = content;
	}

	/**
	 * Sets the author of the comment.
	 * 
	 * @param {User} author - The author of the comment.
	 */
	#setAuthor(author) {
		if (author === null) {
			throw new Error('Author cannot be null');
		}
		
		this.#author = author;
	}
}

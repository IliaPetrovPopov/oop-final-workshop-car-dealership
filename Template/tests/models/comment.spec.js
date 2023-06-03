import { Comment } from "../../src/Models/Comment.js";
import { User } from "../../src/Models/User.js";
import { Role } from "../../src/Models/Role.js";

describe("Comment class tests", () => {
	let testUser;

	beforeEach(() => {
		testUser = new User('testuser', 'Test', 'User', 'testpassword', Role.Normal);
	});

	test("Comment creation should succeed with valid content and author", () => {
		const commentContent = 'This is a valid comment';
		const comment = new Comment(commentContent, testUser);

		expect(comment.content).toBe(commentContent);
		expect(comment.author).toBe(testUser);
	});

	test("Comment creation should fail if content length is less than minimum", () => {
		const shortContent = 'Hi';

		expect(() => new Comment(shortContent, testUser)).toThrow(Comment.CONTENT_LENGTH_ERROR_MESSAGE);
	});

	test("Comment creation should fail if content length is greater than maximum", () => {
		const longContent = 'a'.repeat(201);

		expect(() => new Comment(longContent, testUser)).toThrow(Comment.CONTENT_LENGTH_ERROR_MESSAGE);
	});

	test("Comment creation should fail if author is not provided", () => {
		const commentContent = 'This is a valid comment';

		expect(() => new Comment(commentContent, null)).toThrow('Author cannot be null');
	});

	test("print() should return a properly formatted string", () => {
		const commentContent = 'This is a valid comment';
		const comment = new Comment(commentContent, testUser);

		const expectedOutput = [
			"----------",
			commentContent,
			`User: ${testUser.username}`,
			"----------"
		].join("\n");

		expect(comment.print()).toBe(expectedOutput);
	});
});

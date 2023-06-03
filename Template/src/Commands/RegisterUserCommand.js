import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { AuthorizationException } from '../Exceptions/AuthorizationException.js';
import { Role } from '../Models/Role.js';
import { BaseCommand } from './BaseCommand.js';

export class RegisterUserCommand extends BaseCommand {
	/**
	 * @description Registers a new user
	 * @param {string[]} commandParameters
	 * @param {Repository} repository
	 */
	constructor(commandParameters, repository) {
		super(commandParameters, repository);
	}

	get isLoginRequired() {
		return false;
	}

	executeCommand() {
		if (this.commandParameters.length < 4) {
			throw new InvalidUserInputException(`Invalid number of arguments. Expected: 4, Received: ${this.commandParameters.length}`);
		}

		const username = this.commandParameters[0];
		const firstName = this.commandParameters[1];
		const lastName = this.commandParameters[2];
		const password = this.commandParameters[3];

		let role = Role.Normal;
		if (this.commandParameters.length === 5) {
			role = this.parseRoleParameter(this.commandParameters[4], 'userRole');
		}

		return this.#registerUser(username, firstName, lastName, password, role);
	}

	/**
	 * @description Registers a new user
	 * @access private
	 * @param {string} username
	 * @param {string} firstName
	 * @param {string} lastName
	 * @param {string} password
	 * @param {Role} role
	 * @returns {string}
	 */
	#registerUser(username, firstName, lastName, password, role) {
		if (this.repository.loggedUser !== null) {
			throw new AuthorizationException(`User ${this.repository.loggedUser.username} is logged in! Please log out first!`);
		}

		if (this.repository.userExists(username)) {
			throw new AuthorizationException(`User ${username} already exists. Choose a different username!`);
		}

		const user = this.repository.createUser(username, firstName, lastName, password, role);
		this.repository.addUser(user);
		this.repository.logIn(user);

		return `User ${username} registered successfully!`;
	}
}
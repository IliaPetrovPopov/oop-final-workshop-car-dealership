import { BaseCommand } from './BaseCommand.js';

export class LogoutCommand extends BaseCommand {
	constructor(commandParameters, repository) {
		super(commandParameters, repository);
	}

	get requireLogin() {
		return true;
	}

	executeCommand() {
		this.repository.logOut();
		return 'You logged out!';
	}
}
import { BaseCommand } from './BaseCommand.js';

export class LogoutCommand extends BaseCommand {
	constructor(repository, commandParameters) {
		super(repository, commandParameters);
	}

	get requireLogin() {
		return true;
	}

	executeCommand() {
		this.repository.logOut();
		return 'You logged out!';
	}
}
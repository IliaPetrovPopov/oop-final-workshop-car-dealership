import { BaseCommand } from './BaseCommand.js';

export class ShowUsersCommand extends BaseCommand {

  constructor(commandParameters, repository) {
    super(commandParameters, repository);
  }

  executeCommand() {
    if (this.repository.loggedUser.isAdmin()) {
      return this.repository.users.reduce((userPrint, currUser) => {
        userPrint += `${currUser.print()}\n`;

        return userPrint;
      }, '');
    }

    throw new Error('User must be admin to show all the users in the repository!');
  }
}

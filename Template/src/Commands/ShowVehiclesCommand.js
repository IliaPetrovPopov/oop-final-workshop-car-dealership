import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { BaseCommand } from './BaseCommand.js';

export class ShowVehiclesCommand extends BaseCommand {
  constructor(commandParameters, repository) {
    super(commandParameters, repository);
  }

  get requireLogin() {
    return true;
  }

  executeCommand() {
    if (this.commandParameters.length < 1) {
      throw new InvalidUserInputException(`Invalid number of arguments. Expected: 1, Received: ${this.commandParameters.length}`);
    }

    const username = this.commandParameters[0];

    return this.showUserVehicles(username);
  }

  /**
	 * @description Shows the vehicles of the user
	 *
	 * @param {string} username
	 *
	 * @return {string}
	 */
  showUserVehicles(username) {
    const user = this.repository.getUser(username);

    return user.printVehicles();
  }
}

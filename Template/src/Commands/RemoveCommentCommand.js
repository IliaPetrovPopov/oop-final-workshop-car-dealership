import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { BaseCommand } from './BaseCommand.js';


export class RemoveCommentCommand extends BaseCommand {
  constructor(commandParameters, repository) {
    super(commandParameters, repository);
  }

  get requireLogin() {
    return true;
  }

  executeCommand() {
    if (this.commandParameters.length < 3) {
      throw new InvalidUserInputException(`Invalid number of arguments. Expected: 3, Received: ${this.commandParameters.length}`);
    }

    const vehicleIndex = this.parseIntParameter(this.commandParameters[0], 'vehicleIndex') - 1;
    const commentIndex = this.parseIntParameter(this.commandParameters[1], 'vehicleIndex') - 1;
    const username = this.commandParameters[2];

    return this.removeComment(vehicleIndex, commentIndex, username);
  }

  removeComment(vehicleIndex, commentIndex, username) {
    const user = this.repository.getUser(username);

    if (vehicleIndex < 0 || vehicleIndex >= user.vehicles.length) {
      throw new InvalidUserInputException('The vehicle does not exist!');
    }

    const vehicle = user.vehicles[vehicleIndex];

    if (commentIndex < 0 || commentIndex >= vehicle.comments.length) {
      throw new InvalidUserInputException('Cannot remove comment! The comment does not exist!');
    }

    const comment = vehicle.comments[commentIndex];

    this.repository.loggedUser.removeComment(comment, vehicle);

    return `${this.repository.loggedUser.username} removed comment successfully!`;
  }
}

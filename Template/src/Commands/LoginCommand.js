import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { AuthorizationException } from '../Exceptions/AuthorizationException.js';
import { BaseCommand } from './BaseCommand.js';

export class LoginCommand extends BaseCommand {
  constructor(commandParameters, repository) {
    super(commandParameters, repository);
  }

  get isLoginRequired() {
    return false;
  }

  executeCommand() {
    if (this.commandParameters.length < 2) {
      throw new InvalidUserInputException(`Invalid number of arguments. Expected: 2, Received: ${this.commandParameters.length}`);
    }

    const username = this.commandParameters[0];
    const password = this.commandParameters[1];

    return this.login(username, password);
  }

  login(username, password) {
    if (this.repository.loggedUser !== null) {
      throw new AuthorizationException(`User ${this.repository.loggedUser.username} is logged in! Please log out first!`);
    }

    const user = this.repository.getUser(username);
    if (user.password !== password) {
      throw new AuthorizationException('Wrong username or password!');
    }

    this.repository.logIn(user);

    return `User ${username} successfully logged in!`;
  }
}

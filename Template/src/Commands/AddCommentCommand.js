import { InvalidUserInputException } from "../Exceptions/InvalidUserInputException.js";
import { BaseCommand } from "./BaseCommand.js";

export class AddCommentCommand extends BaseCommand {
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

		const content = this.commandParameters[0];
		const author = this.commandParameters[1];
		const vehicleIndex = this.parseIntParameter(this.commandParameters[2], "vehicleIndex") - 1; // -1 because the user sees the index starting from 1

		const user = this.repository.getUser(author); 

		if (vehicleIndex < 0 || vehicleIndex >= user.vehicles.length) {
			throw new InvalidUserInputException("The vehicle does not exist!");
		}

		const vehicle = user.vehicles[vehicleIndex];
		
		const comment = this.repository.createComment(content, this.repository.loggedUser.username);

		this.repository.loggedUser.addComment(comment, vehicle);

		return `${this.repository.loggedUser.username} added comment successfully!`;
	}
}
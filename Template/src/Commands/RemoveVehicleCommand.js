import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { BaseCommand } from './BaseCommand.js';


export class RemoveVehicleCommand extends BaseCommand {
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

		const vehicleIndex = this.parseIntParameter(this.commandParameters[0], 'vehicleIndex') - 1;

		return this.removeVehicle(vehicleIndex);
	}

	removeVehicle(vehicleIndex) {
		if (vehicleIndex < 0 || vehicleIndex >= this.repository.loggedUser.vehicles.length) {
			throw new InvalidUserInputException('Cannot remove vehicle! The vehicle does not exist!');
		}

		const vehicle = this.repository.loggedUser.vehicles[vehicleIndex];

		this.repository.loggedUser.removeVehicle(vehicle);

		return `${this.repository.loggedUser.username} removed vehicle successfully!`;
	}
}
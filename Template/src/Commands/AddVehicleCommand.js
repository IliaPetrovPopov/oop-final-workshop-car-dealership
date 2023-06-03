import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { VehicleType } from '../Models/VehicleType.js';
import { BaseCommand } from './BaseCommand.js';


export class AddVehicleCommand extends BaseCommand {
	constructor(commandParameters, repository) {
		super(commandParameters, repository);
	}

	get requireLogin() {
		return true;
	}

	executeCommand() {
		if (this.commandParameters.length < 5) {
			throw new InvalidUserInputException(`Invalid number of arguments. Expected: 5, Received: ${this.commandParameters.length}`);
		}

		const vehicleType = this.parseVehicleTypeParameter(this.commandParameters[0], 'vehicleType');
		const make = this.commandParameters[1];
		const model = this.commandParameters[2];
		const price = this.parseDecimalParameter(this.commandParameters[3], 'price');
		const additionalParam = this.commandParameters[4];

		return this.addVehicle(vehicleType, make, model, price, additionalParam);
	}

	addVehicle(type, make, model, price, additionalParam) {
		let vehicle;

		switch (type) {
			case VehicleType.Car:
				const seats = this.parseIntParameter(additionalParam, 'seats');
				vehicle = this.repository.createCar(make, model, price, seats);
				break;
			case VehicleType.Motorcycle:
				vehicle = this.repository.createMotorcycle(make, model, price, additionalParam);
				break;
			case VehicleType.Truck:
				const weightCapacity = this.parseIntParameter(additionalParam, 'weightCapacity');
				vehicle = this.repository.createTruck(make, model, price, weightCapacity);
				break;
			default:
				throw new Error(`Creating vehicle type: ${type} is not supported!`);
		}

		this.repository.loggedUser.addVehicle(vehicle);

		return `${this.repository.loggedUser.username} added vehicle successfully!`;
	}
}
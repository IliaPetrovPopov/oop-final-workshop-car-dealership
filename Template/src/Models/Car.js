import { Vehicle } from './Vehicle.js';

export class Car extends Vehicle {
	#seats;
	#vehicleSpecifics;

	static SEATS_MIN_VALUE = 1;
	static SEATS_MAX_VALUE = 10;
	static SEATS_ERROR_MESSAGE = `Seats must be between ${Car.SEATS_MIN_VALUE} and ${Car.SEATS_MAX_VALUE}!`;
	static WHEELS_COUNT = 4;

	/**
	 * Creates an instance of Car.
	 *
	 * @param {string} make - The car's make.
	 * @param {string} model - The car's model.
	 * @param {number} price - The car's price.
	 * @param {number} seats - The number of seats in the car.
	 */
	constructor(make, model, price, seats) {
	  super(make, model, price);
	  this.seats = seats;
	  this.#vehicleSpecifics = `Seats: ${this.#seats}`;
	}

	get seats() {
	  return this.#seats;
	}

	set seats(newSeats) {

	  if (!newSeats && newSeats !== 0) {
	    throw new Error('Please enter valid value!');
	  }

	  if (newSeats < Car.SEATS_MIN_VALUE || newSeats > Car.SEATS_MAX_VALUE) {
	    throw new Error(Car.SEATS_ERROR_MESSAGE);
	  }

	  this.#seats = newSeats;
	}

	get vehicleSpecifics() {
	  return this.#vehicleSpecifics;
	}

	additionalInfo() {
	  return this.vehicleSpecifics;
	}
}
import { Vehicle } from './Vehicle.js';


export class Truck extends Vehicle {
	#weightCapacity;
	#vehicleSpecifics;

	static WEIGHT_CAPACITY_MIN_VALUE = 1;
	static WEIGHT_CAPACITY_MAX_VALUE = 100;
	static WEIGHT_CAPACITY_ERROR_MESSAGE = `Weight capacity must be between ${Truck.WEIGHT_CAPACITY_MIN_VALUE} and ${Truck.WEIGHT_CAPACITY_MAX_VALUE}!`;
	static WHEELS_COUNT = 8;

	/**
	 * Creates an instance of Truck.
	 *
	 * @param {string} make - The truck's make.
	 * @param {string} model - The truck's model.
	 * @param {number} price - The truck's price.
	 * @param {number} weightCapacity - The truck's weight capacity.
	 */
	constructor(make, model, price, weightCapacity) {
	  super(make, model, price);
	  this.weightCapacity = weightCapacity;
	  this.#vehicleSpecifics = `Weight Capacity: ${this.#weightCapacity}t`;
	}

	get weightCapacity() {
	  return this.#weightCapacity;
	}

	set weightCapacity(newWC) {
	  if (!newWC && newWC !== 0) {
	    throw new Error('Enter valid weight capacity!');
	  }

	  if (newWC < Truck.WEIGHT_CAPACITY_MIN_VALUE || newWC > Truck.WEIGHT_CAPACITY_MAX_VALUE) {
	    throw new Error(Truck.WEIGHT_CAPACITY_ERROR_MESSAGE);
	  }

	  this.#weightCapacity = newWC;
	}

	get vehicleSpecifics() {
	  return this.#vehicleSpecifics;
	  }

	additionalInfo() {
	  return this.#vehicleSpecifics;
	}
}
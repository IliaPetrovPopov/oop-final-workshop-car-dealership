import { Vehicle } from './Vehicle.js';

export class Motorcycle extends Vehicle {

	#category;
	#vehicleSpecifics;

	static CATEGORY_MIN_LENGTH = 1;
	static CATEGORY_MAX_LENGTH = 10;
	static CATEGORY_ERROR_MESSAGE = `Category must be between ${Motorcycle.CATEGORY_MIN_LENGTH} and ${Motorcycle.CATEGORY_MAX_LENGTH} characters long!`;
	static WHEELS_COUNT = 2;

	/**
	 * Creates an instance of Motorcycle.
	 *
	 * @param {string} make - The motorcycle's make.
	 * @param {string} model - The motorcycle's model.
	 * @param {number} price - The motorcycle's price.
	 * @param {string} category - The motorcycle's category.
	 */
	constructor(make, model, price, category) {
	  super(make, model, price);
	  this.determineTypeAndWheels();
	  this.category = category;
	  this.#vehicleSpecifics = `Category: ${this.#category}`;
	}

	get category() {
	  return this.#category;
	}

	/**
	 * @param {string} newC
	 */
	set category(newC) {
	  if (!newC) {
	    throw new Error('Please enter valid value for category!');
	  }

	  if (newC.length < Motorcycle.CATEGORY_MIN_LENGTH || newC.length > Motorcycle.CATEGORY_MAX_LENGTH) {
	    throw new Error(Motorcycle.CATEGORY_ERROR_MESSAGE);
	  }

	  this.#category = newC;
	}

	get vehicleSpecifics() {
	  return this.#vehicleSpecifics;
	}

	additionalInfo() {
	  return this.vehicleSpecifics;
	}
}
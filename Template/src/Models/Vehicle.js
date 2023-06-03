import { Comment } from './Comment.js';

export class Vehicle {

	/**
	 * The list of comments for the vehicle.
	 * 
	 * @type {Comment[]}
	 */
	#comments = [];

	/**
	 * @abstract 
	 * 
	 * @param {string} make - The make of the vehicle.
	 * @param {string} model - The model of the vehicle.
	 * @param {number} price - The price of the vehicle.
	*/
	constructor(make, model, price) {
		this.make = make;
		this.model = model;
		this.price = price;
	}

	// TODO: Implement the rest of the class by adding the common properties and methods from each vehicle.
	// Hint: Do not forget that all vehicles have two more properties in common - wheels count (number) and a type (string).
	// TODO: Think of a way of defining the wheels count and type here but implementing them in the sub-classes.
}
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import { Comment } from './Comment.js';
import { VehicleType } from './VehicleType.js';

export class Vehicle {

	#make;
	#model;
	#price;
	#wheel;
	#type;

	static #MIN_MAKE_LENGTH = 2;
	static #MAX_MAKE_LENGTH = 15;
	static #MIN_MODEL_LENGTH = 1;
	static #MAX_MODEL_LENGTH = 15;
	static #MIN_PRICE_RANGE = 0.0;
	static #MAX_PRICE_RANGE = 1000000.0;

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

	get make() {
	  return this.#make;
	}

	set make(newMake) {
	  if (!newMake) {
	    throw new Error('Please enter valid value!');
	  }

	  if (newMake.length < Vehicle.#MIN_MAKE_LENGTH || newMake.length > Vehicle.#MAX_MAKE_LENGTH) {
	    throw new Error(`Make length should be between ${Vehicle.#MIN_MAKE_LENGTH} and ${Vehicle.#MAX_MAKE_LENGTH} symbols`);
	  }

	  this.#make = newMake;
	}

	get model() {
	  return this.#model;
	}

	set model(newModel) {
	  if (!newModel) {
	    throw new Error('Please enter valid value!');
	  }

	  if (newModel.length < Vehicle.#MIN_MODEL_LENGTH || newModel.length > Vehicle.#MAX_MODEL_LENGTH) {
	    throw new Error(`Model length should be between ${Vehicle.#MIN_MODEL_LENGTH} and ${Vehicle.#MAX_MODEL_LENGTH} symbols`);
	  }

	  this.#model = newModel;
	}

	get price() {
	  return this.#price;
	}

	set price(newPrice) {
	  if (!newPrice) {
	    throw new Error('Please enter valid value!');
	  }

	  if (newPrice < Vehicle.#MIN_PRICE_RANGE || newPrice > Vehicle.#MAX_PRICE_RANGE) {
	    throw new Error(`Price range should be between ${Vehicle.#MIN_PRICE_RANGE} and ${Vehicle.#MAX_PRICE_RANGE}`);
	  }

	  this.#price = newPrice;
	}

	determineTypeAndWheels() {
	  if (!Object.keys(VehicleType).includes(this.constructor.name)) {
	    throw new Error('Such vehicle doesn\'t exist');
	  }

	  for (const type in VehicleType) {
	    if (this.constructor.name === type) {
	    this.#type = type;
	    this.#wheel = VehicleType[type];
	    break;
	   }
	  }
	}

	get wheels() {
	  return this.#wheel;
	}

	get type() {
	  return this.#type;
	}

	get comments() {
	  return this.#comments.slice();
	}

	addComment(newC) {

	  if (!newC) {
	    throw new Error('Comment cannot be null or undefined!');
	  }

	  if (!(newC instanceof Comment)) {
	    throw new Error('Comment must be an instance of the Comment class!');
	  }

	  this.#comments.push(newC);
	}

	removeComment(comToRemove) {
	  const index = this.#comments.indexOf(comToRemove);

	  if (index > -1) {
	    this.#comments.splice(index, 1);
	  }
	}

	print() {
	  const productInfo = [
	    `${this.#type}:`,
	    `Make: ${this.#make}`,
	    `Model: ${this.#model}`,
	    `Wheels: ${this.#wheel}`,
	    `Price: $${this.#price.toFixed(1)}`,
	    `${this.additionalInfo()}`,
	    `${this.printComments()}`,
	  ];

	  return productInfo.join('\n');
	}

	printComments() {
	  if (this.#comments.length === 0) {
	    return `--NO COMMENTS--`;
	  }

	  let finalComments = `--COMMENTS--\n`;

	  const commentsFormatted = this.#comments.reduce((allCom, currCom) => {
	    allCom += `${currCom.print()}\n`;

	    return allCom;
	  }, '');

	  finalComments += `${commentsFormatted}\n--COMMENTS--`;

	  return finalComments;
	}

	additionalInfo() {}
  // TODO: Implement the rest of the class by adding the common properties and methods from each vehicle.
  // Hint: Do not forget that all vehicles have two more properties in common - wheels count (number) and a type (string).
  // TODO: Think of a way of defining the wheels count and type here but implementing them in the sub-classes.
}
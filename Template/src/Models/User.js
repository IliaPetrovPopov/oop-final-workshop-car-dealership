/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import { Role } from './Role.js';


export class User {
	static USERNAME_MIN_LENGTH = 2;
	static USERNAME_MAX_LENGTH = 20;
	static USERNAME_LENGTH_ERROR_MESSAGE = `Username must be between ${User.USERNAME_MIN_LENGTH} and ${User.USERNAME_MAX_LENGTH} characters long!`;

	static PASSWORD_MIN_LENGTH = 5;
	static PASSWORD_MAX_LENGTH = 30;
	static PASSWORD_LENGTH_ERROR_MESSAGE = `Password must be between ${User.PASSWORD_MIN_LENGTH} and ${User.PASSWORD_MAX_LENGTH} characters long!`;

	static LASTNAME_MIN_LENGTH = 2;
	static LASTNAME_MAX_LENGTH = 20;
	static LASTNAME_LENGTH_ERROR_MESSAGE = `Lastname must be between ${User.LASTNAME_MIN_LENGTH} and ${User.LASTNAME_MAX_LENGTH} characters long!`;

	static FIRSTNAME_MIN_LENGTH = 2;
	static FIRSTNAME_MAX_LENGTH = 20;
	static FIRSTNAME_LENGTH_ERROR_MESSAGE = `Firstname must be between ${User.FIRSTNAME_MIN_LENGTH} and ${User.FIRSTNAME_MAX_LENGTH} characters long!`;

	static NOT_AN_VIP_USER_VEHICLES_ADD = '';
	static ADMIN_CANNOT_ADD_VEHICLES = 'You are an admin and therefore cannot add vehicles!';
	static YOU_ARE_NOT_THE_AUTHOR = 'You are not the author of the comment you are trying to remove!';
	static NORMAL_ROLE_VEHICLE_LIMIT = 5;


	/**
	 * @type {string}
	 */
	#username;

	/**
	 * @type {string}
	 */
	#firstName;

	/**
	 * @type {string}
	 */
	#lastName;

	/**
	 * @type {string}
	 */
	#password;

	/**
	 * @type {string}
	 */
	#role;

	/**
	 * @type {Vehicle[]}
	 */
	#vehicles;

	/**
	 *
	 * @param {string} username
	 * @param {string} firstName
	 * @param {string} lastName
	 * @param {string} password
	 * @param {string} role
	 */
	constructor(username, firstName, lastName, password, role) {
	  this.#setUsername(username);
	  this.#setFirstName(firstName);
	  this.#setLastName(lastName);
	  this.#setPassword(password);
	  this.#role = role;
	  this.#vehicles = [];
	}

	get username() {
	  return this.#username;
	}

	get firstName() {
	  return this.#firstName;
	}

	get lastName() {
	  return this.#lastName;
	}

	get password() {
	  return this.#password;
	}

	/**
	 * @description Returns the role of the user
	 *
	 * @return {string}
	 */
	get role() {
	  return this.#role;
	}

	get vehicles() {
	  return [...this.#vehicles];
	}

	/**
	 * @description Adds a vehicle to the user's vehicles
	 * @param {Vehicle} vehicle
	*/
	// TODO: This is intentionally commented out. Otherwise the AddVehicleCommand will give errors.
	// After you have finished implementing the Vehicle class, you can add it back, after the description.

	addVehicle(vehicle) {
	  if (this.role === Role.Admin) {
	    throw new Error(User.ADMIN_CANNOT_ADD_VEHICLES);
	  }
	  if (this.role === Role.Normal && this.#vehicles.length === User.NORMAL_ROLE_VEHICLE_LIMIT) {
	    throw new Error(`You are not VIP and cannot add more than ${User.NORMAL_ROLE_VEHICLE_LIMIT} vehicles!`);
	  }

	  this.#vehicles.push(vehicle);
	}

	/**
	 * @description Removes a vehicle from the user's vehicles
	 *
	 * @param {Vehicle} vehicle
	 */
	removeVehicle(vehicle) {
	  const index = this.#vehicles.indexOf(vehicle);

	  if (index !== -1) {
	    this.#vehicles.splice(index, 1);
	  }
	}

	/**
	 * @description Adds a comment to a vehicle
	 *
	 * @param {Comment} commentToAdd
	 * @param {Vehicle} vehicleToAddComment
	 */
	addComment(commentToAdd, vehicleToAddComment) {
	  // TODO: Uncomment this when you have completed the implementation of all vehicles.

	  vehicleToAddComment.addComment(commentToAdd);
	}

	/**
	 * @description Removes a comment from a vehicle
	 *
	 * @param {Comment} commentToRemove
	 * @param {Vehicle} vehicleToRemoveComment
	 *
	 * @throws {Error} If the user is not the author of the comment
	 */
	removeComment(commentToRemove, vehicleToRemoveComment) {
	  // TODO: Uncomment this when you have completed the implementation of all vehicles.

	  if (this.#username !== commentToRemove.author) {
	  	throw new Error('You are not the author of the comment you are trying to remove!');
	  }

	  vehicleToRemoveComment.removeComment(commentToRemove);
	}

	printVehicles() {

	  const builder = [];

	  // TODO: Uncomment this when you have completed the implementation of all vehicles.

	  builder.push(`--USER ${this.#username}--`);

	  if (this.#vehicles.length === 0) {
	  	builder.push('--NO VEHICLES--');
	  } else {
	  	let counter = 1;
	  	for (const vehicle of this.#vehicles) {
	  		builder.push(`${counter}. ${vehicle.print()}`);
	  		counter++;
	  	}
	  }

	  return builder.join('\n');
	}


	/**
	 * @description Checks if the user is an admin
	 *
	 * @return {boolean}
	 */
	isAdmin() {
	  return this.#role === Role.Admin;
	}

	/**
	 * Returns a string representation of the user.
	 *
	 * @return {string} The string representation of the user.
	 */
	print() {
	  return `Username: ${this.#username}, FullName: ${this.#firstName} ${this.#lastName}, Role: ${this.#role}`;
	}

	/**
	 * @description Sets the username of the user
	 *
	 * @param {string} username
	 *
	 * @throws {Error} If the username is not between 3 and 20 characters long
	 */
	#setUsername(username) {
	  if (username.length < User.USERNAME_MIN_LENGTH || username.length > User.USERNAME_MAX_LENGTH) {
	    throw new Error(User.USERNAME_LENGTH_ERROR_MESSAGE);
	  }
	  const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
	  if (specialChars.test(username)) {
	    throw new Error('Username contains invalid symbols!');
	  }

	  this.#username = username;
	}

	/**
	 * @description Sets the first name of the user
	 *
	 * @param {string} firstName
	 *
	 * @throws {Error} If the first name is not between 3 and 20 characters long
	 */
	#setFirstName(firstName) {
	  if (firstName.length < User.FIRSTNAME_MIN_LENGTH || firstName.length > User.FIRSTNAME_MAX_LENGTH) {
	    throw new Error(User.FIRSTNAME_LENGTH_ERROR_MESSAGE);
	  }

	  this.#firstName = firstName;
	}

	/**
	 * @description Sets the last name of the user
	 *
	 * @param {string} lastName
	 *
	 * @throws {Error} If the first name is not between 3 and 20 characters long
	 */
	#setLastName(lastName) {
	  if (lastName.length < User.LASTNAME_MIN_LENGTH || lastName.length > User.LASTNAME_MAX_LENGTH) {
	    throw new Error(User.LASTNAME_LENGTH_ERROR_MESSAGE);
	  }

	  this.#lastName = lastName;
	}

	/**
	 * @description Sets the password of the user
	 *
	 * @param {string} password
	 *
	 * @throws {Error} If the password is not between 6 and 20 characters long
	 */
	#setPassword(password) {
	  if (password.length < User.PASSWORD_MIN_LENGTH || password.length > User.PASSWORD_MAX_LENGTH) {
	    throw new Error(User.PASSWORD_LENGTH_ERROR_MESSAGE);
	  }

	  this.#password = password;
	}
}

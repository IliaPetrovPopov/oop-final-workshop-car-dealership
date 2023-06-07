/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import { EntityNotFoundException } from '../Exceptions/EntityNotFoundException.js';
import { User } from '../Models/User.js';
import { Car } from '../Models/Car.js';
import { Motorcycle } from '../Models/Motorcycle.js';
import { Truck } from '../Models/Truck.js';
import { Comment } from '../Models/Comment.js';
import { Role } from '../Models/Role.js';

/**
 * Repository class that holds all the data. This is similar to appData from previous workshops.
	 *
*/
export class Repository {
	#users;
	#loggedUser;

	constructor() {
	  this.#users = [];
	  this.#loggedUser = null;
	}

	/**
	 * Gets all the users
	 *
	 * @return {User[]}
	 */
	get users() {
	  return [...this.#users];
	}

	/**
	 * Gets the authenticated user
	 *
	 * @return {User}
	 */
	get loggedUser() {
	  return this.#loggedUser;
	}

	/**
	 * Creates a new user
	 *
	 * @param {string} username
	 * @param {string} firstName
	 * @param {string} lastName
	 * @param {string} password
	 * @param {Role} role
	 *
	 * @return {User}
	 */
	createUser(username, firstName, lastName, password, role) {
	  return new User(username, firstName, lastName, password, role);
	}

	/**
	 * Adds a user to the repository
	 *
	 * @param {User} user
	 *
	 * @return {void}
	 */
	addUser(user) {
	  if (!this.#users.includes(user)) {
	    this.#users.push(user);
	  }
	}

	/**
	 * Checks if a user with the given username exists
	 *
	 * @param {string} username
	 *
	 * @return {boolean}
	 */
	userExists(username) {
	  return this.users.some(user =>
	    user.username.toLowerCase() === username.toLowerCase()
	  );
	}

	/**
	 * Gets a user by username
	 *
	 * @param {string} username
	 *
	 * @return {User}
	 *  or
	 * @throws {EntityNotFoundException}
	 */
	getUser(username) {
	  const user = this.users.find(
	    user => user.username.toLowerCase() === username.toLowerCase()
	  );

	  if (user !== undefined) {
	    return user;
	  } else {
	    throw new EntityNotFoundException(`There is no user with username ${username}!`);
	  }
	}

	/**
	 * Sets the authenticated user
	 *
	 * @param {User} user
	 *
	 * @return {void}
	 */
	logIn(user) {
	  this.#loggedUser = user;
	}

	/**
	 * Logs out the authenticated user
	 *
	 * @return {void}
	 */
	logOut() {
	  this.#loggedUser = null;
	}

	/**
	 * Creates a new car
	 *
	 * @param {string} make
	 * @param {string} model
	 * @param {number} price
	 * @param {number} seats
	 *
	 * @return {Car}
	*/
	createCar(make, model, price, seats) {
	  return new Car(make, model, price, seats);
	}

	/**
	 * Creates a new motorcycle
	 *
	 * @param {string} make
	 * @param {string} model
	 * @param {number} price
	 * @param {string} category
	 *
	 * @return {Motorcycle}
	*/
	createMotorcycle(make, model, price, category) {
	  return new Motorcycle(make, model, price, category);
	}

	/**
	 * Creates a new truck
	 *
	 * @param {string} make
	 * @param {string} model
	 * @param {number} price
	 * @param {number} weightCapacity
	 *
	 * @return {Truck}
	*/
	createTruck(make, model, price, weightCapacity) {
	  return new Truck(make, model, price, weightCapacity);
	}

	/**
	 * Creates a new comment
	 *
	 * @param {string} content
	 * @param {string} author
	 *
	 * @return {Comment}
	*/
	createComment(content, author) {
	  return new Comment(content, author);
	}
}

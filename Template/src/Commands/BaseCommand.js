import { AuthorizationException } from '../Exceptions/AuthorizationException.js';
import { InvalidUserInputException } from '../Exceptions/InvalidUserInputException.js';
import { Role } from '../Models/Role.js';
import { VehicleType } from '../Models/VehicleType.js';
import { Repository } from '../Core/Repository.js';

/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

export class BaseCommand {
	#commandParameters;
	#repository;

	/**
	 * Base class for all commands
	 *
	 * @param {string[]} commandParameters
	 * @param {Repository} repository
	 */
	constructor(commandParameters, repository) {
	  this.#commandParameters = commandParameters;
	  this.#repository = repository;
	}

	/**
	 * Gets the command parameters
	 *
	 * @return {string[]}
	 */
	get commandParameters() {
	  return this.#commandParameters;
	}

	/**
	 * Gets the repository
	 *
	 * @return {Repository}
	 */
	get repository() {
	  return this.#repository;
	}

	/**
	 * Executes the command
	 *
	 * @return {string} - The result of the command
	 * or
	 * @throws {AuthorizationException} - If the command requires login and the user is not logged in
	 */
	execute() {
	  if (this.isLoginRequired && this.repository.loggedUser === null) {
	    throw new AuthorizationException('This command requires login first.');
	  }


	  return this.executeCommand();
	}

	/**
	 * Abstract method that must be implemented by sub-classes.
	 * Hint: Use @see commandParameters and @see repository inside the implementation of this method.
	 *
	 * @return {string} - The result of the command
	 */
	executeCommand() {
	  throw new Error('Method not implemented');
	}

	/**
	 * Abstract method that must be implemented by sub-classes.
	 *
	 * @return {boolean} - true if the command requires login, false otherwise
	 */
	get isLoginRequired() {
	  return false;
	}

	/**
	 * Converts a string to an integer.
	 *
	 * @param {string} string - The string value to be parsed as an integer
	 * @param {string} parameterName - The name of the parameter being parsed (for error messages)
	 *
	 * @return {number} - The parsed integer value
	 * or
	 * @throws {InvalidUserInputException} - If the input value cannot be parsed as an integer
	 */
	parseIntParameter(string, parameterName) {
	  const parsedValue = parseInt(string, 10);

	  if (!isNaN(parsedValue)) {
	    return parsedValue;
	  }
	  throw new InvalidUserInputException(`Invalid value for ${parameterName}. Should be an integer number.`);
	}


	/**
	 * Parses a decimal parameter from a string value.
	 * @param {string} value - The string value to be parsed as a decimal.
	 * @param {string} parameterName - The name of the parameter being parsed (for error messages).
	 *
	 * @return {number} - The parsed decimal value.
	 * @throws {InvalidUserInputException} - If the input value cannot be parsed as a decimal.
	*/
	parseDecimalParameter(value, parameterName) {
	  const parsedValue = parseFloat(value);
	  if (!isNaN(parsedValue)) {
	    return parsedValue;
	  }
	  throw new InvalidUserInputException(`Invalid value for ${parameterName}. Should be a real number.`);
	}

	/**
	 * Parses a boolean parameter from a string value
	 * @param {string} value - The string value to be parsed as a boolean
	 * @param {string} parameterName - The name of the parameter being parsed (for error messages)
	 *
	 * @return {boolean} - The parsed boolean value
	 * @throws {InvalidUserInputException} - If the input value cannot be parsed as a boolean
	*/
	parseBoolParameter(value, parameterName) {
	  if (value === 'true') {
	    return true;
	  } else if (value === 'false') {
	    return false;
	  }
	  throw new InvalidUserInputException(`Invalid value for ${parameterName}. Should be either true or false.`);
	}

	parseRoleParameter(value, parameterName) {
	  const role = Role[value];
	  if (role !== undefined) {
	    return role;
	  }
	  throw new InvalidUserInputException(`Invalid value for ${parameterName}. Should be either Normal, VIP or Admin.`);
	}

	parseVehicleTypeParameter(value, parameterName) {
	  const vehicleType = VehicleType[value];
	  if (vehicleType !== undefined) {
	    return vehicleType;
	  }
	  throw new InvalidUserInputException(`Invalid value for ${parameterName}. Should be a valid vehicle type.`);
	}
}

import { BaseCommand } from "../Commands/BaseCommand.js";
import { RegisterUserCommand } from "../Commands/RegisterUserCommand.js";
import { LoginCommand } from "../Commands/LoginCommand.js";
import { LogoutCommand } from "../Commands/LogoutCommand.js";
import { AddVehicleCommand } from "../Commands/AddVehicleCommand.js";
import { RemoveVehicleCommand } from "../Commands/RemoveVehicleCommand.js";
import { AddCommentCommand } from "../Commands/AddCommentCommand.js";
import { RemoveCommentCommand } from "../Commands/RemoveCommentCommand.js";
import { ShowVehiclesCommand } from "../Commands/ShowVehiclesCommand.js";
import { InvalidUserInputException } from "../Exceptions/InvalidUserInputException.js";
import { Repository } from "./Repository.js";
import { CommandType } from "./CommandType.js";

export class CommandFactory {
	#repository;

	/**
	* @param {Repository} repository
	*/
	constructor(repository) {
		this.#repository = repository;
	}

	/**
	 * @param {string} commandLine
	 * @returns {BaseCommand}
	 * @throws {InvalidUserInputException}
	 */
	create(commandLine) {
		const commandType = this.#parseCommandType(commandLine);
		const commandParameters = this.#extractCommandParameters(commandLine);

		switch (commandType) {
			case CommandType.RegisterUser:
				return new RegisterUserCommand(commandParameters, this.#repository);
			case CommandType.Login:
				return new LoginCommand(commandParameters, this.#repository);
			case CommandType.Logout:
				return new LogoutCommand(commandParameters, this.#repository);
			case CommandType.AddVehicle:
				return new AddVehicleCommand(commandParameters, this.#repository);
			case CommandType.RemoveVehicle:
				return new RemoveVehicleCommand(commandParameters, this.#repository);
			case CommandType.AddComment:
				return new AddCommentCommand(commandParameters, this.#repository);
			case CommandType.RemoveComment:
				return new RemoveCommentCommand(commandParameters, this.#repository);
			case CommandType.ShowUsers:
				// ToDo
				throw new Error("Not implemented");
			case CommandType.ShowVehicles:
				return new ShowVehiclesCommand(commandParameters, this.#repository);
			default:
				throw new InvalidUserInputException(`Command with name: ${commandType} doesn"t exist!`);
		}
	}

	/**
	 * Parses the command type from the command line
	 * 
	 * @param {string} commandLine 
	 * 
	 * @returns {string} - A string representing the command type.
	 */
	#parseCommandType(commandLine) {
		const commandName = commandLine.split(" ")[0]; // Extracts the first word from the command line
		return CommandType[commandName]; // Returns the command type based on the command name
	}

	/**
	 * Extracts the command parameters from the command line
	 * 
	 * @param {string} commandLine - The command line input string.
	 * 
	 * @returns {string[]} - An array of strings representing the extracted command parameters.
	 */
	#extractCommandParameters(commandLine) {
		// Initialize an empty array to store the extracted parameters.
		const parameters = [];

		// Find the indices of the opening and closing comment tags in the command line.
		const indexOfOpenComment = commandLine.indexOf("{{");
		const indexOfCloseComment = commandLine.indexOf("}}");

		// If the command line contains a comment tag, extract the text between the tags as a parameter.
		if (indexOfOpenComment >= 0) {
			const commentStartIndex = indexOfOpenComment + 2;
			const commentLength = indexOfCloseComment - 2 - indexOfOpenComment;
			const commentParameter = commandLine.substring(commentStartIndex, commentStartIndex + commentLength);
			parameters.push(commentParameter);

			// Remove the comment tag and its contents from the command line.
			const regex = /{{.+(?=}})}}/;
			commandLine = commandLine.replace(regex, "");
		}

		// Find the index of the first space in the remaining command line and extract all subsequent words as parameters.
		const indexOfFirstSeparator = commandLine.indexOf(" ");
		parameters.push(...commandLine.substring(indexOfFirstSeparator + 1).split(" ").filter(Boolean));

		// Return the array of extracted parameters.
		return parameters;
	}
}


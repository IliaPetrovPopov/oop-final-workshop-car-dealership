import { CommandFactory } from './CommandFactory.js';

export class Engine {
	#commandFactory;

	/**
	* @param {CommandFactory} commandFactory
	*/
	constructor(commandFactory) {
		this.#commandFactory = commandFactory;
	}

	executeAll(inputLines) {
		for (const inputLine of inputLines) {
			try {
				const line = inputLine.trim();

				if (line === '') {
					console.log('Command cannot be empty.');
					continue;
				}

				if (line.toUpperCase() === 'EXIT') {
					break;
				}

				const command = this.#commandFactory.create(line);
				const result = command.execute();
				console.log(result.trim());
				console.log('####################');
			} catch (error) {
				if (error.message) {
					console.log(error.message);
				} else {
					console.log(error);
				}
				console.log('####################');
			}
		}
	}
}

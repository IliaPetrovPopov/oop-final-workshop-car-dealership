import { Comment } from "../../src/Models/Comment.js";
import { User } from "../../src/Models/User.js";
import { Role } from "../../src/Models/Role.js";
import { Truck } from "../../src/Models/Truck.js";

describe('Truck', () => {
	let truck;

	beforeEach(() => {
		// Create a new instance of Truck before each test
		truck = new Truck('Volvo', 'FH16', 150000, 50);
	});

	afterEach(() => {
		// Clean up any modifications made to the truck instance after each test
		truck = null;
	});

	it('should have the correct properties', () => {
		expect(truck.make).toBe('Volvo');
		expect(truck.model).toBe('FH16');
		expect(truck.price).toBe(150000);
		expect(truck.weightCapacity).toBe(50);
	});

	it('should set the weight capacity correctly', () => {
		expect(truck.weightCapacity).toBe(50);

		truck.weightCapacity = 70;

		expect(truck.weightCapacity).toBe(70);
	});

	it('should throw an error when setting an invalid weight capacity', () => {
		expect(() => {
			truck.weightCapacity = 0;
		}).toThrowError('Weight capacity must be between 1 and 100!');

		expect(() => {
			truck.weightCapacity = 200;
		}).toThrowError('Weight capacity must be between 1 and 100!');
	});

	it('should have the correct type', () => {
		expect(truck.type).toBe('Truck');
	});

	it('should have the correct number of wheels', () => {
		expect(truck.wheels).toBe(8);
	});

	it('should have the correct vehicle specifics', () => {
		expect(truck.vehicleSpecifics).toBe('Weight Capacity: 50t');
	});

	it('should print the truck information correctly', () => {
		const actualOutput = truck.print();
		expect(actualOutput).toContain('Truck:');
		expect(actualOutput).toContain('Make: Volvo');
		expect(actualOutput).toContain('Model: FH16');
		expect(actualOutput).toContain('Wheels: 8');
		expect(actualOutput).toContain('Price: $150000.0');
		expect(actualOutput).toContain('Weight Capacity: 50t');
		expect(actualOutput).toContain('--NO COMMENTS--');
	});

	it('should add a comment to the truck', () => {
		const user = new User('john_doe', 'John', 'Doe', 'password', Role.Normal);
		const comment = new Comment('Great truck!', user);

		truck.addComment(comment);

		expect(truck.comments.length).toBe(1);
		expect(truck.comments[0]).toBe(comment);
	});

	// TODO: Advanced! Uncomment the following test and make it pass
	// it('should throw an error when adding an invalid comment', () => {
	// 	expect(() => {
	// 		truck.addComment(null);
	// 	}).toThrowError('Comment cannot be null or undefined!');

	// 	expect(() => {
	// 		truck.addComment({});
	// 	}).toThrowError('Comment must be an instance of the Comment class!');
	// });
});
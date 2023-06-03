import { Comment } from "../../src/Models/Comment.js";
import { User } from "../../src/Models/User.js";
import { Role } from "../../src/Models/Role.js";
import { Car } from "../../src/Models/Car.js";

describe('User', () => {
	let user;

	beforeEach(() => {
		// Create a new instance of User before each test
		user = new User('john_doe', 'John', 'Doe', 'password', Role.Normal);
	});

	afterEach(() => {
		// Clean up any modifications made to the user instance after each test
		user = null;
	});

	it('should have the correct properties', () => {
		expect(user.username).toBe('john_doe');
		expect(user.firstName).toBe('John');
		expect(user.lastName).toBe('Doe');
		expect(user.password).toBe('password');
		expect(user.role).toBe(Role.Normal);
		expect(user.vehicles).toEqual([]);
	});

	it('should add a vehicle to the user', () => {
		const car = new Car('Toyota', 'Camry', 20000, 5);
		user.addVehicle(car);

		expect(user.vehicles.length).toBe(1);
		expect(user.vehicles[0]).toBe(car);
	});

	it('should remove a vehicle from the user', () => {
		const car1 = new Car('Toyota', 'Camry', 20000, 5);
		const car2 = new Car('Honda', 'Accord', 25000, 4);

		user.addVehicle(car1);
		user.addVehicle(car2);
		user.removeVehicle(car1);

		expect(user.vehicles.length).toBe(1);
		expect(user.vehicles[0]).toBe(car2);
	});

	// TODO: Uncomment this test after implementing the functionality related to the comments in the base class for all vehicles.
	// it('should add a comment to a vehicle', () => {
	// 	const car = new Car('Toyota', 'Camry', 20000, 5);
	// 	const comment = new Comment('Great car!', user);

	// 	user.addComment(comment, car);

	// 	expect(car.comments.length).toBe(1);
	// 	expect(car.comments[0]).toBe(comment);
	// });

	// TODO: Uncomment this test after implementing the functionality related to the comments in the base class for all vehicles.
	// it('should remove a comment from a vehicle', () => {
	// 	const car = new Car('Toyota', 'Camry', 20000, 5);
	// 	const comment1 = new Comment('Great car!', user);
	// 	const comment2 = new Comment('Nice color!', user);

	// 	user.addComment(comment1, car);
	// 	user.addComment(comment2, car);
	// 	user.removeComment(comment1, car);

	// 	expect(car.comments.length).toBe(1);
	// 	expect(car.comments[0]).toBe(comment2);
	// });

	it('should throw an error when trying to add vehicles beyond the limit for a normal user', () => {
		const car1 = new Car('Toyota', 'Camry', 20000, 5);
		const car2 = new Car('Honda', 'Accord', 25000, 4);
		const car3 = new Car('Ford', 'Mustang', 30000, 4);
		const car4 = new Car('Chevrolet', 'Camaro', 35000, 4);
		const car5 = new Car('BMW', 'M3', 40000, 4);
		const car6 = new Car('Mercedes', 'C-Class', 45000, 4);

		user.addVehicle(car1);
		user.addVehicle(car2);
		user.addVehicle(car3);
		user.addVehicle(car4);
		user.addVehicle(car5);

		// Try adding the 6th vehicle, which should throw an error
		expect(() => user.addVehicle(car6)).toThrowError(
			`You are not VIP and cannot add more than ${User.NORMAL_ROLE_VEHICLE_LIMIT} vehicles!`
		);
	});


	it('should throw an error when trying to add vehicles as an admin', () => {
		const admin = new User('admin', 'Admin', 'User', 'adminpass', Role.Admin);
		const car = new Car('Toyota', 'Camry', 20000, 5);

		expect(() => admin.addVehicle(car)).toThrowError('You are an admin and therefore cannot add vehicles!');
	});

	// TODO: Uncomment this test after implementing the functionality related to the comments in the base class for all vehicles.
	// it('should throw an error when trying to remove a comment authored by another user', () => {
	// 	const user1 = new User('user1', 'User', 'One', 'user1pass', Role.Normal);
	// 	const user2 = new User('user2', 'User', 'Two', 'user2pass', Role.Normal);
	// 	const car = new Car('Toyota', 'Camry', 20000, 5);
	// 	const comment = new Comment('Great car!', user1);

	// 	car.addComment(comment);

	// 	expect(() => user2.removeComment(comment, car)).toThrowError('You are not the author of the comment you are trying to remove!');
	// });

	it('should print vehicles owned by the user', () => {
		// Create vehicles and comments
		const car1 = new Car('Toyota', 'Camry', 20000, 5);
		const car2 = new Car('Honda', 'Accord', 25000, 4);
		const car3 = new Car('Ford', 'Mustang', 30000, 4);

		user.addVehicle(car1);
		user.addVehicle(car2);
		user.addVehicle(car3);

		const comment1 = new Comment('Great car!', user);
		const comment2 = new Comment('Nice color!', user);
		const comment3 = new Comment('Awesome!', user);

		user.addComment(comment1, car1);
		user.addComment(comment2, car2);
		user.addComment(comment3, car3);

		// Test the output
		const actualOutput = user.printVehicles();

		expect(actualOutput).toContain('--USER john_doe--');
		expect(actualOutput).toContain('1. Car:');
		expect(actualOutput).toContain('Make: Toyota');
		expect(actualOutput).toContain('Model: Camry');
		expect(actualOutput).toContain('Wheels: 4');
		expect(actualOutput).toContain('Price: $20000.0');
		expect(actualOutput).toContain('Seats: 5');
		expect(actualOutput).toContain('--COMMENTS--');
		expect(actualOutput).toContain('User: john_doe');
		expect(actualOutput).toContain('2. Car:');
		expect(actualOutput).toContain('Make: Honda');
		expect(actualOutput).toContain('Model: Accord');
		expect(actualOutput).toContain('Wheels: 4');
		expect(actualOutput).toContain('Price: $25000.0');
		expect(actualOutput).toContain('Seats: 4');
		expect(actualOutput).toContain('--COMMENTS--');
		expect(actualOutput).toContain('User: john_doe');
		expect(actualOutput).toContain('3. Car:');
		expect(actualOutput).toContain('Make: Ford');
		expect(actualOutput).toContain('Model: Mustang');
		expect(actualOutput).toContain('Wheels: 4');
		expect(actualOutput).toContain('Price: $30000.0');
		expect(actualOutput).toContain('Seats: 4');
		expect(actualOutput).toContain('--COMMENTS--');
		expect(actualOutput).toContain('User: john_doe');
	});
});
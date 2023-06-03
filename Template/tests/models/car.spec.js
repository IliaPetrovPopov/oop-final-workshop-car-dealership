import { Comment } from "../../src/Models/Comment.js";
import { User } from "../../src/Models/User.js";
import { Role } from "../../src/Models/Role.js";
import { Car } from "../../src/Models/Car.js";

describe("Car", () => {
	let car;

	beforeEach(() => {
		// Create a new instance of Car before each test
		car = new Car("Toyota", "Camry", 22000, 5);
	});

	afterEach(() => {
		// Clean up any modifications made to the car instance after each test
		car = null;
	});

	it("should have the correct properties", () => {
		expect(car.make).toBe("Toyota");
		expect(car.model).toBe("Camry");
		expect(car.price).toBe(22000);
		expect(car.seats).toBe(5);
	});

	it("should set the number of seats correctly", () => {
		expect(car.seats).toBe(5);

		car.seats = 7;

		expect(car.seats).toBe(7);
	});

	it("should throw an error when setting an invalid number of seats", () => {
		expect(() => {
			car.seats = 0;
		}).toThrowError("Seats must be between 1 and 10!");

		expect(() => {
			car.seats = 12;
		}).toThrowError("Seats must be between 1 and 10!");
	});

	it("should have the correct type", () => {
		expect(car.type).toBe("Car");
	});

	it("should have the correct number of wheels", () => {
		expect(car.wheels).toBe(4);
	});

	it("should have the correct vehicle specifics", () => {
		expect(car.vehicleSpecifics).toBe("Seats: 5");
	});

	it("should print the car information correctly", () => {
		const actualOutput = car.print();
		expect(actualOutput).toContain("Car:");
		expect(actualOutput).toContain("Make: Toyota");
		expect(actualOutput).toContain("Model: Camry");
		expect(actualOutput).toContain("Wheels: 4");
		expect(actualOutput).toContain("Price: $22000.0");
		expect(actualOutput).toContain("Seats: 5");
		expect(actualOutput).toContain("--NO COMMENTS--");
	});

	it("should add a comment to the car", () => {
		const user = new User("john_doe", "John", "Doe", "password", Role.Normal);
		const comment = new Comment("Great car!", user);

		car.addComment(comment);

		expect(car.comments.length).toBe(1);
		expect(car.comments[0]).toBe(comment);
	});

	// TODO: Advanced! Uncomment the following test and make it pass
	// it("should throw an error when adding an invalid comment", () => {
	// 	expect(() => {
	// 		car.addComment(null);
	// 	}).toThrowError("Comment cannot be null or undefined!");

	// 	expect(() => {
	// 		car.addComment({});
	// 	}).toThrowError("Comment must be an instance of the Comment class!");
	// });
});

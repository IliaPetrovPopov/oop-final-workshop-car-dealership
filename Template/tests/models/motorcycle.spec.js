import { Comment } from "../../src/Models/Comment.js";
import { User } from "../../src/Models/User.js";
import { Role } from "../../src/Models/Role.js";
import { Motorcycle } from "../../src/Models/Motorcycle.js";

describe('Motorcycle', () => {
    let motorcycle;

    beforeEach(() => {
        // Create a new instance of Motorcycle before each test
        motorcycle = new Motorcycle("Honda", "CBR", 10000, "Race");
    });

    afterEach(() => {
        // Clean up any modifications made to the motorcycle instance after each test
        motorcycle = null;
    });

	it("should have the correct properties", () => {
		expect(motorcycle.make).toBe("Honda");
		expect(motorcycle.model).toBe("CBR");
		expect(motorcycle.price).toBe(10000);
		expect(motorcycle.category).toBe("Race");
		expect(motorcycle.type).toBe("Motorcycle");
		expect(motorcycle.wheels).toBe(2);
	});
});
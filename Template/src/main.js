import { Repository } from "./Core/Repository.js";
import { CommandFactory } from "./Core/CommandFactory.js";
import { Engine } from "./Core/Engine.js";

const main = () => {
    const repository = new Repository();
    const commandFactory = new CommandFactory(repository);
    const engine = new Engine(commandFactory);

    const commands = [
        "RegisterUser p Petar Petrov 123456",
        "RegisterUser pesh0= Petar Petrov 123456",
        "RegisterUser pesh0 Petar Petrov 1234",
        "RegisterUser pesh0 Petar P 123456",
        "RegisterUser pesh0 P Petrov 123456",
        "RegisterUser pesho Petar Petrov 123456",
        "AddVehicle Motorcycle K Z1000 9999 Race",
        "AddVehicle Motorcycle Kawasaki Z1000 -1000 Race",
        "AddVehicle Motorcycle Kawasaki Z1000 9999 N",
        "AddVehicle Car Opel Vectra 5000 -1",
        "AddVehicle Truck Volvo FH4 11800 200",
        "AddVehicle Motorcycle Kawasaki Z 9999 Race",
        "AddVehicle Car Opel Vectra 5000 5",
        "AddVehicle Car Mazda 6 10000 5",
        "AddVehicle Motorcycle Suzuki V-Strom 7500 CityEnduro",
        "AddVehicle Car BMW Z3 11200 2",
        "AddVehicle Car BMW Z3 11200 2",
        "AddVehicle Car BMW Z3 11200 2",
        "AddComment {{U}} pesho 1",
        "AddComment {{Amazing speed and handling!}} pesho 1",
        "ShowUsers",
        "RegisterUser pesho Petar Petrov 123457",
        "Logout",
        "RegisterUser pesho Petar Petrov 123457",
        "RegisterUser gosho Georgi Georgiev 123457 VIP",
        "Logout",
        "Login pesho 123456",
        "Login gosho 123457",
        "Logout",
        "Login gosho 123457",
        "AddComment {{I like this one! It is faster than all the rest!}} pesho 1",
        "RemoveComment 1 1 pesho",
        "RemoveComment 2 5 pesho",
        "AddVehicle Motorcycle Suzuki GSXR1000 8000 Racing",
        "AddVehicle Car Skoda Fabia 2000 5",
        "AddVehicle Car BMW 535i 7200 5",
        "AddVehicle Motorcycle Honda Hornet600 4150 Race",
        "AddVehicle Car Mercedes S500L 15000 5",
        "AddVehicle Car Opel Zafira 8000 5",
        "AddVehicle Car Opel Zafira 7450 5",
        "AddVehicle Truck Volvo FH4 11800 40",
        "ShowUsers",
        "Logout",
        "RegisterUser ivancho Ivan Ivanov admin Admin",
        "AddVehicle Car Skoda Fabia 2000 5",
        "ShowUsers",
        "ShowVehicles gosho",
        "ShowVehicles ivanch0",
        "AddComment {{Empty comment}} pencho 1",
        "AddComment {{Empty comment}} pesho 20",
        "RemoveComment 1 1 pesho",
        "ShowVehicles pesho",
        "Logout",
        "Login pesho 123456",
        "AddComment {{I dream of having this one one day.}} pesho 1",
        "Logout",
        "Login ivancho admin",
        "AddComment {{What is the mileage on it?}} pesho 3",
        "Logout",
        "Login pesho 123456",
        "AddComment {{This one passed me by on the highway today. So pretty!}} pesho 3",
        "ShowVehicles pesho",
        "ShowVehicles gosho",
        "ShowVehicles ivancho",
        "Logout",
        "Login gosho 123457",
        "RemoveComment 1 2 pesho",
        "ShowVehicles pesho",
        "Logout",
        "Login pesho 123456",
        "RemoveVehicle 1",
        "ShowVehicles pesho",
        "Exit"
    ];
   

    const result = engine.executeAll(commands);
    console.log(result);
};

main();
enum VehicleType {
    Car,
    Truck,
    Motorcycle,
}

enum SpotType {
    Compact,
    Large,
    Motorcycle,
}

/**
 * Represents a vehicle that can be parked in a parking spot.
 * Each vehicle has a type and a plate number.
 */
class Vehicle {
    constructor(public type: VehicleType, public plate: string) {}
}

/**
 * A factory class for creating and managing Vehicle instances.
 * This class uses a Map to store and reuse Vehicle instances based on their plate numbers.
 */
class VehicleFactory {
    private static vehicleMap: Map<string, Vehicle> = new Map();

    public static createVehicle(type: VehicleType, plate: string): Vehicle {
        if (this.vehicleMap.has(plate)) {
            return this.vehicleMap.get(plate)!;
        }
        const vehicle = new Vehicle(type, plate);
        this.vehicleMap.set(plate, vehicle);
        return vehicle
    }
}

/**
 * Represents a parking spot in a parking lot.
 * Each spot has a type and can be occupied by a vehicle.
 */
class ParkingSpot {
    private occupied: boolean = false;
    private vehicle: Vehicle | null = null;

    constructor(public type: SpotType) {}

    public park(vehicle: Vehicle): boolean {
        if (!this.isOccupied()) {
            this.vehicle = vehicle;
            this.occupied = true;
            return true;
        }
        return false;
    }

    public leave(): void {
        this.vehicle = null;
        this.occupied = false;
    }

    public isOccupied(): boolean {
        return this.occupied;
    }

    public getVehicle(): Vehicle | null {
        return this.vehicle;
    }
}

/**
 * A factory class for creating and managing ParkingSpot instances.
 */
class ParkingSpotFactory {
    public static createSpot(type: SpotType): ParkingSpot {
        switch (type) {
            case SpotType.Compact:
            case SpotType.Large:
            case SpotType.Motorcycle:
                return new ParkingSpot(type);
            default:
                throw new Error("This spot type is not supported");
        }
    }
}

/**
 * Represents a level in a parking lot.
 * Each level has multiple parking spots of different types.
 * It can park and remove vehicles from the spots.
 */
class ParkingLevel {
    private spots: ParkingSpot[];
    private levelNumber: number;

    constructor(levelNumber: number, spotsConfig: { [key in SpotType]: number }) {
        this.levelNumber = levelNumber;
        this.spots = [];
    
        for (const spotTypeKey of Object.keys(spotsConfig)) {
            const spotType = Number(spotTypeKey) as SpotType;
            const count = spotsConfig[spotType];
            for (let i = 0; i < count; i++) {
                this.spots.push(ParkingSpotFactory.createSpot(spotType));
            }
        }
    }

    private canFitVehicle(spot: ParkingSpot, vehicle: Vehicle) {
        if (spot.type === SpotType.Compact && vehicle.type === VehicleType.Car) {
            return true;
        }
        if (spot.type === SpotType.Motorcycle && vehicle.type === VehicleType.Motorcycle) {
            return true;
        }
        if (spot.type === SpotType.Large && vehicle.type === VehicleType.Truck) {
            return true;
        }
        return false;
    }

    public parkVehicle(vehicle: Vehicle): boolean {
        for (const spot of this.spots) {
            if (!spot.isOccupied() && this.canFitVehicle(spot, vehicle)) {
                spot.park(vehicle);
                return true;
            }
        }
        return false
    }

    public removeVehicle(plate: string): boolean {
        for (const spot of this.spots) {
            const parkedVehicle = spot.getVehicle();
            if (parkedVehicle?.plate === plate) {
                spot.leave();
                return true;
            }
        }
        return false;
    }

    public getSpots(): ParkingSpot[] | [] {
        return this.spots;
    }
}

/**
 * Represents a parking lot.
 * It has multiple levels, each with multiple parking spots.
 * It uses the Singleton pattern to ensure that only one instance of the parking lot is created.
 */
class ParkingLot {
    private static instance : ParkingLot; //instancia unica do estacionamento
    private levels: Map<number, ParkingLevel>; //map pra armazenar niveis do estacionamento

    private constructor() {
        this.levels = new Map();
    }

    // metodo estatico pra obter a instancia unica do estacionamento
    public static getInstance(): ParkingLot {
        if (!ParkingLot.instance) {
            ParkingLot.instance = new ParkingLot();
        }
        return ParkingLot.instance;
    }

    public addLevel(spotsConfig: { [key in SpotType]: number }): void {
        const floor = this.levels.size + 1;
        const newLevel = new ParkingLevel(floor, spotsConfig);
        this.levels.set(floor, newLevel);
    }

    public getLevel(level: number): ParkingLevel | undefined {
        return this.levels.get(level);
    }
}

// Examples
const parkingLot = ParkingLot.getInstance();
parkingLot.addLevel({
    [SpotType.Compact]: 4,
    [SpotType.Large]: 0,
    [SpotType.Motorcycle]: 0
});
parkingLot.addLevel({
    [SpotType.Compact]: 0,
    [SpotType.Large]: 3,
    [SpotType.Motorcycle]: 0
});
parkingLot.addLevel({
    [SpotType.Compact]: 2,
    [SpotType.Large]: 2,
    [SpotType.Motorcycle]: 1,
});

// Exemplo 1: Criando veículos e estacionando-os
const car = VehicleFactory.createVehicle(VehicleType.Car, 'ABC-123');
const motorcycle = VehicleFactory.createVehicle(VehicleType.Motorcycle, 'DEF-456');
const truck = VehicleFactory.createVehicle(VehicleType.Truck, 'GHI-789');

console.log("Tentando estacionar veículos no primeiro nível...");

const level1 = parkingLot.getLevel(1);
if (level1) {
    console.log("Estacionando um carro no primeiro nível:", level1.parkVehicle(car)); // Deve retornar true
    console.log("Estacionando uma moto no primeiro nível:", level1.parkVehicle(motorcycle)); // Deve retornar false se só houver vagas Compactas
    console.log("Estacionando um caminhão no primeiro nível:", level1.parkVehicle(truck)); // Deve retornar false se só houver vagas Compactas
}

console.log("\n");

const level3 = parkingLot.getLevel(3);
if (level3) {
    console.log("Tentando estacionar veículos no terceiro nível...");
    console.log("Estacionando um carro no segundo nível:", level3.parkVehicle(car)); // Deve retornar true
    console.log("Estacionando uma moto no segundo nível:", level3.parkVehicle(motorcycle)); // Deve retornar true
    console.log("Estacionando um caminhão no segundo nível:", level3.parkVehicle(truck)); // Deve retornar true
}

console.log("\n");

// Exemplo 3: Removendo um veículo
console.log("Removendo o carro do segundo nível:", level3?.removeVehicle(car.plate)); // Deve retornar true
console.log("Tentando remover novamente o mesmo carro:", level3?.removeVehicle(car.plate)); // Deve retornar false

// Exemplo 4: Tentando estacionar em um spot ocupado
console.log("Estacionando o carro novamente no segundo nível:", level3?.parkVehicle(car)); // Deve retornar true
console.log("Estacionando o carro novamento no segundo nível:", level3?.parkVehicle(car)); // Deve retornar true
console.log("Tentando estacionar outro carro na mesma vaga:", level3?.parkVehicle(car)); // Deve retornar false porque a vaga já está ocupada

console.log("\n");

// Exemplo 5: Listando as vagas e veículos
console.log("Listando vagas e veículos no primeiro nível:");
level1?.getSpots().forEach((spot, index) => {
    console.log(`Vaga ${index + 1} - Tipo: ${SpotType[spot.type]}, Ocupada: ${spot.isOccupied()}, Veiculo: ${spot.getVehicle()?.plate}`);
});

console.log("\nListando vagas e veículos no segundo nível:");
level3?.getSpots().forEach((spot, index) => {
    console.log(`Vaga ${index + 1} - Tipo: ${SpotType[spot.type]}, Ocupada: ${spot.isOccupied()}, Veiculo: ${spot.getVehicle()?.plate}`);
});

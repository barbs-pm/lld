// Vehicle class to represent a vehicle
class Vehicle {
    constructor(licensePlate, vehicleType) {
        this.licensePlate = licensePlate;
        this.vehicleType = vehicleType; // For example, 'car', 'bike', etc.
    }
}

// ParkingSpot class to represent a single parking spot
class ParkingSpot {
    constructor(spotNumber, vehicleTypeAllowed) {
        this.spotNumber = spotNumber;
        this.vehicleTypeAllowed = vehicleTypeAllowed; // For example, 'car', 'bike', etc.
        this.vehicle = null; // Initially, no vehicle is parked
    }

    isAvailable() {
        return this.vehicle === null;
    }

    park(vehicle) {
        if (this.isAvailable() && vehicle.vehicleType === this.vehicleTypeAllowed) {
            this.vehicle = vehicle;
            console.log(`Vehicle with license plate ${vehicle.licensePlate} parked at spot ${this.spotNumber}`);
            return true;
        }
        console.log(`Cannot park vehicle at spot ${this.spotNumber}`);
        return false;
    }

    leave() {
        if (!this.isAvailable()) {
            const vehicle = this.vehicle;
            this.vehicle = null;
            console.log(`Vehicle with license plate ${vehicle.licensePlate} left spot ${this.spotNumber}`);
            return vehicle;
        }
        console.log(`No vehicle at spot ${this.spotNumber}`);
        return null;
    }
}

// ParkingLot class to represent the parking lot
class ParkingLot {
    constructor(spots) {
        this.spots = spots; // An array of ParkingSpot objects
    }

    parkVehicle(vehicle) {
        for (let spot of this.spots) {
            if (spot.isAvailable() && spot.vehicleTypeAllowed === vehicle.vehicleType) {
                spot.park(vehicle);
                return;
            }
        }
        console.log('No available spot for this vehicle.');
    }

    leaveSpot(spotNumber) {
        const spot = this.spots.find(s => s.spotNumber === spotNumber);
        if (spot) {
            spot.leave();
        } else {
            console.log('Invalid spot number.');
        }
    }

    getAvailableSpots() {
        return this.spots.filter(spot => spot.isAvailable());
    }
}

// Example Usage:
const spots = [
    new ParkingSpot(1, 'car'),
    new ParkingSpot(2, 'car'),
    new ParkingSpot(3, 'bike'),
];

const parkingLot = new ParkingLot(spots);

const car1 = new Vehicle('ABC-123', 'car');
const bike1 = new Vehicle('XYZ-987', 'bike');

parkingLot.parkVehicle(car1); // Parks car in the first available 'car' spot
parkingLot.parkVehicle(bike1); // Parks bike in the first available 'bike' spot

console.log(parkingLot.getAvailableSpots()); // Shows remaining available spots

parkingLot.leaveSpot(1); // Vehicle leaves spot 1
parkingLot.leaveSpot(3); // Vehicle leaves spot 3

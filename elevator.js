// Definindo as direções possíveis do elevador
const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    IDLE: 'IDLE'
};

// Classe para gerenciar requisições de andares
class ElevatorRequest {
    constructor(floor) {
        this.floor = floor;
    }
}

// Classe que define o comportamento de um elevador
class Elevator {
    constructor(id, totalFloors) {
        this.id = id;
        this.currentFloor = 0; // O elevador começa no térreo
        this.direction = Direction.IDLE; // Estado inicial parado
        this.totalFloors = totalFloors; // Total de andares no prédio
        this.requestQueue = []; // Fila de requisições
    }

    // Adiciona uma requisição de andar à fila
    addRequest(request) {
        this.requestQueue.push(request);
        this.processRequests();
    }

    // Processa as requisições na fila
    processRequests() {
        while (this.requestQueue.length > 0) {
            let request = this.requestQueue.shift();
            
            if (request.floor > this.currentFloor) {
                this.direction = Direction.UP;
                this.moveUp(request.floor);
            } else if (request.floor < this.currentFloor) {
                this.direction = Direction.DOWN;
                this.moveDown(request.floor);
            } else {
                this.direction = Direction.IDLE;
            }

            console.log(`Elevador ${this.id} está no andar ${this.currentFloor}, direção: ${this.direction}`);
        }
        this.direction = Direction.IDLE; // Elevador fica parado ao terminar
    }

    // Função para mover o elevador para cima
    moveUp(targetFloor) {
        while (this.currentFloor < targetFloor) {
            this.currentFloor++;
            console.log(`Elevador ${this.id} subindo para o andar ${this.currentFloor}`);
        }
    }

    // Função para mover o elevador para baixo
    moveDown(targetFloor) {
        while (this.currentFloor > targetFloor) {
            this.currentFloor--;
            console.log(`Elevador ${this.id} descendo para o andar ${this.currentFloor}`);
        }
    }
}

// Classe para gerenciar o sistema de elevadores
class ElevatorSystem {
    constructor(numElevators, totalFloors) {
        this.elevators = [];
        for (let i = 0; i < numElevators; i++) {
            this.elevators.push(new Elevator(i + 1, totalFloors));
        }
    }

    // Atribui a requisição para o elevador mais próximo
    requestElevator(floor) {
        let closestElevator = this.elevators[0];
        let minDistance = Math.abs(this.elevators[0].currentFloor - floor);

        for (let elevator of this.elevators) {
            let distance = Math.abs(elevator.currentFloor - floor);
            if (distance < minDistance) {
                minDistance = distance;
                closestElevator = elevator;
            }
        }

        console.log(`Elevador ${closestElevator.id} foi designado para o andar ${floor}`);
        closestElevator.addRequest(new ElevatorRequest(floor));
    }
}

// Exemplo de uso do sistema
const elevatorSystem = new ElevatorSystem(3, 10); // 3 elevadores, 10 andares
elevatorSystem.requestElevator(5); // Solicita um elevador para o andar 5
elevatorSystem.requestElevator(2); // Solicita um elevador para o andar 2
elevatorSystem.requestElevator(8); // Solicita um elevador para o andar 8

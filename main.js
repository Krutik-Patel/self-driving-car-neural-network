const carCanvas = document.querySelector("#self-driving-car");
const networkCanvas = document.querySelector("#networkCanvas");
carCanvas.width = 200;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
let N = 500;
let carsRemaining = N;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("newBrain")) {
    for (let i = 0; i < N; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("newBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.01);
        }
    }
}
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -450, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -450, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -910, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2),
];

function animate(time) {


    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < N; i++) {
        cars[i].update(road.borders, traffic);
    }
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    // you could also use the clearRect method 
    // of the canvas instead of this but, 
    // while using that method you will not 
    // get the benefit of resizing the canvas 
    // automatically

    bestCar = cars.find(e => e.y == Math.min(...cars.map(c => c.y)));

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2;
    for (let i = 1; i < N; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);
    carCtx.restore();
    // if you put restore before the road and 
    // car draw, then the camera will not move
    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}

function generateCars(N) {
    let cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

animate();

function save() {
    localStorage.setItem("newBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("newBrain");
}

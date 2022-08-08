const canvas = document.querySelector("#self-driving-car");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;
    // you could also use the clearRect method 
    // of the canvas instead of this but, 
    // while using that method you will not 
    // get the benefit of resizing the canvas 
    // automatically

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);
    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "red");
    }
    car.draw(ctx, "blue");
    ctx.restore();
    // if you put restore before the road and 
    // car draw, then the camera will not move
    requestAnimationFrame(animate);
}

animate();
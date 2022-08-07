const canvas = document.querySelector("#self-driving-car");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    // you could also use the clearRect method 
    // of the canvas instead of this but, 
    // while using that method you will not 
    // get the benefit of resizing the canvas 
    // automatically


    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}

animate();
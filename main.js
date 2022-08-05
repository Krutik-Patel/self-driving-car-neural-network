const canvas = document.querySelector("#self-driving-car");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

function animate() {
    canvas.height = window.innerHeight;
    // you could also use the clearRect method 
    // of the canvas instead of this but, 
    // while using that method you will not 
    // get the benefit of resizing the canvas 
    // automatically

    car.draw(ctx);
    car.update();
    requestAnimationFrame(animate);
}

animate();
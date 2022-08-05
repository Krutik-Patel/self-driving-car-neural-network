const canvas = document.querySelector("#self-driving-car");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

function animate() {
    requestAnimationFrame(animate);
    car.update();
    car.draw(ctx);
}

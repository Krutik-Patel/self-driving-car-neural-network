class Sensors {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 100;
        this.raySpread = Math.PI / 4;
        this.rays = [];
    }

    update() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const x = lerp(-this.raySpread, this.raySpread, this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)) - this.car.angle;
            const startPoint = { x: this.car.x, y: this.car.y };
            const endPoint = { x: this.car.x + Math.sin(x) * this.rayLength, y: this.car.y - Math.cos(x) * this.rayLength };
            this.rays.push([startPoint, endPoint]);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.rayCount; i++) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.stroke();
        }
    }
}
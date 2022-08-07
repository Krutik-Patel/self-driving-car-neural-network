class Sensors {
    constructor(car) {
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 100;
        this.raySpread = Math.PI / 4;
        this.rays = [];
        this.reading = [];

    }

    update(roadBorders) {
        this.#castRays();
        this.reading = [];
        for (let i = 0; i < this.rayCount; i++) {
            this.reading.push(this.#getReading(this.rays[i], roadBorders));
        }
    }

    #getReading(rays, roadBorders) {
        let A = { x: 100, y: 100 };
        let B = { x: 200, y: 200 };
        let C = { x: 100, y: 200 };
        let D = { x: 200, y: 100 };
        console.log((getIntersection(A, B, C, D)));
        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(rays[0], rays[1], roadBorders[i][0], roadBorders[i][1]);
            if (touch) {
                touches.push(touch);
            }
        }
        if (touches.length == 0) {
            return null;
        }
        else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }


    #castRays() {
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
            let end = this.rays[i][1];
            if (this.reading[i]) {
                end = this.reading[i];
            }

            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // the black line that shows the intersection
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}
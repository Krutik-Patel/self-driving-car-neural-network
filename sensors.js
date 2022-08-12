class Sensors {
    constructor(car) {
        this.car = car;
        this.rayCount = 10;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2;
        this.rays = [];
        this.reading = [];

    }

    update(roadBorders, traffic) {
        this.#castRays();
        this.reading = [];
        for (let i = 0; i < this.rayCount; i++) {
            this.reading.push(this.#getReading(this.rays[i], roadBorders, traffic));
        }
        // console.log(this.reading);
    }

    #getReading(rays, roadBorders, traffic) {
        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(rays[0], rays[1], roadBorders[i][0], roadBorders[i][1]);
            if (touch) {
                touches.push(touch);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;
            for (let j = 0; j < poly.length; j++) {
                const value = getIntersection(rays[0], rays[1], poly[j], poly[(j + 1) % poly.length]);
                if (value) {
                    touches.push(value)
                }
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
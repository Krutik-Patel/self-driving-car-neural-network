class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.damaged = false;
        if (controlType != "DUMMY") {
            this.sensors = new Sensors(this);
            this.brain = new NeuralNetwork([this.sensors.rayCount, 6, 4]);
        }
        this.useBrain = controlType == "AI";
        this.controls = new Controls(controlType);
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;

        this.angle = 0;


    }

    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessdamage(roadBorders, traffic);
        }
        // this.#move();
        // this.polygon = this.#createPolygon();
        // this.damaged = this.#assessdamage(roadBorders);
        if (this.sensors) {
            this.sensors.update(roadBorders, traffic);
            const offsets = this.sensors.reading.map(s => s == null ? 0 : 1 - s.offset);
            // console.log(offsets);
            const outputs = NeuralNetwork.feedForward(offsets, this.brain);
            // console.log(outputs);
            if (this.useBrain) {
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }

        // since the update function is very 
        //large, we can make a private function
        // in the class, specifically for 
        // the move controls


    }

    #assessdamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polyIntersection(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polyIntersection(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x + Math.sin(this.angle - alpha) * rad,
            y: this.y + Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x + Math.sin(this.angle + alpha) * rad,
            y: this.y + Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x: this.x + Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y + Math.cos(Math.PI + this.angle - alpha) * rad
        });
        points.push({
            x: this.x + Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y + Math.cos(Math.PI + this.angle + alpha) * rad
        });
        return points;
    }

    #move() {
        if (this.controls.forward) {
            this.speed -= this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed += this.acceleration;
        }
        if (this.speed > this.maxSpeed / 2) {
            this.speed = this.maxSpeed / 2;
        }
        if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
            // this if statement is used 
            // because if no key is pressed 
            // right now, then the car will 
            // keep moving since the speed will 
            // toggle between the two values
        }
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.right) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.left) {
                this.angle -= 0.03 * flip;
            }
        }
        this.y += Math.cos(this.angle) * this.speed;
        this.x += Math.sin(this.angle) * this.speed;
    }

    draw(ctx, colour) {
        if (this.damaged) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = colour;
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        // we have a better way for this code
        // by creating a polygon and then considering its edges
        // since we can then make a polygon of any shape and not necessarily rect.
        // ctx.save()
        // ctx.translate(this.x, this.y);
        // ctx.rotate(-this.angle)
        // ctx.beginPath();
        // ctx.rect(-(this.width / 2), - (this.height / 2), this.width, this.height);
        // ctx.fill()
        // ctx.restore();
        // the restore method, pops the pushed 
        //canvas state from the stack, since you 
        //translate to that location, we need to 
        //be back to that state, this is 
        //facilitated by the restore function

        // drawing the sensor
        if (this.sensors) {
            this.sensors.draw(ctx);
        }
    }
}
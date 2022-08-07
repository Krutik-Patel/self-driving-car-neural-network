class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.controls = new Controls();
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = 0;


    }

    update() {
        this.#move();
        // since the update function is very 
        //large, we can make a private function
        // in the class, specifically for 
        // the move controls


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

    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle)
        ctx.beginPath();
        ctx.rect(-(this.width / 2), - (this.height / 2), this.width, this.height);
        ctx.fill()
        ctx.restore();
        // the restore method, pops the pushed 
        //canvas state from the stack, since you 
        //translate to that location, we need to 
        //be back to that state, this is 
        //facilitated by the restore function
    }
}
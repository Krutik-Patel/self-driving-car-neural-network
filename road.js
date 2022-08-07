class Road {
    constructor(x, width, laneCount = 3

    ) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
        this.left = this.x - this.width / 2;
        // using this.x and this.width in the 
        // above code will cause the white 
        // line at the end of the road not to 
        // show up on the canvas

        this.right = this.x + this.width / 2;
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        console.log(laneWidth);
        return (this.left + laneWidth / 2 + laneWidth * laneIndex);
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(this.left, this.right, i / this.laneCount);

            if ((i != 0) && (i != this.laneCount)) {
                ctx.setLineDash([20, 20]);
            }
            else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

    }
}
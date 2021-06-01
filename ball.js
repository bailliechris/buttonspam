class Ball {
    constructor(x, y, sx, sy, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
    }

    get get_id() {
        return this.id;
    }

    // Getter
    get update() {
        return {
            'x': this.x,
            'y': this.y
        }
    }

    // Method
    calcUpdate(maxx, maxy) {
        this.x += this.sx;
        this.y += this.sy;

        if (this.x > maxx) {
            this.x = maxx;
            this.sx = this.sx * -1;
        }

        if (this.y > maxy) {
            this.y = maxy;
            this.sy = this.sy * -1;
        }

        if (this.x < 0) {
            this.x = 0;
            this.sx = this.sx * -1;
        }

        if (this.y < 0) {
            this.y = 0;
            this.sy = this.sy * -1;
        }
    }

    bouncex() {
        this.sx = -this.sx;
    }

    bouncey() {
        this.sy = -this.sy;
    }
}

module.exports = Ball;
class Position {
    constructor(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
    greaterThan(other) {
        return this.x > other.x && this.y > other.y;
    }
    greaterThanOrEqual(other) {
        return this.x >= other.x && this.y >= other.y;
    }
    lessThan(other) {
        return this.x < other.x && this.y < other.y;
    }
    lessThanOrEqual(other) {
        return this.x <= other.x && this.y <= other.y;
    }
    equal(other) {
        return this.x == other.x && this.y == other.y;
    }
    goto(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    multiply(other) {
        if (typeof other == "number") {
            this.x *= other;
            this.y *= other;
        }
        else {
            this.x *= other.x;
            this.y *= other.y;
        }
    }
    length(basis = new Position(0, 0)) {
        let resX = (this.x - basis.x) ** 2;
        let resY = (this.y - basis.y) ** 2;
        return Math.sqrt(resX + resY);
    }
    inRadius(basis, radius) {
        return this.length() <= radius;
    }
    inArea(bottomLeft, topRight) {
        return this.greaterThanOrEqual(bottomLeft) &&
            this.lessThanOrEqual(topRight);
    }
}
export default Position;

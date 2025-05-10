
class Position {
    x:number;
    y:number;

    constructor(x?:number, y?:number){        
        this.x =  x?x:0;
        this.y =  y?y:0;
    }

    greaterThan(other:Position){
        return this.x>other.x && this.y>other.y;
    }

    greaterThanOrEqual(other:Position){
        return this.x>=other.x && this.y>=other.y;
    }

    lessThan(other:Position){
        return this.x<other.x && this.y<other.y;
    }

    lessThanOrEqual(other:Position){
        return this.x<=other.x && this.y<=other.y;
    }

    equal(other:Position){
        return this.x==other.x && this.y==other.y;
    }

    goto(pos:Position):void{
        this.x = pos.x;
        this.y = pos.y
    }

    add(other:Position){
        this.x += other.x;
        this.y += other.y;
    }

    multiply(other:Position|number):void{
        if(typeof other == "number"){
            this.x *= other;
            this.y *= other;
        }else{
            this.x *= other.x;
            this.y *= other.y;
        }
    }

    length(basis:Position = new Position(0,0)):number{
        let resX = (this.x-basis.x)**2;
        let resY = (this.y-basis.y)**2;
        return Math.sqrt(resX + resY);
    }

    inRadius(basis:Position, radius:number):boolean{
        return this.length()<=radius;
    }

    inArea(bottomLeft:Position, topRight:Position):boolean{
        return this.greaterThanOrEqual(bottomLeft) &&
            this.lessThanOrEqual(topRight);
    }
}

export default Position;
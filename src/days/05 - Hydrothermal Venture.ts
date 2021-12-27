/* Day 05 - Hydrothermal Venture*/

import { start } from "repl"

class Line {
    p1: Point
    p2: Point

    constructor(x1: number, y1: number, x2: number, y2: number){
        this.p1 = new Point(x1, y1)
        this.p2 = new Point(x2, y2)
    }

    getLinePoints(): Point[]{
        let list: Point[] = []
        if(!this.isDiagonal()){
            //To avoid making spaghetti im making the loop super generalized
            let constantCoord
            let startCoord, endCoord
            let dynamicX //true if X is coordinate that is changing, false is Y

            if(this.p1.x !== this.p2.x){
                dynamicX = true
                constantCoord = this.p1.y
                startCoord = (this.p2.x >= this.p1.x) ? this.p1.x : this.p2.x
                endCoord  = (this.p2.x >= this.p1.x) ? this.p2.x : this.p1.x
            } else {
                dynamicX = false
                constantCoord = this.p1.x
                startCoord = (this.p2.y >= this.p1.y) ? this.p1.y : this.p2.y
                endCoord  = (this.p2.y >= this.p1.y) ? this.p2.y : this.p1.y
            }

            for(let point=startCoord; point <= endCoord; point++){
                let newPoint
                if(dynamicX){
                    newPoint = new Point(point, constantCoord)
                } else {
                    newPoint = new Point(constantCoord, point)

                }
                
                list.push(newPoint)
            }
        } else {
            console.error("getLinePoints is not implemented for diagonal lines!") //Hello future me!
        }

        return list
    }

    isDiagonal(): boolean{
        return !(this.p1.x === this.p2.x || this.p1.y === this.p2.y)
    }
}

class Point {
    x: number
    y: number

    constructor(x: number, y:number){
        this.x = x
        this.y = y
    }

    toPointString(): string{
        return this.x.toString()+","+this.y.toString()
    }
}

let lines: Line[] = []

function buildLines(data: string, excludeDiagonals: boolean){
    let numStrings = [...data.matchAll(/\d+/gm)]
    let numbersArray: number[] = []
    for(const numStr of numStrings){
        numbersArray.push(parseInt(numStr.toString()))
    }
    
    for(let i=0; i<numbersArray.length; i+=4){
        let newLine = new Line(numbersArray[i],numbersArray[i+1],numbersArray[i+2],numbersArray[i+3])
        if(excludeDiagonals && newLine.isDiagonal()) continue
        lines.push(newLine)
    }
}

//Add all line points to the hitmap with a value of false. If it already exists then set the value to true 
export function RunA(data: string){
    buildLines(data, true)
    let hitMap: Map<string, boolean> = new Map()

    for(const line of lines){
        let linePoints = line.getLinePoints()
        for(const point of linePoints){
            let pointStr = point.toPointString()
            if(hitMap.has(pointStr)){
                hitMap.set(pointStr, true)
            } else {
                hitMap.set(pointStr, false)
            }
        }
    }

    let multiHitCount = 0
    for(const [point, value] of hitMap.entries()){
        if(value) multiHitCount++
    }
    console.log("===== PART 1 RESULTS =====")
    console.log("Final Count: "+multiHitCount)

}
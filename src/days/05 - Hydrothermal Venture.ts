/* Day 05 - Hydrothermal Venture*/

import { start } from "repl"

class Line {
    p1: Point
    p2: Point

    constructor(x1: number, y1: number, x2: number, y2: number){
        this.p1 = new Point(x1, y1)
        this.p2 = new Point(x2, y2)
    }

    length(): number{
        if(this.isDiagonal()){
            return Math.abs(this.p1.x - this.p2.x)
        } else {
            return Math.abs((this.p1.x - this.p2.x) + (this.p1.y - this.p2.y))
        }
    }

    getLinePoints(): Point[]{
        let list: Point[] = []
        let length = this.length()
        let vector = new Point((this.p2.x - this.p1.x)/length, (this.p2.y - this.p1.y)/length) //just reuse the point class as a vector /shrug

        for(let i=0; i<length+1; i++){
            let newPoint = new Point(this.p1.x + (vector.x * i), this.p1.y + (vector.y * i))
            list.push(newPoint)
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

function buildLines(data: string, excludeDiagonals: boolean): Line[]{
    let lines: Line[] = []
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

    return lines
}

//Add all line points to the hitmap with a value of false. If it already exists then set the value to true 
export function RunA(data: string){
    let lines = buildLines(data, true)
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

export function RunB(data: string){
    let lines = buildLines(data, false)
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
    console.log("===== PART 2 RESULTS =====")
    console.log("Final Count: "+multiHitCount) //left off: answer too high
}
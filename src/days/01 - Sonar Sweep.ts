/* Day 01 - Sonar Sweep */
import { assert } from "console"

function sumOfArray(array: number[]):number {
    let sum = 0
    for(const number of array){
        sum += number
    }
    return sum
}

export function RunA(data: string){
    let dataArray = data.split(/\r?\n/)
    let increases = 0
    let decreases = 0

    for(let i=0; i<dataArray.length; i++){
        if(i == 0){ continue }

        if(dataArray[i] > dataArray[i-1]){
            increases++
        } else {
            decreases++
        }
    }

    console.log("===== RESULT =====")
    console.log("Total data points: "+dataArray.length)
    console.log("Increases: "+increases)
    console.log("Decreases: "+decreases)
}

export function RunB(data: string){
    
}
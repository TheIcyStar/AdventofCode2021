/* Day 01 - Sonar Sweep */
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

    console.log("===== PART 1 RESULT =====")
    console.log("Total data points: "+dataArray.length)
    console.log("Increases: "+increases)
    console.log("Decreases: "+decreases)
}

export function RunB(data: string){
    let dataArray = data.split(/\r?\n/)
    let increases = 0
    let decreases = 0

    for(let i=0; i<dataArray.length; i++){
        if(i == 0){ continue }
        
        let curWindow = []
        for(let iWindow=i; iWindow < i+3; iWindow++){
            curWindow.push(parseInt(dataArray[iWindow]))
        }

        let lastWindow = [...curWindow]
        lastWindow.pop()
        lastWindow.push(parseInt(dataArray[i-1]))

        if(sumOfArray(curWindow) > sumOfArray(lastWindow)){
            increases++
        } else {
            decreases++
        }
    }

    console.log("===== PART 2 RESULT =====")
    console.log("Total data points: "+dataArray.length)
    console.log("Increases: "+increases)
    console.log("Decreases: "+decreases)
}
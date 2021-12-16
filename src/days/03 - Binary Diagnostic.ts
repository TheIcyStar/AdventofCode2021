/* Day 03 - Binary Diagnostic */

export function RunA(data: string){
    let dataArray = data.split(/\r?\n/)
    let countTable = [0,0,0,0,0,0,0,0,0,0,0,0] //12

    //count bits
    for(const row of dataArray){
        for(let i=0; i<row.length; i++){
            if(row[i] === "1"){
                countTable[i] += 1
            }
        }
    }

    //bit manip to victory
    let gamma = 0
    for(let i=0; i<countTable.length; i++){
        gamma = gamma << 1 //move last bits left
        if(countTable[i] >= dataArray.length / 2){
            gamma = gamma | 1 //set to one
        }
    }

    //Calculate epsilon
    let dropMask = (1 << countTable.length) - 1 //create a mask to use to drop extra bits
    let epsilon = ~gamma //create inverse of gamma
    epsilon = (epsilon & dropMask) | (0 & ~dropMask) //select the bits we need with a bit mask

    console.log("===== PART 1 RESULT =====")
    console.log("gamma: "+gamma)
    console.log("epsilon: "+epsilon)
    console.log("Multiply result (Power consumption): "+gamma * epsilon)
}

export function filterWithSlot(array: string[], filterIndex: number): [string[], string[]]{
    let onesList = []
    let zeroesList = []
    for(const row of array){
        if(row[filterIndex] === "1"){
            onesList.push(row)
        } else {
            zeroesList.push(row)
        }
    }

    return [onesList, zeroesList]
}

export function RunB(data: string){
    let dataArray = data.split(/\r?\n/)
    let dataArrayCopy = [...dataArray]
    let oxygen
    let scrubber

    //oxygen
    for(let i=0; i < dataArray[0].length; i++){
        let filterResult = filterWithSlot(dataArray, i)
        if((filterResult[0].length === 1 && filterResult[1].length === 0) || (filterResult[0].length === 0 && filterResult[1].length === 1)){
            break
        }
        if(filterResult[0].length >= filterResult[1].length){
            dataArray = filterResult[0]
        } else {
            dataArray = filterResult[1]
        }
    }
    oxygen = dataArray[0]

    //scrubber
    for(let i=0; i < dataArrayCopy[0].length; i++){
        let filterResult = filterWithSlot(dataArrayCopy, i)
        if((filterResult[0].length === 1 && filterResult[1].length === 0) || (filterResult[0].length === 0 && filterResult[1].length === 1)){
            break
        }
        if(filterResult[0].length >= filterResult[1].length){
            dataArrayCopy = filterResult[1]
        } else {
            dataArrayCopy = filterResult[0]
        }
    }
    scrubber = dataArrayCopy[0]

    //convert to base10
    let oxyRating = parseInt(oxygen, 2)
    let scrubRating = parseInt(scrubber, 2)

    console.log("===== PART 2 RESULT =====")
    console.log("oxygen: "+oxyRating)
    console.log("scrubber: "+scrubRating)
    console.log("Multiply result (life support rating): "+oxyRating * scrubRating)


    let a = ""
}
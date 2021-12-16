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
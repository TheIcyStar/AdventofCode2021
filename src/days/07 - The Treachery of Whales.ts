/* Day 07 - The Treachery of Whales*/
let MAX_BALLPARK = 1000
let MIN_BALLPARK = 0

function getTotalFuelCost(crabs: number[], position: number, additorial: boolean): number{
    let totalFuel = 0

    for(const crab of crabs){
        if(additorial){ //It's like factorial but with adding! https://math.stackexchange.com/questions/60578/what-is-the-term-for-a-factorial-type-operation-but-with-summation-instead-of-p
            let n = Math.abs(crab - position)
            totalFuel += (n*(n+1))/2
        } else {
            totalFuel += Math.abs(crab - position)
        }
    }

    return totalFuel
}

//The further the distance from the best number, the more fuel it costs.
//This problem is binary searchable
//but the time complexity of a brute force solution is less than the time complexiy of implementing a binary search 😉
export function RunA(data: string){
    let crabStrings = data.split(",")
    let crabs: number[] = []
    for(const crabStr of crabStrings){
        crabs.push(parseInt(crabStr))
    }

    let bestFuel = Number.MAX_SAFE_INTEGER
    let bestPos
    for(let i=MIN_BALLPARK; i <= MAX_BALLPARK; i++){
        let cost = getTotalFuelCost(crabs, i, false)
        if(cost < bestFuel){
            bestFuel = cost
            bestPos = i
        }
    }

    console.log("===== PART 1 RESULT =====")
    console.log("Position: "+bestPos+" | Fuel cost:"+bestFuel)
}

export function RunB(data: string){
    let crabStrings = data.split(",")
    let crabs: number[] = []
    for(const crabStr of crabStrings){
        crabs.push(parseInt(crabStr))
    }

    let bestFuel = Number.MAX_SAFE_INTEGER
    let bestPos
    for(let i=MIN_BALLPARK; i <= MAX_BALLPARK; i++){
        let cost = getTotalFuelCost(crabs, i, true)
        if(cost < bestFuel){
            bestFuel = cost
            bestPos = i
        }
    }

    console.log("===== PART 1 RESULT =====")
    console.log("Position: "+bestPos+" | Fuel cost:"+bestFuel)
}
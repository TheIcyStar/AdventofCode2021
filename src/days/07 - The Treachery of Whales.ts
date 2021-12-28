/* Day 07 - The Treachery of Whales*/
let MAX_BALLPARK = 1000
let MIN_BALLPARK = 0

function getTotalFuelCost(crabs: number[], position: number): number{
    let totalFuel = 0

    for(const crab of crabs){
        totalFuel += Math.abs(crab - position)
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
        let cost = getTotalFuelCost(crabs, i)
        if(cost < bestFuel){
            bestFuel = cost
            bestPos = i
        }
    }

    console.log("===== PART 1 RESULT =====")
    console.log("Position: "+bestPos+" | Fuel cost:"+bestFuel)
    
}
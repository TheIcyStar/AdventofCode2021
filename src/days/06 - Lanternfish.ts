/* Day 06 - Lanternfish */
let SIMULATION_LENGTH = 80

//Use two arrays. The first holds the number of fish that will spawn on that given day of the week (indexes 0-6 are days 1-7)
//The second holds a number of fish that will be added to fishweek soon. (New fish pushed to end of array, older fish shifted from begining)

export function RunA(data: string){
    let rawFish = data.split(",")
    let fishWeek: number[] = [0,0,0,0,0,0,0]
    let growPool: number[] = [0,0]

    //order fish
    for(const fish of rawFish){
        let fishNum = parseInt(fish)
        if(fishWeek[fishNum]){
            fishWeek[fishNum]++
        } else {
            fishWeek[fishNum] = 1
        }
    }

    //run "simulation"
    for(let day=0; day < SIMULATION_LENGTH; day++){
        let spawningFish = fishWeek[day%7]
        fishWeek[day%7] += growPool.shift() ?? 0
        growPool.push(spawningFish)
    }

    //calculate fish
    let sum = 0n //BigInt turned out to be unnecessary /shrug
    for(const fish of fishWeek){ sum += BigInt(fish) }
    for(const fish of growPool){ sum += BigInt(fish) }

    console.log("===== RESULTS =====")
    console.log("Fish: "+sum)
}

export function RunB(data: string){
    console.log("===== PART 2 ======")
    SIMULATION_LENGTH = 256
    RunA(data) //Why copy code when three line do trick? 😎
}
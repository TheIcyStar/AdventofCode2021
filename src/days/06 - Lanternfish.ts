/* Day 06 - Lanternfish */

//Holds the number of fish that will spawn on that given day of the week (indexes 0-6 are days 1-7)
let fishWeek: number[] = [0,0,0,0,0,0,0]
//Holds a number of fish that will be added to fishweek soon. (New fish pushed to end of array, older fish shifted from begining)
let growPool: number[] = [0,0]
let SIMULATION_LENGTH = 80

export function RunA(data: string){
    let rawFish = data.split(",")

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
    let sum = 0
    for(const fish of fishWeek){ sum += fish }
    for(const fish of growPool){ sum += fish }

    console.log("===== PART 1 RESULTS =====")
    console.log("Fish: "+sum)
}
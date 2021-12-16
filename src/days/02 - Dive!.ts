/* Day 02 - Dive! */


export function RunA(data: string){
    let dataArray = data.split(/\r?\n/)
    let distance = 0
    let depth = 0

    for(let i=0; i<dataArray.length; i++){
        let split = dataArray[i].split(" ")
        let delta = parseInt(split[1])

        if(split[0] === "forward"){
            distance += delta
        } else if(split[0] === "down") {
            depth += delta
        } else if(split[0] === "up") {
            depth -= delta
        }
    }

    console.log("===== PART 1 RESULT =====")
    console.log("distance: "+distance)
    console.log("depth: "+depth)
    console.log("Multiply result: "+distance * depth)
}

export function RunB(data: string){
    let dataArray = data.split(/\r?\n/)
    let distance = 0
    let depth = 0
    let aim = 0

    for(let i=0; i<dataArray.length; i++){
        let split = dataArray[i].split(" ")
        let delta = parseInt(split[1])

        if(split[0] === "forward"){
            distance += delta
            depth += (aim * delta)
        } else if(split[0] === "down") {
            aim += delta
        } else if(split[0] === "up") {
            aim -= delta
        }
    }

    console.log("===== PART 2 RESULT =====")
    console.log("distance: "+distance)
    console.log("depth: "+depth)
    console.log("Multiply result: "+distance * depth)
}
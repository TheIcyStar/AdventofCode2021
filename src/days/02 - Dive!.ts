/* Day 02 - Dive! */


export function RunA(data: string){
    let dataArray = data.split(/\r?\n/)
    let distance = 0
    let depth = 0

    for(let i=0; i<dataArray.length; i++){
        let split = dataArray[i].split(" ")
        if(split[0] === "forward"){
            distance += parseInt(split[1])
        } else if(split[0] === "down") {
            depth += parseInt(split[1])
        } else if(split[0] === "up") {
            depth -= parseInt(split[1])
        }
    }

    console.log("===== PART 1 RESULT =====")
    console.log("distance: "+distance)
    console.log("depth: "+depth)
    console.log("Multiply result: "+distance * depth)
}
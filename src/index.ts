const fs = require("fs");
const path = require("path");

(async() => {
    if(process.argv.length < 3){
        console.error("❌ Missing day argument");
        return
    }

    //add trailing zero to the day
    let dayArg: string = process.argv[2]
    if(dayArg.length < 2){
        dayArg = "0"+dayArg
    }

    //iterate through directory to find the day
    let dayFile: string = ""
    const dayFiles = await fs.promises.readdir(path.join(__dirname, "days"))
    for(const file of dayFiles){
        if(file.startsWith(dayArg) && file.endsWith(".js")){
            dayFile = path.join(__dirname, "days", file)
            break
        }
    }
    //iterate through directory to find the data text file
    let dataFile: string = ""
    const dataFiles = await fs.promises.readdir(path.join(__dirname, "../", "input"))
    for(const file of dataFiles){
        if(file.startsWith(dayArg)){
            dataFile = path.join(__dirname, "../", "input", file)
            break
        }
    }

    //File existance erros & warnings
    if(dayFile === ""){
        console.error("❌ Could not find day module for day "+dayArg);
        return
    }
    let data;
    if(dataFile !== ""){
        data = fs.readFileSync(dataFile, "utf8")
    } else {
        console.warn("⚠ Could not find data for day "+dayArg)
    }

    //Run module
    let module = require(dayFile)
    module.RunA(data)
    if(module.RunB){
        module.RunB(data)
    }
})()

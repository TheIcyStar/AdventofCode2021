/* Day 04 - Giant Squid */

import { table } from "console"

class BingoBoard {
    grid: Array<Array<string>>

    constructor(rowStrings: String[]) {
        this.grid = [[],[],[],[],[]]

        for(let i=0; i < rowStrings.length; i++){
            let rowData = rowStrings[i].split(" ")
            rowData = rowData.filter(entry => entry.length > 0) //clear empty strings because numbers <10 have a space
            
            this.grid[i] = rowData
        }
    }

    handleCall(call: string){
        for(var x=0; x<this.grid.length; x++){
            for(var y=0; y<this.grid[x].length; y++){
                //If we Found the number, no need to check anything else. Return.
                if(this.grid[x][y] === call){
                    this.grid[x][y] = "x"
                    return
                }
            }
        }
    }

    isBingo(): boolean{
        //rowcheck
        for(var x=0; x<this.grid.length; x++){
            let rowcheckBreak = false
            for(var y=0; y<this.grid[x].length; y++){
                if(this.grid[x][y] !== "x"){
                    rowcheckBreak = true
                    break
                }
            }
            if(!rowcheckBreak) return true
        }

        //columncheck  //we do a little swapping
        for(var x=0; x<this.grid.length; x++){
            let columncheckBreak = false
            for(var y=0; y<this.grid[x].length; y++){
                if(this.grid[y][x] !== "x"){
                    columncheckBreak = true
                    break
                }
            }
            if(!columncheckBreak) return true
        }

        return false
    }

    sumOfUnmarked(): number{
        let sum = 0
        for(const row of this.grid){
            for(const numStr of row){
                if(numStr === "x") continue
                
                sum += parseInt(numStr)
            }
        }

        return sum
    }

    getScore(call: number): number{
        return this.sumOfUnmarked()*call
    }
}

let bingoCards: BingoBoard[] = []

export function RunA(data: string){
    let dataArray = data.split(/\r?\n/)
    let bingoCalls = dataArray[0].split(",")

    //create bingo cards
    for(let i=2; i < dataArray.length; i+= 6){
        let boardNumbers: string[] = Array.prototype.concat(dataArray[i],dataArray[i+1],dataArray[i+2],dataArray[i+3],dataArray[i+4])
        let newBingoCard = new BingoBoard(boardNumbers)
        bingoCards.push(newBingoCard)
    }

    //Iterate through each card and find the winning one
    let winningCard: BingoBoard | null = null
    for(const call of bingoCalls){
        for(const card of bingoCards){
            if(winningCard) continue

            card.handleCall(call)
            if(card.isBingo()){
                winningCard = card
                break
            }
        }

        //calculate result
        if(winningCard){
            console.log("===== PART 1 RESULTS =====")
            console.log("Winning call: "+call)
            console.log("Final score: "+winningCard.getScore(parseInt(call)))
            return
        }
    }
}

export function RunB(data: string){
    let dataArray = data.split(/\r?\n/)
    let bingoCalls = dataArray[0].split(",")

    //create bingo cards
    for(let i=2; i < dataArray.length; i+= 6){
        let boardNumbers: string[] = Array.prototype.concat(dataArray[i],dataArray[i+1],dataArray[i+2],dataArray[i+3],dataArray[i+4])
        let newBingoCard = new BingoBoard(boardNumbers)
        bingoCards.push(newBingoCard)
    }

    //Iterate through each card and remove them one by one
    for(const call of bingoCalls){
        for(let cardIndex=0; cardIndex<bingoCards.length;){

            bingoCards[cardIndex].handleCall(call)
            if(bingoCards[cardIndex].isBingo()){
                //calculate result
                if(bingoCards.length > 1){
                    bingoCards.splice(cardIndex,1)
                    continue
                } else {
                    console.log("===== PART 2 RESULTS =====")
                    console.log("Final winning call: "+call)
                    console.log("Final last winner score: "+bingoCards[0].getScore(parseInt(call)))
                    return
                }
            }
            cardIndex++
        }
    }
}
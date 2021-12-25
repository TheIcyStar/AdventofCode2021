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

    handleCall(call: string): boolean{
        for(var x=0; x<this.grid.length; x++){
            for(var y=0; y<this.grid[x].length; y++){
                //If we Found the number, no need to check anything else. Return.
                if(this.grid[x][y] === call){
                    this.grid[x].splice(y,1)
                    return (this.grid[x].length === 0)
                }
            }
        }
        return false
    }

    sumOfUnmarked(): number{
        let sum = 0
        for(const row of this.grid){
            for(const numStr of row){
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

            let isBingo = card.handleCall(call)
            if(isBingo){
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
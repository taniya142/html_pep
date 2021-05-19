const request = require("request");
const cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard",callback);

function callback(error,response,html){
    if(!error){
        const manipulationTool = cheerio.load(html);

        let runTable = manipulationTool(".table.batsman");

        let playerName = "";
        let minRun = 10000;

        for(let i=0 ; i<runTable.length; i++){
            let tableRun = manipulationTool(runTable[i]).find("tbody tr");
            for(let j=0; j<tableRun.length; j++){
                let tds = manipulationTool(tableRun[j]).find("td");

                let currentPlayer = manipulationTool(tds[0]).text();
                let minRunByPlayer = parseInt(manipulationTool(tds[2]).text()); //.text() 1-9 tk chal jata h uske bade k liye hume paresInt krna padega
                
                if(minRunByPlayer < minRun){
                    minRun = minRunByPlayer;
                    playerName = currentPlayer;
                }
            }
        }
        console.log(playerName);

    }
}
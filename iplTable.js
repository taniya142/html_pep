//  maximum wicket in two tables of match

const request = require("request");
const cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard"
,callback);

function callback(error, response, html){
    if (!error){
        const manipulationTool = cheerio.load(html);
        let bowlerTables = manipulationTool(".table.bowler");
        
        let player = "";
        let maxWicket = 0;

        

        for(let i=0;i<bowlerTables.length;i++){
            let trs=manipulationTool(bowlerTables[i]).find("tbody tr");

            for(let j=0;j<trs.length;j++){
                let allRowColumns = manipulationTool(trs[j]).find("td");

                let currentPlayer = manipulationTool(allRowColumns[0]).text();
                let currentWicket = manipulationTool(allRowColumns[4]).text();
                
                if(maxWicket < currentWicket){
                    maxWicket= currentWicket;
                    player = currentPlayer;
                }

               
            }
        }
        console.log(player);
    }
}
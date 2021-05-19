const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
let data = {};

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard",callback);

function callback(error,response,html){
    if(!error){
        const manipulationTool = cheerio.load(html);

        let allPlayers = manipulationTool(".Collapsible__contentInner tbody a");


            for(let j=0; j<allPlayers.length; j++){
                let playerName = manipulationTool(allPlayers[j]).text();
                let playerLink = manipulationTool(allPlayers[j]).attr("href");

                // console.log("---------------------");

                birthDates(playerName,"https://www.espncricinfo.com/" + playerLink);
                
            }
    }
}


function birthDates(name, link){
    request(link,function(error,response,html){
        const manipulationTool = cheerio.load(html);

        let dates = manipulationTool(".player-card-description.gray-900");

        // console.log(name + " -----> " + manipulationTool(date[1]).text());

        data[name] = manipulationTool(dates[1]).text();
        fs.writeFileSync("data.json", JSON.stringify(data));

    });
    
}
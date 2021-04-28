const request = require("request");
const cheerio = require("cheerio");
const fs= require("fs");


function getMatchDetails(link){
    request( link , function(err , response , data){
        processData(data);
    })
}
// request( "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"  , function(error , response , data){
//     processData(data);
// }); //  for only one match



function processData(html){
    let ch = cheerio.load(html);
    // name of both teams
    let bothInnings=ch('.Collapsible');
    //there are 2 div classes
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim(); //starting part is needed so split is used
        console.log(teamName);

        // batsman table=> first team
        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");

        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){ // > 1 becaise there is another tr which is not in used which has only one td so we are able to differentiate

                let batsmanName=ch(allTds[0]).find("a").text().trim();
                let runs=ch(allTds[2]).text().trim();
                let balls=ch(allTds[3]).text().trim();
                let fours=ch(allTds[5]).text().trim();
                let sixes=ch(allTds[6]).text().trim();

                // console.log(`Batsman = ${batsman} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes =${sixes}`);
                processDetails(teamName , batsmanName , runs , balls , fours , sixes);

            }
        }
        
    }
    console.log("###############################");
}

function checkTeamFolder(teamName){
    // "./IPL/Mumbai Indians";
    let teamPath = `./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}
function checkBatsmanFile(teamName , batsmanName){
    // "./IPL/CSK/MSDHONI.json"
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}
function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes){
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanFilePath);
    // Stringified JSON Object => normal javascript syntax
    batsmanFile = JSON.parse(batsmanFile);
    let inning = {
        Runs : runs ,
        Balls : balls ,
        Fours : fours ,
        Sixes : sixes
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath , JSON.stringify(batsmanFile));
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes){
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs ,
        Balls : balls ,
        Fours : fours ,
        Sixes : sixes
    }
    batsmanFile.push(inning);
    
    fs.writeFileSync(batsmanFilePath ,  JSON.stringify(batsmanFile) );
}

function createTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function processDetails(teamName , batsmanName , runs , balls , fours , sixes){
    let teamFolderExist = checkTeamFolder(teamName);
    if(teamFolderExist){
        let batsmanFileExist = checkBatsmanFile(teamName , batsmanName );
        if(batsmanFileExist){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes);
    }
}




module.exports = getMatchDetails;
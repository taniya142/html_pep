const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
let data = {};

request("https://github.com/topics",callback);

function callback(error, response , html){
    if(!error){

        const manipulationTool = cheerio.load(html);

        let threeName = manipulationTool(".no-underline.d-flex.flex-column.flex-justify-center");

        for(let i=0; i<threeName.length; i++){
            let link = manipulationTool(threeName[i]).attr("href");

            
            // let name = manipulationTool(threeName[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1").text().trim(); // MEEEE

            let name = manipulationTool(manipulationTool(threeName[i]).find("p")[0]).text().trim(); //SIRR


            // console.log("https://github.com/" + link + " -----> " + name);

            topicProcessor("https://github.com" + link,name);
        }
    }
}

// CONSOLE NAME AND URL 

// function topicProcessor(url,name){
//     request(url,function(error,response,html){

//         let manipulationTool = cheerio.load(html);

//         let headings =  manipulationTool(".f3.color-text-secondary.text-normal.lh-condensed");

//         headings= headings.slice(0,5);

//         for(let i=0;i<headings.length;i++){
//             console.log(manipulationTool(manipulationTool(headings[i]).find("a")[1]).text().trim());
//             console.log("https://github.com" + manipulationTool(manipulationTool(headings[i]).find("a")[1]).attr("href"));
//             console.log("------------------------------");
//         }
//     });
// }

// NAME AND URL IN JSON FILE 

function topicProcessor(url,name){
    request(url,function(error,response,html){

        let manipulationTool = cheerio.load(html);

        let headings =  manipulationTool(".f3.color-text-secondary.text-normal.lh-condensed");

        headings= headings.slice(0,5);

        for(let i=0;i<headings.length;i++){

            if(!data[name]){
                data[name] = [];
                data[name].push({
                    name: manipulationTool(manipulationTool(headings[i]).find("a")[1]).text().trim(),
                });
            }else{
                data[name].push({
                    name: manipulationTool(manipulationTool(headings[i]).find("a")[1]).text().trim(),
                });
            }

            projectProcessor("https://github.com" + manipulationTool(manipulationTool(headings[i]).find("a")[1]).attr("href"),
            name,
            manipulationTool(manipulationTool(headings[i]).find("a")[1]).text().trim()
            );
        }
        // fs.writeFileSync("data2.json", JSON.stringify(data)); //pehle kia hua h

    });
}

function projectProcessor(projectUrl,topicName, projectName){
    
    request(projectUrl + "/issues",function(error,response,html){

        let mt = cheerio.load(html);

        let issueHeading = mt(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        

        let index = -1;

        // console.log(projectName,data[topicName]);
        for(let i=0;i<data[topicName].length;i++){
            if(data[topicName][i].name == projectName){
                index = i;
                break;
            }
        }
        // console.log(index);
        issueHeading = issueHeading.slice(0,5);
        for(let j=0;j<issueHeading.length;j++){
            let link ="https://github.com" + mt(issueHeading[j]).attr("href");
            let name = mt(issueHeading[j]).text();

            if(!data[topicName][index].issues){
                data[topicName][index].issues=[];
                data[topicName][index].issues.push({ name , link});
            }else{
                data[topicName][index].issues.push({ name , link});
            }
        }
        fs.writeFileSync("data3.json", JSON.stringify(data));
    });
}


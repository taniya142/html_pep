const fs= require("fs");
const cheerio=require("cheerio");

let htmlKaData=fs.readFileSync("./index.html");

// console.log(htmlKaData+"");

let ch=cheerio.load(htmlKaData);

let h1kaObject=ch("h1");
// console.log(h1kaObject);

let h1kaData=ch("h1").text();
// console.log(h1kaData);

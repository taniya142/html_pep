const fs= require("fs");
const cheerio=require("cheerio");

let htmlKaData=fs.readFileSync("./index.html");

// console.log(htmlKaData+"");

let ch=cheerio.load(htmlKaData);

let h1kaObject=ch("h1");
// console.log(h1kaObject);


// .text() function is only for ch that is for big object 
let h1kaData=ch("h1").text();     
// console.log(h1kaData);

// let pTag=ch("p").text();
// console.log(pTag);

let pTag=ch("p");
let lastpTag=ch(pTag["2"]).text();
// console.log(lastpTag);

// selector
let pInsideUl=ch("ul li p").text();    
// console.log(pInsideUl);

console.log(ch("p").length);

console.log(ch(".text.main").text());
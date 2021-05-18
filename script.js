const request = require("request");
const fs = require("fs");

request("http://www.google.com",callback);




// iss url pe request gyi waha se server se response aaya uske baad callback function chalega jisse body aayegi
function callback(error,response,html){
    if(!error) fs.writeFileSync("index.html",html);  //agr koi error nhi aaya to ek file banegi index.html jisme google.com ki html aa jayegi
}
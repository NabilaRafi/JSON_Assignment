var fs = require('fs');  //includes fs (file system)
var rl =fs.readFileSync('../csv/Census.csv','utf8');

 var obj ={};
//final =[];

function filter(inputFile){

   var lines = inputFile.split('\n');

   var lineCount = lines.length;
   for (var i = 1; i < lineCount; i++) {
   var currentLine = lines[i].split(",");

   if(currentLine[4] == "Total" && currentLine[5] == "All ages") {
     var currentState = currentLine[3].replace("State -", "").trim();
    // console.log(currentState);
     var states = {};
     states.literacyMale = 0;
     states.illiteracyMale = 0;
     states.literacyFemale =0;
     states.illiteracyFemale =0;
     if(obj[currentState] == undefined){
       states.literacyMale = parseInt(currentLine[13]);
       states.illiteracyMale = parseInt(currentLine[10]);
       states.literacyFemale = parseInt(currentLine[14]);
       states.illiteracyFemale = parseInt(currentLine[11]);
       obj[currentState]=states;
     }else{
       obj[currentState].literacyMale += parseInt(currentLine[13]);
       obj[currentState].illiteracyMale += parseInt(currentLine[10]);
       obj[currentState].literacyFemale += parseInt(currentLine[14]);
       obj[currentState].illiteracyFemale += parseInt(currentLine[11]);
     }
   }
  }
}

filter(rl.toString());

fs.writeFile("allstate.json",JSON.stringify(obj,null,3), function(err) {

    if(err) {
      console.log(err);
    }
    else {
      console.log("Successfully created literacy data for NorthEast State");
    }
});

var fs = require('fs');


// var wholeFile =fs.readFileSync('csv/India2011.csv','utf8');
// var scFile =fs.readFileSync('csv/IndiaSC2011.csv','utf8');
// var stFile = fs.readFileSync('csv/IndiaST2011.csv','utf8');

//var allAges = "All ages";
var final =[];
//reading the file
var rl =fs.readFileSync('csv/Census.csv','utf8');

function filter(inputFile) {
   //var jsonData = [];
   var lines = inputFile.split('\n');
    var states = {};
    var lineCount = lines.length;
    for (var i = 1; i < lineCount; i++) {
    var currentLine = lines[i].split(",");
    if(currentLine[4] == "Total" && currentLine[5] == "All ages") {
      var currentState = currentLine[3];
      if(currentState in states) {
        var state = states[currentState];
        state.literacyMale += parseInt(currentLine[13]);
        state.illiteracyMale += parseInt(currentLine[10]);
        state.literacyFemale += parseInt(currentLine[14]);
        state.illiteracyFemale += parseInt(currentLine[11]);
        } else {
        states[currentState] = {
        literacyMale : parseInt(currentLine[13]),
        literacyFemale : parseInt(currentLine[14]),
        illiteracyMale : parseInt(currentLine[10]),
        illiteracyFemale :parseInt(currentLine[11])
        };
      }
    }
  }
  var stateJson = filterStatePopulation(states);
}
filter(rl.toString());

function filterStatePopulation(states) {
   //Total population

   final = [];

   for(state in states) {

      var currentState = states[state];
      //console.log(state);
      final.push({
         'state': getState(state),
         'LiterateMale' : currentState.literacyMale,
         'LiterateFemale' : currentState.literacyFemale,
         'IlliterateMale' : currentState.literacyMale,
         'IlliterateFemale' : currentState.literacyFemale
      });
   };
}

//finalObj = {"States" : final};
//console.log(finalObj);

function getState(longName) {
   return longName.trim().split("-")[1].trim();
}
fs.writeFile("allstates.json", JSON.stringify(final,null,4), function(err) {

    if(err) {
      console.log(err);
    }
    else {
      console.log("Successfully created literacy data StateWise");
    }
});

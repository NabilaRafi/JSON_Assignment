var fs = require('fs');

var wholeFile =fs.readFileSync('India2011.csv','utf8');
var scFile =fs.readFileSync('IndiaSC2011.csv','utf8');
var stFile = fs.readFileSync('IndiaST2011.csv','utf8');

function appen(data) {
  fs.appendFile('Census.csv',data, function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
}
// appen(wholeFile);
// appen(scFile);
// appen(stFile);

var rl =fs.readFileSync('Census.csv','utf8');

//var files = [wholeFile, scFile, stFile];

var final =[];

function filter (inputFiles){
  var states = {};
  //for(file in inputFiles){
   var lines = inputFiles.split('\n');
   var lineCount = lines.length;
  for (var i = 1; i < lineCount; i++) {
    var column = lines[i].split(",");
    if(column[4] == "Total" && column[5] == "All ages") {
       var currentState = column[3];
        if(currentState in states) {
          var state = states[currentState];
          state.literate_Male += parseInt(column[13]);
          state.illiterate_Male += parseInt(column[10]);
          state.literate_Female += parseInt(column[14]);
          state.illiterate_Female += parseInt(column[11]);
          } else {
          states[currentState] = {
            literate_Male : parseInt(column[13]),
            literate_Female : parseInt(column[14]),
            illiterate_Male : parseInt(column[10]),
            illiterate_Female :parseInt(column[11])
            };
          }
        }
        filterTotalPopulation(states);
      }
    }


filter(rl.toString());

function filterTotalPopulation(states) {
   //Total population

   final = [];
   var data = {
      literate_Male : 0,
      literate_Female : 0,
      illiterate_Male : 0,
      illiterate_Female : 0
   };

   for(state in states) {

      var currentState = states[state];
      data.literate_Male += parseInt(currentState.literate_Male);
      data.literate_Female += parseInt(states[state].literate_Female);
      data.illiterate_Male += parseInt(states[state].illiterate_Male);
      data.illiterate_Female += parseInt(states[state].illiterate_Female);
   };

   //console.log(data);

   final.push({
      'education':'Literate',
      'male' : data.literate_Male,
      'female' : data.literate_Female
   });

   final.push({
      'education':'Illiterate',
      'male' : data.illiterate_Male,
      'female' : data.illiterate_Female
   });

}
finalObj = {"Total" : final};

fs.writeFile("all.json", JSON.stringify(finalObj,null,4), function(err) {

    if(err) {
      console.log(err);
    }
    else {
      console.log("Successfully created literacy data StateWise");
    }
});

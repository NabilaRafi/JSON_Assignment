var fs = require('fs');

var rl =fs.readFileSync('../csv/Census.csv','utf8');


final = [];
function filter (inputFiles){

  var lines = inputFiles.split('\n');
  var lineCount = lines.length;

  data =[];

  for (var i = 1; i < lineCount; i++) {
    column = lines[i].split(",");
    if(column[4] == "Total" && column[5] == "All ages") {
     data.push(column);
    }
  }

  len = data.length;
  TotalObj = {};
  TotalObj.Education = "Literacy";
  TotalObj.literate_Male = 0;
  TotalObj.illiterate_Male = 0;
  TotalObj.literate_Female = 0;
  TotalObj.illiterate_Female = 0;

  for(var j=0; j < len; j++){
    TotalObj.literate_Male += parseInt(data[j][13]);
    TotalObj.illiterate_Male += parseInt(data[j][10]);
    TotalObj.literate_Female += parseInt(data[j][14]);
    TotalObj.illiterate_Female += parseInt(data[j][11]);
  }
  final.push(TotalObj);

  //console.log(final);
}
filter(rl.toString());

fs.writeFile("total.json", JSON.stringify(final,null,4), function(err) {

    if(err) {
      console.log(err);
    }
    else {
      console.log("Successfully created literacy data for all 3 files");
    }
});

/*

Google Script for aggregating form data during the selection process for Mozilla Open Leaders.

Make sure all form responses appear in this spreadsheet. Use the first two spreadsheets to
summarize the data + create a pivot table. Copy this into Tools > Script Editor and put
'=aggregateFormData()' in the first cell on the first sheet.

*/

function aggregateFormData() {
  var out = new Array()

  // add headers
  out.push(["Responder", "Project ID", "Openness", "Teachable", "Project", "Notes"]);
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  // skip the first two sheets which are the summary & totals
  for (var i=2 ; i<sheets.length ; i++) {
    var sheet = sheets[i];
    Logger.log(sheet.getSheetName());
    var col = sheet.getLastColumn();
    var row = sheet.getLastRow();
    var values = sheet.getSheetValues(1, 1, row, col);

    // skip the first row, which are the headers
    for (var j=1 ; j < row ; j++){
      var responder = values[j][1];
      var firstname = responder.split(" ")[0] + ": ";
      var project = "";
      var ratings = "";

      // skip the first two columns which are 1) Timestamp, 2) Responder
      for (var k=2; k < col ; k++){
        var header = values[0][k]. split(' ');
        if(header[0] != project){
          if(project != "" ) {
            out.push(ratings);
          }
          project = header[0];
          ratings = new Array();
          ratings.push(responder);
          ratings.push(parseInt(project.slice(1, -1), 10));
        }
        var v = values[j][k];
        if(v){
          v = (header[1] == "Notes") ? firstname + v : parseInt(v, 10);
        }
        ratings.push(v);
      }
      out.push(ratings);
    }
  }
  return out;
}
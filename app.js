/*
Imports
*/
var FXMLLoader = Java.type('javafx.fxml.FXMLLoader');


/*
Definitions
*/

var FXML_URL = "view.fxml"
var CACHED_DATA_URL = "matches.json"
var MATCHES_DATA_URL = "http://worldcup.sfg.io/matches";
/*
Main program
*/
print("Welcome!!! We are starting the app, please wait a minute........");
var matches = downloadMatchesInfo()
var app = FXMLLoader.load(new java.io.File(FXML_URL).toURI().toURL())
$STAGE.scene = new javafx.scene.Scene(app)
$STAGE.height = 600
$STAGE.width = 1250
$STAGE.title = "Another World Cup App"
$STAGE.show()
/*
Functions
*/

function downloadMatchesInfo(){
	print("Trying to download the matches information.........")
	var out, scanner
	try{
		var urlStream = new java.net.URL(MATCHES_DATA_URL).openStream()
		scanner = new java.util.Scanner(urlStream, "UTF-8")
	}catch(e){
		print("Couldn't download the updated information, using a cached one.....")
		scanner = new java.util.Scanner(new java.io.File(CACHED_DATA_URL), "UTF-8")
		
	}		
	scanner.useDelimiter("\\A")
	out = scanner.next();
	scanner.close();
	return eval(out);


}

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
Global
*/
var imgCache = new Object()

/*
Main program
*/
print("Welcome!!! We are starting the app, please wait a minute........");
var matches = downloadMatchesInfo()
var app = FXMLLoader.load(new java.io.File(FXML_URL).toURI().toURL())
$STAGE.scene = new javafx.scene.Scene(app)
$STAGE.height = 750
$STAGE.width = 1250
$STAGE.title = "Another World Cup App"
$STAGE.show()
for(var i = 0; i < matches.length; i++){
	fillMatch(matches[i]);
}

/*
Functions
*/
function downloadMatchesInfo(){
	print("Trying to download the matches information.........")
	var out, scanner
	try{
		var urlStream = new java.net.URL(MATCHES_DATA_URL).openStream()
		scanner = new java.util.Scanner(urlStream, "UTF-8")
		// TODO: save the latest downloaded JSON
	}catch(e){
		print("Couldn't download the updated information, using a cached one.....")
		scanner = new java.util.Scanner(new java.io.File(CACHED_DATA_URL), "UTF-8")
		
	}		
	scanner.useDelimiter("\\A")
	out = scanner.next();
	scanner.close();
	return eval(out);
}

function fillMatch(match){
	var viewMatch = $STAGE.scene.lookup("#match_" + match.match_number)
	if(viewMatch && match.home_team.country){
		var homeTeamImgUrl = "./images/teams/" + match.home_team.code.toLowerCase() + ".png"
		var awayTeamImgUrl = "./images/teams/" + match.away_team.code.toLowerCase() + ".png"
		if(!imgCache[homeTeamImgUrl])
			imgCache[homeTeamImgUrl] = new javafx.scene.image.Image(new java.io.FileInputStream(homeTeamImgUrl))
		if(!imgCache[awayTeamImgUrl])
			imgCache[awayTeamImgUrl] = new javafx.scene.image.Image(new java.io.FileInputStream(awayTeamImgUrl))
		viewMatch.children[0].image = imgCache[homeTeamImgUrl]
		viewMatch.children[1].text = match.status == "future"? "_": match.home_team.goals;	
		viewMatch.children[3].text = match.status == "future"? "_": match.away_team.goals;	
		viewMatch.children[4].image = imgCache[awayTeamImgUrl]
	}
}

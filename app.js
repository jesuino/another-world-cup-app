/*
Imports
*/
var FXMLLoader = Java.type('javafx.fxml.FXMLLoader');
var FadeTransition= Java.type('javafx.animation.FadeTransition');


/*
Definitions
*/

var FXML_URL = "view.fxml"
var FXML_DETAIL_URL = "match_details.fxml"
var CACHED_DATA_URL = "matches.json"
var MATCHES_DATA_URL = "http://worldcup.sfg.io/matches";
var CSS_URL = "app.css"
/*
Global
*/
var imgCache = new Object()
var detailsTransition = new FadeTransition(javafx.util.Duration.millis(1000));
var stadiumsUrl =  {}
/*
Main program
*/
print("Welcome!!! We are starting the app, please wait a minute........");
var matches = downloadMatchesInfo()
var app = FXMLLoader.load(getUrl(FXML_URL))
var matchDetail = FXMLLoader.load(getUrl(FXML_DETAIL_URL))
$STAGE.scene = new javafx.scene.Scene(app)
$STAGE.scene.stylesheets.add(getUrl(CSS_URL).toString())
$STAGE.height = 750
$STAGE.width = 1250
$STAGE.title = "Another World Cup App"
$STAGE.show()
$STAGE.scene.lookup("#match_details").children.add(matchDetail)
for(var i = 0; i < matches.length; i++){
	fillMatch(matches[i]);
}
detailsTransition.fromValue = 0.0
detailsTransition.toValue = 1.0
detailsTransition.cycleCount = 1
detailsTransition.node = matchDetail

stadiumsUrl["Arena Corinthians"] = "corinthians.jpg"
stadiumsUrl["Arena de Sao Paulo"] = "corinthians.jpg"
stadiumsUrl["Arena Amazonia"] = "amazonia.jpg"
stadiumsUrl["Arena da Baixada"] = "baixada.jpg"
stadiumsUrl["Estadio Beira-Rio"] = "beira.jpg"
stadiumsUrl["Estadio Castelao"] = "castelao.jpg"
stadiumsUrl["Estadio das Dunas"] = "dunas.jpg"
stadiumsUrl["Maracanã - Estádio Jornalista Mário Filho"] = "maraca.jpg"
stadiumsUrl["Estadio do Maracana"] = "maraca.jpg"
stadiumsUrl["Arena Fonte Nova"] = "fonte.jpg"
stadiumsUrl["Estadio Nacional"] = "mane.jpg"
stadiumsUrl["Estadio Mineirao"] = "mineirao.jpg"
stadiumsUrl["Arena Pantanal"] = "pantanal.jpg"
stadiumsUrl["Arena Pernambuco"] = "pernambuco.jpg"
/*
Functions
*/
function getUrl(resource){
	return new java.io.File(resource).toURI().toURL()
}
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
		viewMatch.children[0].image = getTeamImg(match.away_team.code)
		viewMatch.children[1].text = match.status == "future"? "_": match.home_team.goals;	
		viewMatch.children[3].text = match.status == "future"? "_": match.away_team.goals;	
		viewMatch.children[4].image = getTeamImg(match.home_team.code)
	}
	viewMatch.onMouseClicked = function(e){
		fillMatchDetails(match)
	}
}

function fillMatchDetails(match){
	var s = $STAGE.scene;
	detailsTransition.playFromStart()
	var notPlayedScore = match.status == "completed"?"0":"_"
	s.lookup("#match_home_team").image = getTeamImg(match.home_team.code)
	s.lookup("#match_away_team").image = getTeamImg(match.away_team.code)
	s.lookup("#match_home_score").text = match.home_team.goals?match.home_team.goals:notPlayedScore
	s.lookup("#match_away_score").text = match.away_team.goals?match.away_team.goals:notPlayedScore
	s.lookup("#match_status").text = "Match " + match.status
	s.lookup("#match_time").text =  match.datetime.substring(0, 16)
	s.lookup("#match_location").text =  match.location
	s.lookup("#match_stadium").image =  getStadiumImg(match.location)
}

function getTeamImg(code){
	return	getImg(code?"./images/teams/" + code.toLowerCase() + ".png":"./images/no_team.png")

}
function getStadiumImg(loc){
	var imgName = stadiumsUrl[loc]
	return getImg(("./images/stadiums/" + (imgName?imgName:"maraca.jpg")))
}

function getImg(imgUrl){
	if(!imgCache[imgUrl])
		imgCache[imgUrl] = new javafx.scene.image.Image(new java.io.FileInputStream(imgUrl))
	return imgCache[imgUrl]
}

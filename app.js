/*
Imports
*/
var FXMLLoader = Java.type('javafx.fxml.FXMLLoader');


/*
Definitions
*/

var FXML_URL = "view.fxml"

/*
Main program
*/
var app = FXMLLoader.load(new java.io.File(FXML_URL).toURI().toURL())
$STAGE.scene = new javafx.scene.Scene(app)
$STAGE.height = 600
$STAGE.width = 1250
$STAGE.title = "Another World Cup App"
$STAGE.show()

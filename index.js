const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );

const playerController = require( "./controllers/playersController" );
const teamController = require( "./controllers/teamsController" );
const leagueController = require( "./controllers/leaguesController" );
const countryController = require( "./controllers/countriesController" );

const app = express();
const port = 4000;

app.use( cors() );

app.use( bodyParser.json( {
    limit: "50mb",
} ) );

app.use( bodyParser.urlencoded( {
    limit: "50mb",
    extended: true,
} ) );

app.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

app.use( function( req, res, next ) {
    if ( req.is( "text/*" ) ) {
        req.text = "";
        req.setEncoding( "utf8" );
        req.on( "data", function( chunk ) { req.text += chunk; } );
        req.on( "end", next );
    } else {
        next();
    }
} );

// Players routes
app.get( "/api/players", playerController.getPlayers );
app.get( "/api/players/:id", playerController.getPlayer );
app.post( "/api/players", playerController.createPlayer );
app.put( "/api/players/:id", playerController.updatePlayer );
app.delete( "/api/players/:id", playerController.deletePlayer );

// Teams routes
app.get( "/api/teams", teamController.getTeams );
app.get( "/api/teams/:id", teamController.getTeam );
app.post( "/api/teams", teamController.createTeam );
app.put( "/api/teams/:id", teamController.updateTeam );
app.delete( "/api/teams/:id", teamController.deleteTeam );

// Leagues routes
app.get( "/api/leagues", leagueController.getLeagues );
app.get( "/api/leagues/:id", leagueController.getLeague );
app.post( "/api/leagues", leagueController.createLeague );
app.put( "/api/leagues/:id", leagueController.updateLeague );
app.delete( "/api/leagues/:id", leagueController.deleteLeague );

// Countries routes
app.get( "/api/countries", countryController.getCountries );
app.get( "/api/countries/:id", countryController.getCountry );
app.post( "/api/countries", countryController.createCountry );
app.put( "/api/countries/:id", countryController.updateCountry );
app.delete( "/api/countries/:id", countryController.deleteCountry );

app.listen( port, () => {
    console.log( "Listening to port:", port );
} );

module.exports = app;

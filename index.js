const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const dotenv = require( "dotenv" );

const playerController = require( "./controllers/playersController" );
const teamController = require( "./controllers/teamsController" );
const leagueController = require( "./controllers/leaguesController" );
const countryController = require( "./controllers/countriesController" );

dotenv.config();
const app = express();
const baseAppUrl = process.env.BASE_APP_URL;
const port = 4000;

app.use(
    bodyParser.json( {
        limit: "50mb",
    } ),
);

app.use(
    bodyParser.urlencoded( {
        limit: "50mb",
        extended: true,
    } ),
);

app.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", baseAppUrl );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );

    if ( req.method === "OPTIONS" ) {
        res.sendStatus( 200 );
    } else {
        next();
    }
} );

// Players routes
app.options( "/api/players/:id", cors() );
app.get( "/api/players", playerController.getPlayers );
app.get( "/api/players/:id", playerController.getPlayer );
app.post( "/api/players", playerController.createPlayer );
app.put( "/api/players/:id", cors(), playerController.updatePlayer );
app.delete( "/api/players/:id", cors(), playerController.deletePlayer );

// Teams routes
app.options( "/api/teams/:id", cors() );
app.get( "/api/teams", teamController.getTeams );
app.get( "/api/teams/:id", teamController.getTeam );
app.post( "/api/teams", teamController.createTeam );
app.put( "/api/teams/:id", cors(), teamController.updateTeam );
app.delete( "/api/teams/:id", cors(), teamController.deleteTeam );

// Leagues routes
app.options( "/api/leagues/:id", cors() );
app.get( "/api/leagues", leagueController.getLeagues );
app.get( "/api/leagues/:id", leagueController.getLeague );
app.post( "/api/leagues", leagueController.createLeague );
app.put( "/api/leagues/:id", cors(), leagueController.updateLeague );
app.delete( "/api/leagues/:id", cors(), leagueController.deleteLeague );

// Countries routes
app.options( "/api/countries/:id", cors() );
app.get( "/api/countries", countryController.getCountries );
app.get( "/api/countries/:id", countryController.getCountry );
app.post( "/api/countries", countryController.createCountry );
app.put( "/api/countries/:id", cors(), countryController.updateCountry );
app.delete( "/api/countries/:id", cors(), countryController.deleteCountry );

app.listen( port, () => {
    console.log( "Listening to port:", port );
} );

module.exports = app;

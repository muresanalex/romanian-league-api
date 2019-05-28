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
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS" );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    );

    if ( req.method === "OPTIONS" ) {
        res.sendStatus( 200 );
    } else {
        next();
    }
} );

const baseUrl = process.env.NODE_ENV !== "production" ? "/api" : "";

// Players routes
app.options( `${ baseUrl }/players/:id`, cors() );
app.get( `${ baseUrl }/players`, playerController.getPlayers );
app.get( `${ baseUrl }/players/:id`, playerController.getPlayer );
app.post( `${ baseUrl }/players`, playerController.createPlayer );
app.put( `${ baseUrl }/players/:id`, cors(), playerController.updatePlayer );
app.delete( `${ baseUrl }/players/:id`, cors(), playerController.deletePlayer );

// Teams routes
app.options( `${ baseUrl }/teams/:id`, cors() );
app.get( `${ baseUrl }/teams`, teamController.getTeams );
app.get( `${ baseUrl }/teams/:id`, teamController.getTeam );
app.post( `${ baseUrl }/teams`, teamController.createTeam );
app.put( `${ baseUrl }/teams/:id`, cors(), teamController.updateTeam );
app.delete( `${ baseUrl }/teams/:id`, cors(), teamController.deleteTeam );

// Leagues routes
app.options( `${ baseUrl }/leagues/:id`, cors() );
app.get( `${ baseUrl }/leagues`, leagueController.getLeagues );
app.get( `${ baseUrl }/leagues/:id`, leagueController.getLeague );
app.post( `${ baseUrl }/leagues`, leagueController.createLeague );
app.put( `${ baseUrl }/leagues/:id`, cors(), leagueController.updateLeague );
app.delete( `${ baseUrl }/leagues/:id`, cors(), leagueController.deleteLeague );

// Countries routes
app.options( `${ baseUrl }/countries/:id`, cors() );
app.get( `${ baseUrl }/countries`, countryController.getCountries );
app.get( `${ baseUrl }/countries/:id`, countryController.getCountry );
app.post( `${ baseUrl }/countries`, countryController.createCountry );
app.put( `${ baseUrl }/countries/:id`, cors(), countryController.updateCountry );
app.delete( `${ baseUrl }/countries/:id`, cors(), countryController.deleteCountry );

app.listen( port, () => {
    console.log( "Listening to port:", port );
} );

module.exports = app;

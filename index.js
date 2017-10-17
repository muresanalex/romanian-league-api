const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );

const {
    getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
} = require( "./controllers/playersController" );
const {
    getTeams,
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam,
} = require( "./controllers/teamsController" );
const {
    getLeagues,
    getLeague,
    createLeague,
    updateLeague,
    deleteLeague,
} = require( "./controllers/leaguesController" );
const {
    getCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry,
} = require( "./controllers/countriesController" );

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

// Players routes
app.get( "/api/players", getPlayers );
app.get( "/api/players/:id", getPlayer );
app.post( "/api/players", createPlayer );
app.put( "/api/players/:id", updatePlayer );
app.delete( "/api/players/:id", deletePlayer );

// Teams routes
app.get( "/api/teams", getTeams );
app.get( "/api/teams/:id", getTeam );
app.post( "/api/teams", createTeam );
app.put( "/api/teams/:id", updateTeam );
app.delete( "/api/teams/:id", deleteTeam );

// Leagues routes
app.get( "/api/leagues", getLeagues );
app.get( "/api/leagues/:id", getLeague );
app.post( "/api/leagues", createLeague );
app.put( "/api/leagues/:id", updateLeague );
app.delete( "/api/leagues/:id", deleteLeague );

// Countries routes
app.get( "/api/countries", getCountries );
app.get( "/api/countries/:id", getCountry );
app.post( "/api/countries", createCountry );
app.put( "/api/countries/:id", updateCountry );
app.delete( "/api/countries/:id", deleteCountry );

app.listen( port, () => {
    console.log( "Listening to port:", port );
} );

module.exports = app;

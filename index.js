const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const dotenv = require( "dotenv" );
const db = require( "./dataBases" ).db;

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

const getPlayers = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const nameCondition = {
        fullName: { $regex: new RegExp( req.query.search, "i" ) },
    };
    const teamIdCondition = {
        teamId: req.query.id,
    };
    const findCondition = req.query.id ? teamIdCondition : nameCondition;

    if ( !isNaN( page ) ) {
        let numberOfPages = 0;

        db.players.count( findCondition, ( err, count ) => {
            const integer = parseInt( count / itemsPerPage, 10 );
            numberOfPages = count % itemsPerPage > 0 ? integer + 1 : integer;
        } );

        db.players
            .find( findCondition )
            .sort( { firstName: 1 } )
            .skip( ( page - 1 ) * itemsPerPage )
            .limit( itemsPerPage )
            .exec( ( err, players ) => {
                res.send( { data: players, numberOfPages } );
            } );
    } else {
        db.players
            .find( findCondition )
            .sort( { name: 1 } )
            .exec( ( err, players ) => {
                res.send( { data: players } );
            } );
    }
};

// Players routes
app.options( "/api/players/:id", cors() );
app.get( "/players", getPlayers );
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

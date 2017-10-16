const express = require( "express" );
const bodyParser = require( "body-parser" );
const path = require( "path" );
const Datastore = require( "nedb" );
const Joi = require( "joi" );
const cors = require( "cors" );

const app = express();
const port = 4000;
const db = {};

db.players = new Datastore( {
    filename: `${ path.join( __dirname, "/db/players.db" ) }`,
    autoload: true,
} );

db.teams = new Datastore( {
    filename: `${ path.join( __dirname, "/db/teams.db" ) }`,
    autoload: true,
} );

db.leagues = new Datastore( {
    filename: `${ path.join( __dirname, "/db/leagues.db" ) }`,
    autoload: true,
} );

db.countries = new Datastore( {
    filename: `${ path.join( __dirname, "/db/countries.db" ) }`,
    autoload: true,
} );

const playerSchema = Joi.object().keys( {
    name: Joi.string().required(),
    country: Joi.string().required(),
    dateOfBirth: Joi.date().min( "1-1-1967" ).required(),
    height: Joi.number().integer().min( 100 ).max( 250 ).required(),
    weight: Joi.number().integer().min( 40 ).max( 150 ).required(),
    teamId: Joi.number().integer().required(),
    position: Joi.string().required(),
    jerseyNumber: Joi.number().integer().min( 1 ).max( 99 ).required(),
    preferredFoot: Joi.string().required(),
    internationalReputation: Joi.number().integer().min( 1 ).max( 5 ).required(),
    weakFoot: Joi.number().integer().min( 1 ).max( 5 ).required(),
    skillMoves: Joi.number().integer().min( 1 ).max( 5 ).required(),
    crossing: Joi.number().integer().min( 1 ).max( 99 ).required(),
    finishing: Joi.number().integer().min( 1 ).max( 99 ).required(),
    headingAccuracy: Joi.number().integer().min( 1 ).max( 99 ).required(),
    shortPassing: Joi.number().integer().min( 1 ).max( 99 ).required(),
    volleys: Joi.number().integer().min( 1 ).max( 99 ).required(),
    dribbling: Joi.number().integer().min( 1 ).max( 99 ).required(),
    curve: Joi.number().integer().min( 1 ).max( 99 ).required(),
    freeKickAccuracy: Joi.number().integer().min( 1 ).max( 99 ).required(),
    longPassing: Joi.number().integer().min( 1 ).max( 99 ).required(),
    ballControl: Joi.number().integer().min( 1 ).max( 99 ).required(),
    acceleration: Joi.number().integer().min( 1 ).max( 99 ).required(),
    sprintSpeed: Joi.number().integer().min( 1 ).max( 99 ).required(),
    agility: Joi.number().integer().min( 1 ).max( 99 ).required(),
    reactions: Joi.number().integer().min( 1 ).max( 99 ).required(),
    balance: Joi.number().integer().min( 1 ).max( 99 ).required(),
    shotPower: Joi.number().integer().min( 1 ).max( 99 ).required(),
    jumping: Joi.number().integer().min( 1 ).max( 99 ).required(),
    stamina: Joi.number().integer().min( 1 ).max( 99 ).required(),
    strength: Joi.number().integer().min( 1 ).max( 99 ).required(),
    longShots: Joi.number().integer().min( 1 ).max( 99 ).required(),
    aggression: Joi.number().integer().min( 1 ).max( 99 ).required(),
    interceptions: Joi.number().integer().min( 1 ).max( 99 ).required(),
    positioning: Joi.number().integer().min( 1 ).max( 99 ).required(),
    vision: Joi.number().integer().min( 1 ).max( 99 ).required(),
    penalties: Joi.number().integer().min( 1 ).max( 99 ).required(),
    composure: Joi.number().integer().min( 1 ).max( 99 ).required(),
    marking: Joi.number().integer().min( 1 ).max( 99 ).required(),
    standingTackle: Joi.number().integer().min( 1 ).max( 99 ).required(),
    slidingTackle: Joi.number().integer().min( 1 ).max( 99 ).required(),
    gkDiving: Joi.number().integer().min( 1 ).max( 99 ).required(),
    gkHandling: Joi.number().integer().min( 1 ).max( 99 ).required(),
    gkKicking: Joi.number().integer().min( 1 ).max( 99 ).required(),
    gkPositioning: Joi.number().integer().min( 1 ).max( 99 ).required(),
    gkReflexes: Joi.number().integer().min( 1 ).max( 99 ).required(),
} );
const teamSchema = Joi.object().keys( {
    name: Joi.string().required(),
    country: Joi.string().required(),
    stadium: Joi.string(),
} );
const leagueSchema = Joi.object().keys( {
    name: Joi.string().required(),
    country: Joi.string().required(),
} );
const countrySchema = Joi.object().keys( {
    name: Joi.string().required(),
} );

app.use( cors() );

app.use( bodyParser.json( {
    limit: "50mb",
} ) );

app.use( bodyParser.urlencoded( {
    limit: "50mb",
    extended: true,
} ) );

const getPlayers = ( req, res ) => {
    db.players.find( {}, ( err, players ) => {
        res.send( { players } );
    } );
};

const getPlayer = ( req, res ) => {
    db.players.find( { _id: req.params.id }, ( err, player ) => {
        res.send( { player } );
    } );
};

const createPlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playerSchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.players.insert( req.body, ( err, player ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: player } );
    } );
};

const updatePlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playerSchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.players.update( { _id: req.params.id }, req.body, ( err, player ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: player } );
    } );
};

const deletePlayer = ( req, res ) => {
    db.players.remove( { _id: req.params.id }, {}, ( err, player ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: player } );
    } );
};

const getTeams = ( req, res ) => {
    db.teams.find( {}, ( err, teams ) => {
        res.send( { teams } );
    } );
};

const getTeam = ( req, res ) => {
    db.teams.find( { _id: req.params.id }, ( err, team ) => {
        res.send( { team } );
    } );
};

const createTeam = ( req, res ) => {
    const result = Joi.validate( req.body, teamSchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.teams.insert( req.body, ( err, team ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: team } );
    } );
};

const updateTeam = ( req, res ) => {
    const result = Joi.validate( req.body, teamSchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.teams.update( { _id: req.params.id }, req.body, ( err, team ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: team } );
    } );
};

const deleteTeam = ( req, res ) => {
    db.teams.remove( { _id: req.params.id }, {}, ( err, team ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: team } );
    } );
};

const getLeagues = ( req, res ) => {
    db.leagues.find( {}, ( err, leagues ) => {
        res.send( { leagues } );
    } );
};

const getLeague = ( req, res ) => {
    db.leagues.find( { _id: req.params.id }, ( err, league ) => {
        res.send( { league } );
    } );
};

const createLeague = ( req, res ) => {
    const result = Joi.validate( req.body, leagueSchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.leagues.insert( req.body, ( err, league ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: league } );
    } );
};

const updateLeague = ( req, res ) => {
    const result = Joi.validate( req.body, leagueSchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.leagues.update( { _id: req.params.id }, req.body, ( err, league ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: league } );
    } );
};

const deleteLeague = ( req, res ) => {
    db.leagues.remove( { _id: req.params.id }, {}, ( err, league ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: league } );
    } );
};

const getCountries = ( req, res ) => {
    db.countries.find( {}, ( err, countries ) => {
        res.send( { countries } );
    } );
};

const getCountry = ( req, res ) => {
    db.countries.find( { _id: req.params.id }, ( err, country ) => {
        res.send( { country } );
    } );
};

const createCountry = ( req, res ) => {
    const result = Joi.validate( req.body, countrySchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.countries.insert( req.body, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

const updateCountry = ( req, res ) => {
    const result = Joi.validate( req.body, countrySchema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.countries.update( { _id: req.params.id }, req.body, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

const deleteCountry = ( req, res ) => {
    db.countries.remove( { _id: req.params.id }, {}, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

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

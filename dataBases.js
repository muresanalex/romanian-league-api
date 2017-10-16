const path = require( "path" );
const Datastore = require( "nedb" );

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

module.exports = { db };

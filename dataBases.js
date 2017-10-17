const path = require( "path" );
const Datastore = require( "nedb" );

const db = {};
const basePath = process.env.NODE_ENV === "test" ? "/db/mockDB" : "/db";

db.players = new Datastore( {
    filename: `${ path.join( __dirname, basePath, "/players.db" ) }`,
    autoload: true,
} );

db.teams = new Datastore( {
    filename: `${ path.join( __dirname, basePath, "/teams.db" ) }`,
    autoload: true,
} );

db.leagues = new Datastore( {
    filename: `${ path.join( __dirname, basePath, "/leagues.db" ) }`,
    autoload: true,
} );

db.countries = new Datastore( {
    filename: `${ path.join( __dirname, basePath, "/countries.db" ) }`,
    autoload: true,
} );

module.exports = { db };

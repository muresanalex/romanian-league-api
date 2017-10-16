const Joi = require( "joi" );
const teamsSchema = require( "../models/teams" );
const db = require( "../dataBases" ).db;

exports.getTeams = ( req, res ) => {
    db.teams.find( {}, ( err, teams ) => {
        res.send( { teams } );
    } );
};

exports.getTeam = ( req, res ) => {
    db.teams.find( { _id: req.params.id }, ( err, team ) => {
        res.send( { team } );
    } );
};

exports.createTeam = ( req, res ) => {
    const result = Joi.validate( req.body, teamsSchema.schema );
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

exports.updateTeam = ( req, res ) => {
    const result = Joi.validate( req.body, teamsSchema.schema );
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

exports.deleteTeam = ( req, res ) => {
    db.teams.remove( { _id: req.params.id }, {}, ( err, team ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: team } );
    } );
};

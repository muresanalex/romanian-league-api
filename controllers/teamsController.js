const Joi = require( "joi" );
const teamsSchema = require( "../models/teams" );
const db = require( "../dataBases" ).db;

const getTeams = ( req, res ) => {
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search ),
        },
    };
    db.teams.find( findCondition ).sort( { name: 1 } ).exec( ( err, teams ) => {
        res.send( { data: teams } );
    } );
};

const getTeam = ( req, res ) => {
    db.teams.findOne( { _id: req.params.id }, ( err, team ) => {
        res.send( { team } );
    } );
};

const createTeam = ( req, res ) => {
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

const updateTeam = ( req, res ) => {
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

const deleteTeam = ( req, res ) => {
    db.teams.remove( { _id: req.params.id }, {}, ( err, team ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: team } );
    } );
};

module.exports = {
    getTeam,
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam,
};

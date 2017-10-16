const Joi = require( "joi" );
const leaguesSchema = require( "../models/leagues" );
const db = require( "../dataBases" ).db;

exports.getLeagues = ( req, res ) => {
    db.leagues.find( {}, ( err, leagues ) => {
        res.send( { leagues } );
    } );
};

exports.getLeague = ( req, res ) => {
    db.leagues.find( { _id: req.params.id }, ( err, league ) => {
        res.send( { league } );
    } );
};

exports.createLeague = ( req, res ) => {
    const result = Joi.validate( req.body, leaguesSchema.schema );
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

exports.updateLeague = ( req, res ) => {
    const result = Joi.validate( req.body, leaguesSchema.schema );
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

exports.deleteLeague = ( req, res ) => {
    db.leagues.remove( { _id: req.params.id }, {}, ( err, league ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: league } );
    } );
};

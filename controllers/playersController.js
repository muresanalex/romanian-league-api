const Joi = require( "joi" );
const playersSchema = require( "../models/players" );
const db = require( "../dataBases" ).db;

exports.getPlayers = ( req, res ) => {
    db.players.find( {}, ( err, players ) => {
        res.send( { players } );
    } );
};

exports.getPlayer = ( req, res ) => {
    db.players.find( { _id: req.params.id }, ( err, player ) => {
        res.send( { player } );
    } );
};

exports.createPlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playersSchema.schema );
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

exports.updatePlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playersSchema.schema );
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

exports.deletePlayer = ( req, res ) => {
    db.players.remove( { _id: req.params.id }, {}, ( err, player ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: player } );
    } );
};

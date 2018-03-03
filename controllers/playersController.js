const Joi = require( "joi" );
const playersSchema = require( "../models/players" );
const db = require( "../dataBases" ).db;

const getPlayers = ( req, res ) => {
    db.players.find( {} ).sort( { name: 1 } ).exec( ( err, players ) => {
        res.send( { players } );
    } );
};

const getPlayer = ( req, res ) => {
    db.players.findOne( { _id: req.params.id }, ( err, player ) => {
        res.send( { player } );
    } );
};

const createPlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playersSchema.schema );
    if ( result.error ) {
        console.log( result.error );
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.players.insert( req.body, ( err, player ) => {
        if ( err ) {
            console.log( err );
            res.send( { status: "error", error: err } );
            return;
        }
        console.log( player );
        res.send( { status: "success", payload: player } );
    } );
};

const updatePlayer = ( req, res ) => {
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

const deletePlayer = ( req, res ) => {
    db.players.remove( { _id: req.params.id }, {}, ( err, player ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: player } );
    } );
};

module.exports = {
    getPlayer,
    getPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
};

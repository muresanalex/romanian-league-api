const Joi = require( "joi" );
const playersSchema = require( "../models/players" );
const db = require( "../dataBases" ).db;

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
                res.json( { data: players, numberOfPages } );
            } );
    } else {
        db.players
            .find( findCondition )
            .sort( { name: 1 } )
            .exec( ( err, players ) => {
                res.json( { data: players } );
            } );
    }
};

const getPlayer = ( req, res ) => {
    db.players.findOne( { _id: req.params.id }, ( err, player ) => {
        res.json( { player } );
    } );
};

const createPlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playersSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.players.insert( req.body, err => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Player created!" } );
    } );
};

const updatePlayer = ( req, res ) => {
    const result = Joi.validate( req.body, playersSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.players.update( { _id: req.params.id }, req.body, err => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Player successfully updated!" } );
    } );
};

const deletePlayer = ( req, res ) => {
    db.players.remove( { _id: req.params.id }, {}, err => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Player deleted!" } );
    } );
};

module.exports = {
    getPlayer,
    getPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
};

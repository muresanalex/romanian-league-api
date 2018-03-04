const Joi = require( "joi" );
const playersSchema = require( "../models/players" );
const db = require( "../dataBases" ).db;

const getPlayers = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const findCondition = {
        $or: [
            {
                lastName: { $regex: new RegExp( req.query.search ) },
            },
            {
                firstName: { $regex: new RegExp( req.query.search ) },
            },
        ],
    };

    if ( !isNaN( page ) ) {
        let numberOfPages = 0;

        db.players.count( {}, ( err, count ) => {
            const integer = parseInt( count / itemsPerPage, 10 );
            numberOfPages = count % itemsPerPage > 0 ? integer + 1 : integer;
        } );

        db.players.find( {} ).sort( { firstName: 1 } ).skip( ( page - 1 ) * itemsPerPage ).limit( itemsPerPage )
            .exec( ( err, players ) => {
                res.send( { data: players, numberOfPages } );
            } );
    } else {
        db.players.find( findCondition ).sort( { name: 1 } ).exec( ( err, players ) => {
            res.send( { data: players } );
        } );
    }
};

const getPlayer = ( req, res ) => {
    db.players.findOne( { _id: req.params.id }, ( err, player ) => {
        res.send( { player } );
    } );
};

const createPlayer = ( req, res ) => {
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

const Joi = require( "joi" );
const leaguesSchema = require( "../models/leagues" );
const db = require( "../dataBases" ).db;

const getLeagues = ( req, res ) => {
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search ),
        },
    };
    db.leagues.find( findCondition ).sort( { name: 1 } ).exec( ( err, leagues ) => {
        res.send( { data: leagues } );
    } );
};

const getLeague = ( req, res ) => {
    db.leagues.findOne( { _id: req.params.id }, ( err, league ) => {
        res.send( { league } );
    } );
};

const createLeague = ( req, res ) => {
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
        res.json( { status: "success", payload: league } );
    } );
};

const updateLeague = ( req, res ) => {
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

const deleteLeague = ( req, res ) => {
    db.leagues.remove( { _id: req.params.id }, {}, ( err, league ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: league } );
    } );
};

module.exports = {
    getLeague,
    getLeagues,
    createLeague,
    updateLeague,
    deleteLeague,
};

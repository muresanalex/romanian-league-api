const Joi = require( "joi" );
const leaguesSchema = require( "../models/leagues" );
const db = require( "../dataBases" ).db;

const getLeagues = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search ),
        },
    };

    if ( !isNaN( page ) ) {
        let numberOfPages = 0;

        db.leagues.count( {}, ( err, count ) => {
            const integer = parseInt( count / itemsPerPage, 10 );
            numberOfPages = count % itemsPerPage > 0 ? integer + 1 : integer;
        } );

        db.leagues.find( {} ).sort( { name: 1 } ).skip( ( page - 1 ) * itemsPerPage ).limit( itemsPerPage )
            .exec( ( err, leagues ) => {
                res.send( { data: leagues, numberOfPages } );
            } );
    } else {
        db.leagues.find( findCondition ).sort( { name: 1 } ).exec( ( err, leagues ) => {
            res.send( { data: leagues } );
        } );
    }
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

const Joi = require( "joi" );
const leaguesSchema = require( "../models/leagues" );
const db = require( "../dataBases" ).db;

const getLeagues = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search, "i" ),
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
                res.json( { data: leagues, numberOfPages } );
            } );
    } else {
        db.leagues.find( findCondition ).sort( { name: 1 } ).exec( ( err, leagues ) => {
            res.json( { data: leagues } );
        } );
    }
};

const getLeague = ( req, res ) => {
    db.leagues.findOne( { _id: req.params.id }, ( err, league ) => {
        res.json( { league } );
    } );
};

const createLeague = ( req, res ) => {
    const result = Joi.validate( req.body, leaguesSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.leagues.insert( req.body, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "League created!" } );
    } );
};

const updateLeague = ( req, res ) => {
    const result = Joi.validate( req.body, leaguesSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.leagues.update( { _id: req.params.id }, req.body, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "League successfully updated!" } );
    } );
};

const deleteLeague = ( req, res ) => {
    db.leagues.remove( { _id: req.params.id }, {}, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "League deleted!" } );
    } );
};

module.exports = {
    getLeague,
    getLeagues,
    createLeague,
    updateLeague,
    deleteLeague,
};

const Joi = require( "joi" );
const formationSchema = require( "../models/formations" );
const db = require( "../dataBases" ).db;

const getFormations = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search, "i" ),
        },
    };

    if ( !isNaN( page ) ) {
        let numberOfPages = 0;

        db.formations.count( {}, ( err, count ) => {
            const integer = parseInt( count / itemsPerPage, 10 );
            numberOfPages = count % itemsPerPage > 0 ? integer + 1 : integer;
        } );

        db.formations
            .find( {} )
            .sort( { name: 1 } )
            .skip( ( page - 1 ) * itemsPerPage )
            .limit( itemsPerPage )
            .exec( ( err, formations ) => {
                res.json( { data: formations, numberOfPages } );
            } );
    } else {
        db.formations
            .find( findCondition )
            .sort( { name: 1 } )
            .exec( ( err, formations ) => {
                res.json( { data: formations } );
            } );
    }
};

const getFormation = ( req, res ) => {
    db.formations.findOne( { _id: req.params.id }, ( err, formation ) => {
        res.json( { formation } );
    } );
};

const createFormation = ( req, res ) => {
    const result = Joi.validate( req.body, formationSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.formations.insert( req.body, err => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Formation saved!" } );
    } );
};

const updateFormation = ( req, res ) => {
    const result = Joi.validate( req.body, formationSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.formations.update( { _id: req.params.id }, req.body, err => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Formation successfully updated!" } );
    } );
};

const deleteFormation = ( req, res ) => {
    db.formations.remove( { _id: req.params.id }, {}, err => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Formation removed!" } );
    } );
};

module.exports = {
    getFormations,
    getFormation,
    createFormation,
    updateFormation,
    deleteFormation,
};

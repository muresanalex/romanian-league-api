const Joi = require( "joi" );
const countriesSchema = require( "../models/countries" );
const db = require( "../dataBases" ).db;

const getCountries = ( req, res ) => {
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search ),
        },
    };
    db.countries.find( findCondition ).sort( { name: 1 } ).exec( ( err, countries ) => {
        res.send( { countries } );
    } );
};

const getCountry = ( req, res ) => {
    db.countries.findOne( { _id: req.params.id }, ( err, country ) => {
        res.send( { country } );
    } );
};

const createCountry = ( req, res ) => {
    const result = Joi.validate( req.body, countriesSchema.schema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.countries.insert( req.body, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

const updateCountry = ( req, res ) => {
    const result = Joi.validate( req.body, countriesSchema.schema );
    if ( result.error ) {
        res.send( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.countries.update( { _id: req.params.id }, req.body, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

const deleteCountry = ( req, res ) => {
    db.countries.remove( { _id: req.params.id }, {}, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

module.exports = {
    getCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry,
};

const Joi = require( "joi" );
const countriesSchema = require( "../models/countries" );
const db = require( "../dataBases" ).db;

exports.getCountries = ( req, res ) => {
    db.countries.find( {}, ( err, countries ) => {
        res.send( { countries } );
    } );
};

exports.getCountry = ( req, res ) => {
    db.countries.find( { _id: req.params.id }, ( err, country ) => {
        res.send( { country } );
    } );
};

exports.createCountry = ( req, res ) => {
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

exports.updateCountry = ( req, res ) => {
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

exports.deleteCountry = ( req, res ) => {
    db.countries.remove( { _id: req.params.id }, {}, ( err, country ) => {
        if ( err ) {
            res.send( { status: "error", error: err } );
            return;
        }
        res.send( { status: "success", payload: country } );
    } );
};

const Joi = require( "joi" );
const countriesSchema = require( "../models/countries" );
const db = require( "../dataBases" ).db;

const getCountries = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search, "i" ),
        },
    };

    if ( !isNaN( page ) ) {
        let numberOfPages = 0;

        db.countries.count( {}, ( err, count ) => {
            const integer = parseInt( count / itemsPerPage, 10 );
            numberOfPages = count % itemsPerPage > 0 ? integer + 1 : integer;
        } );

        db.countries.find( {} ).sort( { name: 1 } ).skip( ( page - 1 ) * itemsPerPage ).limit( itemsPerPage )
            .exec( ( err, countries ) => {
                res.json( { data: countries, numberOfPages } );
            } );
    } else {
        db.countries.find( findCondition ).sort( { name: 1 } ).exec( ( err, countries ) => {
            res.json( { data: countries } );
        } );
    }
};

const getCountry = ( req, res ) => {
    db.countries.findOne( { _id: req.params.id }, ( err, country ) => {
        res.json( { country } );
    } );
};

const createCountry = ( req, res ) => {
    const result = Joi.validate( req.body, countriesSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.countries.insert( req.body, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Country saved!" } );
    } );
};

const updateCountry = ( req, res ) => {
    const result = Joi.validate( req.body, countriesSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.countries.update( { _id: req.params.id }, req.body, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Country successfully updated!" } );
    } );
};

const deleteCountry = ( req, res ) => {
    db.countries.remove( { _id: req.params.id }, {}, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Country removed!" } );
    } );
};

module.exports = {
    getCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry,
};

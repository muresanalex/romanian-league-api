const Joi = require( "joi" );
const teamsSchema = require( "../models/teams" );
const db = require( "../dataBases" ).db;

const getTeams = ( req, res ) => {
    const { page } = req.query;
    const itemsPerPage = 10;
    const findCondition = {
        name: {
            $regex: new RegExp( req.query.search, "i" ),
        },
    };

    if ( !isNaN( page ) ) {
        let numberOfPages = 0;

        db.teams.count( {}, ( err, count ) => {
            const integer = parseInt( count / itemsPerPage, 10 );
            numberOfPages = count % itemsPerPage > 0 ? integer + 1 : integer;
        } );

        db.teams.find( {} ).sort( { name: 1 } ).skip( ( page - 1 ) * itemsPerPage ).limit( itemsPerPage )
            .exec( ( err, teams ) => {
                res.json( { data: teams, numberOfPages } );
            } );
    } else {
        db.teams.find( findCondition ).sort( { name: 1 } ).exec( ( err, teams ) => {
            res.json( { data: teams } );
        } );
    }
};

const getTeam = ( req, res ) => {
    db.teams.findOne( { _id: req.params.id }, ( err, team ) => {
        res.json( { team } );
    } );
};

const createTeam = ( req, res ) => {
    const result = Joi.validate( req.body, teamsSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.teams.insert( req.body, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Team created!" } );
    } );
};

const updateTeam = ( req, res ) => {
    const result = Joi.validate( req.body, teamsSchema.schema );
    if ( result.error ) {
        res.json( {
            status: "error",
            error: result.error,
        } );
        return;
    }
    db.teams.update( { _id: req.params.id }, req.body, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Team successfully updated!" } );
    } );
};

const deleteTeam = ( req, res ) => {
    db.teams.remove( { _id: req.params.id }, {}, ( err ) => {
        if ( err ) {
            res.json( { status: "error", error: err } );
            return;
        }
        res.json( { status: "success", message: "Team deleted!" } );
    } );
};

module.exports = {
    getTeam,
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam,
};

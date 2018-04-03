const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    countryId: Joi.string().required(),
    leagueId: Joi.string().required(),
    stadium: Joi.string(),
    coach: Joi.string(),
    image: Joi.string().allow( "" ).optional(),
} );

module.exports = { schema };

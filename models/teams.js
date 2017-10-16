const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    country: Joi.string().required(),
    stadium: Joi.string(),
} );

module.exports = { schema };

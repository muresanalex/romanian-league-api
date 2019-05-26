const Joi = require( "joi" );

const schema = Joi.object().keys( {
    name: Joi.string().required(),
    continent: Joi.string()
        .allow( "" )
        .optional(),
    image: Joi.string()
        .allow( "" )
        .optional(),
} );

module.exports = { schema };

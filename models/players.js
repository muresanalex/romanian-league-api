const Joi = require( "joi" );

const schema = Joi.object().keys( {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    fullName: Joi.string().required(),
    countryId: Joi.string().required(),
    dateOfBirth: Joi.date()
        .min( "1-1-1967" )
        .required(),
    height: Joi.number()
        .integer()
        .min( 100 )
        .max( 250 )
        .required(),
    weight: Joi.number()
        .integer()
        .min( 40 )
        .max( 150 )
        .required(),
    teamId: Joi.string().required(),
    position: Joi.string().required(),
    jerseyNumber: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    preferredFoot: Joi.string().required(),
    internationalReputation: Joi.number()
        .integer()
        .min( 1 )
        .max( 5 )
        .required(),
    weakFoot: Joi.number()
        .integer()
        .min( 1 )
        .max( 5 )
        .required(),
    skillMoves: Joi.number()
        .integer()
        .min( 1 )
        .max( 5 )
        .required(),
    crossing: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    finishing: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    headingAcc: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    shortPassing: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    volleys: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    dribbling: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    curve: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    fkAccuracy: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    longPassing: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    ballControl: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    acceleration: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    sprintSpeed: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    agility: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    reactions: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    balance: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    shotPower: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    jumping: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    stamina: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    strength: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    longShots: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    aggression: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    interceptions: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    positioning: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    vision: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    penalties: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    composure: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    marking: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    standingTackle: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    slidingTackle: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    gkDiving: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    gkHandling: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    gkKicking: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    gkPositioning: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    gkReflexes: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    potential: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 )
        .required(),
    overall: Joi.number()
        .integer()
        .min( 1 )
        .max( 99 ),
    image: Joi.string()
        .allow( "" )
        .optional(),
} );

module.exports = { schema };

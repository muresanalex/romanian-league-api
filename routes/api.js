const express = require( "express" );

const router = express.Router();

router.get( "/test", ( req, res ) => {
    res.send( { type: "GET" } );
} );

module.exports = router;

process.env.NODE_ENV = "test";

const chai = require( "chai" );
const chaiHttp = require( "chai-http" );
const server = require( "../index" );
const db = require( "../dataBases" ).db;

const should = chai.should();

chai.use( chaiHttp );

describe( "Countries", () => {
    beforeEach( ( done ) => {
        db.countries.remove( {}, { multi: true }, ( err, numRemoved ) => {
            done();
        } );
    } );

    describe( "/GET countries", () => {
        it( "it should GET all countries", ( done ) => {
            chai.request( server )
                .get( "/api/countries" )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.countries.length.should.be.eql( 0 );
                    done();
                } );
        } );
    } );

    describe( "/POST country", () => {
        it( "it should not post a country without name", ( done ) => {
            const country = {};
            chai.request( server )
                .post( "/api/countries" )
                .send( country )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "error" );
                    res.body.error.should.have.property( "name" );
                    done();
                } );
        } );

        it( "it should post a country", ( done ) => {
            const country = {
                name: "Romania",
            };
            chai.request( server )
                .post( "/api/countries" )
                .send( country )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "_id" );
                    done();
                } );
        } );
    } );
    describe( "/GET/:id country", () => {
        it( "should GET a country by the given id", ( done ) => {
            const country = {
                name: "Romania",
            };
            let countryId;

            chai.request( server )
                .post( "/api/countries" )
                .send( country )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "_id" );
                    countryId = res.body.payload._id;
                    done();
                } );

            chai.request( server )
                .get( `/api/countries/${ countryId }` )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.country[ 0 ].should.have.property( "name" ).eql( "Romania" );
                    res.body.country[ 0 ].should.have.property( "_id" ).eql( countryId );
                    done();
                } );
        } );
    } );
    describe( "/PUT/:id country", () => {
        it( "it should UPDATE a country given the id", ( done ) => {
            const country = {
                name: "Moldova",
            };
            let countryId;

            chai.request( server )
                .post( "/api/countries" )
                .send( country )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "_id" );
                    countryId = res.body.payload._id;
                    done();
                } );

            chai.request( server )
                .put( `/api/countries/${ countryId }` )
                .send( { name: "Republica Moldova" } )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
    describe( "/DELETE/:id country", () => {
        it( "it should DELETE a country given the id", ( done ) => {
            const country = {
                name: "Moldova",
            };
            let countryId;

            chai.request( server )
                .post( "/api/countries" )
                .send( country )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( "object" );
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.payload.should.have.property( "name" );
                    res.body.payload.should.have.property( "_id" );
                    countryId = res.body.payload._id;
                    done();
                } );

            chai.request( server )
                .delete( `/api/countries/${ countryId }` )
                .end( ( err, res ) => {
                    res.body.should.have.property( "status" ).eql( "success" );
                    res.body.should.have.property( "payload" ).eql( 1 );
                    done();
                } );
        } );
    } );
} );

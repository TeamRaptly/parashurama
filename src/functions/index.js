require( 'isomorphic-fetch' );
const path = require( 'path' );
const functions = require( 'firebase-functions' );
const next = require( 'next' );
const express = require( "express" );
const bodyParser = require( "body-parser" );
// const compression = require( 'compression' );
// const helmet = require( 'helmet' );
// const cors = require( 'cors' );
// const { parse } = require( 'url' );

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next( {
    dev,
    conf: { distDir: `${ path.relative( process.cwd(), __dirname ) }/next` }
} );

const handle = nextApp.getRequestHandler();

const server = express();
server.disable( 'x-powered-by' );
// server.use( cors() );
server.use( bodyParser.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );
// server.set('trust proxy', 1);
// server.use( compression() );
// server.use( helmet() );

// Be sure to pass `true` as the second argument to `url.parse`.
// This tells it to parse the query portion of the URL.
// const parsedUrl = parse( req.url, true );
// const { pathname, query } = parsedUrl;

//  API route
server.get( '/api', ( req, res ) =>
{
    res.status( 200 ).json( { "some": "text" } );
} );

//  Catch all route
server.get( '*', ( req, res ) => handle( req, res ) );

//  Firebase NextJS Express Prepare/Init Route
exports.next = functions.https.onRequest( async ( req, res ) =>
{
    console.log( "in next route" );

    await nextApp.prepare();
    return server( req, res );
} );
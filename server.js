/* eslint one-var: 0 */
var express = require( 'express' );
var multer = require( 'multer' );
var autoReap = require( 'multer-autoreap' );
var upload = multer( {
  dest: __dirname + '/tmp'
} );

var app = express();
var port = process.env.PORT || 8080;


app.set( 'view options', {
  layout: false
} );
app.use( express.static( __dirname + '/public' ) );

app.post( '/get-file-size', upload.single( 'sizeFile' ), function( req, res, next ) {
  if ( !req.file ) {
    next( new Error('Please select a file.') );
  }
  res.send( {
    size: req.file.size
  } )
  next();

}, autoReap )

app.get( '/', function( req, res, next ) {
  res.render( 'index.html' );
} );
//The 404 Route (ALWAYS Keep this as the last route)
app.get( '*', function( req, res ) {
  res.status( 404 ).json( {
    error: '404 File not found'
  } );
} );

app.use( myErrorHandler );

app.listen( port, function() {
  console.log( 'Example app listening on port %d!', port );
} );

function myErrorHandler( err, req, res, next ) {
  res.send( {
    error: err.message
  } );
  next( err );
}


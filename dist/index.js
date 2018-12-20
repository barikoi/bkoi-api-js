( function ( window ) {

    'use strict'

    function BkoiDev( ) {

        var Bkoi = { };

        Bkoi.search = function ( query ) {

            axios.post( 'https://barikoi.xyz/v1/tnt/search/test/', {
                search: query,
              })

              .then( function ( response ) {
                console.log( response.data.places );
              })

              .catch( function ( error ) {
                console.log( error );
              })

        }

        return Bkoi;

    }

    if ( typeof ( Bkoi ) === 'undefined' ) {
        window.Bkoi = BkoiDev( )
    }

}( window ));
( function ( window ) {

    'use strict'
    
    let temp;
    
    function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}




    function BkoiDev( ) {

        var Bkoi = { };

        Bkoi.search = function ( query, cb ) {
          
          postAjax('https://barikoi.xyz/v1/tnt/search/test/', {  search: query }, function(response){cb(response) });

            // axios.post( 'https://barikoi.xyz/v1/tnt/search/test/', {
            //     search: query,
            //   })

            //   .then( function ( response ) {
            //     // console.log(response.data.places);
            //     cb(response.data.places)
            //   })

            //   .catch( function ( error ) {
            //     console.log( error );
            //   });
              
              // return function(response){
              //     return response
              // }

        }

        return Bkoi;

    }

    if ( typeof ( Bkoi ) === 'undefined' ) {
        window.Bkoi = BkoiDev( )
    }

}( window ));
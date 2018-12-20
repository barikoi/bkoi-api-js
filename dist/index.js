(function(window) {

    'use strict';

    function BkoiDev() {
        
        var Bkoi = {};

        Bkoi.search = function() {
            console.log('Khoj the search')
        }

        return Bkoi;

    }

    if (typeof(Bkoi) === 'undefined') {
        window.Bkoi = BkoiDev();
    }

}(window));
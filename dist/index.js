(function(window) {

    'use strict'

    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[scripts.length - 1];

    var queryString = myScript.src.replace(/^[^\?]+\??/, '');
    console.log(queryString)

    var params = parseQuery(queryString);
    console.log(params)

    function parseQuery(query) {
        var Params = new Object();
        if (!query) return Params; // return empty object
        var Pairs = query.split(/[;&]/);
        for (var i = 0; i < Pairs.length; i++) {
            var KeyVal = Pairs[i].split(':');
            if (!KeyVal || KeyVal.length != 2) continue;
            var key = unescape(KeyVal[0]);
            var val = unescape(KeyVal[1]);
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    function postAjax(url, data, success) {
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');

        // var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('post', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState > 3 && xhr.status == 200) {
                success(xhr.responseText);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }

    function httpGetAsync(theUrl, callback) {

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200)
                callback(xhr.responseText);
        }
        xhr.open("GET", theUrl, true); // true for asynchronous 
        xhr.send(null);
        return xhr;
    }



    function BkoiDev() {

        var Bkoi = {};

        Bkoi.search = function(query, cb) {

            httpGetAsync('https://barikoi.xyz/v1/api/search/autocomplete/' + params.key + '/place?q=' + query, function(response) {
                
                if (Array.isArray(JSON.parse(response).places)) {
                   return cb(JSON.parse(response).places)
                }
                 
                return cb([])
            });

        }

        return Bkoi;

    }

    if (typeof(Bkoi) === 'undefined') {
        window.Bkoi = new BkoiDev()
    }

}(window));
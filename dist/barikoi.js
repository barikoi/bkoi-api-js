(function (window) {

    'use strict'

    var scripts = document.getElementsByTagName('script')
    var myScript = scripts[scripts.length - 1]
    var queryString = myScript.src.replace(/^[^\?]+\??/, '')
    var params = parseQuery(queryString)

    function parseQuery(query) {

        var Params = new Object()

        if (!query) return Params // return empty object

        var Pairs = query.split(/[;&]/)

        for (var i = 0; i < Pairs.length; i++) {

            var KeyVal = Pairs[i].split(':')

            if (!KeyVal || KeyVal.length != 2) continue

            var key = unescape(KeyVal[0])
            var val = unescape(KeyVal[1])
            val = val.replace(/\+/g, ' ')

            Params[key] = val
        }

        return Params
    }

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    function postAjax(url, data, success) {

        var params = typeof data == 'string' ? data : Object.keys(data).map(

            function (k) {

                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])

            }

        ).join('&')

        // var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")

        xhr.open('post', url)
        xhr.onreadystatechange = function () {

            if (xhr.readyState > 3 && xhr.status == 200) {
                success(xhr.responseText)
            }
        }

        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(params)

        return xhr
    }

    function httpGetAsync(theUrl, callback) {

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4 && xhr.status == 200)

                callback(xhr.responseText)
        }

        xhr.open("GET", theUrl, false) // true for asynchronous 
        xhr.send(null)

        return xhr

    }


    function BkoiDev() {

        if (params.key) {       //API key check

            var Bkoi = {}

            // REVERSE GEOCODING //

            Bkoi.reverseGeo = function (longitude, latitude, cb) {

                let reverseGeoUrl = 'https://barikoi.xyz/v1/api/search/reverse/geocode/' + params.key + '/place?' +
                    'longitude=' + longitude + '&latitude=' + latitude

                httpGetAsync(reverseGeoUrl, function (response) {

                    cb(response)

                })
            }

            // GEOCODING //

            Bkoi.geocode = function (place_id, cb) {

                let geoUrl = 'https://barikoi.xyz/v1/api/search/geocode/' + params.key + '/place/' + place_id

                httpGetAsync(geoUrl, function (response) {

                    cb(response)

                })
            }


            // AUTOCOMPLETE //

            Bkoi.search = function (query, cb) {

                let searchUrl = 'https://barikoi.xyz/v1/api/search/autocomplete/' + params.key + '/place?q=' + query

                httpGetAsync(searchUrl, function (response) {

                    if (Array.isArray(JSON.parse(response).places)) {

                        return cb(JSON.parse(response).places)

                    }

                    return cb([])
                });

            }


            // NEARBY //

            Bkoi.nearby = function (longitude, latitude, cb) {

                let nearbyUrl = 'https://barikoi.xyz/v1/api/search/nearby/' + params.key + '/0.5/10?' +
                    'longitude=' + longitude + '&latitude=' + latitude

                httpGetAsync(nearbyUrl, function (response) {
                    
                     if (Array.isArray(JSON.parse(response.Place))) {
                        return cb(JSON.parse(response.Place))
                    }


                    return cb([])
                })
            }

            return Bkoi;

        } else {
            console.log( ' INVALID API KEY ')
        }
    }

    if (typeof (Bkoi) === 'undefined') {

        window.Bkoi = new BkoiDev()

    }

}(window))

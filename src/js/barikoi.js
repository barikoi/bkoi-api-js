(function(window) {
    'use strict'

    let _scripts = document.getElementsByTagName('script')
    let _myScript = _scripts[_scripts.length - 1]
    let _queryString = _myScript.src.replace(/^[^\?]+\??/, '')
    let _params = _parseQuery(_queryString)

    const _bkinput = document.querySelector('.bksearch')
    if (_bkinput ) {
        _bkinput.style.margin = "0 0 10px 0"
        _bkinput.placeholder = "Search here.."
    }

    let _searchData = ''

    function _parseQuery(query) {
        let _params = new Object()
        if (!query) return _params
        let Pairs = query.split(/[;&]/)
        for (let i = 0; i < Pairs.length; i++) {
            let KeyVal = Pairs[i].split(':')
            if (!KeyVal || KeyVal.length != 2) continue
            let key = unescape(KeyVal[0])
            let val = unescape(KeyVal[1])
            val = val.replace(/\+/g, ' ')
            _params[key] = val
        }
        return _params
    }

    let _xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    
    function _postAjax(url, data, success) {
        let _params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&')

        _xhr.open('post', url)
        _xhr.onreadystatechange = function() {
            if (_xhr.readyState > 3 && _xhr.status == 200) {
                success(_xhr.responseText)
            }
        }
        _xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        _xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        _xhr.send(_params)
        return _xhr
    }
    
    function _httpGetAsync(theUrl, callback) {
        _xhr.onreadystatechange = function() {
            if (_xhr.readyState == 4 && _xhr.status == 200)
                callback(_xhr.responseText)
        }
        _xhr.open("GET", theUrl, true) // true for asynchronous 
        _xhr.send(null)
        return _xhr
    }

    function _httpGetSync(theUrl, callback) {
        _xhr.onreadystatechange = function() {
            if (_xhr.readyState == 4 && _xhr.status == 200)
                callback(_xhr.responseText)
        }
        _xhr.open("GET", theUrl, false) // true for asynchronous 
        _xhr.send(null)
        return _xhr
    }

    function _autocomplete(inp, arr, cb) {
        let currentFocus
        inp.addEventListener("input", function(e) {
            let a, searchResultItem, val = this.value
            let i = arr.length
            closeAllLists()
            if (!val) { return false }
            currentFocus = -1
            while (Bkoi.container.element.hasChildNodes()) {
                Bkoi.container.element.removeChild(Bkoi.container.element.lastChild);
            }
            Bkoi.container.element.setAttribute("id", "bk-autocomplete-list")
            Bkoi.container.element.setAttribute("class", "bk-autocomplete-items")
            this.parentNode.appendChild(Bkoi.container.element);
            Bkoi.container.selector = '.bk-autocomplete-items';

            /*for each item in the array...*/
            while (i--) {
                searchResultItem = document.createElement("DIV");
                searchResultItem.setAttribute('class', Bkoi.container.name)
                searchResultItem.innerHTML = "<strong>" + arr[i].Address.substr(0, val.length) + "</strong>"
                searchResultItem.innerHTML += arr[i].Address.substr(val.length)
                searchResultItem.innerHTML += "<input type='hidden' value='" + JSON.stringify(arr[i]) + " '>"
                searchResultItem.addEventListener("click", function(e) {
                    _searchData = JSON.parse(this.getElementsByTagName("input")[0].value)
                    inp.value = JSON.parse(this.getElementsByTagName("input")[0].value).Address
                    Bkoi.setSelectedData(_searchData);
                    cb(JSON.parse(this.getElementsByTagName("input")[0].value))
                    closeAllLists()
                });
                Bkoi.container.element.appendChild(searchResultItem)
            }
        })
        
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            let x = document.querySelector("#bk-autocomplete-list")
            // console.log(x);
            if (x) x = x.getElementsByTagName("div")
            if (e.keyCode == 40) {
                currentFocus++

                /*and and make the current item more visible:*/
                addActive(x)
            } else if (e.keyCode == 38) {
                currentFocus--
                addActive(x)
            } else if (e.keyCode == 13) {
                e.preventDefault()
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click()
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false
            /*start by removing the "active" class on all items:*/
            removeActive(x)
            if (currentFocus >= x.length) currentFocus = 0
            if (currentFocus < 0) currentFocus = (x.length - 1)
            /*add class "_bk-autocomplete-active":*/
            x[currentFocus].classList.add("bk-autocomplete-active")
        }
        
        function removeActive(x) {
            /*a function to remove the "active" class from all _autocomplete items:*/
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("bk-autocomplete-active")
            }
        }

        function closeAllLists(elmnt) {
            let x = document.getElementsByClassName("bk-autocomplete-items")
            for (let i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i])
                }
            }
        }

        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function(e) {
            //console.log(e.target.value)
            closeAllLists(e.target)
        })
    }



    if (_bkinput) {
        _bkinput.addEventListener('input', function(e, cb) {
            let query = e.target.value
            Bkoi.search(query, function(response) {
                _autocomplete(_bkinput, response, function(clickedItem) {
                    Bkoi.geocode(clickedItem.id, function(res) {
                        _searchData = res;
                        //return res
                        Bkoi.setSelectedData(_searchData)
                    })
                })
            })
        })
    }   

    // Main libraray functions
    function BkoiDev() {
        if (_params.key) { //API key check
            let Bkoi = {
                container: { name: 'list-item', element: document.querySelector('.bklist'), selector: '.bklist' }
            }
            
            Bkoi.getSelectedData = function() {
                return JSON.parse(_searchData)[0];
            }

            Bkoi.setSelectedData = function(selectedItem) {
                _searchData = selectedItem;
            }

            Bkoi.on = function (event, elem, callback, capture) {
                if (typeof (elem) === 'function') {
                    capture = callback
                    callback = elem
                    elem = window
                }
                capture = capture ? true : false;
                elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
                if (!elem) return;
                elem.addEventListener(event, function() {
                }, capture)
            };

            
            Bkoi.onSelect = function (callback) {
                

                Bkoi.container.element.addEventListener('click', callback)
            };
            
            // REVERSE GEOCODING //
            Bkoi.reverseGeo = function(longitude, latitude, cb) {
                let reverseGeoUrl = 'https://barikoi.xyz/v1/api/search/reverse/geocode/' + _params.key + '/place?' +
                    'longitude=' + longitude + '&latitude=' + latitude
                _httpGetAsync(reverseGeoUrl, function(response) {
                    cb(response)
                })
            }

            // GEOCODING //
            Bkoi.geocode = function(place_id, cb) {
                let geoUrl = 'https://barikoi.xyz/v1/api/search/geocode/' + _params.key + '/place/' + place_id
                _httpGetSync(geoUrl, function(response) {
                    cb(response)
                })
            }

            // _autocomplete //
            Bkoi.search = function(query, cb) {
                let searchUrl = 'https://barikoi.xyz/v1/api/search/autocomplete/' + _params.key + '/place?q=' + query
                _httpGetAsync(searchUrl, function(response) {
                    if (Array.isArray(JSON.parse(response).places)) {
                        return cb(JSON.parse(response).places)
                    }
                    return cb([])
                });
            }

            // NEARBY //
            Bkoi.nearby = function(longitude, latitude, cb) {
                let nearbyUrl = 'https://barikoi.xyz/v1/api/search/nearby/' + _params.key + '/0.5/10?' +
                    'longitude=' + longitude + '&latitude=' + latitude
                _httpGetAsync(nearbyUrl, function(response) {
                    return cb(response)
                })
            }
            return Bkoi
        } else {
            console.log(' INVALID API KEY ')
        }
    }
    
    if (typeof(Bkoi) === 'undefined') {
        window.Bkoi = new BkoiDev()
    }

}(window));
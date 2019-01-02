
# bkoi-dev


A small JavaScript library that provides easy interface to use Barikoi API's

## Getting started

### Include the library

Include [Barikoi](bkoi-lib.js) in your page:  
```html
<script src="https://cdn.jsdelivr.net/gh/ReedwanHossain/bkoi-dev/dist/bkoi-lib.js?key:YOUR_API_KEY"></script>
```

## Documentation
### Search Method
##### Bkoi.search(string, callback)
This method performs location search using Barikoi Search API. It accepts two arguments
a query string and a callback function and returns an array of locations 
#### Example
```js
//  Search for 'cafe'

Bkoi.search('cafe', function(response){
 	console.log(response) //gets a location array 
})

### Reverse Geocode Method
##### Bkoi.reverseGeo(long, lat, callback)
This method performs location search using Barikoi Reverse Geocode API. It accepts three arguments
a longitude, a latitude and a callback function and returns a Place object containing place information
#### Example
```js
//  Get Reverse Geo Address

Bkoi.reverseGeo(90.36668110638857, 23.83723803415923, function (response) {
	console.log(response)
})

### Nearby Method
##### Bkoi.nearby(long, lat, callback)
This method performs location search using Barikoi Nearby API. It accepts three arguments
a longitude, a latitude and a callback function and returns an array of nearby locations
#### Example
```js
//  Get Nearby Locations

Bkoi.reverseGeo(90.36668110638857, 23.83723803415923, function (response) {
	console.log(response)
})




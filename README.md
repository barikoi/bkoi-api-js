
# bkoi-dev

A small JavaScript library that provides easy interface to use Barikoi API's

## Getting started

### Include the library

Include [Barikoi](barikoi.js) in your page:  
```html
<script src="https://cdn.jsdelivr.net/gh/ReedwanHossain/bkoi-dev/dist/index.js"></script>
```

## Documentation
### Search Method
##### Bkoi.search(string, callback)
This method performs location search using Barikoi Search API. It accepts two arguments
a query string and a callback function and returns an array of locations 
#### Example
```js
//  search for 'cafe'
Bkoi.search('cafe', function(response){
 	console.log(response); //gets a location array 
})
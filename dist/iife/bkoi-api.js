var bkoiapi=function(e){"use strict";function r(e,r,t,o){if("a"===t&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?o:"a"===t?o.call(e):o?o.value:r.get(e)}var t,o;return t=new WeakMap,o=new WeakMap,e.BkoiApi=class{constructor(e){var a;t.set(this,""),o.set(this,[{key:"reverse-geo",name:"Reverse Geo",apiUrl:"https://barikoi.xyz/v1/api/search/reverse"}]),this.reverseGeo=e=>{var a,i,n;if(!r(this,t,"f"))return new Promise(((e,r)=>r(new Error("Please provide a valid API KEY to the constructor."))));const s=null!==(i=null===(a=r(this,o,"f").find((e=>"reverse-geo"===e.key)))||void 0===a?void 0:a.apiUrl)&&void 0!==i?i:"";if(!s)return new Promise(((e,r)=>r(new Error("Reverse Geo API unavailable. Please contact the provider."))));const c=`${s}/${r(this,t,"f")}/geocode?`,l={};return(null==e?void 0:e.params)&&Object.keys(e.params).forEach((r=>{l[r]=String(e.params[r])})),fetch(c+new URLSearchParams(l).toString(),Object.assign({headers:null!==(n=null==e?void 0:e.headers)&&void 0!==n?n:{},method:"GET"},e)).then((e=>e.json())).then((e=>e)).catch((e=>{throw e}))},function(e,r,t,o,a){if("m"===o)throw new TypeError("Private method is not writable");if("a"===o&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof r?e!==r||!a:!r.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");"a"===o?a.call(e,t):a?a.value=t:r.set(e,t)}(this,t,null!==(a=null==e?void 0:e.apiKey)&&void 0!==a?a:"","f")}},Object.defineProperty(e,"__esModule",{value:!0}),e}({});

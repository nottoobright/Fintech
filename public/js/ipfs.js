!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("IPFS",[],e):"object"==typeof exports?exports.IPFS=e():t.IPFS=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,e,r){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e){"use strict";var r=window.XMLHttpRequest;t.exports=r},function(t,e,r){"use strict";function n(t){if(!(this instanceof n))throw Error('[ipfs-mini] IPFS instance must be instantiated with "new" flag (e.g. var ipfs = new IPFS("http://localhost:8545");).');var e=this;e.setProvider(t||{})}function o(t){for(;;){var e="----IPFSMini"+1e5*Math.random()+"."+1e5*Math.random();if(t.indexOf(e)===-1)return e}}var i=r(0);t.exports=n,n.prototype.setProvider=function(t){if("object"!=typeof t)throw Error("[ifpsjs] provider must be type Object, got '"+typeof t+"'.");var e=this,r=e.provider=Object.assign({host:"127.0.0.1",pinning:!0,port:"5001",protocol:"http",base:"/api/v0"},t||{});e.requestBase=r.protocol+"://"+r.host+":"+r.port+r.base},n.prototype.sendAsync=function(t,e){var r=this,n=new i,o=t||{},s=e||function(){};n.onreadystatechange=function(){if(4===n.readyState&&1!==n.timeout)if(200!==n.status)s(Error("[ipfs-mini] status "+n.status+": "+n.responseText),null);else try{s(null,o.jsonParse?JSON.parse(n.responseText):n.responseText)}catch(t){s(Error("[ipfs-mini] while parsing data: '"+(n.responseText+"")+"', error: "+(t+"")+" with provider: '"+r.requestBase+"'",null))}};var a=r.provider.pinning&&"/add"===t.uri?"?pin=true":"";o.payload?n.open("POST",""+r.requestBase+t.uri+a):n.open("GET",""+r.requestBase+t.uri+a),o.accept&&n.setRequestHeader("accept",o.accept),o.payload&&o.boundary?(n.setRequestHeader("Content-Type","multipart/form-data; boundary="+o.boundary),n.send(o.payload)):n.send()},n.prototype.add=function(t,e){var r="object"==typeof t&&t.isBuffer?t.toString("binary"):t,n=o(r),i="--"+n+'\r\nContent-Disposition: form-data; name="path"\r\nContent-Type: application/octet-stream\r\n\r\n'+r+"\r\n--"+n+"--",s=function(t,r){return e(t,t?null:r.Hash)};this.sendAsync({jsonParse:!0,accept:"application/json",uri:"/add",payload:i,boundary:n},s)},n.prototype.addJSON=function(t,e){var r=this;r.add(JSON.stringify(t),e)},n.prototype.stat=function(t,e){var r=this;r.sendAsync({jsonParse:!0,uri:"/object/stat/"+t},e)},n.prototype.cat=function(t,e){var r=this;r.sendAsync({uri:"/cat/"+t},e)},n.prototype.catJSON=function(t,e){var r=this;r.cat(t,function(t,r){if(t)return e(t,null);try{e(null,JSON.parse(r))}catch(n){e(n,null)}})}}])});
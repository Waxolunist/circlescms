/*! URI.js v1.10.2 http://medialize.github.com/URI.js/ */
/* build contains: URI.js */
(function(l,s){"object"===typeof exports?module.exports=s(require("./punycode"),require("./IPv6"),require("./SecondLevelDomains")):"function"===typeof define&&define.amd?define(["./punycode","./IPv6","./SecondLevelDomains"],s):l.URI=s(l.punycode,l.IPv6,l.SecondLevelDomains)})(this,function(l,s,r){function d(a,b){if(!(this instanceof d))return new d(a,b);void 0===a&&(a="undefined"!==typeof location?location.href+"":"");this.href(a);return void 0!==b?this.absoluteTo(b):this}function n(a){return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g,
"\\$1")}function u(a){return String(Object.prototype.toString.call(a)).slice(8,-1)}function j(a){return"Array"===u(a)}function t(a,b){var c,d;if(j(b)){c=0;for(d=b.length;c<d;c++)if(!t(a,b[c]))return!1;return!0}var g=u(b);c=0;for(d=a.length;c<d;c++)if("RegExp"===g){if("string"===typeof a[c]&&a[c].match(b))return!0}else if(a[c]===b)return!0;return!1}function w(a,b){if(!j(a)||!j(b)||a.length!==b.length)return!1;a.sort();b.sort();for(var c=0,d=a.length;c<d;c++)if(a[c]!==b[c])return!1;return!0}function v(a){return encodeURIComponent(a).replace(/[!'()*]/g,
escape).replace(/\*/g,"%2A")}var e=d.prototype,p=Object.prototype.hasOwnProperty;d._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,duplicateQueryParameters:d.duplicateQueryParameters}};d.duplicateQueryParameters=!1;d.protocol_expression=/^[a-z][a-z0-9-+-]*$/i;d.idn_expression=/[^a-z0-9\.-]/i;d.punycode_expression=/(xn--)/i;d.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;d.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
d.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig;d.defaultPorts={http:"80",https:"443",ftp:"21",gopher:"70",ws:"80",wss:"443"};d.invalid_hostname_characters=/[^a-zA-Z0-9\.-]/;d.encode=v;d.decode=decodeURIComponent;d.iso8859=function(){d.encode=escape;d.decode=unescape};d.unicode=function(){d.encode=
v;d.decode=decodeURIComponent};d.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{"%24":"$","%26":"&","%2B":"+","%2C":",","%3B":";","%3D":"=","%3A":":","%40":"@"}},decode:{expression:/[\/\?#]/g,map:{"/":"%2F","?":"%3F","#":"%23"}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{"%3A":":","%2F":"/","%3F":"?","%23":"#","%5B":"[","%5D":"]","%40":"@","%21":"!","%24":"$","%26":"&","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+",
"%2C":",","%3B":";","%3D":"="}}}};d.encodeQuery=function(a){return d.encode(a+"").replace(/%20/g,"+")};d.decodeQuery=function(a){return d.decode((a+"").replace(/\+/g,"%20"))};d.recodePath=function(a){a=(a+"").split("/");for(var b=0,c=a.length;b<c;b++)a[b]=d.encodePathSegment(d.decode(a[b]));return a.join("/")};d.decodePath=function(a){a=(a+"").split("/");for(var b=0,c=a.length;b<c;b++)a[b]=d.decodePathSegment(a[b]);return a.join("/")};var k={encode:"encode",decode:"decode"},h,q=function(a,b){return function(c){return d[b](c+
"").replace(d.characters[a][b].expression,function(c){return d.characters[a][b].map[c]})}};for(h in k)d[h+"PathSegment"]=q("pathname",k[h]);d.encodeReserved=q("reserved","encode");d.parse=function(a,b){var c;b||(b={});c=a.indexOf("#");-1<c&&(b.fragment=a.substring(c+1)||null,a=a.substring(0,c));c=a.indexOf("?");-1<c&&(b.query=a.substring(c+1)||null,a=a.substring(0,c));"//"===a.substring(0,2)?(b.protocol="",a=a.substring(2),a=d.parseAuthority(a,b)):(c=a.indexOf(":"),-1<c&&(b.protocol=a.substring(0,
c),b.protocol&&!b.protocol.match(d.protocol_expression)?b.protocol=void 0:"file"===b.protocol?a=a.substring(c+3):"//"===a.substring(c+1,c+3)?(a=a.substring(c+3),a=d.parseAuthority(a,b)):(a=a.substring(c+1),b.urn=!0)));b.path=a;return b};d.parseHost=function(a,b){var c=a.indexOf("/"),d;-1===c&&(c=a.length);"["===a.charAt(0)?(d=a.indexOf("]"),b.hostname=a.substring(1,d)||null,b.port=a.substring(d+2,c)||null):a.indexOf(":")!==a.lastIndexOf(":")?(b.hostname=a.substring(0,c)||null,b.port=null):(d=a.substring(0,
c).split(":"),b.hostname=d[0]||null,b.port=d[1]||null);b.hostname&&"/"!==a.substring(c).charAt(0)&&(c++,a="/"+a);return a.substring(c)||"/"};d.parseAuthority=function(a,b){a=d.parseUserinfo(a,b);return d.parseHost(a,b)};d.parseUserinfo=function(a,b){var c=a.indexOf("@"),f=a.indexOf("/");-1<c&&(-1===f||c<f)?(f=a.substring(0,c).split(":"),b.username=f[0]?d.decode(f[0]):null,f.shift(),b.password=f[0]?d.decode(f.join(":")):null,a=a.substring(c+1)):(b.username=null,b.password=null);return a};d.parseQuery=
function(a){if(!a)return{};a=a.replace(/&+/g,"&").replace(/^\?*&*|&+$/g,"");if(!a)return{};var b={};a=a.split("&");for(var c=a.length,f,g,e=0;e<c;e++)f=a[e].split("="),g=d.decodeQuery(f.shift()),f=f.length?d.decodeQuery(f.join("=")):null,b[g]?("string"===typeof b[g]&&(b[g]=[b[g]]),b[g].push(f)):b[g]=f;return b};d.build=function(a){var b="";a.protocol&&(b+=a.protocol+":");if(!a.urn&&(b||a.hostname))b+="//";b+=d.buildAuthority(a)||"";"string"===typeof a.path&&("/"!==a.path.charAt(0)&&"string"===typeof a.hostname&&
(b+="/"),b+=a.path);"string"===typeof a.query&&a.query&&(b+="?"+a.query);"string"===typeof a.fragment&&a.fragment&&(b+="#"+a.fragment);return b};d.buildHost=function(a){var b="";if(a.hostname)d.ip6_expression.test(a.hostname)?b=a.port?b+("["+a.hostname+"]:"+a.port):b+a.hostname:(b+=a.hostname,a.port&&(b+=":"+a.port));else return"";return b};d.buildAuthority=function(a){return d.buildUserinfo(a)+d.buildHost(a)};d.buildUserinfo=function(a){var b="";a.username&&(b+=d.encode(a.username),a.password&&(b+=
":"+d.encode(a.password)),b+="@");return b};d.buildQuery=function(a,b){var c="",f,g,e,m;for(g in a)if(p.call(a,g)&&g)if(j(a[g])){f={};e=0;for(m=a[g].length;e<m;e++)void 0!==a[g][e]&&void 0===f[a[g][e]+""]&&(c+="&"+d.buildQueryParameter(g,a[g][e]),!0!==b&&(f[a[g][e]+""]=!0))}else void 0!==a[g]&&(c+="&"+d.buildQueryParameter(g,a[g]));return c.substring(1)};d.buildQueryParameter=function(a,b){return d.encodeQuery(a)+(null!==b?"="+d.encodeQuery(b):"")};d.addQuery=function(a,b,c){if("object"===typeof b)for(var f in b)p.call(b,
f)&&d.addQuery(a,f,b[f]);else if("string"===typeof b)void 0===a[b]?a[b]=c:("string"===typeof a[b]&&(a[b]=[a[b]]),j(c)||(c=[c]),a[b]=a[b].concat(c));else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");};d.removeQuery=function(a,b,c){var f;if(j(b)){c=0;for(f=b.length;c<f;c++)a[b[c]]=void 0}else if("object"===typeof b)for(f in b)p.call(b,f)&&d.removeQuery(a,f,b[f]);else if("string"===typeof b)if(void 0!==c)if(a[b]===c)a[b]=void 0;else{if(j(a[b])){f=a[b];var g={},
e,m;if(j(c)){e=0;for(m=c.length;e<m;e++)g[c[e]]=!0}else g[c]=!0;e=0;for(m=f.length;e<m;e++)void 0!==g[f[e]]&&(f.splice(e,1),m--,e--);a[b]=f}}else a[b]=void 0;else throw new TypeError("URI.addQuery() accepts an object, string as the first parameter");};d.hasQuery=function(a,b,c,f){if("object"===typeof b){for(var g in b)if(p.call(b,g)&&!d.hasQuery(a,g,b[g]))return!1;return!0}if("string"!==typeof b)throw new TypeError("URI.hasQuery() accepts an object, string as the name parameter");switch(u(c)){case "Undefined":return b in
a;case "Boolean":return a=Boolean(j(a[b])?a[b].length:a[b]),c===a;case "Function":return!!c(a[b],b,a);case "Array":return!j(a[b])?!1:(f?t:w)(a[b],c);case "RegExp":return!j(a[b])?Boolean(a[b]&&a[b].match(c)):!f?!1:t(a[b],c);case "Number":c=String(c);case "String":return!j(a[b])?a[b]===c:!f?!1:t(a[b],c);default:throw new TypeError("URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter");}};d.commonPath=function(a,b){var c=Math.min(a.length,b.length),d;for(d=
0;d<c;d++)if(a.charAt(d)!==b.charAt(d)){d--;break}if(1>d)return a.charAt(0)===b.charAt(0)&&"/"===a.charAt(0)?"/":"";if("/"!==a.charAt(d)||"/"!==b.charAt(d))d=a.substring(0,d).lastIndexOf("/");return a.substring(0,d+1)};d.withinString=function(a,b){return a.replace(d.find_uri_expression,b)};d.ensureValidHostname=function(a){if(a.match(d.invalid_hostname_characters)){if(!l)throw new TypeError("Hostname '"+a+"' contains characters other than [A-Z0-9.-] and Punycode.js is not available");if(l.toASCII(a).match(d.invalid_hostname_characters))throw new TypeError("Hostname '"+
a+"' contains characters other than [A-Z0-9.-]");}};e.build=function(a){if(!0===a)this._deferred_build=!0;else if(void 0===a||this._deferred_build)this._string=d.build(this._parts),this._deferred_build=!1;return this};e.clone=function(){return new d(this)};e.valueOf=e.toString=function(){return this.build(!1)._string};k={protocol:"protocol",username:"username",password:"password",hostname:"hostname",port:"port"};q=function(a){return function(b,c){if(void 0===b)return this._parts[a]||"";this._parts[a]=
b;this.build(!c);return this}};for(h in k)e[h]=q(k[h]);k={query:"?",fragment:"#"};q=function(a,b){return function(c,d){if(void 0===c)return this._parts[a]||"";null!==c&&(c+="",c.charAt(0)===b&&(c=c.substring(1)));this._parts[a]=c;this.build(!d);return this}};for(h in k)e[h]=q(h,k[h]);k={search:["?","query"],hash:["#","fragment"]};q=function(a,b){return function(c,d){var g=this[a](c,d);return"string"===typeof g&&g.length?b+g:g}};for(h in k)e[h]=q(k[h][1],k[h][0]);e.pathname=function(a,b){if(void 0===
a||!0===a){var c=this._parts.path||(this._parts.urn?"":"/");return a?d.decodePath(c):c}this._parts.path=a?d.recodePath(a):"/";this.build(!b);return this};e.path=e.pathname;e.href=function(a,b){var c;if(void 0===a)return this.toString();this._string="";this._parts=d._parts();var f=a instanceof d,g="object"===typeof a&&(a.hostname||a.path);!f&&(g&&void 0!==a.pathname)&&(a=a.toString());if("string"===typeof a)this._parts=d.parse(a,this._parts);else if(f||g)for(c in f=f?a._parts:a,f)p.call(this._parts,
c)&&(this._parts[c]=f[c]);else throw new TypeError("invalid input");this.build(!b);return this};e.is=function(a){var b=!1,c=!1,f=!1,g=!1,e=!1,m=!1,j=!1,h=!this._parts.urn;this._parts.hostname&&(h=!1,c=d.ip4_expression.test(this._parts.hostname),f=d.ip6_expression.test(this._parts.hostname),b=c||f,e=(g=!b)&&r&&r.has(this._parts.hostname),m=g&&d.idn_expression.test(this._parts.hostname),j=g&&d.punycode_expression.test(this._parts.hostname));switch(a.toLowerCase()){case "relative":return h;case "absolute":return!h;
case "domain":case "name":return g;case "sld":return e;case "ip":return b;case "ip4":case "ipv4":case "inet4":return c;case "ip6":case "ipv6":case "inet6":return f;case "idn":return m;case "url":return!this._parts.urn;case "urn":return!!this._parts.urn;case "punycode":return j}return null};var x=e.protocol,y=e.port,z=e.hostname;e.protocol=function(a,b){if(void 0!==a&&a&&(a=a.replace(/:(\/\/)?$/,""),a.match(/[^a-zA-z0-9\.+-]/)))throw new TypeError("Protocol '"+a+"' contains characters other than [A-Z0-9.+-]");
return x.call(this,a,b)};e.scheme=e.protocol;e.port=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a&&(0===a&&(a=null),a&&(a+="",":"===a.charAt(0)&&(a=a.substring(1)),a.match(/[^0-9]/))))throw new TypeError("Port '"+a+"' contains characters other than [0-9]");return y.call(this,a,b)};e.hostname=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0!==a){var c={};d.parseHost(a,c);a=c.hostname}return z.call(this,a,b)};e.host=function(a,b){if(this._parts.urn)return void 0===
a?"":this;if(void 0===a)return this._parts.hostname?d.buildHost(this._parts):"";d.parseHost(a,this._parts);this.build(!b);return this};e.authority=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a)return this._parts.hostname?d.buildAuthority(this._parts):"";d.parseAuthority(a,this._parts);this.build(!b);return this};e.userinfo=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.username)return"";var c=d.buildUserinfo(this._parts);return c.substring(0,
c.length-1)}"@"!==a[a.length-1]&&(a+="@");d.parseUserinfo(a,this._parts);this.build(!b);return this};e.resource=function(a,b){var c;if(void 0===a)return this.path()+this.search()+this.hash();c=d.parse(a);this._parts.path=c.path;this._parts.query=c.query;this._parts.fragment=c.fragment;this.build(!b);return this};e.subdomain=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.length-this.domain().length-
1;return this._parts.hostname.substring(0,c)||""}c=this._parts.hostname.length-this.domain().length;c=this._parts.hostname.substring(0,c);c=RegExp("^"+n(c));a&&"."!==a.charAt(a.length-1)&&(a+=".");a&&d.ensureValidHostname(a);this._parts.hostname=this._parts.hostname.replace(c,a);this.build(!b);return this};e.domain=function(a,b){if(this._parts.urn)return void 0===a?"":this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.match(/\./g);
if(c&&2>c.length)return this._parts.hostname;c=this._parts.hostname.length-this.tld(b).length-1;c=this._parts.hostname.lastIndexOf(".",c-1)+1;return this._parts.hostname.substring(c)||""}if(!a)throw new TypeError("cannot set domain empty");d.ensureValidHostname(a);!this._parts.hostname||this.is("IP")?this._parts.hostname=a:(c=RegExp(n(this.domain())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a));this.build(!b);return this};e.tld=function(a,b){if(this._parts.urn)return void 0===a?"":
this;"boolean"===typeof a&&(b=a,a=void 0);if(void 0===a){if(!this._parts.hostname||this.is("IP"))return"";var c=this._parts.hostname.lastIndexOf("."),c=this._parts.hostname.substring(c+1);return!0!==b&&r&&r.list[c.toLowerCase()]?r.get(this._parts.hostname)||c:c}if(a)if(a.match(/[^a-zA-Z0-9-]/))if(r&&r.is(a))c=RegExp(n(this.tld())+"$"),this._parts.hostname=this._parts.hostname.replace(c,a);else throw new TypeError("TLD '"+a+"' contains characters other than [A-Z0-9]");else{if(!this._parts.hostname||
this.is("IP"))throw new ReferenceError("cannot set TLD on non-domain host");c=RegExp(n(this.tld())+"$");this._parts.hostname=this._parts.hostname.replace(c,a)}else throw new TypeError("cannot set TLD empty");this.build(!b);return this};e.directory=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path&&!this._parts.hostname)return"";if("/"===this._parts.path)return"/";var c=this._parts.path.length-this.filename().length-1,c=this._parts.path.substring(0,
c)||(this._parts.hostname?"/":"");return a?d.decodePath(c):c}c=this._parts.path.length-this.filename().length;c=this._parts.path.substring(0,c);c=RegExp("^"+n(c));this.is("relative")||(a||(a="/"),"/"!==a.charAt(0)&&(a="/"+a));a&&"/"!==a.charAt(a.length-1)&&(a+="/");a=d.recodePath(a);this._parts.path=this._parts.path.replace(c,a);this.build(!b);return this};e.filename=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";
var c=this._parts.path.lastIndexOf("/"),c=this._parts.path.substring(c+1);return a?d.decodePathSegment(c):c}c=!1;"/"===a.charAt(0)&&(a=a.substring(1));a.match(/\.?\//)&&(c=!0);var f=RegExp(n(this.filename())+"$");a=d.recodePath(a);this._parts.path=this._parts.path.replace(f,a);c?this.normalizePath(b):this.build(!b);return this};e.suffix=function(a,b){if(this._parts.urn)return void 0===a?"":this;if(void 0===a||!0===a){if(!this._parts.path||"/"===this._parts.path)return"";var c=this.filename(),f=c.lastIndexOf(".");
if(-1===f)return"";c=c.substring(f+1);c=/^[a-z0-9%]+$/i.test(c)?c:"";return a?d.decodePathSegment(c):c}"."===a.charAt(0)&&(a=a.substring(1));if(c=this.suffix())f=a?RegExp(n(c)+"$"):RegExp(n("."+c)+"$");else{if(!a)return this;this._parts.path+="."+d.recodePath(a)}f&&(a=d.recodePath(a),this._parts.path=this._parts.path.replace(f,a));this.build(!b);return this};e.segment=function(a,b,c){var d=this._parts.urn?":":"/",g=this.path(),e="/"===g.substring(0,1),g=g.split(d);"number"!==typeof a&&(c=b,b=a,a=
void 0);if(void 0!==a&&"number"!==typeof a)throw Error("Bad segment '"+a+"', must be 0-based integer");e&&g.shift();0>a&&(a=Math.max(g.length+a,0));if(void 0===b)return void 0===a?g:g[a];if(null===a||void 0===g[a])if(j(b))g=b;else{if(b||"string"===typeof b&&b.length)""===g[g.length-1]?g[g.length-1]=b:g.push(b)}else b||"string"===typeof b&&b.length?g[a]=b:g.splice(a,1);e&&g.unshift("");return this.path(g.join(d),c)};var A=e.query;e.query=function(a,b){if(!0===a)return d.parseQuery(this._parts.query);
if("function"===typeof a){var c=d.parseQuery(this._parts.query),f=a.call(this,c);this._parts.query=d.buildQuery(f||c,this._parts.duplicateQueryParameters);this.build(!b);return this}return void 0!==a&&"string"!==typeof a?(this._parts.query=d.buildQuery(a,this._parts.duplicateQueryParameters),this.build(!b),this):A.call(this,a,b)};e.setQuery=function(a,b,c){var f=d.parseQuery(this._parts.query);if("object"===typeof a)for(var e in a)p.call(a,e)&&(f[e]=a[e]);else if("string"===typeof a)f[a]=void 0!==
b?b:null;else throw new TypeError("URI.addQuery() accepts an object, string as the name parameter");this._parts.query=d.buildQuery(f,this._parts.duplicateQueryParameters);"string"!==typeof a&&(c=b);this.build(!c);return this};e.addQuery=function(a,b,c){var f=d.parseQuery(this._parts.query);d.addQuery(f,a,void 0===b?null:b);this._parts.query=d.buildQuery(f,this._parts.duplicateQueryParameters);"string"!==typeof a&&(c=b);this.build(!c);return this};e.removeQuery=function(a,b,c){var f=d.parseQuery(this._parts.query);
d.removeQuery(f,a,b);this._parts.query=d.buildQuery(f,this._parts.duplicateQueryParameters);"string"!==typeof a&&(c=b);this.build(!c);return this};e.hasQuery=function(a,b,c){var f=d.parseQuery(this._parts.query);return d.hasQuery(f,a,b,c)};e.setSearch=e.setQuery;e.addSearch=e.addQuery;e.removeSearch=e.removeQuery;e.hasSearch=e.hasQuery;e.normalize=function(){return this._parts.urn?this.normalizeProtocol(!1).normalizeQuery(!1).normalizeFragment(!1).build():this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()};
e.normalizeProtocol=function(a){"string"===typeof this._parts.protocol&&(this._parts.protocol=this._parts.protocol.toLowerCase(),this.build(!a));return this};e.normalizeHostname=function(a){this._parts.hostname&&(this.is("IDN")&&l?this._parts.hostname=l.toASCII(this._parts.hostname):this.is("IPv6")&&s&&(this._parts.hostname=s.best(this._parts.hostname)),this._parts.hostname=this._parts.hostname.toLowerCase(),this.build(!a));return this};e.normalizePort=function(a){"string"===typeof this._parts.protocol&&
this._parts.port===d.defaultPorts[this._parts.protocol]&&(this._parts.port=null,this.build(!a));return this};e.normalizePath=function(a){if(this._parts.urn||!this._parts.path||"/"===this._parts.path)return this;var b,c=this._parts.path,f,e;"/"!==c.charAt(0)&&("."===c.charAt(0)&&c.substring(0,c.indexOf("/")),b=!0,c="/"+c);for(c=c.replace(/(\/(\.\/)+)|\/{2,}/g,"/");;){f=c.indexOf("/../");if(-1===f)break;else if(0===f){c=c.substring(3);break}e=c.substring(0,f).lastIndexOf("/");-1===e&&(e=f);c=c.substring(0,
e)+c.substring(f+3)}b&&this.is("relative")&&(c=c.substring(1));c=d.recodePath(c);this._parts.path=c;this.build(!a);return this};e.normalizePathname=e.normalizePath;e.normalizeQuery=function(a){"string"===typeof this._parts.query&&(this._parts.query.length?this.query(d.parseQuery(this._parts.query)):this._parts.query=null,this.build(!a));return this};e.normalizeFragment=function(a){this._parts.fragment||(this._parts.fragment=null,this.build(!a));return this};e.normalizeSearch=e.normalizeQuery;e.normalizeHash=
e.normalizeFragment;e.iso8859=function(){var a=d.encode,b=d.decode;d.encode=escape;d.decode=decodeURIComponent;this.normalize();d.encode=a;d.decode=b;return this};e.unicode=function(){var a=d.encode,b=d.decode;d.encode=v;d.decode=unescape;this.normalize();d.encode=a;d.decode=b;return this};e.readable=function(){var a=this.clone();a.username("").password("").normalize();var b="";a._parts.protocol&&(b+=a._parts.protocol+"://");a._parts.hostname&&(a.is("punycode")&&l?(b+=l.toUnicode(a._parts.hostname),
a._parts.port&&(b+=":"+a._parts.port)):b+=a.host());a._parts.hostname&&(a._parts.path&&"/"!==a._parts.path.charAt(0))&&(b+="/");b+=a.path(!0);if(a._parts.query){for(var c="",f=0,e=a._parts.query.split("&"),h=e.length;f<h;f++){var j=(e[f]||"").split("="),c=c+("&"+d.decodeQuery(j[0]).replace(/&/g,"%26"));void 0!==j[1]&&(c+="="+d.decodeQuery(j[1]).replace(/&/g,"%26"))}b+="?"+c.substring(1)}return b+=a.hash()};e.absoluteTo=function(a){var b=this.clone(),c=["protocol","username","password","hostname",
"port"],f,e;if(this._parts.urn)throw Error("URNs do not have any generally defined hierachical components");a instanceof d||(a=new d(a));b._parts.protocol||(b._parts.protocol=a._parts.protocol);if(this._parts.hostname)return b;f=0;for(e;e=c[f];f++)b._parts[e]=a._parts[e];c=["query","path"];f=0;for(e;e=c[f];f++)!b._parts[e]&&a._parts[e]&&(b._parts[e]=a._parts[e]);"/"!==b.path().charAt(0)&&(a=a.directory(),b._parts.path=(a?a+"/":"")+b._parts.path,b.normalizePath());b.build();return b};e.relativeTo=
function(a){var b=this.clone(),c=["protocol","username","password","hostname","port"],e;if(b._parts.urn)throw Error("URNs do not have any generally defined hierachical components");a instanceof d||(a=new d(a));if("/"!==b.path().charAt(0)||"/"!==a.path().charAt(0))throw Error("Cannot calculate common path from non-relative URLs");e=d.commonPath(b.path(),a.path());for(var g=0,j;j=c[g];g++)b._parts[j]=null;if("/"===e)return b;if(!e)return this.clone();a=a.directory();c=b.directory();if(a===c)return b._parts.path=
b.filename(),b.build();a.substring(e.length);c=c.substring(e.length);if(a+"/"===e)return c&&(c+="/"),b._parts.path=c+b.filename(),b.build();c="../";e=RegExp("^"+n(e));for(a=a.replace(e,"/").match(/\//g).length-1;a--;)c+="../";b._parts.path=b._parts.path.replace(e,c);return b.build()};e.equals=function(a){var b=this.clone();a=new d(a);var c={},e={},g={},h;b.normalize();a.normalize();if(b.toString()===a.toString())return!0;c=b.query();e=a.query();b.query("");a.query("");if(b.toString()!==a.toString()||
c.length!==e.length)return!1;c=d.parseQuery(c);e=d.parseQuery(e);for(h in c)if(p.call(c,h)){if(j(c[h])){if(!w(c[h],e[h]))return!1}else if(c[h]!==e[h])return!1;g[h]=!0}for(h in e)if(p.call(e,h)&&!g[h])return!1;return!0};e.duplicateQueryParameters=function(a){this._parts.duplicateQueryParameters=!!a;return this};return d});


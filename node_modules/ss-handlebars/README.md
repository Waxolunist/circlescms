# Handlebars Template Engine wrapper for SocketStream 0.3

http://handlebarsjs.com/

Use pre-compiled Handlebars client-side templates in your app.


### Installation
Add ss-handlebars to your application's package.json file and then add this line to app.js:

```javascript
ss.client.templateEngine.use(require('ss-handlebars'));
```

Restart the server. From now on all templates will be pre-compiled and accessibale via the `ss.tmpl` object.

Note: Handlebars uses a small [client-side runtime](http://handlebarsjs.com/precompilation.html) which renders the pre-compiled templates. This file is included and automatically sent to the client.


### Usage

E.g. a template placed in

    /client/templates/offers/latest.hds

Can be rendered in your browser with

```javascript
// assumes var ss = require('socketstream')
var html = ss.tmpl['offers-latest']({name: 'Special Offers'})
```


### Options

When experimenting with Handlebars, or converting an app from one template type to another, you may find it advantageous to use multiple template engines and confine use of Handlebars to a sub-directory of `/client/templates`.

Directory names can be passed to the second argument as so:

```javascript
ss.client.templateEngine.use(require('ss-handlebars'), '/hds-templates');
```

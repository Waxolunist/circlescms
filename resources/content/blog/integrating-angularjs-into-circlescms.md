author: Christian Sterzl
date: 2013-05-28
title: Integrating AngularJS into CirclesCMS
tags: javascript angularjs circlescms

# Integrating AngularJS into CirclesCMS

After re-adding jQuery as dependency for executing scripts (and I had it anyway because of [TimelineJS](http://timeline.verite.co/) - see my blogpost [Difference between jQuery.html() and innerHTML](/cc/blog/difference-jquery.html-innerHTML.md)), I wasn't quite satisified the way my client code was structured.

TimelineJS worked properly, but I couldn't use the bookmarkfeature of timelineJS, which works by reacting on the event hashchange, because I used this event already for navigating and loading of resources.

At the same time I read a lot about different javascript clientside frameworks and I was very interested in [angularjs](http://angularjs.org) by Google, which may provides exactly the feature I missed. Besides I hoped to get a better more readable and maintainable structure into my client side code. The server side was already well structured into namespaces and objects thanks to [dejavu](https://github.com/IndigoUnited/dejavu). 

AngularJS supports a so called [HTML5-Mode](http://docs.angularjs.org/guide/dev_guide.services.$location), which means, the page does not get reloaded, when the URL changes, and everything without misusing the hashtag, which in turn means, that I can use the bookmarkfeature of timelinejs in my cms, and it will still be a single page cms. Amazing.

Because for [socketstream 0.3](http://www.socketstream.org/) exists already the angular-plugin [ss-angular](https://github.com/polidore/ss-angular) I wanted to try it. The documentation of ss-angular is quite ok but not thorougly. To understand the plugin you have to follow the example provided.

AngularJS is developed by Google and provides exhaustive documentation and has a growing community.

## So, how did I integrate AngularJS (respectively ss-angular) into my CMS.

First of all, I had to define the `ng-app` tag on my site, by adding the attribute `ng-app='circlescms'` to the html-Element of my view. That way I connect the angular-application to the view.
[Jade](http://jade-lang.com/) let's you define any arbitrary attribute with ease. The result reads as follows:

```html
html(lang="en",ng-app='circlescms')
```

Then I had to register a controller on an element. I chose the body element.

```markup
body(ng-controller='CCCtrl')
```

And I defined the content-wrapper div as viewport.

```markup
div.content-wrapper(ng-view)
```

And in the entry.js file, which belongs to socketstream I had to load the modules ssAngular and controllers.

```javascript
require('ssAngular');
require('/controllers');
```

In the main file on the server side I had to add the modules and libraries to the client definition:

```javascript
ss.client.define('newgrid', {
  view: 'newgrid.jade',
  css: ['newgrid/newgrid.styl'],
  code: ['app/entry.js',
         'app/controllers.js',
         'libs/jquery-2.0.0.min.js',
         'libs/angular.js'
    ],
  tmpl: '*'
});
```

That's it. Just 7 lines of code and angular is integrated. 

I could now start to write the controller code.

First, I created the angular-module.

```javascript
angular.module('circlescms', ['ssAngular'])
```

Then I configured the routes. Because I allow any url as resource except the well defined ones, such as those e.g. for static content, I wanted to call my controller on every url.

```javascript
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/*resource', {controller: 'CCCtrl', templateUrl: 'item.html'});
    $locationProvider.html5Mode(true);
  }])
```

The html5Mode is important to configure, because it is not the default.
The parameter `*resource` is also important, as it defines not to react only on /, but on every url. The asteriks notation is not documented on the angular site, but it means basically to not stop reading the parameters after the first slash.

To react on changes of the url, I defined in the controller a listener on changes of the route.

```javascript
.controller('CCCtrl', ['$scope', '$location', 'rpc', function ($scope, $location, rpc) {
    $scope.$on('$routeChangeSuccess', function () {
      var path = $location.path();
      [...]
    });
  }])
```

Now I could react on changes of the url and load the appropriate resource.

ss-angular provides the result of a rpc call as [$q](http://docs.angularjs.org/api/ng.$q) promise. That's good, because that way a callback is optional, which leads to more readable code.

Thus, I can call the remote procedure as follows:

```javascript
$scope.r = rpc('cms.loadcontent', path);
```

And in the template I can bind the html returned with following line:

```markup
<article id="content" ng-bind-html-unsafe="r.content">
</article>
```

That's it. The resource is catched from the server and bound to the article element.

Next steps involve loading the correct template depending on the return value and some other subtleties. 

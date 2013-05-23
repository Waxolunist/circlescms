author: Christian Sterzl
date: 2013-05-23
title: Difference between jquery.html() and element.innerHTML
tags: javascript jquery vanilla

# Difference between jQuery.html() and innerHTML

While I was writing the client side for [CirclesCMS](https://github.com/Waxolunist/circlescms) I used first jQuery to remove, add and toggle classes and some selectors. After my first version was ready I thought that jQuery is a huge dependency for the client side.
Though jQuery 2 lost some weight (about ~30kB), it was still a dependency I thought I can get rid of.

I had all the functions and features of modern browsers javascript implementations in mind, such as [classList](https://developer.mozilla.org/en-US/docs/Web/API/element.classList) or [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/document.querySelector). jQuery seemed to me like syntactic sugar, because I didn't need huge parts of this library.

So I tried to get rid of jQuery (see [https://github.com/Waxolunist/circlescms/issues/3](https://github.com/Waxolunist/circlescms/issues/3)).

After an hour or so I had only [vanillaJS](http://vanilla-js.com/) in my client code. Wonderful. 

Then, some days later I tried to embed the [timelineJS](http://timeline.verite.co/) widget. But with no luck. Because I could not execute dynamically loaded javascript (see my stackoverflow question [http://stackoverflow.com/questions/16405034/load-partial-html-with-javascript-inside](http://stackoverflow.com/questions/16405034/load-partial-html-with-javascript-inside)).

That was the moment I went back to jQuery. Because the methods to insert html are executing inlinescripts, whereas just setting the innerHTML-property does not. You can see an example in this fiddle [jsFiddle](http://jsfiddle.net/waxolunist/VDYgU/3/).

With jQuery I can now load partial HTML with included script tags. That's a huge difference.

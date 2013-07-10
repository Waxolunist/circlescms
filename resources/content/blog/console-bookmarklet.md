author: Christian Sterzl
date: 2013-04-30
title: Console-Bookmarklet - A small debugging tool for mobile
tags: bookmarklet ios safari javascript github

# Console-Bookmarklet - A small debugging tool for mobile

I added some debugging code to this site to see what's going on on my iPhone. I blogged about it: [How to install Bookmarklets in iOS Safari](/cc/blog/how-to-install-bookmarklets-in-ios). But I didn't wanted to convolute my code with too much debugging code.

So I searched again for a good bookmarklet, which plays nice on mobiles, to see the output of _console.log_ but I couldn't find any.

I tried [Firebug Lite](https://getfirebug.com/firebuglite), but this was too heavy and felt cumbersome on my iPhone. Especially, when I turned my iPhone around, I couldn't see anything of my page because Firebug took the whole screen. So, this didn't fit my needs.

That's when I started to write my own. The main requirements were:

* Take the output of _console.log_ and display it in a div.
* The div should be draggable, resizeable and closeable.

I decided to take the existing dialog [JQuery UI Dialog](http://jqueryui.com/dialog/) and made it touch enabled with a [touch library](http://touchpunch.furf.com/). The rest has been easy as I just had to take my existing debugging code and move it to my new bookmarklet.

I host the code of this small utility on [github](http://waxolunist.github.io/console-bookmarklet/).

<a href="javascript:var s=document.createElement('script');s.type='text/javascript',s.src='http://waxolunist.github.io/console-bookmarklet/lib/console.js',document.getElementsByTagName('head')[0].appendChild(s);">See it in action.</a>

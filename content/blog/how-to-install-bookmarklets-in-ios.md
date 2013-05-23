author: Christian Sterzl
date: 2013-04-23
title: How to install Bookmarklets in iOS Safari
tags: bookmarklet ios safari javascript

# How to install Bookmarklets in iOS Safari

Last time I had to debug some javascript code on my iPhone I went nuts. All I wanted to see was the output of the console. So I wrote some code to pipe the output of _console.log_ to a div on my site (just add the query param _debug=true_ to see the result or click [here](?debug=true#blog/how-to-install-bookmarklets-in-ios)). But this solution wasn't as clean as I wanted it to have and I searched for a solution like [Firebug](https://getfirebug.com/) for iPhone and soon found [Firebug Lite](https://getfirebug.com/firebuglite).

They write: 

> Firebug Lite is _a small bookmarklet to easily install on any web page_. Just _add the following link to your bookmarks_. 

But have you ever tried to store a link in Safari on your iPhone which does not start with http? It does not work. Really. Try it. No chance.

After at least two hours of search on the web I found a way of installing bookmarklets. You need a bookmarklet to install bookmarklets. Don't be confused, here is the link, where you will find the instructions.
Follow the instructions there and install this bookmarklet.

[iPhone bookmarklet, for saving bookmarklets](http://www.thecssninja.com/javascript/iphone-bookmarklet)

Now you can go back to the Firebug Lite page and install a bookmarklet there. 

And I will think about if I should throw my little console div away or keep it but probably I will keep it. You never know.

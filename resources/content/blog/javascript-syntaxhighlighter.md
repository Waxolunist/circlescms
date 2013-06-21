author: Christian Sterzl
date: 2013-06-21
title: Syntax Highlighter for Javascript - Prism
tags: javascript syntax prism

# Syntax Highlighter for Javascript - Prism

Have you ever been in need of a syntax highlighter for your homepage?

I wanted to integrate one into my blog today and searched a long time and tried a lot of them.

Finally I found a working one: [Prism](http://prismjs.org)

Before that I tried following:

- [SyntaxHighlighter](http://alexgorbatchev.com/wiki/SyntaxHighlighter)
- [Google Code Prettify](http://code.google.com/p/google-code-prettify/)
- [Highlight.JS Syntax Highlighter](http://softwaremaniacs.org/soft/highlight/en/)
- [BeautyOfCode: jQuery Plugin for Syntax Highlighting](http://startbigthinksmall.wordpress.com/2008/10/30/beautyofcode-jquery-plugin-for-syntax-highlighting/)

My requirements are:

- No server side code
- No dependencies to frameworks such as MooTools
- Manually call the syntax highlighter
- No autoload
- Manually declaring the programming language
- Support for the most common languages
- Markup similar to the one markdown generates
- Current, active development
- Open Source

I tried all 4 above, but every of it had its disadvantages. 

**SyntaxHighlighter** uses CommonJS, which I don't use and it does not support the `<pre><code>` notation. It requires to use only the `pre`-element.

**Prettify** didn't work at all for me. I don't know what the issue has been but because I didn't wanted to waste to much time, I didn't dig into.

**Highlight.js** is pretty much straightforward and easy to integrate, but I does always try to detect automatically the language which does sometimes fail. So if I marked the code snippet as javascript like so:

```markup
<pre>
    <code class="language-javascript">
    </code>
</pre>
```

The result after running highlight.js was, no matter in which way I called the api:
```markup
<pre>
    <code class="language-javascript undefined">
    </code>
</pre>
```

**BeautyOfCode** is a jquery plugin, not maintained and is based on an old version of SyntaxHighlighter.


Every syntax highlighter demanded for a different markup and used different hints for detecting the language. So I wrote a angular directive to convert the markup [marked](https://github.com/chjj/marked) generates into the markup the syntax highlighter uses. For example marked adds a class `lang-html` to the code element and prism searches for `language-html`. This was pretty much all I needed to embed prism, besides loading the library. There is no init method, no method which runs only on `document.ready`, no dependencies.

I like this library and will recommend it, if someone is in demand of a syntax highlighter, which runs on the client.

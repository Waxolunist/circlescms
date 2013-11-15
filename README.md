# CirclesCMS

CirclesCMS (or just Circles) is an easy to use and easy to program, single page html5 content management system and blog engine built around websockets and [angularjs](http://angularjs.org).

It accomodates some ideas of various projects like [Wheat](https://github.com/creationix/wheat) or [Sling](http://sling.apache.org/).

## Releases

### V 0.1.0

## General

### Architecture

The following is a short list of high-lights of Circles:

* [Node.js](http://nodejs.org/) - Circles runs on Node.js, as lightweight, scalable platform
* [socketstream](http://www.socketstream.org/) - a realtime, single page web app framework
* [git](http://git-scm.com/) - for storing persistent content and metadata, and everything is versioned - out of the box (similiar to what _Wheat_ does
* [marked](https://github.com/chjj/marked) - markdown parser and compiler, built for speed
* [metamd](https://github.com/chrisjaure/metamd) - for parsing markdown metadata
* [stylus](https://github.com/learnboost/stylus) - Expressive, robust, feature-rich CSS language
* Resource Resolution - The url represents the resource, which is first resolved. Based on the resource a client side template will be chosen to render the content.
* HTML5 History API - No reloading of the site when url changes.

Some ideas coming soon:
* [redis](http://redis.io/) - Advanced and fast key-value store for caching. 

### Request Handling

Circles is built to make single page websites possible. That means, after the initial load, the user does not need to reload the page or leaves the page when clicking on a link. Modern web pages make this possible with the use of Ajax or even more modern web pages with the use of websockets. CirclesCMS uses the latter approach.

To achieve this behaviour of not reloading a page on a click, the html5 history API is used. Circles listens on changes of the url therefore and makes an rpc call to the socketserver. Based on the url a resource on the server is resolved and based on the resource returned from the server the client resolves a template.

Circles uses this approach to answer 3 Questions arriving in a CMS: What? How? Where?

* What should the system deliver? -> A resource.
* How should the client display this resource? -> Which template to use.
* Where in the DOM should the rendered resource be viewed? -> Choosing the right element.

### Resources (What)

A resource is basically either a directory or a file in a repository.
By default, two types of resources are known: list and item

A directory will always be a resource of type list. A file will by default be a resource of type item, which can be overridden with the use of metatags.

Currently only two types of files are supported:

* Markdown (suffix .md)
* HTML (suffix .html)

HTML parsing is not supported at the moment, which means HTML-files will be delivered as is with the type set to the default type _item_.

The library metamd supports the usage of metatags in markdown files, which means the resource type can be overriden, by defining the metatag type.

#### Resource Resolution

A resource will be tried to resolve in the following order: 

1. file
2. directory

To give you an idea I give some examples:

*/a* -> no suffix, trying default suffixes

1. a.md
2. a.html
3. a/
4. 404

*/a.html* ->

1. a.html
2. a.html/
3. 404

*/a.md* ->

1. a.md
2. a.md/
3. 404

*/blog/a* ->

1. blog/a.md
2. blog/a.html
3. blog/a/
4. 404

### Templates (How)

Templates reside on the client side. The use the angular notation. They will have the suffix .html.

#### Template Resolution

After retrieving the response from the server the client decides based on the same principle which template to use for rendering.

A template will be chosen based on the type and the path.

Some examples:

*/a* -> found content a.md, no type given, default type item

1. a.item.html
2. item.html
3. no template

*/a* -> found content a.html, no metadata or type support, type none

1. no template

*/blog/a* -> found content blog/a.md, type article

1. blog/a.article.html
3. blog/article.html
3. article.html
4. no template

*/blog* -> found content blog/, directory, type list

1. blog.list.html
2. list.html
3. no template

*/doesnotexist* -> no resource found, error returned

1. error.html
2. no template, errormessage will be output in either the container with the id error or in the container with the id content.

*/blog/doesnotexist* -> no resource found, error returned

1. blog/error.html
2. error.html
2. no template, errormessage will be output in either the container with the id error or in the container with the id content.

### Elements (Where)

At the moment all resources are rendered in the same container using the angular directive ngView.

### More Examples

Depending on the url following content will be retrieved assuming following content structure:

    /
    |- about.md
    |- contact.md
    |- blog/
       |- afile.md
       |- anotherfile.md
       |- directory.md
       |- directory/
       |  |- file1.md
       |  |- file2.md
       |
       |- tmp/


| URL | Content    | Result                                                                                             |
|-----------------|------------|----------------------------------------------------------------------------------------------------|
| /blog           | Directory  | A json list containing the non recursive content of the Directory blog (see [json](#json-format)). |
| /about          | File       | The rendered content of the file about.md.                                                         |
| /blog/afile     | File       | The rendered content of the file blog/afile.md.                                                    |
| /doesnotexist   | Error      | An error message formated as json.                                                                 |
| /blog/directory | File       | The rendered content of the file blog/directory.md.                                                |

As you can see, an Item has precedence over a List. Thus I encourage to use unique paths, because in the case of _/blog/directory_ you are not able to retrieve the directory listing. That means you can for example link to the files in _/blog/directory_ manually in the file directory.md.

### JSON Format

The json of an item contains all metatags. So a get on _/blog_, assuming blog is a directory, will return following object:

```json
{
    "res": [
        {
            "title": "A title",
            "date": "2013-01-01",
            "author": "Christian Sterzl",
            //
            // other metatags
            //
            "path": "blog/afile",
            "type": "item"
        },
        {
            "title": "Another title",
            "date": "2013-02-02",
            "author": "Christian Sterzl",
            //
            // other metatags
            //
            "path": "blog/anotherfile",
            "type": "item"
        },
        {                
            "title": "Another title",
            "date": "2013-02-02",
            "author": "Christian Sterzl",
            //
            // other metatags
            //
            "path": "blog/directory",
            "type": "item"
        },
        {                
            "path": "blog/tmp",
            "type": "list"
        }
    ]
}
```

A GET-request on _/blog/directory_ resolves to _blog/directory.md_ and will return following resource:

```json
{
    "title": "Another title",
    "date": "2013-02-02",
    "author": "Christian Sterzl",
    //
    // other metatags
    //
    "path": "blog/directory",
    "type": "item",
    "body": "<h1>Escaped Body Content</h1>"
}
```
An error message in json format will look like following:

```json
{
    "type": "error",
    "code": "404",
    "message": "Content Not Found"
}
```

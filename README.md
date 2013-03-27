# CirclesCMS

CirclesCMS is an easy to use, single page content management system based on [Node.js](http://nodejs.org/), [Express](http://expressjs.com/) and [Socketstream](http://www.socketstream.org/).

It strongly emphasizes the separation of content (Model), style (View) and app (Controller).

It accomodates some ideas of various projects like [Wheat](https://github.com/creationix/wheat).

To convert markdown into html it uses [metamd](https://github.com/chrisjaure/metamd).

For client side templates [handlebars.js](http://handlebarsjs.com/) will be used.

CSS will be precompiled using [stylus](http://learnboost.github.com/stylus/).

# Concept

CirclesCMS makes some assumptions about the structure of your markup and content. The content will be retrieved according to the hashtag. Therefore CirclesCMS listens on changes of the hashtag using [jQuery](http://jquery.com/) and the [jQuery BBQ Plugin](http://benalman.com/code/projects/jquery-bbq/docs/files/jquery-ba-bbq-js.html).

# Content

The content is stored in a git repository, just as Wheat does. CirclesCMS uses [git-fs](https://github.com/creationix/node-git) to read the repository.

CirclesCMS knows 2 types of content: Lists (Directories) and Items (Files)

An Item is basically a markdown file with some metadata in it (see [metamd](https://github.com/chrisjaure/metamd)). A List is a directory containing other Lists and Items.

Depending on the hashtag following content will be retrieved assuming following content structure:

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


| Hash            | Content    | Result                                                                                             |
|-----------------|------------|----------------------------------------------------------------------------------------------------|
| #blog           | Directory  | A json list containing the non recursive content of the Directory blog (see [json](#json-format)). |
| #about          | File       | The rendered content of the file about.md.                                                         |
| #blog/afile     | File       | The rendered content of the file blog/afile.md.                                                    |
| #doesnotexist   | Error      | An error message formated as json.                                                                 |
| #blog/directory | File       | The rendered content of the file blog/directory.md.                                                |

As you can see, an Item has precedence over a List. Thus I encourage to use unique paths, because in the case of _#blog/directory_ you are not able to retrieve the directory listing. That means you can for example link to the files in _#blog/directory_ manually in the file directory.md.

## Rendering the content

### How? (How to render)

The content will be rendered using clientside templates. By default items use the template _item.html_ and lists _list.html_.

You can override the used template by setting the data field _data-tmpl_ (see [Overriding defaults](#overriding-content-defaults)).

### Where? (Where to put the rendered output)

By default content will be rendered into the element with the id _content_.

You can override this selector by setting the data field _data-el_ (see [Overriding defaults](#overriding-content-defaults)).

### Overriding content defaults

Defaults can be overridden by setting data fields.

These fields are content specific and are determined by looking at the element either 

* the first element with the id equal to the hash value or if not found
* the first element with an href equal to the hash

At the moment two parameters exist:

* data-tmpl
* data-el

### Examples

```html
<div id="about" data-tmpl="about.html" data-el="about"></div>
<a href="#about" data-tmpl="about2.html"></a>
<a href="#contact" data-tmpl="contact.html" data-el="about"></a>
<a href="#blog"></a>
<div id="content"></div>
```

The second element does not have any influence, because matching id-referenced elements have precedence over href-referenced elements.

* _#about_ will render the output of about.md using the template about.html and showed in the div about.
* _#contact_ will render the output of contact.md using the template contact.html and showed in the div about.
* _#blog_ will render the output of the json list retrieved using the template list.html and showed in the div content.

## <a id="json"></a>JSON Format

The json of an item contains all metatags. So a get on _#blog_ will return following object:

```json
{
    res: [
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

An error message in json format will look like following:

```json
{
    "type": "error",
    "code": "404",
    "message": "Content Not Found"
}
```


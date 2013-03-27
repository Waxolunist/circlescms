# CirclesCMS

CirclesCMS is an easy to use, single page content management system based on [Node.js](http://nodejs.org/), [Express](http://expressjs.com/) and [Socketstream](http://www.socketstream.org/).

It strongly emphasizes the separation of content (Model), style (View) and app (Controller).

It accomodates some ideas of various projects like [Wheat](https://github.com/creationix/wheat).

To convert markdown into html it uses [metamd](https://github.com/chrisjaure/metamd).

# Concept

CirclesCMS makes some assumptions about the structure of your markup and content. The content will be retrieved according to the hashtag. Therefore CirclesCMS listens on changes of the hashtag using [jQuery](http://jquery.com/) and the [jQuery BBQ Plugin](http://benalman.com/code/projects/jquery-bbq/docs/files/jquery-ba-bbq-js.html).

# Content

The content is stored in a git repository, just as Wheat does. CirclesCMS uses [git-fs](https://github.com/creationix/node-git) to read the repository.
CirclesCMS knows 2 types of content: Lists (Directories) and Items (Files)

An Item is basically a markdown file with some metadata in it (see [metamd](https://github.com/chrisjaure/metamd). A List is a directory containing other Lists and Items.

Depending on the hashtag following content will be retrieved assuming following content structure:

    /
    |- about.md
    |- contact.md
    |- blog/
       |- afile.md
       |- anotherfile.md
       |- directory.md
       |- directory/
          |- file1.md
          |- file2.md


| Hash            | Operation | Content    | Result                                                                                      |
|-----------------|-----------|------------|---------------------------------------------------------------------------------------------|
| #blog           | -         | Directory  | A json list containing the non recursive content of the Directory blog (see [json](#json)). |
| #about          | -         | File       | The rendered content of the file about.md.                                                  |
| #blog/afile     | -         | File       | The rendered content of the file blog/afile.md.                                             |
| #doesnotexist   | -         | Error      | An error message formated as json.                                                          |
| #blog/directory | -         | File       | The rendered content of the file blog/directory.md.                                         |
| #blog/directory | list      | Directory  | Json list of the directory blog/directory.                                                  |
| #blog           | content   | Error      | An error message formated as json.                                                          |
| #about          | list      | Error      | An error message formated as json.                                                          |

## <a id="json"></a>JSON Format of lists

The json of an item contains all metatags. So when you call _#blog_ will return following object:

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
                "path": "blog/directory",
                "type": "list"
            }
        ]
    }

An error message in json format will look like following:

    {
        "type": "error",
        "code": "404",
        "message": "Content Not Found"
    }


author: Christian Sterzl
date: 2013-10-17
title: Bower on Openshift
tags: bower openshift

# Bower on Openshift

Today was my website for several hours down. But this outage was not due of outage of my hoster [Openshift](https://www.openshift.com/) or due to some error in the code. It happened, because I didn't know how to install [bower](http://bower.io) on openshift. But now I do know and I want to share.

**Bower** is a dependency management tool for the client side. It is based on node.js and can be installed as node module. Usually, bower is installed as global module and not as an application dependency, surely it is not a runtime dependency.

**Openshift** is an awesome PAAS solution and free to use (Base package). It provides a git repository where you can push your code. After a push the application is automatically restarted. For a node application this means that `npm start` is executed. You can take some action during the start process with so called action hooks.

After changing most of my client side dependencies to be managed by bower and testing the application sucessfully I pushed my application as usual to openshift. And guess what, the application didn't start. It could not find the dependencies. Of course I needed to run `bower update`. I decided to run this command in the `pre_start`-action hook. But first I had to install bower. Because I don't know how to install a global node module in openshift as comfortably like a local module during the startup phase. Thus I had to install bower as a runtime dependency, which is not a clean way, by declaring bower in the dependencies section of my `package.json` file.

After installing bower and writing the update statement into my prestart hook it didn't work either. Bower want's to create some directories in `$HOME/.local` but openshift permits the creation of directories in your home directory. Thus I digged through the documentation of bower and searched for the variables I had to set to redirect bower into another directory. The documentation on this topic is not very exhaustive I started digging through the code and then through the code of its dependencies and through the code of the transitive dependencies as well. I can tell, this was hard work, but I found the variables.

Bower reads following environment variables (see [paths.js#L13](https://github.com/bower/config/blob/master/lib/util/paths.js#L13)):

  * XDG_DATA_HOME
  * XDG_CONFIG_HOME
  * XDG_CACHE_HOME

These variables are specified by [freedesktop.org's basedir specification](http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html).

So finally I came up with following solution.

1. Declare bower in your dependencies section of package.json:

  ```javascript
  "dependencies": {
    [...]
    "bower": "1.2.x"
  },

  ```

2. Create a file for the install script e.g. `bower_update` with following content:

  ```bash
  #!/bin/bash

  export XDG_DATA_HOME=$HOME/app-root/data/bower/data
  export XDG_CONFIG_HOME=$HOME/app-root/data/bower/config
  export XDG_CACHE_HOME=$HOME/app-root/data/bower/cache
  cd $OPENSHIFT_REPO_DIR
  ./node_modules/bower/bin/bower update
  ```

3. Make this file executable:

  ```bash
  chmod a+x bower_update
  ```

4. Source it in your pre_start_nodejs script:

  ```bash
  . "$OPENSHIFT_REPO_DIR/.openshift/lib/bower_update"
  ```

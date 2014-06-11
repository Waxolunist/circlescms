author: Christian Sterzl
date: 2013-10-17
title: Bower on Openshift
tags: bower openshift

# Bower on Openshift

Today, my website was down for several hours. The outage was not due to an outage of my hoster [Openshift](https://www.openshift.com/) or due to some error in the code, though. It happened, because I didn't know how to install [bower](http://bower.io) on openshift. But now I do know and I want to share.

**Bower** is a dependency management tool for the client side. It is based on node.js and can be installed as node module. Usually, bower is installed as global module and not as an application dependency, surely it is not a runtime dependency.

**Openshift** is an awesome PAAS solution and free to use (Base package). It provides a git repository where you can push your code. After a push the application is automatically restarted. For a node application this means that `npm start` is executed. You can take some action during the start process with so called action hooks.

After changing most of my client side dependencies to be managed by bower and testing the application sucessfully on my local machine I pushed my application as usual to openshift. And guess what, the application didn't start. It could not find the client side dependencies. Of course I needed to run `bower update`. I decided to run this command in the `pre_start`-action hook. But first I had to install bower. Because I didn't know how to install a global node module in openshift as comfortably as a local module during the startup phase, my website was not coming up. I found out, that it is possible to install global node modules during the startup phase.

After installing bower and writing the update statement into my prestart hook it didn't work either. Bower wants to create some directories in `$HOME/.local` but openshift permits the creation of directories in your home directory. Thus I digged through the documentation of bower and searched for the variables I had to set to redirect bower into another directory. The documentation on this topic is not very exhaustive, so I started digging through the code, and through the code of its dependencies and through the code of its transitive dependencies as well. I can tell you, this was hard work, but I found the variables.

Bower reads following environment variables (see [paths.js#L13](https://github.com/bower/config/blob/master/lib/util/paths.js#L13)):

  * XDG_DATA_HOME
  * XDG_CONFIG_HOME
  * XDG_CACHE_HOME

These variables are specified by [freedesktop.org's basedir specification](http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html).

So finally I came up with following solution.

1. Declare bower in your devDependencies section of package.json. This is an optional step:

  ```javascript
  "devDependencies": {
    [...]
    "bower": "1.2.x"
  },

  ```

2. Create a file for the install script e.g. `bower_update` with following content:

  ```bash
  #!/bin/bash

  export XDG_DATA_HOME=$OPENSHIFT_DATA_DIR/.local
  export XDG_CONFIG_HOME=$OPENSHIFT_DATA_DIR/.config
  export XDG_CACHE_HOME=$OPENSHIFT_DATA_DIR/.cache
  cd $OPENSHIFT_REPO_DIR

  if hash bower 2>/dev/null; then
    echo "Install bower:"
    npm install -g bower
  fi

  bower update
  ```

3. Make this file executable:

  ```bash
  chmod a+x bower_update
  ```

4. Source it in your pre_start_nodejs script:

  ```bash
  . "$OPENSHIFT_REPO_DIR/.openshift/lib/bower_update"
  ```

Now the site is up and running again.

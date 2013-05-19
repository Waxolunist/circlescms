var cc = {
  activeClass: 'active',
  contentId: 'content',

  addEventListener: function (target, types, listener, useCapture) {
    types.split(' ').forEach(function (el, idx, a) {
      target.addEventListener(el, listener, useCapture);
    });
  },

  setTargetForExternal: function () {
    $.each(document.links, function () {
      if (this.hostname !== window.location.hostname) {
        this.target = '_blank';
      }
    });
  },

  //CMS core client
  activateLink: function (href) {
    $('a').each((function (reference, activeClass) {
      var parent = reference.split('/')[0];
      return function (index) {
        var link = $(this);
        if (link.attr('href') === parent) {
          link.addClass(activeClass);
        } else {
          link.removeClass(activeClass);
          link.parent().addClass(activeClass);
        }
      };
    }(href, cc.activeClass)));
  },

  setContent: function (el) {
    var hash = window.location.hash,
      link = document.querySelector('a[href="' + hash + '"]');
    //filter here this.eio.Socket.sockets[*].readyState 
    window.ss.rpc('cms.loadcontent', hash, function (response) {
      var tmpl = _.find(response.templates, function (tmpl) {
        return window.ss.tmpl[tmpl];
      });
      if (tmpl) {
        //el.innerHTML = tmpl({res: response});
        $(el).html(window.ss.tmpl[tmpl]({res: response}));
        cc.setTargetForExternal();
        return false;
      }
    });
  },

  restartAnimation: function (el) {
    el.classList.remove(cc.activeClass);
    var elClone = el.cloneNode(true);
    elClone.innerHTML = '';
    cc.setContent(elClone);
    el.parentNode.insertBefore(elClone, el);
    $(el).bind('trans-end', function () { console.log('trans-end'); });
    $(el).one('transitionend', [el, elClone],
      function (event) {
        var oldEl = event.data[0],
          newEl = event.data[1];
        $(event.currentTarget).attr('data-time', new Date().getTime());
        setTimeout(function () {
          if (oldEl.parentNode) {
            oldEl.parentNode.removeChild(oldEl);
          }
          newEl.classList.add(cc.activeClass);
        }, 200);
      });
  },

  changeLocation: function () {
    var href = window.location.hash,
      contentEl = document.getElementById(cc.contentId);

    (function (reference, el) {
      cc.activateLink(href);
      if ($(el).hasClass(cc.activeClass)) {
        cc.restartAnimation(el);
      } else if (!!reference) {
        $(el).addClass(cc.activeClass);
        cc.setContent(el);
      }
    }(href, contentEl));
  },

  start: function () {
    // call this method at start of the application
    // should maybe later a constructor (TODO?)
    
    // scroll down a little bit for iphone
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 0);

    cc.setTargetForExternal();
    window.addEventListener('hashchange', cc.changeLocation);

    $('.animated').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd',
      function () {
        $(this).trigger('trans-end');
      });
  }
};

window.cc = cc;

window.onload = cc.start;


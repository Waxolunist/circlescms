var cc = {
  activeClass: 'active',
  contentId: 'content',

  //Some uttilitymethods
  forEach: function (list, callback, context) {
    Array.prototype.forEach.call(list, callback, context);
  },

  activateLink: function (href) {
    cc.forEach(document.links, function (link) {
      var parent = href.split('/')[0];
      if (link.getAttribute('href') === parent) {
        link.classList.add(cc.activeClass);
      } else {
        link.classList.remove(cc.activeClass);
        link.parentElement.classList.add(cc.activeClass);
      }
    });
  },

  setContent: function (el) {
    var hash = window.location.hash,
      link = document.querySelector('a[href="' + hash + '"]');
    //filter here this.eio.Socket.sockets[*].readyState 
    window.ss.rpc('cms.loadcontent', hash, function (response) {
      console.log(response);
      cc.forEach(response.templates, function (val) {
        var tmpl;
        if (window.ss.tmpl[val]) {
          tmpl = window.ss.tmpl[val];
          el.innerHTML = tmpl({res: response});
          return false;
        }
      });
    });
  },

  restartAnimation: function (el) {
    el.classList.remove(cc.activeClass);
    var elClone = el.cloneNode(true);
    elClone.innerHTML = '';
    cc.setContent(elClone);
    el.parentNode.insertBefore(elClone, el);
    el.addEventListener('transitionend',
      (function (oldEl, newEl) {
        return function () {
          setTimeout(function () {
            if (oldEl.parentNode) {
              oldEl.parentNode.removeChild(oldEl);
            }
            newEl.classList.add(cc.activeClass);
          }, 200);
        };
      }(el, elClone)), false);
  },

  changeLocation: function () {
    var href = window.location.hash,
      contentEl = document.getElementById(cc.contentId);
    cc.activateLink(href);
    if (contentEl.classList.contains(cc.activeClass)) {
      cc.restartAnimation(contentEl);
    } else if (!!href) {
      contentEl.classList.add(cc.activeClass);
      cc.setContent(contentEl);
    }
  }
};

window.onload = function scroll() {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
};

window.onhashchange = cc.changeLocation;

window.cc = cc;

var cc = {
  activeClass: 'active',
  contentId: 'content',
  urlParams: new (function (sSearch) {
    if (sSearch.length > 1) {
      var aItKey, nKeyId = 0, aCouples;
      for (aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
        aItKey = aCouples[nKeyId].split("=");
        this[window.unescape(aItKey[0])] = aItKey.length > 1 ? window.unescape(aItKey[1]) : "";
      }
    }
  })(window.location.search),

  forEach: function (list, callback, context) {
    Array.prototype.forEach.call(list, callback, context);
  },

  addEventListener: function (target, types, listener, useCapture) {
    types.split(' ').forEach(function (el, idx, a) {
      target.addEventListener(el, listener, useCapture);
    });
  },

  setTargetForExternal: function () {
    cc.forEach(document.links, function (link) {
      if (link.hostname !== window.location.hostname) {
        link.target = '_blank';
      }
    });
  },

  //CMS core client
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
      cc.forEach(response.templates, function (val) {
        var tmpl;
        if (window.ss.tmpl[val]) {
          tmpl = window.ss.tmpl[val];
          var output = tmpl({res: response});
          //el.innerHTML = tmpl({res: response});
          var ustmpl = _.template("<% print(" + output + ");%>");
          
          el.innerHTML = ustmpl({});
          cc.setTargetForExternal();
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
    cc.addEventListener(el, 'transitionend webkitTransitionEnd',
      (function (oldEl, newEl) {
        console.log('addEventListener');
        return function () {
          setTimeout(function () {
            console.log('activate');
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

window.cc = cc;

window.onload = function scroll() {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
  
  cc.setTargetForExternal();
};

window.onhashchange = cc.changeLocation;

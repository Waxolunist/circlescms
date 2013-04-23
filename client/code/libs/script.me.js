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
  debug: false,

  //Some uttilitymethods
  forEach: function (list, callback, context) {
    Array.prototype.forEach.call(list, callback, context);
  },

  addEventListener: function (target, types, listener, useCapture) {
    types.split(' ').forEach(function (el, idx, a) {
      target.addEventListener(el, listener, useCapture);
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
  },

  checkIfDebugIsEnabled: function () {
    cc.debug = !!cc.urlParams.debug;
    console.log('Debug: ' + cc.debug);
    if (!cc.debug) {
      document.getElementById('debug').style.display = 'none';
    }
  }
};

function drag_start(event) {
  var style = window.getComputedStyle(event.target, null);
  event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"), 10) - event.clientX)
    + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
}

function drag_over(event) {
  event.preventDefault();
  return false;
}

function drop(event) {
  var offset = event.dataTransfer.getData("text/plain").split(','),
    dm = document.getElementById('debug');
  dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
  dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
  event.preventDefault();
  return false;
}

window.onload = function scroll() {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
  cc.checkIfDebugIsEnabled();

  var dm = document.getElementById('debug');
  dm.addEventListener('dragstart', drag_start, false);
  document.all[0].addEventListener('dragover', drag_over, false);
  document.all[0].addEventListener('drop', drop, false);
};

window.onhashchange = cc.changeLocation;

window.cc = cc;

if (typeof console !== "undefined") {
  if (typeof console.log !== 'undefined') {
    console.olog = console.log;
  } else {
    console.olog = function () {};
  }
}

console.log = function (message) {
  console.olog(message);
  var logmessage = document.createElement('pre');
  logmessage.innerHTML = message;
  document.getElementById('debug').appendChild(logmessage);
};

console.error = console.debug = console.info = console.log;

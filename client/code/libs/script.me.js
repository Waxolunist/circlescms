var activeClass = "active";
var contentId = "#content";

$(window).bind('load', function () {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
});
$(window).bind('hashchange', function (o) {
  activateLink(window.location.hash);
  var contentEl = $(contentId);
  if(contentEl.hasClass(activeClass)) {
    restartAnimation(contentEl);
  } else if(window.location.hash != '') {
    contentEl.addClass(activeClass);
    setContent(contentEl);
  }
});

//$(document).ready(function () {
//  deactivateAll();
//  setContent($(contentId));
//  activateLink(window.location.hash);
//  $(contentId).addClass(activeClass);
//});

function deactivateAll() {
  $('.' + activeClass).removeClass(activeClass);
}

function activateLink(href) {
  $('nav > a').removeClass(activeClass);
  var link = $('a[href="' + href.split('/')[0] + '"]');
  link.addClass(activeClass);
  link.parent().addClass(activeClass);
}

function restartAnimation(el) {
  el.removeClass(activeClass);
  var elClone = el.clone(true);
  elClone.html('');
  setContent(elClone);
  el.before(elClone);
  el.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend',
    function () {
      setTimeout(function () {
        el.remove();
        elClone.addClass(activeClass);
      }, 200);
    });
}

function setContent(el) {
  var hash = window.location.hash;
  var link = $('a[href="' + hash + '"]');
  console.log(ss.server.event);
  if (ss.server.event === 'ready' || ss.server.event === 'reconnect') {
    console.log('loadcontent');
    ss.rpc('cms.loadcontent', hash, function (response) {
      console.log(response);
      for(var i in response.templates) {
        var t = response.templates[i];
        if (ss.tmpl[t]) {
        var tmpl = ss.tmpl[t];
          el.html(tmpl({res: response}));
          break;
        }
      }
    });
  } else {
    console.log('Connection down');
  }
}

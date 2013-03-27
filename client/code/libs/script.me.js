var activeClass = "active";
var contentId = "#content";

$(window).bind('hashchange', function(o) {
  activateLink(window.location.hash);
  var contentEl = $(contentId);
  if(contentEl.hasClass(activeClass)) {
    restartAnimation(contentEl);
  } else if(window.location.hash != '') {
    contentEl.addClass(activeClass);
  }
});
$(window).bind('load', function() {
  setTimeout(function() {
    window.scrollTo(0, 1);
  }, 0);
});
$(document).ready(function() {
  window.location.hash = ''; 
  deactivateAll();
});

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
  setContent(elClone);
  el.before(elClone);
  el.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', 
    function() {
      setTimeout(function() {
        el.remove();
        elClone.addClass(activeClass);
      }, 200);
    }
  );
}

function setContent(el) {
  var hash = window.location.hash;
  var link = $('a[href="' + hash + '"]');
  var op = link.attr('data-op') ? link.attr('data-op') : 'content';
  var tmpl = link.attr('data-tmpl') ? link.attr('data-tmpl') : op;
  ss.rpc('cms.loadcontent', hash, op, function(response){
    var html = ss.tmpl[tmpl]({res: response});
    el.html(html);
  });
}

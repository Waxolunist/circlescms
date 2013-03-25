var activeClass = "active";
var contentId = "#content";

$(window).bind('hashchange', function() {
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
  var link = $('a[href=' + href + ']');
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
  var link = $('a[href=' + window.location.hash + ']');
  ss.rpc('cms.loadcontent', window.location.hash, link.attr('data-op'), function(response){
    el.html(response);
  });
}

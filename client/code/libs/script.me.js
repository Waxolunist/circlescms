/*$(window).bind('hashchange', function() {
});*/
$(document).ready(function() {
  $('nav > a').click(function(){
    $('nav > a').removeClass('active');
    var link = $(this);
    link.addClass('active');
    link.parent().addClass('active');
    $('article').removeClass('active');
    $(link.attr('href')).addClass('active');
  });
});


$(window).load(function(e){
  $("body").on("click", ".term-block:not(.active)", function(){
    var position = $(this).index() * 100 /9 + "%"; //console.log(position);
    $(".term-indicator").css("margin-left", position);
    $(".progress-indicator").css("width", position);
  });
});

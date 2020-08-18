$(document).ready(function(){
  $('a[href^="#"]').click(function(event){
    //Aquí elimina el evento normal de la etiqueta <a>
    event.preventDefault();
    //Aquí cojemos el elmento
    var elem=$(this).attr("href");
    $("html, body").animate({
      scrollTop: $(elem).offset().top
    },800);
  });
});



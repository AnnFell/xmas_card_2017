$(document).ready(function () {

     //alert('jQuery werkt');

    var text, text2;
    var factoryFlake = $('.snowflake');


    $('.test').on("click", function() {
        text = $(".text").val();
        text2 = $(".text2").val();
        $('.textFill').html(text);
        $('.textFill2').html(text2);
    });

    //Launch
    $('.launch').on("click", function() {

       console.log("klik launch");
       //TweenMax.killTweensOf('.snowflake');

       var timeline = new TimelineMax();
       timeline
           .to($('.factory'), 1, ({marginTop:'10px', repeat:2, ease: Bounce.easeInOut, yoyo:true}))
           .to(factoryFlake, 0.8, {top:'50px', repeat:2, ease: Bounce.easeInOut, yoyo:true})
           .to(factoryFlake, 0.5, {top:'-1200px', ease: Power3.easeOut});
       
    });

    //Snowflake drift
    TweenMax.to(factoryFlake, 2, {top:'-20px', repeat:-1, ease: Power1.easeInOut, yoyo:true});


});
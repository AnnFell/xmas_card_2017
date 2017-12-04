$(document).ready(function () {

     //alert('jQuery werkt');

    var text, text2;

    $('.test').on("click", function() {
        text = $(".text").val();
        text2 = $(".text2").val();
        $('.textFill').html(text);
        $('.textFill2').html(text2);
    });

    //Launch
    // $('.launch').on("click", function(e) {
    //    console.log("klik launch");
    // };

    //Snowflake drift
    var factoryFlake = $('.snowflake');
    TweenMax.to(factoryFlake, 2, {top:'-20px', repeat:-1, ease: Power1.easeInOut, yoyo:true});




});
$(document).ready(function () {

    // alert('jQuery werkt');

    var text;

    $('.test').on("click", function () {
        console.log('klik');
        text = $(".text").val();
        console.log(text);
        $('.textFill').html(text);
    })


    //Snowflake drift
    var factoryFlake = $('.snowflake');
    TweenMax.to(factoryFlake, 2, {top:'-20px', repeat:-1, ease: Power1.easeInOut, yoyo:true});



});
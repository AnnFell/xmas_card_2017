$(document).ready(function () {
    // alert('jQuery werkt');

    var text;

    $('.test').on("click", function () {
        console.log('klik');
        text = $(".text").val();
        console.log(text);
        $('.textFill').html(text);
    })



    //snow animation



});
$(document).ready(function () {

    //alert('jQuery werkt');

    //other functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();

    $(window).resize(function() {
        viewportWidth = $(this).width();
        viewportHeight = $(this).height();
    });
    //end

    var factoryFlake = $('.snowflake');

    //Snowflake drift
    TweenMax.to(factoryFlake, 2, {top: '-20px', repeat: -1, ease: Power1.easeInOut, yoyo: true});


    var text, text2, stroke;

    $(".text, .text2, .stroke").bind('input', function () {
        text = $(".text").val();
        text2 = $(".text2").val();
        stroke = $(".stroke").val();
        $('.textFill').html(text);
        $('.textFill2').html(text2);
        $('svg path').css({strokeWidth: stroke});

    });

    function pushText() {
        if(text == false && text2 == false){
            $('svg path').css({strokeWidth: stroke});
        }else {
            $('.textFill').html(text);
            $('.textFill2').html(text2);
            $('svg path').css({strokeWidth: stroke});
        }
    }

    //This function sets all things in motion after clicking on launch
    //Click on the Launch button
    $('.launch').on("click", function () {

        console.log("klik launch");
        TweenMax.killTweensOf('.snowflake');

        launchAnimation();

        setTimeout(makeItSnow, 2700);
    });


    function launchAnimation() {
        var timeline = new TimelineMax();
        timeline
            .to($('.factory'), 0.5, ({marginTop: '10px', repeat: 2, ease: Bounce.easeInOut, yoyo: true}))
            .to(factoryFlake, 0.8, {top: '100px', ease: Bounce.easeInOut, yoyo: true})
            .to(factoryFlake, 0.4, {top: '-1200px', ease: Power3.easeOut});
    }


    //the master snowflake
    var snowFlake = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382 393" version="1"> <g fill="none" fill-rule="evenodd"> <path stroke="#FFF" d="M191 1v392M21 99l340 196m0-196L21 295"/> <text fill="#FFF" transform="rotate(30 109 107)"> <tspan x="27" y="132" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(90 223 80)"> <tspan x="142" y="97" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(150 308 163)"> <tspan x="228" y="178" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-150 280 281)"> <tspan x="200" y="294" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-90 165 316)"> <tspan x="85" y="327" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-30 78 243)"> <tspan x="0" y="246" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(30 84 153)"> <tspan x="2" y="178" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(90 168 81)"> <tspan x="87" y="98" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(150 280 117)"> <tspan x="200" y="132" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(-150 306 232)"> <tspan x="226" y="245" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(-90 221 314)"> <tspan x="141" y="325" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(-30 107 289)"> <tspan x="29" y="292" class="textFill2">X-MAS</tspan> </text> </g> </svg>')
        .css(
            {
                color: '#eee',
                display: 'block',
                position: 'fixed',
                width: '20px',
                height: '20px',
                top: '-100px',
                //top: '0', //debugging
                margin: '0',
                padding: '0',
                zIndex: 9999
            }
        );
    //console.log(snowFlake);


    var numFlakes = 50,
        posX,
        size,
        opacity,
        duration,
        delay;

    function makeItSnow() {
        //for every flake in numFlakes
        for (var i =0; i < numFlakes; i++) {
            //make a copy of the master snowflake
            var singleFlake = snowFlake.clone();

            //give a random y position to start
            posX = Math.floor(Math.random()*viewportWidth);
            //console.log(posX);

            //give a random size between 20px and 50px
            size = getRandomInt(20,100);
            //console.log(size);


            //give an opacity
            if(size < 30){
                opacity = 0.7;
            }else if(size < 60){
                opacity = 0.85;
            }else{
                opacity = 1;
            }

            //add the random styles to the flake
            singleFlake.css({
                left: posX + "px",
                height: size + "px",
                width: size + "px",
                opacity: opacity
            });

            //add the flake to the body
            singleFlake.appendTo("body");

            pushText();

            //calculate the duration of the animation
            duration = Math.floor(Math.random()*10);
            delay = Math.random()*10;
            singleFlake.addClass('animation' + i);
            //add the animation
            snowAnimation(duration, delay, 'animation' + i); //debugging
        }
        messageAnimation();
    }

    //the snowing animation
    function snowAnimation(duration, delay, element) {
        //console.log('made it so far!');
        var snowTimeline = new TimelineMax();
        snowTimeline
            .to($('.' + element), duration, {top: "120vh", delay: delay})
            .to($('#controls, #page'), 3, {autoAlpha: 0, ease: Power2.EaseIn})
            .to($('body'), 2, {backgroundColor: 'black', ease: Power2.EaseOut});

        //console.log(snowAnimation);
        return snowTimeline;
    }

    //the message animation at the end
    function messageAnimation() {
        var messageTimeline = new TimelineMax();
        messageTimeline
            //.to($('.message'), 5, {top: '30px', delay: delay, ease: Power2.easeIn});
            .to($('.message'), 5, { opacity: 1, autoAlpha: 1, display: 'block', ease: Power2.easeIn}, "+=3");
        return messageAnimation;
    }

    //reload the browser after clicking on button in final message
    $('.startAgain').on("click", function () {
        window.location.reload();
    });


});
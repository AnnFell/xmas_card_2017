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


    $('.test').on("click", function () {
        pushText();
    });

    var text, text2, stroke;
    function pushText() {
        text = $(".text").val();
        text2 = $(".text2").val();
        stroke = $(".stroke").val();

        if(text == false || text2 == false){
            $("<p>please fill in both boxes with a short text!</p>").appendTo("#controls");
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
    var snowFlake = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 374 392" version="1"> <g fill="none" fill-rule="evenodd"> <path stroke="#FFF" d="M186 0v392M16 98l340 196m0-196L16 294"/> <text fill="#FFF" transform="rotate(30 107 103)"> <tspan x="28" y="130" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(90 218 81)"> <tspan x="138" y="98" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(150 301 163)"> <tspan x="222" y="178" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-150 273 278)"> <tspan x="194" y="291" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-90 162 312)"> <tspan x="82" y="322" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-30 80 240)"> <tspan x="0" y="241" class="textFill">MERRY </tspan> </text> <text fill="#FFF" transform="rotate(-150 79 166)"> <tspan x="50" y="179" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(-90 161 88)"> <tspan x="132" y="98" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(-30 270 129)"> <tspan x="241" y="130" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(30 299 214)"> <tspan x="270" y="241" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(90 218 304)"> <tspan x="189" y="321" class="textFill2">X-MAS</tspan> </text> <text fill="#FFF" transform="rotate(150 108 275)"> <tspan x="79" y="289" class="textFill2">X-MAS</tspan> </text> </g> </svg>')
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
        snowTimeline.to($('.' + element), duration, {top: "120vh", delay: delay});
        //console.log(snowAnimation);
        return snowTimeline;
    }

    //the message animation at the end
    function messageAnimation() {
        var messageTimeline = new TimelineMax();
        messageTimeline.to($('.message'), 1, {top: '30px', delay: delay});
        return messageAnimation;
    }

    $('.startAgain').on("click", function () {
        window.location.reload();
    })


});
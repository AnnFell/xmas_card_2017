$(document).ready(function () {

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
    //Snowflake drift in glass tube
    TweenMax.to(factoryFlake, 2, {top: '-20px', repeat: -1, ease: Power1.easeInOut, yoyo: true});


    //show text input result while typing
    $(".text, .text2, .stroke").on('input', function () {
        pushText();
    });

    //add text to snowflake(s)
    function pushText() {
        var text, text2, stroke;

        text = $(".text").val();
        text2 = $(".text2").val();
        stroke = $(".stroke").val();

            if(text != false){
                $('.textFill').html(text);
            }
            if(text2 != false){
                $('.textFill2').html(text2);
            }
            $('.pathFill').css({strokeWidth: stroke});
    }

    //This function sets all things in motion after clicking on launch
    //Click on the Launch button
    $('.launch').on("click", function () {

        console.log("klik launch");
        TweenMax.killTweensOf('.snowflake');

        launchAnimation();

        setTimeout(makeItSnow, 2700);

        messageAnimation();
    });


    function launchAnimation() {
        var timeline = new TimelineMax();
        timeline
            .to($('.factory'), 0.5, ({marginTop: '10px', repeat: 2, ease: Bounce.easeInOut, yoyo: true}))
            .to(factoryFlake, 0.8, {top: '100px', ease: Bounce.easeInOut, yoyo: true})
            .to(factoryFlake, 0.4, {top: '-1000px', ease: Power3.easeOut})
            .to(factoryFlake, 0.1, {autoAlpha: 0});
    }


    //the master snowflake
    var snowFlake = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 372 393" version="1"><g fill="none" fill-rule="evenodd"><path stroke="#FFF" class="pathFill" d="M186 1v392M16 99l340 196m0-196L16 295"/><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(30 103 111)"><tspan x="21" y="135" class="textFill">MERRY </tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="36" transform="rotate(90 210 81)"><tspan x="129" y="96" class="textFill">MERRY </tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(150 299 158)"><tspan x="219" y="172" class="textFill">MERRY </tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(-150 277 274)"><tspan x="197" y="286" class="textFill">MERRY </tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(-90 167 314)"><tspan x="87" y="324" class="textFill">MERRY </tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(-30 77 247)"><tspan x="-1" y="249" class="textFill">MERRY </tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(30 82 146)"><tspan x="0" y="170" class="textFill2">X-MAS</tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(90 170 80)"><tspan x="89" y="96" class="textFill2">X-MAS</tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(150 278 122)"><tspan x="198" y="136" class="textFill2">X-MAS</tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(-150 298 238)"><tspan x="218" y="250" class="textFill2">X-MAS</tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(-90 209 314)"><tspan x="128" y="323" class="textFill2">X-MAS</tspan></text><text fill="#FFF" font-family="VT323-Regular, VT323" font-size="40" transform="rotate(-30 106 297)"><tspan x="28" y="283" class="textFill2">X-MAS</tspan></text></g></svg>')
        .css(
            {
                color: '#fff',
                display: 'block',
                position: 'fixed',
                top: '-100px',
                zIndex: 9999
            }
        );


    var numFlakes = 50,
        posX,
        size,
        opacity,
        duration,
        delay,
        rotation;

    function makeItSnow() {
        //for every flake in numFlakes
        for (var i =0; i < numFlakes; i++) {
            //make a copy of the master snowflake
            var singleFlake = snowFlake.clone();

            //give a random y position to start
            posX = Math.floor(Math.random()*viewportWidth);

            //give a random size between 20px and 100px
            size = getRandomInt(20,100);

            //give random rotation
            rotation = getRandomInt(-180,180);

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
            snowAnimation(duration, rotation, delay, 'animation' + i);
        }
    }

    //the snowing animation
    function snowAnimation(duration, rotation, delay, element) {
        var snowTimeline = new TimelineMax();
        snowTimeline
            .to($('.' + element), duration, {top: "120vh", rotation: rotation, delay: delay});
        return snowTimeline;
    }

    //the message animation at the end
    function messageAnimation() {
        var messageTimeline = new TimelineMax();
        messageTimeline
            .to($('#controls, #page'), 3, {autoAlpha: 0, ease: Power2.EaseIn}, "+=3.5")
            .to($('body'), 3, {backgroundColor: '#333', ease: Power2.EaseOut}, "-=2.75")
            .to($('.message'), 5, { opacity: 1, autoAlpha: 1, display: 'block', ease: Power1.easeOut}, "+=1.5")
            .from($('.startAgain'), 0.2, {transform: 'scale(1.1,1.1)', repeat: 1,  ease: Back, yoyo: true});
        return messageAnimation;
    }

    //reload the browser after clicking on button in final message
    $('.startAgain').on("click", function () {
        window.location.reload();
    });


});
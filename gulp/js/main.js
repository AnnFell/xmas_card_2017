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

    var text, text2;
    var factoryFlake = $('.snowflake');

    //Snowflake drift
    TweenMax.to(factoryFlake, 2, {top: '-20px', repeat: -1, ease: Power1.easeInOut, yoyo: true});


    $('.test').on("click", function () {
        pushText();
    });

    function pushText() {
        text = $(".text").val();
        text2 = $(".text2").val();
        $('.textFill').html(text);
        $('.textFill2').html(text2);
    }


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
    var snowFlake = $('<img src="img/flakeCustom.svg"/>').css(
        {
            color: '#eee',
            display: 'block',
            position: 'fixed',
            width: '20px',
            height: '20px',
            top: '-100px',
            margin: '0',
            padding: '0',
            zIndex: 9999
        }
    );
    var numFlakes = 100,
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


            //give a opacity
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

            //calculate the duration of the animation
            duration = Math.floor(Math.random()*10);
            delay = Math.random()*10;
            singleFlake.addClass('animation' + i);
            //add the animation
            snowTimeline(duration, delay, 'animation' + i);
        }
    }

    function snowTimeline(duration, delay, element) {
        console.log('made it so far!')
        var snowAnimation = new TimelineMax();
        snowAnimation.to($('.' + element), duration, {top: "120vh", delay: delay});
        console.log(snowAnimation);
        return snowAnimation;
    }


});
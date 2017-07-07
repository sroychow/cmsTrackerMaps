function play(context) {
    timelineInterval = setInterval(function () {
        nextFrame(context);
    }, 100);
}

function pause(context) {
    isplaying=false; 
    clearInterval(timelineInterval);
}


function nextFrame(context) {
    var timelineImagesID = $(context).parent().parent().find('#timelineImages');
    var frames = timelineImagesID.children();
    var frameCount = frames.length;

    for(var i = 0; i<frameCount; i++){
        frames[i].style.display = "none";
    }

    var currentframe = parseInt($(context).attr('currentFrame'));
    var nextframe = (currentframe+1) % frameCount;

    // set the nextframe as current frame
    frames[nextframe].style.display = "block";
    currentframe = nextframe;

    // update the data carrier
    $(context).attr('currentframe', currentframe);
    console.log(currentframe + " / " + frameCount);

    var slider = $(context).parent().parent().find('#sliderGroup').find('.timelineslider');
    slider.bootstrapSlider('setValue', currentframe);

}


function setFrame(context, framenr) { 
    console.log($(context).parent().parent().find('#timelineControls').find('.playbutton'));
    var timelineImagesID = $(context).parent().parent().find('#timelineImages');
    var frames = timelineImagesID.children();
    var frameCount = frames.length;

    for(var i = 0; i<frameCount; i++){
        frames[i].style.display = "none";
    } 
    frames[framenr].style.display = "block";

    // update the data carrier
    // $(context).attr('currentframe', framenr);
    console.log(framenr + " / " + frameCount);

    var slider = $(context).parent().parent().find('#sliderGroup').find('.timelineslider');
    slider.bootstrapSlider('setValue', framenr);

    $(context).parent().parent().find('#timelineControls').find('.playbutton').attr('currentframe', framenr);

}
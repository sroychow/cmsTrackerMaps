function play(context) {
    var playbutton = $(context).find('#timelineControls').find('.playbutton');
    playbutton.attr('isplaying', 'true');
    playbutton.find("span").removeClass("glyphicon-play").addClass("glyphicon-pause");

    var fps = $(context).find('#timelineControls').find('#fpssetting').val();
    console.log("Playback with " + fps + " fps");

    var delay_ms = 1000/parseInt(fps);

    timelineInterval = setInterval(function () {
        nextFrame(context);
    }, delay_ms);
}

function pause(context) {
    var playbutton = $(context).find('#timelineControls').find('.playbutton');
    playbutton.attr('isplaying', 'false');
    playbutton.find("span").removeClass("glyphicon-pause").addClass("glyphicon-play");

    isplaying=false;
    clearInterval(timelineInterval);
}
        
function nextFrame(context) {
    var image_group = $(context).find('#timelineImages');
    var slider = $(context).find('#sliderGroup').find('#slider');
    var frames = image_group.children();
    var num_frames = frames.length;

    var curr_frame = slider.bootstrapSlider('getValue');
    var next_frame = (curr_frame+1) % num_frames;

    setFrame(context, next_frame);

    var isLoopEnabled = $(context).find('#timelineControls').find('#loopingEnabled').is(':checked');

    if(!isLoopEnabled && isAtLastFrame(context)) {
        pause(context);
    }
}

function setFrame(context, framenr_to_set){
    console.log("timelineplayer::setframe");

    var progresslabel = $(context).find('#sliderGroup').find('#progresslabel');
    var image_group = $(context).find('#timelineImages');
    var frames = image_group.children();
    var num_frames = frames.length;

    for(var i = 0; i<num_frames; i++){
        frames[i].style.display = "none";
    }
    frames[framenr_to_set].style.display = "initial";
    console.log((framenr_to_set+1) + " / " + num_frames);
    progresslabel.empty();
    progresslabel.append((framenr_to_set+1) + " / " + num_frames);

    var slider = $(context).find('#sliderGroup').find('#slider');
    slider.bootstrapSlider('setValue', framenr_to_set);
}

function isAtLastFrame(context) {
    var image_group = $(context).find('#timelineImages');
    var slider = $(context).find('#sliderGroup').find('#slider');
    var frames = image_group.children();
    var num_frames = frames.length;
    var curr_frame = slider.bootstrapSlider('getValue');

    return (curr_frame == num_frames-1); 
}
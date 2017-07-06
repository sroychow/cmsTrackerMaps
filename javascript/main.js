$(document).ready(function() {

    Loader.loadCheckboxes();
    decodeOptions();

    $('#treeContainer').fileTree({
        root: '/data/users/event_display/',
        multiFolder: false
    }, function(file) {
        $("#runNumberInputBrowseCaller").attr("data-path", file.split("users")[1]);
    });
});

// create the parameters that are appended to the url
// to enable sharing of links
$(document).on('click', '#link-me', function(e) {
    var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.location.href = url + encodeOptions();
});

$(document).on('click', "#siteNameBtn", function(e){
    $("#link-me").click();
});

// --------------------- Button handlers for linking results ---------------------
$(document).on('click', '#send-link-me', function(e) {
    var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    event.preventDefault();
    var emailBody = "\n \nYou can see the issue here: \n" + url + encodeOptions();
    window.location = 'mailto:?body=' + encodeURIComponent(emailBody);
 });

// when the checkboxes for the individual resources are
// clicked: add/remove the corresponding panel
$(document).on('click', '.panel-extend-checkbox', function() {
    var refPath = $('#refRunPath').val();
    var currPath = $('#currRunPath').val();
    addRmTkMapPanel(this.id, $(this).prop('checked'), refPath, currPath);
    console.log($(this).parent().text());
});


// --------------------- Loading and navigating from the file browser ---------------------
$(document).on('click', '#dataBrowseOKbtn', function() {
    var pathToPaste = $("#runNumberInputBrowseCaller").attr("data-path");
    var inputObj = $("#" + $("#runNumberInputBrowseCaller").val());
    inputObj.val(pathToPaste);
    Loader.reloadCheckedTabs();
});

$(document).on('click', '#refRunPathBrowse, #currRunPathBrowse', function() {
    $("#runNumberInputBrowseCaller").val($(this).attr('data-ref'));
    $("#myModal").modal();
});

$(document).on('click', '.navigation-arrow', function(){
    var callerID = "currRunPath";
    var direction = 1;
    if ($(this).attr("id").startsWith("ref")) {
        callerID = "refRunPath";
    }
    if ($(this).attr("id").endsWith("Prev")) {
        direction = -1;
    }
    Loader.loadNeighbourRun(callerID, direction);
});

// --------------------- Manipulation of hidden 
//                       checkbox for image diff --------------------
$(document).on('click', '.enableDiffImg', function() {
   var tmp = $(this).attr('toToggle');
   if(!$('#' + tmp).prop('checked')) {
        $('#' + tmp).click();
   }
});

$(document).on('click', '.disableDiffImg', function() {
   var tmp = $(this).attr('toToggle');
   if($('#' + tmp).prop('checked')) {
        $('#' + tmp).click();
   }
});

// --------------------- Eyecandy ---------------------
$(document).on('click', '#diffButtonGroup > .btn', function() { 
     $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
})

$(document).on('click', '#modeButtonGroup > .btn', function() { 
     $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
})

$(document).on('click', '#hideUnhideMenu', function() {
    $(this).find("span").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
})

$(document).on('click', '.toggleTextarea', function() {
    $(this).find("i").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
    var toToggle = String($(this).attr('toToggle'));
    $(toToggle).toggle();
})

$(document).on('click', '.hidenav', function() {
    $(this).find("span").toggleClass("glyphicon-triangle-top").toggleClass("glyphicon-triangle-bottom");
})


// --------------------- Keyboard and Mouse ---------------------
$("body").on('keydown', function(e){            // Navigate between runs with left & right arrow ( + SHIFT)
    var code = e.keyCode;
    var isShift = e.shiftKey;

    if (code == 37){
        if (isShift){
            $("#refPrev").click();
        }
        else{
            $("#currPrev").click();
        }
    } else if (code == 39){
        if (isShift){
            $("#refNext").click();
        }
        else{
            $("#currNext").click();
        }
    }
});



$(document).on('click', '.mode-selector', function() {
    var mode = $(this).attr('mode');

    ModeHandler.changeMode(mode);

/*
    clearCheckboxselection();

    // $('#refRunPath').val("");
    // $('#currRunPath').val("");
    switch(mode) {
        case "compare":
            $('#refRunPath').attr("placeholder", "REFERENCE");
            $('#currRunPath').attr("placeholder", "CURRENT");
            global_mode = 'compare';
            break;
        case "timeline":
            $('#refRunPath').attr("placeholder", "FROM");
            $('#currRunPath').attr("placeholder", "TO");
            global_mode = 'timeline';
            break;
        default:
            alert("mode not implemented");
    }
    */
});

$(document).on('click', '.closeTab', function() {
    var id = $(this).attr('toClose');
    console.log(id);
    $('#'+id).click();
})

// This triggers a resize event every time the tab pane containing
// the images/logs is clicked.
// This is done _specifically_ to target a bug in the timeline playback.
// What the bug was: when opening multiple tabs for playback,
// the only one of the selected ones was scaled properly. The others
// were thumbnail size. Cause of the bug was not found, but the libraries
// use of globals might be the root cause.
$(document).on('click', '.tab-pane', function() {
    if(ModeHandler.getMode()==="timeline") 
        $(window).trigger('resize');
})

var timelineInterval;
var currentFrame = 0;
var isplaying = 0;
$(document).on('click', '.playbutton', function() {
    $(this).find("span").toggleClass("glyphicon-play").toggleClass("glyphicon-stop");

    if(isplaying) {
        pause(this);
    } else {
        play(this);
    }
});

$(document).on('click', '.stopbutton', function() {
    restartPlayback(this);
});

$(document).on('click', '.nextbutton', function() {
    nextFrame(this);
});


function nextFrame(context) {
    var timelineImagesID = $(context).parent().parent().find('#timelineImages');
    var frames = timelineImagesID.children();
    var frameCount = frames.length;

    for(var i = 0; i<frameCount; i++){
        frames[i].style.display = "none";
    }
    frames[(currentFrame+1) % frameCount].style.display = "block";
    currentFrame++;
}

function restartPlayback(context) {
    var timelineImagesID = $(context).parent().parent().find('#timelineImages');
    var frames = timelineImagesID.children();
    var frameCount = frames.length;

    for(var i = 0; i<frameCount; i++){
        frames[i].style.display = "none";
    }
    frames[0].style.display = "block";
    currentFrame=0;
    clearInterval(timelineInterval);
}


function play(context) {
    restartPlayback(context);
    var timelineImagesID = $(context).parent().parent().find('#timelineImages')

    var frames = timelineImagesID.children();
    var frameCount = frames.length;
    var i = currentFrame;

    frames[currentFrame].style.display = "block";

    timelineInterval = setInterval(function () {
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
        currentFrame = i;
    }, 100);
    isplaying=1;
}

function pause(context) {
    clearInterval(timelineInterval);
    isplaying=0; 
}

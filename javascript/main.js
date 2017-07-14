$(document).ready(function() {

    Loader.loadCheckboxes();

    var url = window.location.href;
    decodeOptions(url);

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

    if($(this).prop('checked')) 
        addPanel(this.id, refPath, currPath);
    else   
        rmPanel(this.id, refPath, currPath);
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
$(document).ready(function(){
    // $('[data-toggle="tooltip"]').tooltip(); 
});

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

$(document).on('click', '.fullscreenSwitch', function() {
    $(this).find("span").toggleClass("glyphicon-resize-full").toggleClass("glyphicon-resize-small");
})

$(document).on('click', '.downloadFormatSetting > .btn', function() { 
     $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
})

$(document).on('mouseover', '.anchorMap a.neon', function(){
    id = $(this).attr("id");
    $(".anchorMap #" + id).addClass("hover");
})

$(document).on('mouseleave', '.anchorMap a.neon', function(){
    id = $(this).attr("id");
    $(".anchorMap #" + id).removeClass("hover");
})

$(document).on('click', '.anchorMap a.neon', function(e){
    e.preventDefault();
    id = $(this).attr("id");
    $(".anchorMap #" + id).toggleClass("clicked");
})

var first;
// --------------------- Keyboard and Mouse ---------------------
$(document).on('mousedown', 'a[id^=inputCheckBoxPanel]', function(e){ // MMB on the tab results in closing it       
     if(e.which == 2) {      
        e.preventDefault();                
        var thisID = $(this).attr('id');       
        var checkboxID = thisID.substr(18, thisID.length - 18 -  3);      
        closeTab(checkboxID);
     }
     else
     {
        tabId = $(this).attr("href");
        $(tabId + " .imgContainer").resize();

        // $.ajax({timeout : 10000,
        //         async: true,
        //         type: "POST"}).done(function(){
        //     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ PHUCK DAT");
        //     $(tabId + " .imgContainer").resize();
        // });
     }      
})

$("body").on('keydown', function(e){            // Navigate between runs with left & right arrow ( + SHIFT)
    var code = e.keyCode;
    var isShift = e.shiftKey;
    switch(code) {
        case 85:  // u
            $("#refPrev").click();
            break;
        case 73:  // i
            $("#refNext").click();
            break;
        case 79:  // o
            $("#refRunPathBrowse").click();
            break;

        case 74:  // j
            $("#currPrev").click();
            break;                        
        case 75:  // k
            $("#currNext").click();
            break;
        case 76:  // l
            $("#currRunPathBrowse").click();
            break;                  
        default:
}});


$(document).on('click', '.mode-selector', function() {
    var mode = $(this).attr('mode');
    ModeHandler.changeMode(mode);
});

$(document).on('click', '.closeTab', function() {
    closeTab($(this).attr('toClose'));
})

$(document).on('click', '.timelineContainer .fullscreenSwitch', function(){
    $(this).parent().parent().toggleClass('fullscreenMode');
})

// ---- Timeline player and its controls ---- // 
var timelineInterval;
$(document).on('click', '.playbutton', function() {
    var isplaying = $(this).attr('isplaying')==='true';
    var context = $(this).parent().parent();

    if(isplaying) {
        pause(context);
    } else {
        play(context);        
    }
});

$(document).on('change', '#slider', function() {
    var newframeNr = $(this).bootstrapSlider('getValue');
    var context = $(this).parent().parent().parent();
    setFrame(context, newframeNr);
});

$('.dropdown-menu').click(function(e) {
    e.stopPropagation();
});

$(document).on('keyup mouseup change', '#fpssetting', function() {
    var isplaying = $(this).parent().parent().parent().parent().parent().find('.playbutton').attr('isplaying') ==='true';
    var context = $(this).closest('.timelineContainer');
    if(isplaying) {
        pause(context);
        play(context);
    }    
});

$(document).on('click', '#downloadAsFile', function(e) {
    $.blockUI({ overlayCSS: { backgroundColor: '#444' } }); 

    var context = $(this).parent().parent().parent();
    var image_group = $(context).find('#timelineImages');
    var frames = image_group.children();

    var fps = $(context).find('#timelineControls').find('#fpssetting').val();
    var delay_ms = 1000/parseInt(fps);

    var slider = $(context).find('#sliderGroup').find('#slider');
    var currframe = slider.bootstrapSlider('getValue');

    var ag = new Animated_GIF();
    var tmp = frames[currframe];
    console.log(tmp.clientWidth);
    console.log(tmp.clientHeight);

    ag.setSize(tmp.clientWidth,tmp.clientHeight);
    ag.setDelay(delay_ms);


    for(var i = 0; i < frames.length; i++) {
        ag.addFrame(frames[i]);
    }
    
    var animatedImage = document.createElement('img');

    // This is asynchronous, rendered with WebWorkers
    ag.getBase64GIF(function(image) {
        setTimeout($.unblockUI, 0);
        var w = window.open(image);
    });

});



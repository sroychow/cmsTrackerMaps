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

$(document).on('click', '#hideUnhideMenu', function() {
    $(this).find("span").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
})

$(document).on('click', '.toggleTextarea', function() {
    $(this).find("i").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
    var toToggle = String($(this).attr('toToggle'));
    $(toToggle).toggle();
})

// --------------------- Keyboard and Mouse ---------------------
$(document).on('mousedown', 'a[id^=inputCheckBoxPanel]', function(e){ // MMB on the tab results in closing it
    if(e.which == 2)
    {
        e.preventDefault();
        console.log("mouseDown");

        var thisID = $(this).attr('id');
        console.log(thisID);

        var checkboxID = thisID.substr(18, thisID.length - 18 - 3);
        console.log(checkboxID);

        $("#checkboxPlaceholder #" + checkboxID).click();
    }
})

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

// ----------------- Play -----------------
$(document).on('click', '#startShit', function() {
    console.log("starting shit");
    var startRunPath = $('#refRunPath').val();
    var endRunPath = $('#currRunPath').val();

    console.log(startRunPath);
    console.log(endRunPath);
    getListOfNeigborRuns(startRunPath, endRunPath);

});
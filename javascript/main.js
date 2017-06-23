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

$(document).on('click', '#send-link-me', function(e) {
    var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    event.preventDefault();
    var emailBody = "You can see the issue here: \n" + url + encodeOptions();
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
    reloadCheckedTabs();
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

// --------------------- Eyecandy ---------------------
$(document).on('click', '.btn-group > .btn', function() { 
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

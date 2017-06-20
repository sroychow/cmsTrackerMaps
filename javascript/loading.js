$(document).ready(function() {

    loadCheckboxes();
    decodeOptions();

    $(".panel-extend-checkbox").on('click', function(e) {

        var refPath = $('#refRunPath').val();
        var currPath = $('#currRunPath').val();

        addRmTkMapPanel(this.id, $(this).prop('checked'), refPath, currPath);
        console.log($(this).parent().text());
    });

    $("#link-me").click(function(e) {
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.location.href = url + encodeOptions();
    });

    $("#refRunPathBrowse, #currRunPathBrowse").click(function() {
        $("#runNumberInputBrowseCaller").val($(this).attr('data-ref'));
        $("#myModal").modal();
    });

    $(".navigation-arrow").click(function(o){
        var callerID = "currRunPath";
        var direction = 1;

        if ($(this).attr("id").startsWith("ref")) {
            callerID = "refRunPath";
        }

        if ($(this).attr("id").endsWith("Prev")) {
            direction = -1;
        }

        getNeighbourRun(callerID, direction);
    });

    $("#dataBrowseOKbtn").click(function() {
        var pathToPaste = $("#runNumberInputBrowseCaller").attr("data-path");
        var inputObj = $("#" + $("#runNumberInputBrowseCaller").val());

        inputObj.val(pathToPaste);

        reloadCheckedTabs();

        disableCheckboxes("checkboxAccordion", false);
    });

    $('#treeContainer').fileTree({
        root: '/data/users/event_display/',
        multiFolder: false
    }, function(file) {
        $("#runNumberInputBrowseCaller").attr("data-path", file.split("users")[1]);
    });

    if($('#refRunPath').val() === "" && $('#currRunPath').val() === "") {
        disableCheckboxes("checkboxAccordion", true);
    }

    $("#hideUnhideMenu").click(function(){
        $(this).find("span").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
    });

    $(".btn-group > .btn").click(function(){
        $(this).addClass("btn-primary").siblings().removeClass("btn-primary");
    });
});

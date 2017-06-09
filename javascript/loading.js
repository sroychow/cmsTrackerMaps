$(document).ready(function() {

    loadCheckboxes();
    decodeOptions();

    $(".panel-extend-checkbox").on('click', function(e) {

        var refPath = $('#refRunNumberInput').val();
        var currPath = $('#currRunNumberInput').val();

        AddRmTkMapPanel(this.id, $(this).prop('checked'), refPath, currPath);
        console.log($(this).parent().text());
    });

    $("#link-me").click(function(e) {
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.location.href = url + encodeOptions();

        alert('Link created, ready to share your findings!\n');
    });

    $("#refRunNumberInputBrowse, #currRunNumberInputBrowse").click(function() {
        $("#runNumberInputBrowseCaller").val($(this).attr('data-ref'));
        $("#myModal").modal();
    });

    $(".navigation-arrow").click(function(o){
        var callerID = "currRunNumberInput";
        var direction = 1;

        if ($(this).attr("id").startsWith("ref")) {
            callerID = "refRunNumberInput";           
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

    if($('#refRunNumberInput').val() === "") {
        disableCheckboxes("checkboxAccordion", true);
    }

    $("#hideUnhideMenu").click(function(){
        $(this).find("span").toggleClass("glyphicon-menu-up").toggleClass("glyphicon-menu-down");
    });
});
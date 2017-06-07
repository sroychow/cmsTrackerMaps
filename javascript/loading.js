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

    $(".toggleDifferenceView").change(function(e) {
        $('.refCol').closest(".panel").parent().toggleClass("col-md-6").toggleClass("col-md-4 col-lg-6");
        $('.currCol').closest(".panel").parent().toggleClass("col-md-6").toggleClass("col-md-4 col-lg-6");
        // $('.diffCol').toggle();

        $('.diffCol').closest(".panel").parent().toggle().css("height", $('.refCol').closest(".panel").parent().height() + 5);
    });

    $( window ).resize(function() {

        var refHeight = $('.refCol').closest(".panel").parent().height() + 5;

        $('.diffCol').closest(".panel").parent().css("height", refHeight);
        $('.diffCol').closest(".panel").css("height", refHeight);
    });

    $("#refRunNumberInputBrowse, #currRunNumberInputBrowse").click(function() {
        $("#runNumberInputBrowseCaller").val($(this).attr('data-ref'));
        $("#myModal").modal();
    });

    $("#dataBrowseOKbtn").click(function() {
        var pathToPaste = $("#runNumberInputBrowseCaller").attr("data-path");
        var inputObj = $("#" + $("#runNumberInputBrowseCaller").val());

        inputObj.val(pathToPaste);

        var activeTabID = $('.extandable-tab-list-ref .active > a').prop('id');

        $("#checkboxAccordion input:checked").each(function() {
            var id = $(this).attr("id");

            var refPath = $('#refRunNumberInput').val();
            var currPath = $('#currRunNumberInput').val();

            AddRmTkMapPanel(id, false, refPath, currPath);
            AddRmTkMapPanel(id, true, refPath, currPath);
        });

        $('#' + activeTabID).click();

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
});
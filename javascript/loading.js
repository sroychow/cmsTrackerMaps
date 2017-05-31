$(document).ready(function() {

    loadCheckboxes();
    decodeOptions();

    // FIXME put in one place

    // $('.pannable-image').ImageViewer({snapView: false,
    //                                  maxZoom: 400,
    //                                  refreshOnResize : false});
    $('.pannable-image').ImageViewer();


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

    $('.pannable-image').ImageViewer();

});
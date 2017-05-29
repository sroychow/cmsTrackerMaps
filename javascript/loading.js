$(document).ready(function() {

    $("#TrackerMaps").load("TrackerMapsBody.html");

    loadCheckboxes();
    decodeOptions();
    

    $(".panel-extend-checkbox").on('click change', function(e) {
        drawTkMapSelection();
    });

    $("#refRunNumberInput, #currRunNumberInput").on('keyup change', function(e) {
        var myVal = $.trim($(this).val());
        var runNum = DecodeRunNumberFromString(myVal);
        var runType = ($(this).attr('id').substring(0, 3) == "ref") ? "#refRunType" : "#currRunType";
        var stream = ($(this).attr('id').substring(0, 3) == "ref") ? "#refStream" : "#currStream";
        $(runType).children().remove();
        $(stream).children().remove();

        if (runNum != 0) {
            var dataDir = GetDataDirectory(runNum);
            PasteOptions(baseURL + dataDir, runType);
        }

        $('#refRunType').prop('selectedIndex', 1);
        $('#refRunType').trigger('change');
    });

    $('#refRunType, #currRunType').on('change keyup', function() {
        var stream = ($(this).attr('id').substring(0, 3) == "ref") ? "#refStream" : "#currStream";
        var runNumberInput = ($(this).attr('id').substring(0, 3) == "ref") ? "#refRunNumberInput" : "#currRunNumberInput";
        var runStr = $.trim($(runNumberInput).val());
        var currDir = $(this).val() + runStr.substring(0, 3) + "/" + runStr + "/";
        $(stream).children().remove();
        PasteOptions(currDir, stream);
    });

    $(".link-me").click(function(e) {
        var toAppend = encodeOptions();
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        url += toAppend;
        window.location.href = url;

        alert('Link created, ready to share your findings!\n');
    });
});
$(document).ready(function() {

    $("#TrackerMaps").load("TrackerMapsBody.html");

    // LOAD CHECKBOXES
    var newInput = "";
    var checkboxID = 0;
    for (row = 0; row < mapDescriptions.length; row++) {
        newInput += "<div class='form-group'>";
        for (col = 0; col < mapDescriptions[row].length; col++) {
            newInput += "<label class='checkbox'><input type='checkbox' value='' id='" + checkboxID + "' class='panel-extend-checkbox'>" + mapDescriptions[row][col] + "</label>";
            checkboxID++;
        }
        newInput += "</div>";
    }
    $("#checkboxList").html(newInput);


    $(".panel-extend-checkbox").click(function(e) {
        var currID = "inputCheckBoxPanel" + this.id;
        if ($(this).prop('checked') == true) {
            var newInput = "<div id='" + currID + "' class='tab-pane fade extandable-tab-list-element'>" + currID + "</div>";
            $(newInput).insertAfter($(".extandable-tab-list-element").last());
            //$(".extandable-tab-list-element").append(newInput);
            newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + currID + "</a></li>";
            $(".extandable-tab-list-ref").append(newInput);
        } else {
            $("#" + currID).remove();
            $("#" + currID + "lnk").remove();
        }
    });

    function DecodeRunNumberFromString(inputStr) {
        if (inputStr.length == 6) {
            var result = 0;
            for (i = 0; i < 6; i++) {
                var cr = parseInt(inputStr[i]);
                if (isNaN(cr)) {
                    return 0
                }
                result += cr;
                if (i != 5) result *= 10;
            }
            return result;
        }
        return 0;
    }

    function GetDataDirectory(runNum) {
        if (runNum >= 290124) return "Data2017/";
        else if (runNum >= 264370) return "Data2016/";
        else if (runNum >= 233235) return "Data2015/";
        else if (runNum >= 209685) return "Data2013/";

        else return "Data2012/";
    }

    function PasteOptions(dir, id) {
        $.get(dir, function(data) {
            var newData = $(data).find("td > a");

            for (i = 1; i < newData.length; i++) {
                $(id).append("<option value='" + dir + $(newData[i]).attr("href") + "'>" + $(newData[i]).attr("href") + " </option>")
            }
            $(id).change();
        });
    }

    $("#refRunNumberInput, #currRunNumberInput").on('keydown change', function(e) {
        var myVal = $.trim($(this).val());
        var runNum = DecodeRunNumberFromString(myVal);

        var runType = ($(this).attr('id').substring(0, 3) == "ref") ? "#refRunType" : "#currRunType";
        var stream = ($(this).attr('id').substring(0, 3) == "ref") ? "#refStream" : "#currStream";

        if (runNum != 0) {
            var dataDir = GetDataDirectory(runNum);
            PasteOptions(baseURL + dataDir, runType);
        } else {
            $(runType).children().remove();
            $(stream).children().remove();
        }
    });

    $('#refRunType, #currRunType').on('change keydown', function() {
        var stream = ($(this).attr('id').substring(0, 3) == "ref") ? "#refStream" : "#currStream";
        var runNumberInput = ($(this).attr('id').substring(0, 3) == "ref") ? "#refRunNumberInput" : "#currRunNumberInput";

        var runStr = $.trim($(runNumberInput).val());

        var currDir = $(this).val() + runStr.substring(0, 3) + "/" + runStr + "/";
        // alert(currDir);
        $(stream).children().remove();
        PasteOptions(currDir, stream);
    });

    $('#refStream, #currStream').change(function() {
        // LOAD APPROPRIATE DATA INTO TABS IF THEY ARE VALID

    });
});
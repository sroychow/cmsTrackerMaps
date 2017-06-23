
function addRmTkMapPanel(id, isChecked, refPath, currPath) {
    var currID = "inputCheckBoxPanel" + id;

    if (isChecked) {
        var info = getConfigInfoFromName($('#'+id).attr('label'));
        var filename = info.res;
        var ext = filename.substr(filename.lastIndexOf('.') + 1);
        var newInput;

        switch(ext) {
            case "png":
                newInput = buildPanelWithImages(currID);
                break;

            case "txt":
                newInput = buildPanelWithText(currID);
                break;

            case "log":
                newInput = buildPanelWithText(currID);
                break;

            case "out":
                newInput = buildPanelWithText(currID);
                break;

            default:
                console.log("Unsupported filetype");
        }

        $(".extandable-tab-list-content").append(newInput);
        newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).attr('label') + "</a></li>";
        $(".extandable-tab-list-ref").append(newInput);
        addToView(currID, refPath, currPath, info);
    } else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }
}

function addToView(id, rsrc, csrc, info) {
    var filename = info.res;
    var ext = filename.substr(filename.lastIndexOf('.') + 1);

    var refsrc  = rsrc + filename;
    var currsrc = csrc + filename;
    switch(ext){
        case "png":
            var refFinal  = refsrc;
            var currFinal = currsrc;
            if (filename === "PCLBadComponents_Run_.png") {
                // special snowflake case where filename = PCLBadComponents_Run_XXXXXX.png
                refFinal  = buildFileNameWithRunNr(refsrc, ext);
                currFinal = buildFileNameWithRunNr(currsrc, ext);
            }

            addPngToPanel(refFinal, currFinal, id, info.map);
            break;

        case "txt":
            refsrc  = buildFileNameWithRunNr(refsrc, ext);
            currsrc = buildFileNameWithRunNr(currsrc, ext);
            this.addTextToPanel(refsrc, currsrc, id);
            break;

        case "log":
            addTextToPanel(refsrc, currsrc, id);
            break;

        case "out":
            addTextToPanel(refsrc, currsrc, id);
            break;

        default:
            console.log("Unsupported filetype: " + ext);
    }
}

function addPngToPanel(refFinal, currFinal, id, emptyMap){
    $('#' + id + ' .refCol').html("<div class='imgContainer'>\
                                       <img class='imgRef' src='"   + refFinal  + "'/>\
                                    </div>");

    $('#' + id + ' .currCol').html("<div class='imgContainer'>\
                                       <img class='imgCurr' src='" + currFinal + "'/>\
                                    </div>");

    $('#' + id + " .diffCol").append("\
                            <div  class='imgContainer '>\
                                <div class='imgDiffWrapper imgDiff' style='background-image: url(\"" + refFinal + "\"), url(\"" + currFinal + "\")'>\
                                    <div class='cleanRef ' style='background-image: url(\"" + emptyMap + "\")'></div>\
                                </div>\
                            </div>");

    attachWheelZoomListeners('#' + id);

    $("#" + id + " .toggleDifferenceView").parent().css("display", "initial");
    $("#" + id + " .toggleDifferenceView").change(function(e) {
        var refCol = $(this).closest(".panel").closest(".row").find(".refCol");
        $(this).closest(".panel").find(".currCol").toggle();
        $(this).closest(".panel").find(".diffCol").toggle().css("height", refCol.height());
    });
}

function addTextToPanel(refsrc, currsrc, id) {
    jQuery.get(refsrc, function(data) {
        $('#ref' + id).val(data);
    });

    jQuery.get(currsrc, function(data) {
        $('#curr' + id).val(data);
    });
}


function addRmTkMapPanel(id, isChecked, refPath, currPath) {
    if(global_mode==='timeline') {
        // alert("ok we are trying to add stuff while in timeline mode");
        var currID = "inputCheckBoxPanel" + id;

        if (isChecked) {
            var info = getConfigInfoFromName($('#'+id).attr('label'));
            var filename = info.res;
            var ext = filename.substr(filename.lastIndexOf('.') + 1);

            // add the stupid player thing
            var newInput = buildTimelinePanel(currID);
            $(".extandable-tab-list-content").append(newInput);
            newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).attr('label') + "</a></li>";
            $(".extandable-tab-list-ref").append(newInput);


            var startRunPath = $('#refRunPath').val();
            var endRunPath = $('#currRunPath').val();
            console.log(startRunPath);
            console.log(endRunPath);
            loadImagesToImagePlayer(filename, startRunPath, endRunPath);


        } else {
            $("#" + currID).remove();
            $("#" + currID + "lnk").remove();
        }


    } else { 
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
}

function loadImagesToImagePlayer(resname, startRunPath, endRunPath) {

    // Get List Of Runs to displaya
    var path = startRunPath;
    var start_run_nr = getRunNumberFromString(startRunPath);
    var end_run_nr = getRunNumberFromString(endRunPath);

    console.log(start_run_nr);
    console.log(end_run_nr);

    $.post('php/loadListNeighbourRuns.php', { dir : path, startRunNumber : start_run_nr, endRunNumber : end_run_nr },
        function(data) {
        $('div#PlayerImageTag > img').remove();

            var obj = jQuery.parseJSON(data);
            console.log(obj[0]);

            for(var i=0; i<obj.length; ++i){
                var tmpstring ="<img class='timeline-image' src='" + obj[i] + resname + "'></img>";
                console.log(tmpstring);
                $('#PlayerImageTag').append(tmpstring);
            }

            $('#PlayerImageTag').imgplay({rate: 5}); 
        }
    );
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

            if (!filename.startsWith("Masked")) //INCOSISTENCIES IN FILE NAMING...
            {
                refsrc  = buildFileNameWithRunNr(refsrc, ext);
                currsrc = buildFileNameWithRunNr(currsrc, ext);
            }
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

    // $("#" + id + " .toggleDifferenceView").parent().css("display", "initial");
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

    $(document).on('click', '#sideDiffButton, #inlineDiffButton', function(){
        $(this).closest(".row").siblings().first().css("display", "none");
    });
    $(document).on('click', '#noneDiffButton', function(){
        $(this).closest(".row").siblings().first().css("display", "initial");
    });
}


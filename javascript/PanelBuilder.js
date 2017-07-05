function addRmTkMapPanel(id, isChecked, refPath, currPath) {
     {
        var currID = "inputCheckBoxPanel" + id;

        if (isChecked) {
            var info = getConfigInfoFromName($('#'+id).attr('label'));
            var filename = info.res;
            var ext = filename.substr(filename.lastIndexOf('.') + 1);
            var layout;

            // --------- define the layout to be bulit depending on mode ---------
            if(global_mode==='compare')  {
                switch(ext) {
                    case "png":
                        layout = buildPanelWithImages(currID);
                        break;

                    case "txt":
                    case "log":
                    case "out":
                        layout = buildPanelWithText(currID);
                        break;

                    default:
                        console.log("Unsupported filetype");
                        return;
                }
            }

            if(global_mode==='timeline') {
                switch(ext) {
                    case "png":
                        layout = buildTimelinePanel(currID);
                        break;

                    case "txt":
                    case "log":
                    case "out":
                        console.log('Cannot display timeline for textfiles files (txt/log/out)');
                        return;

                    default:
                        console.log("Unsupported filetype");
                        return;
                    }
            }
            

            $(".extandable-tab-list-content").append(layout);
            var linktab = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).attr('label') + "</a></li>";
            $(".extandable-tab-list-ref").append(linktab);

            // --------- Add content to the layout ---------
            if(global_mode==='compare')  {
                addToView(currID, refPath, currPath, info);
            }

            if(global_mode==='timeline') {
                var startRunPath = $('#refRunPath').val();
                var endRunPath = $('#currRunPath').val();
                console.log(startRunPath);
                console.log(endRunPath);
                loadImagesToImagePlayer(currID, filename, startRunPath, endRunPath);
            }

        } else {
            $("#" + currID).remove();
            $("#" + currID + "lnk").remove();
        }
    }
}


function loadImagesToImagePlayer(id, resname, startRunPath, endRunPath) {

    // Get List Of Runs to displaya
    var path = startRunPath;
    var start_run_nr = getRunNumberFromString(startRunPath);
    var end_run_nr = getRunNumberFromString(endRunPath);

    console.log(start_run_nr);
    console.log(end_run_nr);

    $.post('php/loadListNeighbourRuns.php', { dir : path, startRunNumber : start_run_nr, endRunNumber : end_run_nr },
        function(data) {

            var obj = jQuery.parseJSON(data);
            console.log(obj[0]);

            for(var i=0; i<obj.length; ++i){
                var newimage ="<img src='" + obj[i] + resname + "'>";
                $('#imageplayer'+id).append(newimage);
            }

            $('#imageplayer'+id).imgplay({rate: 5}); 
        }
    );
}


function addToView(id, rsrc, csrc, info) {
    var filename = info.res;
    var ext = getExtensionFromFilename(filename);

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
}


function addPanel(id, refPath, currPath){
    var currID = "inputCheckBoxPanel" + id;

    var info = getConfigInfoFromName($('#'+id).attr('label'));
    var filename = info.res;
    var ext = getExtensionFromFilename(filename);

    var layout;
    if(ModeHandler.getMode()==='compare')  {
        switch(ext) {
            case "png":
            case "html":
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
        $(".extandable-tab-list-content").append(layout);
        $(".extandable-tab-list-ref").append(buildTab(id, currID));            
        
        addToPanel(currID, refPath, currPath, info);
    }

    if(ModeHandler.getMode()==='timeline') {
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

        $(".extandable-tab-list-content").append(layout);
        $(".extandable-tab-list-ref").append(buildTab(id, currID));
        var startRunPath = $('#refRunPath').val();
        var endRunPath = $('#currRunPath').val();
        
        loadImagesToImagePlayer(currID, filename, startRunPath, endRunPath);            
    }    
}

function rmPanel(id, refPath, currPath) {
    var currID = "inputCheckBoxPanel" + id;
    $("#" + currID).remove();
    $("#" + currID + "lnk").remove();
}

function closeTab(panelId) {
    $('#'+panelId).click();
}

// ------------------------------------------------------------------------- //

function addToPanel(id, rsrc, csrc, info) {
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
            if (!filename.startsWith("Masked")){//INCOSISTENCIES IN FILE NAMING...
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

        case "html":
            addHtmlToPanel(refsrc, currsrc, id, info.map);
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
}

function addHtmlToPanel(refFinal, currFinal, id, emptyMap){
    // REFERENCE
    $('#' + id + ' .refCol').append("<div class='imgContainer'></div>").find('.imgContainer').load(refFinal, function(){
        refFinalNew = substituteHtmlImgPath(refFinal, $(this));
        $(this).find('img').addClass('imgRef');

        currImg = $(this).find('img').first();

        createAnchorMap(this);
        $(this).find('map').remove();

        // CURRENT
        $('#' + id + ' .currCol').append("<div class='imgContainer'></div>").find('.imgContainer').load(currFinal, function(){
            currFinalNew = substituteHtmlImgPath(currFinal, $(this));
            $(this).find('img').addClass('imgCurr');

            //CANNOT JUST REUSE <MAPCONTAINER> SINCE ITS CONTENT IS LIKELY TO CHANGE WHEN OPENING LINK WITH >= 2 INTERACTIVE VIEW TABS
            var anchorMapClone = $(this).closest(".row").find(".refCol .anchorMap").clone();

            if ($(this).find('map').length)
            {
                if (anchorMapClone.find(".scaledAnchorMap").children().length)
                {
                    anchorMapClone.appendTo($(this));
                }
                else
                {
                    createAnchorMap(this);
                }
                $(this).find('map').remove();
            }
            
            // DIFF
            // SAME ADNOTATION AS FOR <MAPCONTAINER>
            
            refFinalNew = $(this).closest(".row").find(".refCol .imgRef").attr("src");
            currFinalNew = $(this).closest(".row").find(".currCol .imgCurr").attr("src");

            // console.log($(this).closest(".row").find(".currCol"));

            $('#' + id + " .diffCol").append("\
                <div  class='imgContainer '>\
                    <div class='imgDiffWrapper imgDiff' style='background-image: url(\"" + refFinalNew + "\"), url(\"" + currFinalNew + "\")'>\
                        <div class='cleanRef ' style='background-image: url(\"" + emptyMap + "\")'></div>\
                    </div>\
                </div>");

            attachWheelZoomListeners('#' + id);

            $("#" + id + " .toggleDifferenceView").change(function(e) {
                var refCol = $(this).closest(".panel").closest(".row").find(".refCol");
                $(this).closest(".panel").find(".currCol").toggle();
                $(this).closest(".panel").find(".diffCol").toggle().css("height", refCol.height());
            });

            $('#' + id + ' .refCol .imgContainer').resize();
            $('#' + id + ' .currCol .imgContainer').resize();

            $('#' + id + ' .refCol .anchorMap a.neon').tooltip({viewport : '#' + id + ' .refCol .anchorMap',
                                                                container : '#' + id + ' .refCol .imgContainer',
                                                                trigger: "hover click manual focus",
                                                                position: "top auto"});
            $('#' + id + ' .currCol .anchorMap a.neon').tooltip({viewport : '#' + id + ' .currCol .anchorMap',
                                                                container : '#' + id + ' .currCol .imgContainer',
                                                                trigger: "hover click manual focus",
                                                                position: "top auto"});

            // make sure we keep track of changing column size to adjust scale of the overlays
            CreateInteractiveViewImageSizeChangeEventHandling($('#' + id + ' .refCol .imgContainer'));
            CreateInteractiveViewImageSizeChangeEventHandling($('#' + id + ' .currCol .imgContainer'));

        });
    });
}

function substituteHtmlImgPath(thePath, obj){
    currImg = obj.find('img').first();

    thePathSpl = thePath.split('/');
    imgSrc = currImg.attr('src');
    thePathSpl[thePathSpl.length - 1] = imgSrc;

    newPath = "";
    for (i = 1; i < thePathSpl.length; ++i){
        newPath = newPath + "/" + thePathSpl[i];
    }
    currImg.attr('src', newPath);

    // console.log(currImg[0].width);

    return newPath;
}

function addTextToPanel(refsrc, currsrc, id) {
    jQuery.get(refsrc, function(data) {
        $('#ref' + id).val(data);
    });

    jQuery.get(currsrc, function(data) {
        $('#curr' + id).val(data);
    });
}

function createAnchorMap(obj)
{
    mapContainer = $(obj).append("<div class='anchorMap'><div class='scaledAnchorMap'></div></div>").find('.scaledAnchorMap');
        
    $(obj).find('area').each(function(idx){
        c = $(this).attr("coords");
        t = $(this).attr("title").trim();
        tSmall = t.split(" ").join("");

        xy = c.split(",");

        for (i = 0; i < xy.length; ++i) {
            xy[i] = Number(xy[i]);
        }

        w = xy[2] - xy[0];
        h = xy[3] - xy[1];

        anchor = $("<a class='neon' href='#' title='" + t + "' data-original-title='" + t + "' data-toggle='tooltip' id='" + tSmall + "'></a>").css({"left" : xy[0], "top" : xy[1], "width" : w, "height" : h});
        mapContainer.append(anchor);
    });
}

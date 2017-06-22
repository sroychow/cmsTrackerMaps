class PanelBuilder {
    static addRmTkMapPanel(id, isChecked, refPath, currPath) {
        var currID = "inputCheckBoxPanel" + id;

        if (isChecked) {

            var info = getConfigInfoFromName($('#'+id).attr('label'));
            console.log(info);

            var filename = info.res;
            var ext = filename.substr(filename.lastIndexOf('.') + 1);

            var newInput;

            switch(ext) {
                case "png":
                    newInput = this.buildPanelWithImages(currID);
                    break;

                // Same handling for these 3 cases
                case "txt":
                case "log":
                case "out":
                    newInput = this.buildPanelWithText(currID);
                    break;

                default:
                    console.log("Unsupported filetype");
            }

            $(".extandable-tab-list-content").append(newInput);
            newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).attr('label') + "</a></li>";
            $(".extandable-tab-list-ref").append(newInput);
            this.addToComparisonView(currID, refPath, currPath, info);
        } else {
            $("#" + currID).remove();
            $("#" + currID + "lnk").remove();
        }
    }

    static addToComparisonView(id, rsrc, csrc, info) {
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
                    refFinal  = this.buildFileNameWithRunNr(refsrc, ext);
                    currFinal = this.buildFileNameWithRunNr(currsrc, ext);
                }

                this.addPngToPanel(refFinal, currFinal, id, info.map);
                break;

            // Similar handling for these 3 cases
            case "txt":
                refsrc  = this.buildFileNameWithRunNr(refsrc, ext);
                currsrc = this.buildFileNameWithRunNr(currsrc, ext);
                this.addTextToPanel(refsrc, currsrc, id);
                break;

            case "log":
                this.addTextToPanel(refsrc, currsrc, id);
                break;
                
            case "out":
                this.addTextToPanel(refsrc, currsrc, id);
                break;

            default:
                console.log("Unsupported filetype: " + ext);
        }
    }

    static addPngToPanel(refFinal, currFinal, id, emptyMap){
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

        PanZoomHandler.attachWheelZoomListeners('#' + id);

        $("#" + id + " .toggleDifferenceView").parent().css("display", "initial");
        $("#" + id + " .toggleDifferenceView").change(function(e) {
            var refCol = $(this).closest(".panel").closest(".row").find(".refCol");
            $(this).closest(".panel").find(".currCol").toggle();
            $(this).closest(".panel").find(".diffCol").toggle().css("height", refCol.height());
        });
    }

    static addTextToPanel(refsrc, currsrc, id) {
        jQuery.get(refsrc, function(data) {
        $('#ref' + id).val(data);});

        jQuery.get(currsrc, function(data) {
        $('#curr' + id).val(data);
        });
    }

    static buildFileNameWithRunNr(name, extension) {
      var runnr = getRunNumberFromString(name);
      var tmp = name.split('.');
      var ret = tmp[0] + runnr + '.' + extension;// + tmp[1];
      return ret;
    }

    static buildPanelWithImages(id) {
	    return "<div id='" + id + "' class='tab-pane fade extandable-tab-list-element'>" +
	    "<div class='row'>" +
	        "<div class='col-md-6'>" +
	            "<div class='panel panel-default'>" +
	                "<div class='panel-heading'>" +
	                    "<div class='row'>" +
	                        "<div class='col-md-6'>" +
	                        "Reference" +
	                        "</div>" +
	                    "</div>" +
	                "</div>" +
	                "<div class='panel-body refCol'></div>" +
	                "</div>"+
	            "</div>" +
	            "<div class='col-md-6'>" +
	                "<div class='panel panel-default'>" +
	                    "<div class='panel-heading'>" +
	                        "<div class='row'>" +
	                            "<div class='col-md-6'>" +
	                            "Current" +
	                            "</div>" +
	                        "<div class='col-md-6 currColRightHeading'>" +
	                        "<label class='checkbox'>" +
	                        "<input type='checkbox' class='toggleDifferenceView'>" +
	                        "Difference to Reference" +
	                        "</label>" +
	                    "</div>" +
	                "</div>" +
	            "</div>" +
	            "<div class='panel-body currCol'></div>" +
	                "<div class='panel-body diffCol'></div>" +
	                "</div>"+
	            "</div>" +
	        "</div>" +
	    "</div>";
    }

    static buildPanelWithText(id) {
	    return "<div id='" + id + "' class='tab-pane fade extandable-tab-list-element'>" +
	            "<div class='row'>" +
	                "<div class='col-md-6'>" +
	                    "<div class='panel panel-default'>" +
	                        "<div class='panel-heading'>" +
	                            "<div class='row'>" +
	                                "<div class='col-md-6'>" +
	                                   "Reference " +
                                        "<button type='button' class='btn btn-xs toggleTextarea' totoggle='#ref"+id+"' ><i class='glyphicon glyphicon-menu-up'></i></button>" + 
	                                "</div>" +
	                            "</div>" +
	                        "</div>" +
	                        "<div class='panel-body'>" +  "<textarea id='ref"+id+"' readonly></textarea>" +
	                        "</div>" +
	                    "</div>"+
	                "</div>" +

	                "<div class='col-md-6'>" +
	                    "<div class='panel panel-default'>" +
	                        "<div class='panel-heading'>" +
	                            "<div class='row'>" +
	                                "<div class='col-md-6'>" +
	                                "Current " +
                                    "<button type='button' class='btn btn-xs toggleTextarea' totoggle='#curr"+id+"' ><i class='glyphicon glyphicon-menu-up'></i></button>" + 
	                                "</div>" +
	                            "</div>" +
	                        "</div>" +
	                        "<div class='panel-body'>" +  "<textarea id='curr"+id+"' readonly></textarea>" +
	                        "</div>" +
	                    "</div>"+
	                "</div>" +

	                "<div class='viewType'>" +
                    "<div class='small'>Choose Diff Style</div>" +
	                    "<div class='btn-group btn-group-sm' role='group' id='diffButtonGroup'>" +
	                        "<button type='button' id='sideDiffButton'   class='btn btn-default' onclick='DiffHandler.diffUsingJS(0,\""+id+"\");'> Side by Side</button>" +
                            "<button type='button' id='inlineDiffButton' class='btn btn-default' onclick='DiffHandler.diffUsingJS(1,\""+id+"\");'> Combined Inline</button>" +
	                    "</div>" +
	                "</div>" +
	                "<div id='diff"+id+"'> </div>" +
	            "</div>";
    }
}

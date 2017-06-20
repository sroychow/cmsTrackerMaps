class PanelBuilder {
    static addRmTkMapPanel(id, isChecked, refPath, currPath) {
        var currID = "inputCheckBoxPanel" + id;

        var info = getConfigInfoFromName($('#' + id).attr('label'));
        var filename = info.res;
        var emptyMap = info.map;
        var ext = filename.substr(filename.lastIndexOf('.') + 1);

        if (isChecked == true) {
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
            this.addToComparisonView(id, currID, refPath, currPath);

        } else {
            $("#" + currID).remove();
            $("#" + currID + "lnk").remove();
        }
    }

    static addToComparisonView(nrid, id, rsrc, csrc) {
        var info = getConfigInfoFromName($('#' + nrid).attr('label'));
        var filename = info.res;
        var emptyMap = info.map;
        var ext = filename.substr(filename.lastIndexOf('.') + 1);

        var refsrc  = rsrc + filename;
        var currsrc = csrc + filename;
        switch(ext){
            case "png":
                var refFinal  = refsrc;
                var currFinal = currsrc;

                if (filename === "PCLBadComponents_Run_.png") {
                    // special snowflake case where filename = PCLBadComponents_Run_XXXXXX.png
                    // where XXXXX is the 6 digit run number.
                    refFinal  = this.buildFileNameWithRunNr(refsrc, ext);
                    currFinal = this.buildFileNameWithRunNr(currsrc, ext);
                }


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

                this.attachWheelZoomListeners('#' + id);

                $("#" + id + " .toggleDifferenceView").parent().css("display", "initial");
                $("#" + id + " .toggleDifferenceView").change(function(e) {
                    var refCol = $(this).closest(".panel").closest(".row").find(".refCol");
                    $(this).closest(".panel").find(".currCol").toggle();
                    $(this).closest(".panel").find(".diffCol").toggle().css("height", refCol.height());
                });

            break;

            case "txt":
                jQuery.get(this.buildFileNameWithRunNr(refsrc, ext), function(data) {
                    $('#ref' + id).val(data);});

                jQuery.get(this.buildFileNameWithRunNr(currsrc, ext), function(data) {
                    $('#curr' + id).val(data);});
            break;

            case "log":
                jQuery.get(refsrc, function(data) {
                    $('#ref' + id).val(data);});

                jQuery.get(currsrc, function(data) {
                    $('#curr' + id).val(data);});
            break;

            case "out":
                jQuery.get(refsrc, function(data) {
                    $('#ref' + id).val(data);});

                jQuery.get(currsrc, function(data) {
                    $('#curr' + id).val(data);});
            break;

            default:
                console.log("Unsupported filetype: " + ext);
        }
    }

    static buildFileNameWithRunNr(name, extension) {
      var runnr = getRunNumberFromString(name);
      var tmp = name.split('.');
      var ret = tmp[0] + runnr + '.' + extension;// + tmp[1];
      return ret;
    }

    static attachWheelZoomListeners(sectionToLookIn) {
        // ---------------- Helper Functions ----------------
        function assignTransform(section, master, slave) {
            var trans = section.find(master).css("transform");
            section.find(slave).css("transform", trans);
        }

        function setPanzoomParams(section, elem) {
            return section.find(elem).panzoom({
                startTransform: 'scale(1)',
                maxScale: 10,
                minScale: 1,
                increment: 0.1,
                contain: 'automatic'
            });
        }

        function linkZoom(section, pz, master, src, dst) {
          pz.parent().on('mousewheel.focal', function(e) {
              e.preventDefault();
              var delta = e.delta || e.originalEvent.wheelDelta;
              var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
              pz.panzoom('zoom', zoomOut, {
                  animate: false,
                  focal: e
              });

            assignTransform(section, src, dst);
          });
          section.find(master).parent().on("mouseup pointerup",function(e) {
              assignTransform(section, src, dst);
          });
        }

        // ---------------- Start doing stuff here ----------------
        var $section = $(sectionToLookIn);

        var $pz1 = setPanzoomParams($section, '.imgRef');
        linkZoom($section, $pz1,'.imgRef' , ".refCol .imgRef", ".currCol .imgCurr");
        linkZoom($section, $pz1,'.imgRef' , ".refCol .imgRef", ".diffCol .imgDiff");

        var $pz2 = setPanzoomParams($section, '.imgCurr');
        linkZoom($section, $pz2,'.imgCurr', ".currCol .imgCurr", ".refCol .imgRef");
        linkZoom($section, $pz2,'.imgCurr', ".currCol .imgCurr", ".diffCol .imgDiff");

        var $pz3 = setPanzoomParams($section, '.imgDiff');
        linkZoom($section, $pz3,'.imgDiff', ".diffCol .imgDiff", ".refCol .imgRef");
        linkZoom($section, $pz3,'.imgDiff', ".diffCol .imgDiff", ".currCol .imgCurr");
    }

    static diffUsingJS(viewType, elemID) {
        var refstr = 'ref'+String(elemID);
        var currstr = 'curr'+String(elemID);
        var diffstr = 'diff'+String(elemID);

      "use strict";
      var byId = function (id) { return document.getElementById(id); },
        base = difflib.stringAsLines(byId(refstr).value),
        newtxt = difflib.stringAsLines(byId(currstr).value),
        sm = new difflib.SequenceMatcher(base, newtxt),
        opcodes = sm.get_opcodes(),
        diffoutputdiv = byId(diffstr),
        contextSize = 0;

      diffoutputdiv.innerHTML = "";
      contextSize = contextSize || null;

      diffoutputdiv.appendChild(diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        baseTextName: "Reference",
        newTextName: "Current",
        contextSize: 0,
        viewType: viewType
      }));
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
	                        "<button type='button' id='sideDiffButton'   class='btn btn-default' onclick='PanelBuilder.diffUsingJS(0,\""+id+"\");'> Side by Side</button>" +
	                        "<button type='button' id='inlineDiffButton' class='btn btn-default' onclick='PanelBuilder.diffUsingJS(1,\""+id+"\");'> Combined Inline</button>" +
	                    "</div>" +
	                "</div>" +
	                "<div id='diff"+id+"'> </div>" +
	            "</div>";
    }
}

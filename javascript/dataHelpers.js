function addRmTkMapPanel(id, isChecked, refPath, currPath) {
    var currID = "inputCheckBoxPanel" + id;

    if (isChecked == true) {
        var newInput = buildPanelContentString(currID);
        $(".extandable-tab-list-content").append(newInput);

        newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).attr('label') + "</a></li>";
        $(".extandable-tab-list-ref").append(newInput);

        addToComparisonView(id, currID, refPath, currPath);

    } else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }
}

function addToComparisonView(nrid, id, rsrc, csrc) {
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
                refFinal  = buildFileNameWithRunNr(refsrc, ext);
                currFinal = buildFileNameWithRunNr(currsrc, ext);
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
                                                                  
            attachWheelZoomListeners('#' + id);  

            $("#" + id + " .toggleDifferenceView").parent().css("display", "initial");
            $("#" + id + " .toggleDifferenceView").change(function(e) {
                var refCol = $(this).closest(".panel").closest(".row").find(".refCol");
                $(this).closest(".panel").find(".currCol").toggle();
                $(this).closest(".panel").find(".diffCol").toggle().css("height", refCol.height());
            });

        break;

        case "txt":
            $('#' + id + ' .refCol').html("<object data='"  + buildFileNameWithRunNr(refsrc, ext)  + "' />");
            $('#' + id + ' .currCol').html("<object data='" + buildFileNameWithRunNr(currsrc, ext) + "' />");
        break;

        case "log": 
            $('#' + id + ' .refCol').html("<object data='" + refsrc + "' />");
            $('#' + id + ' .currCol').html("<object data='" + currsrc + "' />");
        break;

        case "out":
            $('#' + id + ' .refCol').html("<object data='"  + refsrc  + "' />");
            $('#' + id + ' .currCol').html("<object data='" + currsrc + "' />");
        break;

        default: 
            console.log("Unsupported filetype: " + ext);
    }
}

function disableCheckboxes(name, disable) { 
    $('#' + name + ' :checkbox').each(function() {
        $(this).attr("disabled", disable);
    });
}

function buildFileNameWithRunNr(name, extension) {
  var runnr = getRunNumberFromString(name);
  var tmp = name.split('.');
  var ret = tmp[0] + runnr + '.' + extension;// + tmp[1];
  return ret;
}

function getRunNumberFromString(path) {
    var tmpnr = path.replace(/[^0-9]/g, '');
    var runnr = tmpnr.substr(tmpnr.length - 6);
    return runnr;
}

function reloadCheckedTabs()
{
    var activeTabID = $('.extandable-tab-list-ref .active > a').prop('id');

    $("#checkboxAccordion input:checked").each(function() {
        var id = $(this).attr("id");

        var refPath = $('#refRunPath').val();
        var currPath = $('#currRunPath').val();

        addRmTkMapPanel(id, false, refPath, currPath);
        addRmTkMapPanel(id, true, refPath, currPath);
    });

    $('#' + activeTabID).click();
}

function getNeighbourRun(id, direction) {
    var path = $('#' + id).val();

    if (path.length == 0) return;

    var curr_run_str = getRunNumberFromString(path);

    $.post('php/loadNeighbourRun.php', { dir : path, startRunNumber : curr_run_str, direction : direction }, 
        function(data) {
            $('#' + id).val(data);
            reloadCheckedTabs();
        }
    );
}

function attachWheelZoomListeners(sectionToLookIn) {
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


function loadCheckboxes() {
    var checkboxID = 0;
    var row = 0;
    for (var group in mapDescriptions) {
        if (mapDescriptions.hasOwnProperty(group)) {

            var newPanelObject = "<div class='panel panel-default'>" +
                "     <a data-toggle='collapse' data-parent='#checkboxAccordion' href='#listCollapse" + row + "'>" +
                "       <button class='btn btn-default btn-block'>" +
                "         <span class='glyphicon glyphicon-menu-right'></span> " + group +
                "       </button>" +
                "     </a>" +

                "     <div class='panel-collapse collapse' id='listCollapse" + row + "'>" +
                "       <div class='panel-body'>" +
                "         <div class='row'>" +
                "           <div class='col-md-offset-1 col-md-11' id='checkboxList" + row + "'></div> " +
                "         </div>" +
                "      </div>" +
                "     </div>" +
                "  </div>";

            $("#checkboxAccordion").append(newPanelObject);

            var col = 0;
            var newInput = '';
            for (var elem in mapDescriptions[group]) {
                var elem_name = mapDescriptions[group][elem].name;

                newInput += "<label class='checkbox'><input type='checkbox'\
                              id='" + checkboxID + "' label='" + elem_name +  "' class='panel-extend-checkbox'>" + elem_name + "</label>";
                checkboxID++;
            }
            $("#checkboxList" + row).html(newInput);
            ++row;
        }
    }
}

// where name is the 'name' column in data.js
// which functions as ID.
function getConfigInfoFromName(name) {

  for (var group in mapDescriptions) {
    for (var elem in mapDescriptions[group]) {

      if(name === mapDescriptions[group][elem]['name']) {
        var obj = new Object();
        obj.name = mapDescriptions[group][elem]['name'];
        obj.res = mapDescriptions[group][elem]['resource'];
        obj.map = mapDescriptions[group][elem]['emptyMap'];
        return obj;
      }
    }
  }
}

// allows for proper difference view scaling
$(window).resize(function() {
    var objs = $(".toggleDifferenceView");
    for (i = 0; i < objs.length; ++i) {
        var refCol = $(objs[i]).closest(".panel").closest(".row").find(".refCol");
        $(objs[i]).closest(".panel").find(".diffCol").css("height", refCol.height());
    }
});

function buildPanelContentString(id) { 
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
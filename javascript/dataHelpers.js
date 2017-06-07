function AddRmTkMapPanel(id, isChecked, refPath, currPath) {
    var currID = "inputCheckBoxPanel" + id;

    if (isChecked == true) {
        var newInput = "<div id='" + currID + "' class='tab-pane fade extandable-tab-list-element' style=''>" + 
                            "<div class='row'>" +
                                // "<div class='col-md-1'>" +
                                    // "<button class='btn btn-warning toggleDifferenceView'>" +
                                    //     "<span class='glyphicon glyphicon-duplicate'></span> Diff View!" +
                                    // "</button>"+
                                    // "<label class='checkbox'><input type='checkbox' class='panel-extend-checkbox toggleDifferenceView'>Toggle diff</label>" +
                                // "</div>"+
                                "<div class='col-md-6' style=''>" +
                                     "<div class='panel panel-default'>" +   
                                        "<div class='panel-heading'>" + "Reference" + "</div>" +
                                        "<div class='panel-body refCol'></div>" +
                                    "</div>"+
                                "</div>" + 
                                "<div class='col-md-6' style=''>" + 
                                    "<div class='panel panel-default'>" +   
                                        "<div class='panel-heading'>" + 
                                            "Current" + 
                                            "<label class='checkbox'>" + 
                                                "<input type='checkbox' class='panel-extend-checkbox toggleDifferenceView'>" + 
                                                    "Toggle diff" + 
                                            "</label>" +
                                        "</div>" +
                                        "<div class='panel-body currCol'></div>" +
                                    "</div>"+
                                "</div>" + 
                                "<div class=' col-md-4 col-lg-6 col-lg-offset-3' style='display: none'>" + 
                                    "<div class='panel panel-default'>" +   
                                        "<div class='panel-heading'>" + "Difference" + "</div>" +
                                        "<div class='panel-body diffCol'></div>" +
                                    "</div>"+
                                "</div>" + 
                            "</div>" +
                        "</div>";
        $(".extandable-tab-list-content").append(newInput);

        newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).parent().text() + "</a></li>";
        $(".extandable-tab-list-ref").append(newInput);

        var info = getConfigInfoFromName($('#' + id).attr('label'));
        var fileName = info.res;
        var emptyMap = info.map;

        var fileExt =  fileName.substr(fileName.lastIndexOf('.') + 1);

        addToComparisonView(currID, refPath, currPath, fileName, fileExt, emptyMap);

    } else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }
}

function addToComparisonView(id, rsrc, csrc, filename, ext, emptyMap) {

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
                                               <img class='imgRef' src='"   + refFinal  + "' style='width: 100%;'/>\
                                            </div>");

            $('#' + id + ' .currCol').html("<div class='imgContainer'>\
                                               <img class='imgCurr' src='" + currFinal + "' style='width: 100%;'/>\
                                            </div>");

            $('#' + id + " .diffCol").append("\
                                    <div style='height: 100%; overflow: hidden' class='imgContainer '>\
                                        <div class='imgDiffWrapper imgDiff' style='background-image: url(\"" + refFinal + "\"), url(\"" + currFinal + "\")'>\
                                            <div class='cleanRef ' style='background-image: url(\"" + emptyMap + "\")'></div>\
                                        </div>\
                                    </div>");
                                                                  
            attachWheelZoomListeners('#' + id);                                                 

        break;

        case "txt":
            $('#' + id + ' .refCol').html("<object data='"  + buildFileNameWithRunNr(refsrc, ext)  + "' />");
            $('#' + id + ' .currCol').html("<object data='" + buildFileNameWithRunNr(currsrc, ext) + "' />");
        break;

        case "log": 
            $('#' + id + ' .refCol').html("<object data='" + refsrc + "' />");
            $('#' + id + ' .currCol').html("<object data='" + currsrc + "' />");
        break;

        case "html":
            $.get(refsrc, function(html_string)
            {
              $('#' + id + ' .refCol').append("<div id='" + id + "Ref'><div style='overflow: hidden;'>" + html_string + "</div></div>");

              var fullPath = $("#refRunNumberInput").val();
              var thisSrc = $("#" + id + "Ref img").attr("src");

              $("#" + id + "Ref img").attr("src", fullPath + thisSrc).css("width", "100%").parent().addClass("imgRef");

              attachWheelZoomListeners('#' + id);

            },'html');    

            // $('#' + id + ' .refCol').append("<div id='" + id + "Ref' ><iframe src='" + refsrc + "' ></iframe></div>");
            $('#' + id + ' .currCol').append("<div id='" + id + "Curr' ><iframe id='myID' src='" + currsrc + "' ></iframe></div>");

            var iFr = $("#" + id + "Curr").find("iframe");
            // alert(iFr.contents().find("body").find("img").attr("src"));
            iFr.contents().find("body").css('overflow', 'hidden');

            // $("iframe").on("load", function () {
            //     console.log("iframe::load");

            //     $(this).css("width", $(this).contents().width());
            //     $(this).css("height", $(this).contents().height());
            //     console.log($(this).contents().width());

            //     parentID = $(this).parent().attr("id");

            //     $("#" + parentID).scroll(function(){
            //         var sl = $(this).scrollLeft();
            //         var st = $(this).scrollTop();

            //         console.log(st + " " + sl);

            //         $(this).parent().siblings("div").first().children("div").first().scrollLeft(sl).scrollTop(st);
            //     });
            // });
            
        break;

        default: 
            console.log("Unsupported filetype");
    }
}

function disableCheckboxes(name, disable) { 
    $('#' + name + ' :checkbox').each(function() {
        $(this).attr("disabled", disable);
    });
}

function buildFileNameWithRunNr(name, extension) { 
  var tmpnr = name.replace(/[^0-9]/g, '');
  var runnr = tmpnr.substr(tmpnr.length - 6);

  var tmp = name.split('.');
  var ret = tmp[0] + runnr + '.' + extension;// + tmp[1];

  return ret;
}


function attachWheelZoomListeners(sectionToLookIn) {

    var $section = $(sectionToLookIn);

    // ---------------- Helper Functions ----------------

    function assignTransform(section, master, slave) {
        var trans = $section.find(master).css("transform");
        $section.find(slave).css("transform", trans);
    }

    function setPanzoomParams(elem) {
        return $section.find(elem).panzoom({
            startTransform: 'scale(1)',
            maxScale: 10,
            minScale: 1,
            increment: 0.1,
            contain: 'automatic'
        });
    }

    function setPanzoomParams2(elem) {
        return $section.find(elem).panzoom({
            contain: 'automatic'
        });
    }

    function linkZoom(sec, pz, master, src, dst) {
      pz.parent().on('mousewheel.focal', function(e) {
          e.preventDefault();
          var delta = e.delta || e.originalEvent.wheelDelta;
          var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
          pz.panzoom('zoom', zoomOut, {
              animate: false,
              focal: e
          });

        assignTransform(sec, src, dst);
      });
      sec.find(master).parent().on("mouseup pointerup",function(e) {
          assignTransform(sec, src, dst);
      });
    }

    // ---------------- Start doing stuff here ----------------

    var $panzoom = setPanzoomParams('.imgRef');
    linkZoom($section, $panzoom,'.imgRef' , ".refCol .imgRef", ".currCol .imgCurr");
    linkZoom($section, $panzoom,'.imgRef' , ".refCol .imgRef", ".diffCol .imgDiff");

    var $panzoom2 = setPanzoomParams('.imgCurr');
    linkZoom($section, $panzoom2,'.imgCurr', ".currCol .imgCurr", ".refCol .imgRef");
    linkZoom($section, $panzoom2,'.imgCurr', ".currCol .imgCurr", ".diffCol .imgDiff");
}


function loadCheckboxes() {
    var checkboxID = 0;
    var row = 0;
    for (var group in mapDescriptions) {
        if (mapDescriptions.hasOwnProperty(group)) {

            var newPanelObject = "<div class='panel panel-default' style='margin-top:0'>" +
                "     <a data-toggle='collapse' data-parent='#checkboxAccordion' href='#listCollapse" + row + "'>" +
                "       <button class='btn btn-default' style='width: 100%;text-align:left;'>" +
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

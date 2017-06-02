function AddRmTkMapPanel(id, isChecked, refPath, currPath) {

    var currID = "inputCheckBoxPanel" + id;

    if (isChecked == true) {
        var newInput = "<div id='" + currID + "' class='tab-pane fade extandable-tab-list-element' style=''>" + 
                            "<div class='row'>" +
                                "<div class='refCol col-md-6' style=''>" +
                                "</div>" + 
                                "<div class='currCol col-md-6' style=''>" + 
                                "</div>" + 
                            "</div>" + 
                        "</div>";
        $(".extandable-tab-list-content").append(newInput);

        newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).parent().text() + "</a></li>";
        $(".extandable-tab-list-ref").append(newInput);

        var fileName = ($('#' + id).attr('res'));
        var fileExt =  fileName.substr(fileName.lastIndexOf('.') + 1);

        addToComparisonView(currID, refPath, currPath, fileName, fileExt);

        $("#" + currID + "lnk").on("click", function(){
            // if (fileExt == "png") attachWheelZoomListeners(currID);
            // else $("#" + currID + " iframe").trigger("load");
            // $("#" + currID + " iframe").trigger("load");
            // $("#link-me").click();
        });
    } else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }
}

function addToComparisonView(id, rsrc, csrc, filename, ext) {

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

            $('#' + id + ' .refCol').html("<div class='imgContainer'><img class='imgRef' src='"   + refFinal  + "' style='width: 100%;'/></div>");
            $('#' + id + ' .currCol').html("<div class='imgContainer'><img class='imgCurr' src='" + currFinal + "' style='width: 100%;'/></div>");

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
            $('#' + id + ' .refCol').append("<div id='" + id + "Ref' ><iframe src='" + refsrc + "' ></iframe></div>");
            $('#' + id + ' .currCol').append("<div id='" + id + "Curr' ><iframe src='" + currsrc + "' ></iframe></div>");

            $("iframe").on("load", function () {
                console.log("iframe::load");

                $(this).css("width", $(this).contents().width());
                $(this).css("height", $(this).contents().height());
                console.log($(this).contents().width());

                parentID = $(this).parent().attr("id");

                $("#" + parentID).scroll(function(){
                    var sl = $(this).scrollLeft();
                    var st = $(this).scrollTop();

                    console.log(st + " " + sl);

                    $(this).parent().siblings("div").first().children("div").first().scrollLeft(sl).scrollTop(st);
                });
            });
            
        break;

        default: 
            console.log("Unsupported filetype");
    }
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
                var elem_res = mapDescriptions[group][elem].resource;
                newInput += "<label class='checkbox'><input type='checkbox' res='" + elem_res + "' id='" + checkboxID + "' class='panel-extend-checkbox'>" + elem_name + "</label>";
                checkboxID++;
            }
            $("#checkboxList" + row).html(newInput);
            ++row;
        }
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

    function assignTransform(section, master, slave) {
        console.log(master + " : " + slave);
        var trans = $section.find(master).css("transform");
        $section.find(slave).css("transform", trans);
    }

    ///////////////////////////////////// REF

    var $panzoom = $section.find('.imgRef').panzoom({
        startTransform: 'scale(1)',
        maxScale: 10,
        minScale: 1,
        increment: 0.1,
        contain: 'automatic'

    });
    $panzoom.parent().on('mousewheel.focal', function(e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom.panzoom('zoom', zoomOut, {
            animate: false,
            focal: e
        });

        assignTransform($section, ".refCol .imgRef", ".currCol .imgCurr");

    });
    $section.find('.imgRef').parent().on("mouseup pointerup",function(e) {
        console.log("mouseup");
        assignTransform($section, ".refCol .imgRef", ".currCol .imgCurr");
    });

    //////////////////////////////// CURR

    var $panzoom2 = $section.find('.imgCurr').panzoom({
        startTransform: 'scale(1)',
        maxScale: 10,
        minScale: 1,
        increment: 0.1,
        contain: 'automatic'
    });
    $panzoom2.parent().on('mousewheel.focal', function(e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom2.panzoom('zoom', zoomOut, {
            animate: false,
            focal: e
        });

        assignTransform($section, ".currCol .imgCurr", ".refCol .imgRef");

    });
    $section.find('.imgCurr').parent().on("mouseup, pointerup", function(e) {
        console.log("mouseup");
        assignTransform($section, ".currCol .imgCurr", ".refCol .imgRef");
    });
}
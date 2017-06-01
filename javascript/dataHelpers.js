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

        // getFileNameFromResource();
     
        var fileExt =  fileName.substr(fileName.lastIndexOf('.') + 1);

                                                        //FIXME
                // In data.js the textfiles DO NOT HAVE THE ENDING .txt anymore becaues
                // the files have a name dependant on their run number.
                // THEREFORE data.js contains RESNAME_run
                // which is then appended by the current number.txt to get the correct filename
                // THIS IS THE REASON ''
        addToComparisonView(currID, refPath + fileName, currPath + fileName, fileExt);
    } else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }

    // FIXME put in one place
    $('.pannable-image').ImageViewer({snapView: false,
                                     maxZoom: 400,
                                     refreshOnResize : false});
    // $('.pannable-image').ImageViewer({maxZoom: 10000});
}

function addToComparisonView(id, refsrc, currsrc, ext) {
    switch(ext){
        case "png":
            console.log("png");
            $('#' + id + ' .refCol').html("<img src='" + refsrc + "' style='width: 100%;' class='pannable-image'/>");
            $('#' + id + ' .currCol').html("<img src='" + currsrc + "' style='width: 100%;' class='pannable-image'/>");
        break;

        case "txt":
            console.log("reference:" + refsrc);
            console.log("current:  " + currsrc);
            console.log();

            // TODO think of some better way to do this pile of shit
            // worstcase : extract method
            var tmpnr = refsrc.replace(/[^0-9]/g, '');
            var runnrRef = tmpnr.substr(tmpnr.length - 6);
            
            var tmp = refsrc.split('.');
            var realnameRef = tmp[0] + runnrRef + '.' + tmp[1];
            /// ....... 
            tmpnr = currsrc.replace(/[^0-9]/g, '');
            var runnrCurr = tmpnr.substr(tmpnr.length - 6);
            
            tmp = currsrc.split('.');
            var realnameCurr = tmp[0] + runnrCurr + '.' + tmp[1];

            $('#' + id + ' .refCol').html("<object data=" + realnameRef + " style='width: 100%; height: 100%;'/>");
            $('#' + id + ' .currCol').html("<object data=" + realnameCurr + " style='width: 100%; height: 100%;'/>");
            console.log("txt");
        break;

        case "log": 
            $('#' + id + ' .refCol').html("<object data=" + refsrc + " style='width: 100%; height: 100%;'/>");
            $('#' + id + ' .currCol').html("<object data=" + currsrc + " style='width: 100%; height: 100%;'/>");
        break;

        case "html":
            $('#' + id + ' .refCol').append("<div id='" + id + "Ref' style='max-width:100%; max-height: 500px; overflow: scroll'><iframe src='" + refsrc + "' ></iframe></div>");
            $('#' + id + ' .currCol').append("<div id='" + id + "Curr' style='max-width:100%; max-height: 500px; overflow: scroll'><iframe src='" + currsrc + "' ></iframe></div>");

            $("iframe").on("load", function () {
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



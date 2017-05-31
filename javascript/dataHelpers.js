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

        var file_name = ($('#' + id).attr('res'));
        
        addToComparisonView(currID, refPath+file_name, currPath+file_name, ".png");
    } else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }

    // FIXME put in one place
    // $('.pannable-image').ImageViewer({snapView: false,
    //                                  maxZoom: 400,
    //                                  refreshOnResize : false});
    $('.pannable-image').ImageViewer({maxZoom: 10000});
}

function addToComparisonView(id, refsrc, currsrc, ext) {
    switch(ext){
        case ".png":
            // $('#' + id + ' .refCol').html("<img src='" + refsrc + "' data-high-res-src='" + refsrc + "' style='width: 100%;' class='pannable-image'/>");
            // $('#' + id + ' .currCol').html("<img src='" + currsrc + "' data-high-res-src='" + currsrc + "' style='width: 100%;' class='pannable-image'/>");

            $('#' + id + ' .refCol').html("<img src='" + refsrc + "' style='width: 100%;' class='pannable-image'/>");
            $('#' + id + ' .currCol').html("<img src='" + currsrc + "' style='width: 100%;' class='pannable-image'/>");
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



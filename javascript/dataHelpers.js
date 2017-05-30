function AddRmTkMapPanel(id, isChecked){
    console.log(referencePath);

    var currID = "inputCheckBoxPanel" + id;
    console.log(id + " : " + isChecked);

    if (isChecked == true) {
        var newInput = "<div id='" + currID + "' class='tab-pane fade extandable-tab-list-element'>" + currID + "</div>";
        $(".extandable-tab-list-content").append(newInput);
        
        newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + $('#' + id).parent().text() + "</a></li>";
        $(".extandable-tab-list-ref").append(newInput);


        var pre_tag = '<img id="theImg" width="50%" height="50%" src=';
        var src_tag = referencePath;
        // var file_name ="QTestAlarm.png";
        var file_name ="fedmap.html";

        var end_tag = ' />'; 
        whole = pre_tag + src_tag + file_name + end_tag;

        $('#inputCheckBoxPanel' + id).html('<object data=' + referencePath+file_name + '/>');

    } 
    else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }
}

function loadCheckboxes() {
    // var checkboxID = 0;
    // for (row = 0; row < mapDescriptions.length; row++) {

    //     var newPanelObject = "<div class='panel panel-default' style='margin-top:0'>" +
    //                          "     <a data-toggle='collapse' data-parent='#checkboxAccordion' href='#listCollapse" + row + "'>" +
    //                          "       <button class='btn btn-default' style='width: 100%;text-align:left;'>" +
    //                          "         <span class='glyphicon glyphicon-menu-right'></span> " + mapDescriptions[row][0] +
    //                          "       </button>" +
    //                          "     </a>" +

    //                          "     <div class='panel-collapse collapse' id='listCollapse" + row + "'>" +
    //                          "       <div class='panel-body'>" +
    //                          "         <div class='row'>" +
    //                          "           <div class='col-md-offset-1 col-md-11' id='checkboxList" + row + "'></div> " +
    //                          "         </div>" +
    //                          "      </div>" +
    //                          "     </div>" +
    //                          "  </div>";

    //     $("#checkboxAccordion").append(newPanelObject);

    //     var newInput = "";
    //     for (col = 0; col < mapDescriptions[row][1].length; col++) {
    //         newInput += "<label class='checkbox'><input type='checkbox' data='" +  + "' id='" + checkboxID + "' class='panel-extend-checkbox'>" + mapDescriptions[row][1][col] + "</label>";
    //         checkboxID++;
    //     }
    //     $("#checkboxList" + row).html(newInput);
    // }


    var checkboxID = 0;
    var row = 0;
    for (var group in mapDescriptions) {
        if (mapDescriptions.hasOwnProperty(group)) {
            console.log(group);

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
                console.log('   ' + elem_name + '\t  (' + elem_res  + ')');
                newInput += "<label class='checkbox'><input type='checkbox' res='" + elem_res + "' id='" + checkboxID + "' class='panel-extend-checkbox'>" + elem_name + "</label>";
                checkboxID++;
            }
            $("#checkboxList" + row).html(newInput);


            ++row;
        }
    }
}
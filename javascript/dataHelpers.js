$('#refStream, #currStream').change(function() {
    // LOAD APPROPRIATE DATA INTO TABS IF THEY ARE VALID
});

function AddRmTkMapPanel(id, isChecked){

    var currID = "inputCheckBoxPanel" + id;
    console.log(id + " : " + isChecked);

    if (isChecked == true) {
        var newInput = "<div id='" + currID + "' class='tab-pane fade extandable-tab-list-element'>" + currID + "</div>";
        // $(newInput).insertAfter($(".extandable-tab-list-element").last());
        $(".extandable-tab-list-content").append(newInput);
        
        newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + currID + "</a></li>";
        $(".extandable-tab-list-ref").append(newInput);
    } 
    else {
        $("#" + currID).remove();
        $("#" + currID + "lnk").remove();
    }
}

function DecodeRunNumberFromString(inputStr) {
    if (inputStr.length == 6) {
        var result = 0;
        for (i = 0; i < 6; i++) {
            var cr = parseInt(inputStr[i]);
            if (isNaN(cr)) {
                return 0
            }
            result += cr;
            if (i != 5) result *= 10;
        }
        return result;
    }
    return 0;
}

function GetDataDirectory(runNum) {
    if (runNum >= 290124) return "Data2017/";
    else if (runNum >= 264370) return "Data2016/";
    else if (runNum >= 233235) return "Data2015/";
    else if (runNum >= 209685) return "Data2013/";

    else return "Data2012/";
}

function PasteOptions(dir, id) {
    $.get(dir, function(data) {
        var newData = $(data).find("td > a");

        for (i = 1; i < newData.length; i++) {
            $(id).append("<option value='" + dir + $(newData[i]).attr("href") + "'>" + $(newData[i]).attr("href") + " </option>")
        }
        $(id).change();
    });
}

function loadCheckboxes() {
    var checkboxID = 0;
    for (row = 0; row < mapDescriptions.length; row++) {

        var newPanelObject = "<div class='panel panel-default' style='margin-top:0'>" +
                             "     <a data-toggle='collapse' data-parent='#checkboxAccordion' href='#listCollapse" + row + "'>" +
                             "       <button class='btn btn-default' style='width: 100%;text-align:left;'>" +
                             "         <span class='glyphicon glyphicon-menu-right'></span> " + mapDescriptions[row][0] +
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

        var newInput = "";
        for (col = 0; col < mapDescriptions[row][1].length; col++) {
            newInput += "<label class='checkbox'><input type='checkbox' value='' id='" + checkboxID + "' class='panel-extend-checkbox'>" + mapDescriptions[row][1][col] + "</label>";
            checkboxID++;
        }
        $("#checkboxList" + row).html(newInput);
    }
}


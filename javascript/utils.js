// some resource files contain the current run number in their filenamestring.
// it is therefore impossible to hardcode the resource location for some.
// I.e. "Dead ROCS": res:PixZeroOccROCs_run.txt => PixZeroOccROCs_runXXXXXX.txt
// where XXXXXX is the 6 digit run number
function getRunNumberFromString(path) {
    var tmpnr = path.replace(/[^0-9]/g, '');
    var runnr = tmpnr.substr(tmpnr.length - 6);
    return runnr;
}

// return the the adjacent run (since the numbering is not strictly continuous)
// where direction refers to either previous or next run (-1/+1)
function getNeighbourRun(id, direction) {
    var path = $('#' + id).val();
    if (path.length == 0) return;
    var curr_run_str = getRunNumberFromString(path);
    $.post('php/loadNeighbourRun.php', { dir : path, startRunNumber : curr_run_str, direction : direction },
        function(data) {
            $('#' + id).val(data);
            reloadCheckedTabs();
        });
}

// take the data from 'mapDescriptions' (data.js) and populate checkboxes
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

// return info object containing 'mapDescriptions' in a nice format
// obj.name <==> label string of checkboxList
// obj.res  <==> resource to be loaded ( filename )
// obj.map  <==> for png images the empty template ( see 'img/')
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

function disableCheckboxes(name, disable) {
    $('#' + name + ' :checkbox').each(function() {
        $(this).attr("disabled", disable);
    });
}

function reloadCheckedTabs(){
    var activeTabID = $('.extandable-tab-list-ref .active > a').prop('id');
    $("#checkboxAccordion input:checked").each(function() {
        var id = $(this).attr("id");
        var refPath = $('#refRunPath').val();
        var currPath = $('#currRunPath').val();
        PanelBuilder.addRmTkMapPanel(id, false, refPath, currPath);
        PanelBuilder.addRmTkMapPanel(id, true, refPath, currPath);
    });
    $('#' + activeTabID).click();
}

// allows for proper difference view scaling
$(window).resize(function() {
    var objs = $(".toggleDifferenceView");
    for (i = 0; i < objs.length; ++i) {
        var refCol = $(objs[i]).closest(".panel").closest(".row").find(".refCol");
        $(objs[i]).closest(".panel").find(".diffCol").css("height", refCol.height());
    }
});

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

function loadCheckboxes() {
    var groupID = 0;
    var detID = 0;
    var checkboxID = 0;
    for (var detector in mapDescriptions) {

        console.log("  " + detector);
        var detPanel =  buildCheckboxPanel("det" + detID, detector);
        $("#checkboxPlaceholder").append(detPanel);

        for (var group in mapDescriptions[detector]) {

            console.log("   " + group);
            var groupPanel = buildCheckboxPanelSub("group" + groupID, group);
            $("#det" + detID).append(groupPanel);


            for (var elem in mapDescriptions[detector][group]) {
                var elem_name = mapDescriptions[detector][group][elem].name;
                console.log("        " + elem_name);
                var elemPanel = "<div class='panel-title checkbox small'>" +
                                "<label><input type='checkbox' id='checkbox" + checkboxID + "' label='"+ elem_name +"' class='panel-extend-checkbox'>" +
                                 elem_name + 
                                 "</label>" +
                                 "</div>";

                $("#group" + groupID).append(elemPanel);
                checkboxID++;
            }
            groupID++;
        }
        detID++;
    }
}

function getConfigInfoFromName(name) {
    console.log(name);
    for (var detector in mapDescriptions) {
        for (var group in mapDescriptions[detector]) {
            for (var elem in mapDescriptions[detector][group]) {
                var e = mapDescriptions[detector][group][elem];

                if(name === e['name']) {
                    console.log(elem);
                    var obj = new Object();
                    obj.name = e['name'];
                    obj.res  = e['resource'];
                    obj.map  = e['emptyMap'];

                    return obj;
                }
            }
        }
    }
}

function buildCheckboxPanel(id, displayname) { 
    return "<div class='panel-group'>" +
                "<div class='panel panel-primary'>" +
                    "<div class='panel-heading'>" +
                    "<h4 class='panel-title'>" +
                    "<a data-toggle='collapse' href='#"+id+"'>"+displayname+"</a>" +
                    "</h4>" +
                    "</div>" +
                    "<div id='" + id + "' class='panel-collapse collapse'>" +

                    "</div>" +
                "</div>" +
            "</div>";
}

function buildCheckboxPanelSub(id, displayname) { 
    return "<div class='panel-group'>" +
                "<div class='panel panel-default'>" +
                    "<div class='panel-heading'>" +
                    "<h4 class='panel-title'>" +
                    "<a data-toggle='collapse' href='#"+id+"'>"+displayname+"</a>" +
                    "</h4>" +
                    "</div>" +
                    "<div id='" + id + "' class='panel-collapse collapse'>" +

                    "</div>" +
                "</div>" +
            "</div>";
}

function disableCheckboxes(name, disable) {
    $('#' + name + ' :checkbox').each(function() {
        $(this).attr("disabled", disable);
    });
}

function reloadCheckedTabs(){
    var count = 0;
    var activeTabID = $('.extandable-tab-list-ref .active > a').prop('id');
    $("#checkboxPlaceholder input:checked").each(function() {
        console.log(count++);
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

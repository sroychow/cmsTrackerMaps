function Loader() {
    this.mapDescriptions;
}

// TODO: mapdescriptions in data.js as json, and load here
// also make this Loader into a singleton so theres
// not more than once instance of mapdescrit flying around
Loader.prototype.loadData = function() {
    this.mapDescriptions = mapDescriptions;
    // console.log(this.mapDescriptions);
};

Loader.prototype.loadCheckboxes = function() {
    var groupID = 0;
    var detID = 0;
    var checkboxID = 0;
    for (var detector in this.mapDescriptions) {
        var detPanel =  buildCheckboxPanel("det" + detID, detector);
        $("#checkboxPlaceholder").append(detPanel);

        for (var group in this.mapDescriptions[detector]) {
            var groupPanel = buildCheckboxPanelSub("group" + groupID, group);
            $("#det" + detID).append(groupPanel);

            for (var elem in this.mapDescriptions[detector][group]) {
                var elem_name = this.mapDescriptions[detector][group][elem].name;
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
};

// return the the adjacent run (since the numbering is not strictly continuous)
// where direction refers to either previous or next run (-1/+1)
Loader.prototype.loadNeighbourRun = function(id, direction) {
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
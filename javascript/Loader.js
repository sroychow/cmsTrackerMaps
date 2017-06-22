function Loader() {
    this.mapDescriptions;
}

// TODO: mapdescriptions in data.js as json, and load here
// also make this Loader into a singleton so theres
// not more than once instance of mapdescrit flying around
Loader.prototype.loadData = function() {
    this.mapDescriptions = mapDescriptions;
    console.log(this.mapDescriptions);
};

Loader.prototype.loadCheckboxes = function() {
    var groupID = 0;
    var detID = 0;
    var checkboxID = 0;
    for (var detector in this.mapDescriptions) {

        console.log("  " + detector);
        var detPanel =  buildCheckboxPanel("det" + detID, detector);
        $("#checkboxPlaceholder").append(detPanel);

        for (var group in this.mapDescriptions[detector]) {

            console.log("   " + group);
            var groupPanel = buildCheckboxPanelSub("group" + groupID, group);
            $("#det" + detID).append(groupPanel);

            for (var elem in this.mapDescriptions[detector][group]) {
                var elem_name = this.mapDescriptions[detector][group][elem].name;
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
};
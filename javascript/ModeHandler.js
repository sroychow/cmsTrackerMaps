function ModeHandler() {
	this.mode='compare';
}


ModeHandler.prototype.getMode = function() {
	return this.mode;
};

ModeHandler.prototype.changeMode = function(m) {
    console.log("You are changing to mode:" + m);

    var checkBoxes = encodeCheckboxes("checkboxPlaceholder");
	var mapSelect = encodeSelectedMap();
    var srcStr = "start?" + checkBoxes + mapSelect;

	clearCheckboxselection();

	this.mode=m;

	switch(m) {
        case "compare":
            $('#refRunPath').attr("placeholder", "REFERENCE");
            $('#currRunPath').attr("placeholder", "CURRENT");
            break;
        case "timeline":
            $('#refRunPath').attr("placeholder", "FROM");
            $('#currRunPath').attr("placeholder", "TO");
            break;
        default:
            alert("mode not implemented");
    }

    decodeCheckboxes(srcStr);
    decodeSelectedMap(srcStr);
};
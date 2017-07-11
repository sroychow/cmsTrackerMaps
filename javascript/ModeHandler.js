function ModeHandler() {
	this.mode='compare';
}


ModeHandler.prototype.getMode = function() {
	return this.mode;
};

ModeHandler.prototype.changeMode = function(m) {
    console.log("You are changing to mode:" + m);

	// save checkboxes and strings from the old mode
	// use parts of the encode function to generate the string

    var checkBoxes = encodeCheckboxes("checkboxPlaceholder");
	var mapSelect = encodeSelectedMap();
    var srcStr = "start?" + checkBoxes + mapSelect;

	// clear checkboxes
	clearCheckboxselection();

	//recheck them after settings mode=timeline;
	// use parts of the decode function to get view from string

	this.mode=m;

	switch(m) {
        case "compare":
            $('#refRunPath').attr("placeholder", "REFERENCE");
            $('#currRunPath').attr("placeholder", "CURRENT");
            // this.enableAllCheckboxes();
            break;
        case "timeline":
            $('#refRunPath').attr("placeholder", "FROM");
            $('#currRunPath').attr("placeholder", "TO");
            // this.disableCheckboxesFromExt('txt');
            // this.disableCheckboxesFromExt('log');
            // this.disableCheckboxesFromExt('out');
            break;
        default:
            alert("mode not implemented");
    }

	this.tmpDecode(srcStr);
	$('#' + this.getStringParameter(srcStr, "mapSelect")).click();
};

/* UNUSED
// disables checkboxes that have @param ext as file extension 
ModeHandler.prototype.disableCheckboxesFromExt = function(ext) {
    var checkboxID = 0;
    for(var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {

                //find the extension from filename
                // console.log("IM ALIVE, filtering out " + ext);
                var srcext = getExtensionFromFilename(Loader.mapDescriptions[detector][group][elem]['resource']);
                if(srcext === ext){
                    $('#checkbox' + checkboxID).attr('disabled', true);
                }

                ++checkboxID;
            }
        }
    }
};

ModeHandler.prototype.enableAllCheckboxes = function() {
    var checkboxID = 0;
    for(var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {
                $('#checkbox' + checkboxID).attr('disabled', false);
                ++checkboxID;
            }
        }
    }
};*/

// copy pasta from Loader with slight modifications
// TODO: make one function out of this and Loader::decodeCheckboxes
ModeHandler.prototype.tmpDecode = function(src) {
    var checkboxID = 0;
    for(var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {
                if(this.getStringParameter(src, "checkbox" + checkboxID) === "true") {
                    $('#checkbox' + checkboxID).click();
                }
                ++checkboxID;
            }
        }
    }
}

// copy pasta from Loader with slight modifications
// TODO: make one function out of this and Loader::getUrlParameter
ModeHandler.prototype.getStringParameter = function(src, sParam) {
    var sPageURL = src,
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

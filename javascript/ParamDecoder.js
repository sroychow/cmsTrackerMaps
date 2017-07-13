function decodeOptions(src) {
    decodeMode(src);
    decodeTextfield(src, "refRunPath");
    decodeTextfield(src, "currRunPath");
    decodeCheckboxes(src);
    decodeSelectedMap(src);
}

function decodeCheckboxes(src) {
    var checkboxID = 0;
    for(var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {
                if(getParameterFromString(src, "checkbox" + checkboxID) === "true") {
                    $('#checkbox' + checkboxID).click();
                }
                ++checkboxID;
            }
        }
    }
}

function decodeTextfield(src, name) {
    var txt = getParameterFromString(src, name);
    $('#' + name).val(txt);
    $('#' + name).trigger('change');
}

function decodeSelectedMap(src) {
    $('#' + getParameterFromString(src, "mapSelect")).click();
}

function decodeMode(src) {
    var mode =  getParameterFromString(src, "mode");

    switch(mode) {
        case "compare":
            $('#compare-mode-btn').click();
            break;
        case "timeline":
            $('#timeline-mode-btn').click();
            break;

        default:
            console.log("Trying to load unknown mode; switching to default(compare mode)");
            $('#compare-mode-btn').click();
    }
}

function decodeOptions() {
    this.decodeMode();
    var refPath = this.decodeTextfield("refRunPath");
    var currPath = this.decodeTextfield("currRunPath");
    this.decodeCheckboxes();
    this.decodeSelectedMap();
}

function decodeCheckboxes() {
    var checkboxID = 0;
    for(var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {
                if(this.getUrlParameter("checkbox" + checkboxID) === "true") {
                    $('#checkbox' + checkboxID).click();
                }
                ++checkboxID;
            }
        }
    }
}

function decodeTextfield(name) {
    var txt = this.getUrlParameter(name);
    $('#' + name).val(txt);
    $('#' + name).trigger('change');
    return txt;
}

function decodeSelectedMap() {
    $('#' + this.getUrlParameter("mapSelect")).click();
}

function decodeMode() {
    console.log('#' + this.getUrlParameter("mode") + "-mode-btn");
    $('#' + this.getUrlParameter("mode") + "-mode-btn").click();
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
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

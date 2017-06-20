class ParamDecoder {   
    static decodeOptions() {
        var refPath = this.decodeTextfield("refRunPath");
        var currPath = this.decodeTextfield("currRunPath");
        this.decodeCheckboxes(refPath, currPath);
        this.decodeSelectedMap();
    }

    static decodeCheckboxes(refPath, currPath) {
        var checkboxID = 0;
        for (var group in mapDescriptions) {
            for (var elem in mapDescriptions[group]) {
                var val = this.getUrlParameter("checkbox" + checkboxID) === "true";
                PanelBuilder.addRmTkMapPanel(checkboxID, val, refPath, currPath); // TODO: this needs to be a singleton GUI ELEMENT BUILDER or smth
                $('#' + checkboxID).attr('checked', val);
                ++checkboxID;
            }
        }
    }

    static decodeTextfield(name) {
        var txt = this.getUrlParameter(name);
        $('#' + name).val(txt);
        $('#' + name).trigger('change');
        return txt;
    }

    static decodeSelectedMap() {
        $('#' + this.getUrlParameter("mapSelect")).click();
    }

    static getUrlParameter(sParam) {
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
    };
}
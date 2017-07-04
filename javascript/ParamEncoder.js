function encodeOptions() {
    var ret = "?link=true";
    ret += this.encodeMode();
    ret += this.encodeCheckboxes("checkboxPlaceholder");
    ret += this.encodeTextfield("refRunPath");
    ret += this.encodeTextfield("currRunPath");
    ret += this.encodeSelectedMap();
    return ret;
}

function encodeCheckboxes (name) {
    var ret = "";
    $('#' + name + ' :checkbox').each(function() {
        if($(this).prop('checked')) {
            ret += "&";
            ret += $(this).prop('id');
            ret += "=";
            ret += $(this).prop('checked');
        }
    });
    return ret;
}

function encodeTextfield (name) {
    var ret = "&" + name + "=";
    ret += $('#' + name).val();
    return ret;
}

function encodeSelectedMap () {
    var ret = "&mapSelect=";
    ret += $('.extandable-tab-list-ref .active > a').prop('id');
    return ret;
}


function encodeMode() {
    var ret = "&mode=";
    ret += global_mode;
    return ret;
}

// -------------- Overview -----------
function encodeOptions() {
    var ret = "?link=true";
    ret += encodeCheckboxes("checkboxAccordion");
    ret += encodeTextfield("refRunNumberInput");
    ret += encodeTextfield("currRunNumberInput");
    ret += encodeSelectedMap();
    return ret;
}

function decodeOptions() {

    var refPath = decodeTextfield("refRunNumberInput");
    var currPath = decodeTextfield("currRunNumberInput");

    decodeCheckboxes(refPath, currPath);

    decodeSelectedMap();    
}

// -------------- Checkbox --------------
function encodeCheckboxes(name) {
    var ret = "";
    $('#' + name + ' :checkbox').each(function() {
        ret += "&checkbox";
        ret += $(this).prop('id');
        ret += "=";
        ret += $(this).prop('checked');
    });
    return ret;
}

function decodeCheckboxes(refPath, currPath) {
    var checkboxID = 0;
    for (var group in mapDescriptions) {
        for (var elem in mapDescriptions[group]) {
            var val = getUrlParameter("checkbox" + checkboxID) === "true";
            AddRmTkMapPanel(checkboxID, val, refPath, currPath);   
            $('#' + checkboxID).attr('checked', val);
            ++checkboxID;
        }
    }
}

// -------------- Textfield --------------
function encodeTextfield(name) {
    var ret = "&" + name + "=";
    ret += $('#' + name).val();
    return ret;
}

function decodeTextfield(name) {
    var txt = getUrlParameter(name);
    $('#' + name).val(txt);
    $('#' + name).trigger('change');

    return txt;
}

// -------------- Selected Map --------------
function encodeSelectedMap() {
    var ret = "&mapSelect=";
    ret += $('.extandable-tab-list-ref .active > a').prop('id');
    return ret;
}

function decodeSelectedMap() {
    $('#' + getUrlParameter("mapSelect")).click();
}

// ---------- HELPER ----------
var getUrlParameter = function getUrlParameter(sParam) {
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
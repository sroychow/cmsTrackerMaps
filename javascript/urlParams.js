// -------------- Overview --------------
function encodeOptions() {
    var ret = "?link=true";
    // ret += encodeCheckboxes("checkboxAccordion");
    ret += encodeTextfield("refRunNumberInput");
    // ret += encodeSelectedMap();
    return ret;
}

function decodeOptions() {
    // decodeCheckbox();
    decodeTextfield("refRunNumberInput");
    // decodeSelectedMap();    
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

function decodeCheckbox() {
    var checkboxID = 0;
    for (i = 0; i < mapDescriptions.length; ++i) {
        for (j = 0; j < mapDescriptions[i][1].length; ++j) {
            var val = getUrlParameter("checkbox" + checkboxID) === "true";
            AddRmTkMapPanel(checkboxID, val);   
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
    $('#' + name).val(getUrlParameter(name));
    $('#' + name).trigger('change');
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
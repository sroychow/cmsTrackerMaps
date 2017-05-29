// -------------- Overview --------------
function encodeOptions() {
    var ret = "?link=true";

    for(i=0; i<mapDescriptions.length; ++i) {
        ret += encodeCheckbox("checkboxList"+i);
    }

    ret += encodeTextfield("refRunNumberInput");

    ret += encodeDropdown("refRunType");

    // ret += encodeSelectedMap();
    // encodeSelectedMap();

    return ret;
}

function decodeOptions() {
    for (i = 0; i < mapDescriptions.length; ++i) {
        decodeCheckbox("checkboxList" + i);
        decodeMapTabs("checkboxList" + i);
    }

    decodeTextfield("refRunNumberInput");

    decodeDropdown("refRunType");
    

     drawTkMapSelection();
}

// -------------- Checkbox --------------
function encodeCheckbox(name) {
    var ret = "";
    console.log(name);
    $('#' + name + ' :checkbox').each(function() {
        ret += "&checkbox";
        ret += $(this).prop('id');
        ret += "=";
        ret += $(this).prop('checked');
    });

    return ret;
}

function decodeCheckbox(name) {
    $('#' + name + ' :checkbox').each(function() {
        var prefix = "checkbox";
        var id = $(this).prop('id');
        var val = getUrlParameter(prefix + id) === "true";
        $('#' + id).prop('checked', val);
    });
}

function decodeMapTabs(name) {
       $('#' + name + ' :checkbox').each(function() {
        var prefix = "checkbox";
        var id = $(this).prop('id');
        var val = getUrlParameter(prefix + id) === "true";
        console.log(prefix + ' ' +  id + ' : ' + val);
        // create link
        drawTkMapSelection();
    }); 
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

// -------------- Dropdown --------------
function encodeDropdown(name) {
    var ret = "&" + name + "=";
    ret += $('#' + name + ' option:selected').index();
    return ret;
}

function decodeDropdown(name) {
    alert(name + '\n' +
        'Current: ' + $('#name' + ' option:selected').index() + '\n' +
        'New: ' + getUrlParameter(name));

    $('#' + name).prop('selectedIndex', getUrlParameter(name));
    $('#' + name).trigger('change');
}


// -------------- Selected Map --------------
function encodeSelectedMap() {
    //TODO
}

function decodeSelectedMap() {
    $("a#home").click();
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
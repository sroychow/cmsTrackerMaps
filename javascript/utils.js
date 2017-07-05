// some resource files contain the current run number in their filenamestring.
// it is therefore impossible to hardcode the resource location for some.
// I.e. "Dead ROCS": res:PixZeroOccROCs_run.txt => PixZeroOccROCs_runXXXXXX.txt
// where XXXXXX is the 6 digit run number
function getRunNumberFromString(path) {
    var tmpnr = path.replace(/[^0-9]/g, '');
    var runnr = tmpnr.substr(tmpnr.length - 6);
    return runnr;
}

function buildFileNameWithRunNr(name, extension) {
  var runnr = getRunNumberFromString(name);
  var tmp = name.split('.');
  var ret = tmp[0] + runnr + '.' + extension;// + tmp[1];
  return ret;
}

function getConfigInfoFromName(name) {
    for (var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {
                var e = Loader.mapDescriptions[detector][group][elem];

                if(name === e['name']) {
                    var obj = new Object();
                    obj.name = e['name'];
                    obj.res  = e['resource'];
                    obj.map  = e['emptyMap'];

                    return obj;
                }
            }
        }
    }
}

function getExtensionFromFilename(filename) { 
    return filename.substr(filename.lastIndexOf('.') + 1);
}

// allows for proper difference view scaling
$(window).resize(function() {
    var objs = $(".toggleDifferenceView");
    for (i = 0; i < objs.length; ++i) {
        var refCol = $(objs[i]).closest(".panel").closest(".row").find(".refCol");
        $(objs[i]).closest(".panel").find(".diffCol").css("height", refCol.height());
    }
});


function clearCheckboxselection() {
    var checkboxID = 0;
    for(var detector in Loader.mapDescriptions) {
        for (var group in Loader.mapDescriptions[detector]) {
            for (var elem in Loader.mapDescriptions[detector][group]) {
                var isChecked = $('#checkbox' + checkboxID).is(':checked');
                if(isChecked) {
                    $('#checkbox' + checkboxID).click();
                }
                ++checkboxID;
            }
        }
    }
}
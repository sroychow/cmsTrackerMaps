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
    console.log(name);
    for (var detector in mapDescriptions) {
        for (var group in mapDescriptions[detector]) {
            for (var elem in mapDescriptions[detector][group]) {
                var e = mapDescriptions[detector][group][elem];

                if(name === e['name']) {
                    console.log(elem);
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

function reloadCheckedTabs(){
    var count = 0;
    var activeTabID = $('.extandable-tab-list-ref .active > a').prop('id');
    $("#checkboxPlaceholder input:checked").each(function() {
        console.log(count++);
        var id = $(this).attr("id");
        var refPath = $('#refRunPath').val();
        var currPath = $('#currRunPath').val();
        addRmTkMapPanel(id, false, refPath, currPath);
        addRmTkMapPanel(id, true, refPath, currPath);
    });
    $('#' + activeTabID).click();
}

// allows for proper difference view scaling
$(window).resize(function() {
    var objs = $(".toggleDifferenceView");
    for (i = 0; i < objs.length; ++i) {
        var refCol = $(objs[i]).closest(".panel").closest(".row").find(".refCol");
        $(objs[i]).closest(".panel").find(".diffCol").css("height", refCol.height());
    }
});

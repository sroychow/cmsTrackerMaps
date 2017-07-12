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

// RELOADS THE SCALE OF THE OVERLAY
$(document).on('resize', '.imgContainer', function(){
    console.log("Changing scaling...");

    currImg = $(this).find('img').first();
    if (currImg.length == 0) return

    natWidth = currImg[0].naturalWidth;

    if (natWidth == 0){
        console.log("natWidth not available; waiting...");

        $.ajax({timeout : 2000}).done(function(){
            $(this).resize();
        });
    }
    else
    {
        width = currImg[0].width;

        if (width == natWidth){
            console.log("img is not fit already ( " + width + "); waiting...");

            $.ajax({timeout : 2000}).done(function(){
                console.log("recursion");
                $(this).resize();
            });
        }
        else
        {
            scale = width / natWidth;

            console.log(width);
            console.log(natWidth);
            console.log("Area scaling factor: " + scale);

            $(this).find('.scaledAnchorMap').css({"transform" : "scale(" + scale +")"});
        }
    } 
})

function CreateSizeChangeEventHandling(obj){
    new ResizeSensor(obj, function(e){ 
        console.log('content dimension changed');
        obj.resize();
     });
}


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

function closeTab(panelId) {
    console.log("utils::closeTab");
    console.log(panelId);
    $('#'+panelId).click();
}


function getParameterFromString(src, param) {
    var page_url = src,
        url_variables = page_url.split('&'),
        parameter_name,
        i;

    for (i = 0; i < url_variables.length; i++) {
        parameter_name = url_variables[i].split('=');

        if (parameter_name[0] === param) {
            return parameter_name[1] === undefined ? true : parameter_name[1];
        }
    }
}
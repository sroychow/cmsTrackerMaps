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

    console.log("WINDOW RESIZE");

    $(".img-container").resize();
});

// RELOADS THE SCALE OF THE OVERLAY
$(document).on('resize', '.imgContainer', {incomingWidth : -1}, function(){

    $(".tab-content > .tab-pane").addClass("hack");

    currImg = $(this).find('img').first();
    if (currImg.length == 0)
    {
        // console.log(this);
        // console.log("Image tag not found");
        $(".tab-content > .tab-pane").removeClass("hack");
        return;
    } 

    natWidth = currImg[0].naturalWidth;

    if (natWidth == 0){
        // console.log("natWidth not available; waiting...");

        $.ajax({timeout : 2000}).done(function(){
            $(this).resize();
        });
    }
    else
    {

        if ($(this).is("[data-width]"))
        {
            width = $(this).attr("data-width");
        }
        else{
            width = $(this).width();
        }      
        console.log(width);

        if (width == natWidth){
            console.log("img has been not fit already ( " + width + "); waiting...");
        }
        else
        {
            scale = width / natWidth;

            $(this).find('.scaledAnchorMap').css({"transform" : "scale(" + scale +")"});        
        }
    } 
    $(".tab-content > .tab-pane").removeClass("hack");
})

function CreateInteractiveViewImageSizeChangeEventHandling(obj){
    console.log("Should add Resize Sensor to:");
    console.log(obj);

    $.ajax({timeout:1000}).done(function(){
        sensor = new ResizeSensor(obj, function(e){ 
            console.log('content dimension changing to: ' + obj.width());

            $.ajax({timeout:1000}).done(function(){
                obj.attr("data-width", obj.width())
                console.log(obj.width());
                // obj.resize({incomingWidth : obj.width()});
                obj.resize();
            });
        });
        console.log(sensor);
    });
}

//TODO make nicer
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
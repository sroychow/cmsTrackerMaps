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

// allows for proper difference view scaling
$(window).resize(function() {
    var objs = $(".toggleDifferenceView");
    for (i = 0; i < objs.length; ++i) {
        var refCol = $(objs[i]).closest(".panel").closest(".row").find(".refCol");
        $(objs[i]).closest(".panel").find(".diffCol").css("height", refCol.height());
    }
});

function loadImagesToImagePlayer(resname, startRunPath, endRunPath) {

    // Get List Of Runs to displaya
    var path = startRunPath;
    var start_run_nr = getRunNumberFromString(startRunPath);
    var end_run_nr = getRunNumberFromString(endRunPath);

    console.log(start_run_nr);
    console.log(end_run_nr);

    $.post('php/loadListNeighbourRuns.php', { dir : path, startRunNumber : start_run_nr, endRunNumber : end_run_nr },
        function(data) {
        $('div#PlayerImageTag > img').remove();

            var obj = jQuery.parseJSON(data);
            console.log(obj[0]);

            for(var i=0; i<obj.length; ++i){
                var tmpstring ="<img class='timeline-image' src='" + obj[i] + resname + "'></img>";
                console.log(tmpstring);
                $('#PlayerImageTag').append(tmpstring);
            }

            $('#PlayerImageTag').imgplay({rate: 5}); 
        }
    );
}
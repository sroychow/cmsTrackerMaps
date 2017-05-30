$(document).ready(function() {

    loadCheckboxes();
    decodeOptions();

    $(".panel-extend-checkbox").on('click', function(e) {
        AddRmTkMapPanel(this.id, $(this).prop('checked'));
        console.log($(this).parent().text());
    });

    // $("#refRunNumberInput, #currRunNumberInput").on('keyup change', function(e) {
    //     var myVal = $.trim($(this).val());
    //     var runNum = DecodeRunNumberFromString(myVal);
    //     var runType = ($(this).attr('id').substring(0, 3) == "ref") ? "#refRunType" : "#currRunType";
    //     var stream = ($(this).attr('id').substring(0, 3) == "ref") ? "#refStream" : "#currStream";
    //     $(runType).children().remove();
    //     $(stream).children().remove();

    //     if (runNum != 0) {
    //         var dataDir = GetDataDirectory(runNum);
    //         PasteOptions(baseURL + dataDir, runType);
    //     }

    //     $('#refRunType').prop('selectedIndex', 1);
    //     $('#refRunType').trigger('change');
    // });


    $("#link-me").click(function(e) {
        var toAppend = encodeOptions();
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        url += toAppend;
        window.location.href = url;

        alert('Link created, ready to share your findings!\n');
    });

    $("#fuck-you").click(function(e) {
        loadtest1();
    });

});

function loadtest1() {
    $('#0').click();
    var whole = '<img id="theImg" width="50%" height="50%" src="http://vocms061.cern.ch/event_display/Data2016/BeamReReco23Sep/274/274094/ZeroBias/';

    $('#checkboxAccordion :checkbox').each(function() {
        if($(this).prop('checked')) {
            $('#inputCheckBoxPanel' + $(this).prop('id')).prepend(whole + 'QTestAlarm.png" />');
        }
    });

    // imstuff = '<img id="theImg" width="50%" height="50%" src="http://vocms061.cern.ch/event_display/Data2016/BeamReReco23Sep/273/273017/ZeroBias/QTestAlarm.png" />'
    // $('#inputCheckBoxPanel0').prepend(imstuff);
}
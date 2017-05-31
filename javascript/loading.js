$(document).ready(function() {

    loadCheckboxes();
    decodeOptions();

    $(".panel-extend-checkbox").on('click', function(e) {

        var refPath = $('#refRunNumberInput').val();
        var currPath = $('#currRunNumberInput').val();

        AddRmTkMapPanel(this.id, $(this).prop('checked'), refPath, currPath);
        console.log($(this).parent().text());
    });

    $("#link-me").click(function(e) {
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.location.href = url + encodeOptions();

        alert('Link created, ready to share your findings!\n');
    });

    if($('#refRunNumberInput').val() === "") {
        disableCheckboxes("checkboxAccordion", true);
    }
});
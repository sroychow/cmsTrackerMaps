$(document).ready(function() {

    $(".link-me").click(function(e) {
        var toAppend = encodeOptions();
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
        url += toAppend;
        window.location.href = url;

        alert('Link created, ready to share your findings!\n ');
    });

    // -------------- Overview --------------
    function encodeOptions() {
        var ret = "?link=true";

        ret += encodeCheckbox("checkboxList");

        ret += encodeTextfield("refRunNumberInput");
        ret += encodeTextfield("currRunNumberInput");

        // ret += encodeDropdown("refRunType");
        // ret += encodeDropdown("currRunType");

        // ret += encodeSelectedMap();
        // encodeSelectedMap();

        return ret;
    }

    function decodeOptions() {

        decodeCheckbox();

        decodeTextfield("refRunNumberInput");
        decodeTextfield("currRunNumberInput");

        // decodeDropdown("refRunType");
        // decodeDropdown("currRunType");

        displaySelectedMaps();
        // decodeSelectedMap();
    }

    // -------------- Checkbox --------------
    function encodeCheckbox(name) {
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
        $('#checkboxList :checkbox').each(function() {
            var prefix = "checkbox";
            var id = $(this).prop('id');
            var val = getUrlParameter(prefix + id) === "true";
            $('#' + id).prop('checked', val);
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
        ret += $('#' + name + ' option:selected').text();
        alert(ret);
        return ret;
    }

    function decodeDropdown(name) {
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

    function displaySelectedMaps() {
    // ===============================================================================================
    //TODO FIXME: this works but is bad design... need to find a way to do this more elegantly
    //   when decoding the url string and reloading the variables back to the website we iterate
    //   over all the checkboxes, and perform check (just like we do when a user clicks the checkboxes)
    //   if we should add the inputcheckbox tab thing at the bottom
        $('#checkboxList :checkbox').each(function() {
            var currID = "inputCheckBoxPanel" + this.id;
            if ($(this).prop('checked') == true) {
                var newInput = "<div id='" + currID + "' class='tab-pane fade extandable-tab-list-element'>" + currID + "</div>";
                $(newInput).insertAfter($(".extandable-tab-list-element").last());
                newInput = "<li><a data-toggle='tab' href='#" + currID + "' id='" + currID + "lnk'>" + currID + "</a></li>";
                $(".extandable-tab-list-ref").append(newInput);
            } else {
                $("#" + currID).remove();
                $("#" + currID + "lnk").remove();
            }
        });
        $('#testme').prop('disabled', true);
    }
    // ===============================================================================================

    decodeOptions();
});
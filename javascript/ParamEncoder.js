class ParamEncoder { 
    encodeOptions() {
        var ret = "?link=true";
        ret += this.encodeCheckboxes("checkboxAccordion");
        ret += this.encodeTextfield("refRunPath");
        ret += this.encodeTextfield("currRunPath");
        ret += this.encodeSelectedMap();
        return ret;
    }

    encodeCheckboxes(name) {
        var ret = "";
        $('#' + name + ' :checkbox').each(function() {
            ret += "&checkbox";
            ret += $(this).prop('id');
            ret += "=";
            ret += $(this).prop('checked');
        });
        return ret;
    }

    encodeTextfield(name) {
        var ret = "&" + name + "=";
        ret += $('#' + name).val();
        return ret;
    }

    encodeSelectedMap() {
        var ret = "&mapSelect=";
        ret += $('.extandable-tab-list-ref .active > a').prop('id');
        return ret;
    }
}
function buildCheckboxPanel(id, displayname, dataParent) { 
    return  "<div class='panel panel-primary '>" +
                    "<a class='btn btn-default btn-block detectorleveltree' data-toggle='collapse' data-parent='#" + dataParent + "' href='#"+id+"'>"+
                    "<span class='glyphicon glyphicon-triangle-right'></span> "+ displayname+"</a>" +
                "<div id='" + id + "' class='panel-collapse collapse panel-group'></div>" +
            "</div>";
}

function buildCheckboxPanelSub(id, displayname, dataParent) { 
    return  "<div class='panel panel-default'>" +
                    "<a class='btn btn-default btn-block moduleleveltree' data-toggle='collapse' data-parent='#" + dataParent + "' href='#"+id+"'>" + 
                        "<span class='glyphicon glyphicon-menu-right'></span>    " +
                        displayname +
                    "</a>" +
                "<div id='" + id + "' class='panel-collapse collapse'></div>" +
            "</div>";
}

function buildTimelinePanel(id) {
    return "<div id='" + id + "' class='tab-pane fade extandable-tab-list-element'>" +
                      "<div class='playercontainer'>" + 
                          "<div id='imageplayer"+id+"' class='imageplayer'>" +
                          "</div>"+
                      "</div>"+
            "</div>";
}

function buildPanelWithImages(id) {
    return "<div id='" + id + "' class='tab-pane fade extandable-tab-list-element'>" +
            "<div class='row'>" + 
                "<div class='viewType'>" +
                  "<div style='text-align: center;'>"+
                    "<label>Diff: </label>"+
                            "<div class='btn-group btn-group-sm' role='group' id='diffButtonGroup'>" +
                                "<button type='button' class='btn btn-primary disableDiffImg' toToggle='toggle"+id+"'> Disabled </button>" +
                                "<button type='button' class='btn enableDiffImg' toToggle='toggle"+id+"'> Enabled </button>" +
                        "</div>" +
                    "</div>" +
                "</div>" +

                "<div class='row'>" +
                    "<div class='col-md-6'>" +
                        "<div class='panel panel-default'>" +
                            "<div class='panel-heading'>" +
                                "Reference" +
                            "</div>" +
                            "<div class='panel-body refCol'></div>" +
                        "</div>"+
                    "</div>" +
                    "<div class='col-md-6'>" +
                        "<div class='panel panel-default'>" +
                            "<div class='panel-heading' style='display: inherit;'>" +
                                "Current" +
                                "<input type='checkbox' class='toggleDifferenceView' id='toggle"+id+"' style='display: none;'>" +
                            "</div>" +
                            "<div class='panel-body currCol'></div>" +
                            "<div class='panel-body diffCol'></div>" +
                        "</div>"+
                    "</div>" +
                "</div>" +

            "</div>";
}

function buildPanelWithText(id) {
    return "<div id='" + id + "' class='tab-pane fade extandable-tab-list-element'>" +
            
            "<div class='row'>" + 
                "<div class='viewType'>" +
                  "<div style='text-align: center;'>"+
                    "<label>Diff: </label>"+
                        "<div class='btn-group btn-group-sm' role='group' id='diffButtonGroup'>" +
                            "<button type='button' id='noneDiffButton'   class='btn btn-primary' onclick='hideDiff(\"true\",\""+id+"\");'> Disabled </button>" +
                            "<button type='button' id='sideDiffButton'   class='btn' onclick='diffUsingJS(0,\""+id+"\");'> Side by Side</button>" +
                            "<button type='button' id='inlineDiffButton' class='btn' onclick='diffUsingJS(1,\""+id+"\");'> Combined Inline</button>" +
                        "</div>" +
                    "</div>" +
                "</div>" +

            "<div class='row' id='rawtext"+id+"'>" +
                "<div class='col-md-6'>" +
                    "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                            // "<div class='row'>" +
                                // "<div class='col-md-6'>" +
                                   "Reference " +
                                    // "<button type='button' class='btn btn-xs toggleTextarea' totoggle='#ref"+id+"' ><i class='glyphicon glyphicon-menu-up'></i></button>" +
                                // "</div>" +
                            // "</div>" +
                        "</div>" +
                        "<div class='panel-body'>" +  
                            "<textarea id='ref"+id+"' readonly></textarea>" +
                        "</div>" +
                    "</div>"+
                "</div>" +

                "<div class='col-md-6'>" +
                    "<div class='panel panel-default'>" +
                        "<div class='panel-heading'>" +
                            // "<div class='row'>" +
                            //     "<div class='col-md-6'>" +
                                "Current " +
                                // "<button type='button' class='btn btn-xs toggleTextarea' totoggle='#curr"+id+"' ><i class='glyphicon glyphicon-menu-up'></i></button>" +
                            //     "</div>" +
                            // "</div>" +
                        "</div>" +
                        "<div class='panel-body'>" +  
                            "<textarea id='curr"+id+"' readonly></textarea>" +
                        "</div>" +
                    "</div>"+
                "</div>" +

            "</div>" +
            "<div class='row'>" + 
                "<div id='diff"+id+"'> </div>" +
            "</div>" + 

            "</div>";
}

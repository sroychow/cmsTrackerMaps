class DiffHandler { 
    static diffUsingJS(viewType, elemID) {

       DiffHandler.hideDiff('false', elemID);

        var refstr = 'ref'+String(elemID);
        var currstr = 'curr'+String(elemID);
        var diffstr = 'diff'+String(elemID);

      "use strict";
      var byId = function (id) { return document.getElementById(id); },
        base = difflib.stringAsLines(byId(refstr).value),
        newtxt = difflib.stringAsLines(byId(currstr).value),
        sm = new difflib.SequenceMatcher(base, newtxt),
        opcodes = sm.get_opcodes(),
        diffoutputdiv = byId(diffstr),
        contextSize = 0;

      diffoutputdiv.innerHTML = "";
      contextSize = contextSize || null;

      diffoutputdiv.appendChild(diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        baseTextName: "Reference",
        newTextName: "Current",
        contextSize: 0,
        viewType: viewType
      }));
    }

    static hideDiff(isHide, elemID) {
      var diffstr = 'diff'+String(elemID);
      if(isHide === 'true'){
        $("#" + diffstr).hide();
      } else {
        $("#" + diffstr).show();
      }
    }
}
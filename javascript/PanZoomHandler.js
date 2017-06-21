class PanZoomHandler {
	static attachWheelZoomListeners(sectionToLookIn) {
        // ---------------- Helper Functions ----------------
        function assignTransform(section, master, slave) {
            var trans = section.find(master).css("transform");
            section.find(slave).css("transform", trans);
        }

        function setPanzoomParams(section, elem) {
            return section.find(elem).panzoom({
                startTransform: 'scale(1)',
                maxScale: 10,
                minScale: 1,
                increment: 0.1,
                contain: 'automatic'
            });
        }

        function linkZoom(section, pz, master, src, dst) {
          pz.parent().on('mousewheel.focal', function(e) {
              e.preventDefault();
              var delta = e.delta || e.originalEvent.wheelDelta;
              var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
              pz.panzoom('zoom', zoomOut, {
                  animate: false,
                  focal: e
              });

            assignTransform(section, src, dst);
          });
          section.find(master).parent().on("mouseup pointerup",function(e) {
              assignTransform(section, src, dst);
          });
        }

        // ---------------- Start doing stuff here ----------------
        var $section = $(sectionToLookIn);

        var $pz1 = setPanzoomParams($section, '.imgRef');
        linkZoom($section, $pz1,'.imgRef' , ".refCol .imgRef", ".currCol .imgCurr");
        linkZoom($section, $pz1,'.imgRef' , ".refCol .imgRef", ".diffCol .imgDiff");

        var $pz2 = setPanzoomParams($section, '.imgCurr');
        linkZoom($section, $pz2,'.imgCurr', ".currCol .imgCurr", ".refCol .imgRef");
        linkZoom($section, $pz2,'.imgCurr', ".currCol .imgCurr", ".diffCol .imgDiff");

        var $pz3 = setPanzoomParams($section, '.imgDiff');
        linkZoom($section, $pz3,'.imgDiff', ".diffCol .imgDiff", ".refCol .imgRef");
        linkZoom($section, $pz3,'.imgDiff', ".diffCol .imgDiff", ".currCol .imgCurr");
    }
}
# Tracker Maps

This document aims to give future developers/maintainers an introduction to the "Tracker Maps Reloaded" website.  


## Design

An important design decision is that adding additional resources should be as easy as possible. A data file (<code>data.js</code>) contains the resource name to be displayed on the checkboxes, the - as concrete as possible - resource name (i.e. location).

### Collections (~Classes) 

*   <code>ParamEncoder.js</code>: Generation of the parameter string in the url to be created when sharing the link
*   <code>ParamDecoder.js</code>: Reverse of encoder; parse parameters and recreate the view
*   <code>Loader.js</code>: Loads the data, and handles data initialization / new run selection
*   <code>ModeHandler.js</code>: Handles the chaning of viewmodes which affects mostly the <code>PanelBuilder</code>
*   <code>TimelinePlayer.js</code>: TODO
*   <code>PanelBuilder.js</code>: Generator of the panels which are used to display the resources. Different behaviour depending on resource type <code>(txt, log, out, png)</code>
*   <code>PanZoomHandler.js</code>: Handle synchronizing zooming and panning in images (<code>libs/panzoom</code>)
*   <code>DiffHandler.js</code>: Handle calls to the diff library (<code>libs/jsdifflib</code>)
*   <code>FileTree.js</code>: Handles the file browsing and data selection (<code>libs/FileTree</code>)

### Hints

#### Simple addition of new plots
If the resource you want to add is a <code>png, txt, log, out </code> just add it to the corresponding detector and submodule in <code>data.json</code>.

#### Adding new resource type
Understand how the data is loaded and displayed. Specifically take a look at <code>data.json</code> where the data is defined. The function <code>loadCheckboxes()</code> directly handles the generation of the checkboxes from the data. <code>loadCheckboxes()</code> is called in the onclick handlers found in <code>main.js</code>. From there take a look at the onclick handler that listens for the <code>.panel-extend-checkbox</code> class. From there you're going to have to take a look how the <code>PanelBuilder</code> works. The important functions to consider are <code>PanelBulider::addRmTkMapPanel</code>, and <code>PanelBulider::addToComparisonView</code>.
It is here were you will have to adapt things - if at all.

#### Changing Decoder / Encoder
It is unlikely that you're going to have to touch either <code>ParamEn/Decoder</code>; if it turns out that you do need to add something **always** do it in both. Don't introduce asymetries.

#### General

The expected lifespan of this tool is just until ~2020.<br>
Test thoroughly on **Chrome, Firefox, Safari**  before pushing to live.<br>

## Additional Material

Keep the manual 'doc/tkmap_manual.pdf' up to date.

## Libraries Used

*   <a href="https://jquery.com/">JQuery</a>
*   <a href="https://github.com/timmywil/jquery.panzoom">PanZoom</a>
*   <a href="https://github.com/cemerick/jsdifflib">JsDiffLib</a>
*   <a href="https://www.abeautifulsite.net/jquery-file-tree"> JQuery File Tree</a>



<br><br><br>
*Leave the code in better shape than you found it* - Sun Tzu
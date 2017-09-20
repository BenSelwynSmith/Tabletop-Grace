"use strict"
var el = document.createElement('div');
var indicator = document.getElementById('indicator');
// var desaturator = document.getElementById('desaturator');
// var bin = document.getElementById('bin');
var hideCategoryBar = false;
// var bgMinigrace = new Worker("scripts/background.js");
var bgMinigrace2 = [];
var indListener = [];
el.style.cssText = 'pointer-events: auto';
supportsPointerEvents = (el.style.pointerEvents == 'auto');
// Array.prototype.forEach.call(codearea.getElementsByClassName('tile'),
        // attachTileBehaviour);
Array.prototype.forEach.call(toolbox.getElementsByClassName('tile'),
        attachToolboxBehaviour);
// codearea.addEventListener("click", function(ev) {
    // Two cases according to whether the event target is considered the
    // span itself or the text node inside it.
    // if (ev.target.classList && ev.target.classList.contains('var-name'))
        // return;
    // if (ev.target.parentNode.classList
        // && ev.target.parentNode.classList.contains('var-name'))
        // return;
    // var menus = codearea.getElementsByClassName('popup-menu');
    // for (var i=0; i<menus.length; i++)
        // codearea.removeChild(menus[i]);
// });

function indicatorDisplay(b,id) {
  if (b) {
    clearPopouts(id);    
    overlays2[id].width = codearea2[id].scrollWidth;
    overlays2[id].height = codearea2[id].scrollHeight;

    if (codearea2[id].style.visibility == 'hidden')
        return;
    var reasons = [];
    var tiles = findErroneousTiles(reasons,id);
    if (tiles.length > 0) {
        overlays2[id].style.width = desaturator2[id].style.width = codearea2[id].scrollWidth + 'px';
        overlays2[id].style.height = desaturator2[id].style.height = codearea2[id].scrollHeight + 'px';
        desaturator2[id].style.display = 'block';
        desaturator2[id].classList.add('desaturator2');
        setTimeout(function() {codearea2[id].classList.add('desaturate');}, 10);
        overlays2[id].style.display = 'block';
    }
    var c = overlays2[id];
    if (!indListener[id]) {
      desaturator2[id].addEventListener("click",function() { if (mouse) indicatorDisplay(0,id); });
      desaturator2[id].addEventListener("touchstart",function(evt) { evt.stopPropagation(); });
      desaturator2[id].addEventListener("touchmove",function(evt) { evt.stopPropagation(); });
      desaturator2[id].addEventListener("touchend",function(evt) { evt.stopPropagation(); evt.preventDefault(); indicatorDisplay(0,id); });
      indListener[id] = 1;
    }
    var ctx = c.getContext('2d');
    ctx.font = "9pt sans-serif";
    for (var i=0; i<tiles.length; i++) {
        var mn = tiles[i];
        var xy = findOffsetTopLeft(mn);
        ctx.save();
        ctx.translate(0, -codearea2[id].scrollTop);
        ctx.beginPath();
        var textwidth = ctx.measureText(reasons[i]);
        
        var textleft = xy.left;
        var texttop = xy.top + mn.offsetHeight + 4;
        if (textleft + textwidth.width > codearea2[id].offsetWidth)
            textleft = codearea2[id].offsetWidth - 2 - textwidth.width;        
        ctx.fillStyle = "pink";
        ctx.fillRect(textleft, texttop + 3, textwidth.width + 1, 14);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "hsl(330, 75%, 65%)";
        ctx.rect(textleft, texttop + 2, textwidth.width + 2, 16);
        ctx.stroke();
        ctx.fillText(reasons[i], textleft + 1, texttop + 14);
        ctx.restore();
        tiles[i].classList.add('highlight');
        var t = tiles[i];
        while (true) {
          if (!t) { break; }
          if (t.classList.contains("codearea")) { break; }
          t.oldZ = t.style.zIndex;
          t.style.zIndex = "";
          t = t.parentNode;
        }
    }
    var arrows = arrowOffscreenTiles(tiles,id);
    for (var k in arrows)
        arrows[k].classList.add('error');
  } else {
    codearea2[id].classList.remove('desaturate');
    desaturator2[id].classList.remove('desaturator2');
    setTimeout(function() {desaturator2[id].style.display = 'none';}, 250);
    overlays2[id].style.display = 'none';
    var tiles = codearea2[id].getElementsByClassName('highlight');
    while (tiles.length > 0) {
        var t = tiles[0];
        while (true) {
          if (!t) { break; }
          if (t.classList.contains("codearea")) { break; }
          t.style.zIndex = t.oldZ;
          delete t.oldZ;
          t = t.parentNode;
        }
        tiles[0].classList.remove('highlight');
    }
    clearPopouts(id);
  }
}

window.addEventListener('popstate', function(ev) {
    if (ev.state != null)
        loadJSON(JSON.stringify(ev.state));
});
window.addEventListener('load', function(ev) {
    var tb = document.getElementById('toolbox');
    var tiles = tb.getElementsByClassName('tile');
    for (var i=0; i<tiles.length; i++) {
        if (!tiles[i].dataset) {
            tiles[i].dataset = {};
            for (var j=0; j<tiles[i].attributes.length; j++) {
                var k = tiles[i].attributes[j].name;
                if (k.substring(0, 5) == "data-") {
                    tiles[i].dataset[k.substring(5)] = tiles[i].getAttribute(k);
                }
            }
        }
    }
    var inputs = tb.getElementsByTagName('input');
    for (var i=0; i<inputs.length; i++) {
        inputs[i].value = inputs[i].getAttribute('value');
    }
    var op = tb.querySelector('.tile.assign');
    var holes = op.getElementsByClassName('hole');
    if (holes[0].offsetTop != holes[1].offsetTop) {
        var obscurer = document.createElement("div");
        obscurer.style.position = "fixed";
        obscurer.style.top = '0px';
        obscurer.style.left = '0px';
        obscurer.style.bottom = '0px';
        obscurer.style.right = '0px';
        obscurer.style.background = 'black';
        obscurer.style.color = 'white';
        obscurer.style.fontSize = '100px';
        obscurer.style.opacity = 0.95;
        obscurer.style.textAlign = 'center';
        document.body.appendChild(obscurer);
        if (navigator.userAgent.indexOf('Firefox') != -1 &&
                (+navigator.userAgent.replace(/^.*rv:([0-9.]+)\).*$/,"$1") >= 18
                    || !navigator.userAgent.search(/rv:[0-9.]+/))
                ) {
            obscurer.appendChild(document.createTextNode(
                    "Go to about:config and set layout.css.flexbox.enabled to true, then reload this page."));
            alert("It looks like you're using Firefox 21 or earlier, but "
                + "haven't "
                + "enabled the preference necessary for this tool to "
                + "use the flexbox layout it requires.\n\nGo to "
                + "about:config and set layout.css.flexbox.enabled to "
                + "true, then reload the page. Alternatively, upgrade to "
                + "Firefox 22 or later.");
        } else {
            obscurer.appendChild(document.createTextNode(
                    "Not usable in this browser. Try a recent version of "
                    + "Firefox or Chrome."));
            alert("It looks like your browser doesn't support the "
                + "flexbox layout used in this tool. Try returning to "
                + "this page in a recent version of Firefox, Chrome, "
                + "or Internet Explorer.");
        }
    }
});

var key1 = "1".charCodeAt(0);
var key2 = "2".charCodeAt(0);
var key3 = "3".charCodeAt(0);
var key4 = "4".charCodeAt(0);
document.addEventListener('keypress', function(ev) {
    if (ev.keyCode == ev.DOM_VK_F5) {
        ev.preventDefault();
        go();
    }
    if (ev.charCode == 114 && ev.target == document.body
            && !ev.ctrlKey && !ev.metaKey) {// "r"
        ev.preventDefault();
        go();
    }
    if (ev.charCode == 118 && ev.target == document.body) {// "v"
        ev.preventDefault();
        toggleShrink();
    }
    if (ev.charCode == key1) {
      testSetup(1);
    }
    if (ev.charCode == key2) {
      testSetup(2);
    }
    if (ev.charCode == key3) {
      testSetup(3);
    }
    if (ev.charCode == key4) {
      testSetup(4);
    }
});

// Setup stderr.
minigrace.stderr_write = function(value) {
    var stderr = document.getElementById("stderr_txt");
    stderr.value += value;
    stderr.scrollTop = stderr.scrollHeight;
};

// Setup stdout.
minigrace.stdout_write = function(value) {
    var stdout = document.getElementById("stdout_txt");
    stdout.value += value;
    stdout.scrollTop = stdout.scrollHeight;
    weakTerminationChecker(stdout.idx);
};

// if (window.location.hash) {
    // if (window.location.hash.substring(0, 8) == "#sample=") {
        // var sample = window.location.hash.substring(8);
        // window.addEventListener("load", function(ev) {
            // loadSample(sample);
        // });
    // } else {
        // var obj = loadJSON(decodeURIComponent((atob(window.location.hash.substring(1)))));
        // history.replaceState(obj, "", generateHash(obj));
    // }
// }
for (var i = 0; i < windowMax; i++) {
  var bgMinigrace = new Worker("scripts/background.js");
  // bgMinigrace.postMessage({CID: i});
  // bgMinigrace.setup();
  bgMinigrace.postMessage({action: "importFile", modname: "logo",
          url: "logo.js"});
  bgMinigrace.postMessage({action: "importFile", modname: "turtle",
          url: "turtle.js"});
  bgMinigrace.postMessage({action: "importFile",
          modname: "loopinvariant",
          url: "loopinvariant.js"});
  bgMinigrace.postMessage({action: "importFile",
          modname: "sniff",
          url: "sniff.js"});
  bgMinigrace.postMessage({action: "importGCT", modname: "logo",
      gct: gctCache['logo']});
  bgMinigrace.postMessage({action: "importGCT", modname: "loopinvariant",
      gct: gctCache['loopinvariant']});
  bgMinigrace.postMessage({action: "importGCT", modname: "sniff",
      gct: gctCache['sniff']});
  bgMinigrace2[i] = bgMinigrace;
}

// console.log("Setup::" + windowMax);
function setup() {
  for (var i = 0; i < windowMax; i++) {
    var editor = ace.edit("code_txt_real"+i);
    var GraceMode = require("ace/mode/grace").Mode;
    editor.getSession().setMode(new GraceMode());
    editor.setBehavioursEnabled(false);
    editor.setHighlightActiveLine(true);
    editor.setShowFoldWidgets(false);
    editor.setShowPrintMargin(false);
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(4);
    editor.setFontSize('14px');
    editor.commands.bindKeys({"ctrl-l":null, "ctrl-shift-r":null, "ctrl-r":null, "ctrl-t":null})
    editor2[i] = editor;

    editor3[i] = document.getElementById('code_txt_real' + i);
    editor3[i].style.position = 'absolute';
    editor3[i].style.top = codearea2[i].offsetTop + 'px';
    editor3[i].style.left = codearea2[i].offsetLeft + 'px';
    editor3[i].style.display = "block";
    editor3[i].style.visibility = 'hidden';

    // console.log("Added Editor2: " + i + ", " + editor2[i]);

    editor.lastChange = new Date().getTime();
    editor.changedSinceLast = false;
    editor.on("change", function(ev) {
      editor.lastChange = new Date().getTime();
      editor.changedSinceLast = true;
    });
  }

  setInterval(function() {
      for (var i = 0 ; i < windowMax; i++) {
        if (windows[i].style.display == "none") { continue; }
        if (!editor2[i].changedSinceLast) { continue; }
        if (!codearea2[i].classList.contains("shrink")) { continue; }
        if (editor2[i].lastChange + 1000 > new Date().getTime()) { continue; }
        var editor = editor2[i];
        editor.lastChange = new Date().getTime();
        editor.changedSinceLast = false;
        if (editor.getValue() == document.getElementById('gracecode'+i).value) {
          // document.getElementById('indicator').style.background = 'green';
          editor.getSession().clearAnnotations();
          return;
        }

        bgMinigrace2[i].onmessage = function(ev) {
          if (!codearea2[i].classList.contains("shrink"))
            return;
          if (!ev.data.success) {
            showErrorInEditor(ev.data.stderr,i)
            return;
          }
          editor.getSession().clearAnnotations();
          rebuildTilesInBackground(ev.data.output,i);
          document.getElementById('gracecode'+i).value = editor2[i].getValue();
        }
        bgMinigrace2[i].postMessage({action: "compile", mode: "json",
          modname: "main", source: editor2[i].getValue() + chunkLine});


      }
  }, 1000);
  minigrace.trapErrorsFunc = minigrace.trapErrors;
  minigrace.trapErrors = function(func) {
    if (minigraceTerminationCounter == 1) {
      mgtSetup();
    }

    if (minigraceTerminationCounter > 1) {
      mgtCollect(func);
      return;
    }

    minigrace.trapErrorsFunc(func);
  };
}
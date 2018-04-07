"use strict"
var windowMenu = [];
var windowColors = ["red", "blue", "yellow", "green"];
var debug = false;

var windows = [];
var codearea2 = [];
var holes2 = [];
var tiles2 = [];
var errorTiles2 = [];
var editor2 = [];
var editor3 = [];
var editor4 = [];
var desaturator2 = [];
var overlays2 = [];
var getCode = [];
var output = [];
var canvas2 = [];
var text2 = [];
var output = [];
var minigraceRunning = [0,0,0,0];
var minigraceTermination = [0,0,0,0];
var canvasId = 'standard-canvas';
var textId = 'stdout_txt';
var minigraces = [];
var pad1 = "19px";
var pad2 = "12.66666666666667px";
var pad3 = "6.33333333333333px";

var transforms = ["", "rotate(90deg)", "rotate(-90deg)", "rotate(180deg)"];
var mouse = 0;

var minigraceActiveFunctions = [];
var minigraceActiveWindows = [];
var minigraceTerminationCounter = 0;
var minigraceActiveInstances = 0;
var minigraceLastWindow = 0;
var minigraceWindowCall = [0,0,0,0];
var minigraceTerminationTarget = [0,0,0,0];

var windowCount = 0;
var windowMax = 4;
var windowsActive = 0;
var alt = 0;
var depth = 5;
var scaled = 0;
var expanded = 0;
var moved = 0;
var markerWidth = 30;
var markerHeight = 15;
var windowIdName = "Window_";

//Width of Menu
var mw = 125;   //Half
var mw2 = 250;
//Height of Menu
var mh = 40;    //Half
var mh2 = 80;

var svgX = 100;
var svgY = 99;
var win1 = 'a';
var win2 = 'a';

var windowarea;
var windowCon;

var spam = false;

var mg2;

var system_mode = 0;
var setup_done = 0;
var mobileDistanceMod = 3;
var mobile = false;

var socket_attempt = false;

function mobileAndTabletCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function windowSetup(mode) {
  if (setup_done != 0) { return; }
  mobile = mobileAndTabletCheck();
  if (!mobile && navigator.maxTouchPoints > 5) {
    mode = 0;
  }
  system_mode = mode;
  setup_done = 1;
  
  
  if (mode == 1) {
    if (!mobile) { mouse = 1; ws_disabled = 1; }
    windowMax = 1;
    pieMenuMoveThresholdDistance *= mobileDistanceMod;
    tileMenuMoveThresholdDistance *= mobileDistanceMod;
    optMoveThresholdDistance *= mobileDistanceMod;
    btnMoveThresholdDistance *= mobileDistanceMod;
    segMoveThresholdDistance *= mobileDistanceMod;
  }
  addWMenuTouch();
  windowCon = document.getElementById('windowContainer');
  if (mode == 1) {
    windowCon.style.width = "100%";
    windowCon.style.height = "100%";
    windowCon.style.left = "0px";
    windowCon.style.top = "0px";
  }

  //Setup initial dialect (Adds some tiles)
  addDialectMethods(document.getElementById('dialect').value);

  for (var i = 0; i < windowMax; i++) {
    addBlockWindow(i);
    windows[i].style.display = "none";
    windows[i].windex = i;
    windows[i].setAttribute('class', "code-window");
    codearea2[i] = windows[i].children[0];
    codearea2[i].windex = i;
    desaturator2[i] = document.getElementById('desaturator' + i);
    overlays2[i] = document.getElementById('overlay-canvas' + i);
    windows[i].maximised = 0;
    text2[i] = document.getElementById('txt' + i);
    text2[i].addEventListener('click', function(event) {
      if (!mouse) { return; }
      expandOutput(event.target.windex);
      event.preventDefault();
    });
    text2[i].addEventListener('touchend', function(event) {
      expandOutput(event.target.windex);
      event.preventDefault();
    });
    text2[i].windex = i;
    canvas2[i] = document.getElementById('canvas' + i);
    canvas2[i].windex = i;
    canvas2[i].onresize = function(el) {
      resizeCanvas(el.windex);
    }
    output[i] = canvas2[i].parentNode;
    output[i].style.display = "none";


    //Hijack canvas context functions and use them to determine when a program ends.
    var ctx = canvas2[i].getContext('2d');
    ctx.fillRect = ctx.clearRect;
    ctx.stroke2 = ctx.stroke;
    ctx.fill2 = ctx.fill;
    ctx.idx = i;
    ctx.stroke = function() {
      this.stroke2();
      minigraceWindowCall[this.idx] = 1;
      // if (spam)  console.log("Canvas: " + this.idx + ", " + minigraceWindowCall);
      weakTerminationChecker(this.idx);
    }
    ctx.fill = function() {
      this.fill2();
      minigraceWindowCall[this.idx] = 1;
      // if (spam)  console.log("Canvas: " + this.idx + ", " + minigraceWindowCall);
      weakTerminationChecker(this.idx);
    }
    //Output for Textarea is handled in setup.js

  }

  setup();

  for (var i = 0; i < windowMax; i++) {
    editor4[i] = editor3[i].children[2].children[0];
    addTouch(i);
    tiles2[i] = [];
  }

  // codearea2[0].addEventListener('click', function(event) {
    // showPieMenu(event.clientX, event.clientY, 0, 1);
  // });

  window.onresize = function() {
    if (windowsActive) {
      arrangeWindows();
    }
  }
  // canvas = document.getElementById('standard-canvas');
  // canvas.addEventListener('touchend', expandOutput);



  //Test Code
  // windowMenuClick(0,1,1);
  // windowMenuClick(1,2,1);
  // mouse = 1;
  // showSecMenu(400,300,0);
  // showSecMenu(900,200,1);


  // testSetup(1);
  // showPieMenu(300,300,0);
  // showSecMenu(600,600,0);
  //
  // try {
  // windowMenuClick(0,3,1);
  // } catch (e) {}
  // windowMenuClick(0,1,1);
  // windowMenuClick(0,3,1);
  // showSecMenu(400,300,0);
  // showSecMenu(900,200,1);
  // mouse = 1;

  //There might be a reason this is not in a loop, or it might be due to a closure failure
  getCode[0] = function() {
    if (codearea2[0].classList.contains("shrink"))
      return editor2[0].getValue();
    return document.getElementById('gracecode' + 0).value;
  };
  if (windowMax > 1) {
    getCode[1] = function() {
      if (codearea2[1].classList.contains("shrink"))
        return editor2[1].getValue();
      return document.getElementById('gracecode' + 1).value;
    };
  }
  if (windowMax > 2) {
    getCode[2] = function() {
      if (codearea2[2].classList.contains("shrink"))
        return editor2[2].getValue();
      return document.getElementById('gracecode' + 2).value;
    };
  }
  if (windowMax > 3) {
    getCode[3] = function() {
      if (codearea2[3].classList.contains("shrink"))
        return editor2[3].getValue();
      return document.getElementById('gracecode' + 3).value;
    };
  }

  if (system_mode == 1) {
    // windowMenuClick(idx,rid,state,pos)
    windowMenuClick(0,0,1,1);
    windowMenuClick(0,0,1,1);
    // windowMenuClick = null;
  }

  // document.getElementById('standard-canvas').getContext("2d").clearRect(0,0,200,200)
  // document.getElementById('standard-canvas').getContext("2d").clearRect = function() { };
}

function fakeDownload(id) {
  var event = new MouseEvent('click');
  document.getElementById('downloadlink' + id).dispatchEvent(event);
}

// function // console.log(msg) {
  // if (debug) {
    // // console.log(msg);
  // }
// }

function getActiveWindows() {
  var rep = [];
  for (var i = 0; i < windowsMax; i++) {
    if (windows[i].style.display != "none") {
      rep.push("" + i);
    }
  }
  return rep;
}

function scrollTest(id) {
  // console.log("0 Scroll: " + codearea2[id].scrollWidth + ", " + codearea2[id].scrollHeight + " vs " + codearea2[id].offsetWidth + ", " + codearea2[id].offsetHeight);
}


function removeWindows() {
  for (var i = 0; i < windows.length; i++) {
    windows[i].parentNode.removeChild(windows[i]);
  }
  windows = [];
  windowCount = 0;
}

function outputSwap(id, b) {
  if (b) {
    canvas2[id].oldCid = canvas2[id].id;
    text2[id].oldTid = text2[id].id;
    canvas2[id].id = canvasId;
    text2[id].id = textId;
  } else {
    canvas2[id].id = canvas2[id].oldCid;
    text2[id].id = text2[id].oldTid;
  }
}

function canvasSwap() {
  var c = document.getElementById('standard-canvas');
  var d = document.getElementById('standard-canvas2');
  c.setAttribute('id','standard-canvas2');
  d.setAttribute('id','standard-canvas');
}

function positionCorrection(pos, windex) {
  return [pos[0] - windows[windex].offsetLeft - windowCon.offsetLeft, pos[1] - windows[windex].offsetTop - windowCon.offsetTop];
}

function minigraceStopCheck() {
  if (minigrace.stopRunning) {
    minigrace.stopRunning = 0;
    minigraceHardReset();
    minigraceRunning = [0,0,0,0];
    for (var i = 0; i < windowsMax; i++) {
      codeRunningToggle(i,1);
    }
    mgtReset();
  }
}

function minigraceHardReset() {
  minigraceCloneReset();
  // clearOutput();
  setTimeout(minigraceCloneReset, 100);
}

function minigraceCloneReset() {
  if (minigrace) {
    mg2 = minigrace;
    minigrace = null;
  } else {
    minigrace = mg2;
    mg2 = null;
  }
}

function weakTerminationChecker(windex) {
  if (windex == null) { return; }
  if (minigraceRunning[windex] == 0) { return; }
  minigraceTermination[windex]++;
  var t = minigraceTermination[windex];
  // // console.log("MGT: " + minigraceTermination[windex] + ", " + t);
  setTimeout(function() {
    if (t == minigraceTermination[windex]) {
      console.log("Termination." + windex);
      minigraceRunning[windex] = 0;
      minigraceActiveInstances--;
      codeRunningToggle(windex,0);
    }
  }, 300);
}



function mgtSetup() {
  // console.log("mgtSetup");
  minigraceActiveFunctions = [];
  minigraceActiveWindows = [];
  minigraceTerminationCounter = 2;
  for (var i = 0; i < minigraceActiveInstances; i++) {
    minigraceActiveFunctions.push(null);
  }
  spam = true;
}

function mgtReset() {
  minigraceActiveWindows = [];
  minigraceActiveFunctions = [];
  minigraceTerminationTarget = [0,0,0,0];
  minigraceTerminationCounter = 0;
  spam = false;
  minigraceLastWindow = 0;
}

function mgtCollect(func) {
  // console.log("mgtCollect: " + minigraceActiveInstances + ", " + minigraceTerminationCounter);

  if (minigraceActiveInstances == 1) {
    for (var i = 0; i < minigraceRunning.length; i++) {
      if (minigraceRunning[i] == 1) {
        mgtEnd(i);
      }
    }
    mgtReset();
    // console.log("Single instance termination.");
    return;
  }

  // console.log("AF: " + minigraceActiveFunctions.length);
  var total = 0;
  //Add function to list
  var added = false;
  for (var i = 0; i < minigraceActiveFunctions.length; i++) {
    if (minigraceActiveFunctions[i] == null && !added) {
      minigraceActiveFunctions[i] = func;
      // console.log("Added function: " + i);
      added = true;
      total++;
    } else if (minigraceActiveFunctions[i] != null) {
      total++;
    }
  }

  //Collection complete
  if (total == minigraceActiveInstances) {
    var b = false;
    if (minigraceTerminationCounter == 2) {
      minigraceTerminationCounter = 3;
      minigraceWindowCall = [0,0,0,0];
      minigraceLastWindow = 0;
      b = true;
    }
    // console.log("Collected all functions: " + total + ", FirstTime: " + b);

    if (!b) {
      //2nd+ Call
      var idx = minigraceWindowCall.indexOf(1);
      // console.log("Change Idx: " + idx + ", from : " + minigraceWindowCall);
      // minigraceWindowCall = [0,0,0,0];
      minigraceWindowCall[idx] = 0;
      minigraceActiveWindows[minigraceLastWindow] = idx;
      minigraceLastWindow++;
      if (minigraceLastWindow >= minigraceActiveInstances) {
        // console.log("All functions tested: " + minigraceActiveWindows + " vs " + minigraceTerminationTarget);
        //Cancel desired instances
        for (var i = 0; i < minigraceActiveFunctions.length; i++) {
          idx = minigraceActiveWindows[i];
          var f = minigraceActiveFunctions[i];
          // console.log("i: " + i + ", idx: " + idx + ", mgtT: " + minigraceTerminationTarget[idx]);
          if (minigraceTerminationTarget[idx] == 0) {
            // Continue
            // console.log("Releasing Function: " + i + ", idx: " + idx);
            // setTimeout(function() {
            minigrace.trapErrorsFunc(f);
            // }, 50);
          } else {
            //Stop running
            // console.log("Stopping Function: " + i + ", idx: " + idx);
            mgtEnd(idx);
          }
        }
        mgtReset();
        return;
      }
    }

    //Release first/next function
    var f = minigraceActiveFunctions[minigraceLastWindow];
    // // console.log("Releasing Function: " + minigraceLastWindow);
    minigraceActiveFunctions[minigraceLastWindow] = null;
    minigrace.trapErrorsFunc(f);
  }
}

function mgtEnd(idx) {
  minigraceRunning[idx] = 0;
  codeRunningToggle(idx,0);
}

function stringifyAllTiles(windex) {
  return generateStringCode(windex,-1);
}

function stringifyTiles(tile,windex) {
  flagAllConnectedTiles(windex,tile,1);
  
  var data = generateStringCode(windex,1);
  
  resetMarkOnTiles(windex);
  
  return data;
}

function flagAllConnectedTiles(id,tile,flag) {
  var tiles = [];
  var top = tile;
  while (true) {
    if (top.parentNode != codearea2[id]) {
      top = top.parentNode;
    } else {
      break;
    }
  }

  findAllTiles(tile, tiles, 0);
  
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].flag = flag;
  }
}



function resetMarkOnTiles(id) {
  for (var i = 0; i < tiles2[id].length; i++) {
    tiles2[id][i].flag = null;
  }
}

function moveTileToWindow(origin, target, tile) {
  var w0 = windows[origin];
  var w1 = windows[target];
  //Find all tiles in scope
  //Remove from origin
  //Add to target
  // console.log("Moving Tiles from " + w0 + "(" + origin + ") to "  + w1 + "(" + target + ") : " + tile);
  var tiles = [];
  var top = tile;
  while (true) {
    if (top.parentNode != codearea2[origin]) {
      top = top.parentNode;
    } else {
      break;
    }
  }

  findAllTiles(tile, tiles, 0);
  // console.log("Tiles found: " + tiles.length);
  // Array.prototype.forEach.call(tiles,function (el) {
    // el.style.border = "Solid 3px";
  // });

  for (var i = 0; i < tiles.length; i++) {
    // tiles[i].windex = target;
    if (tiles[i].parentNode == codearea2[origin]) {
      codearea2[target].appendChild(tiles[i]);
    }
    // console.log(tiles[i] + ", " + tiles[i].windex);
  }

  tiles2[origin] = [];
  var t = codearea2[origin].getElementsByClassName('tile');
  for (var i = 0; i < t.length; i++) {
    t[i].windex = origin;
    tiles2[origin].push(t[i]);
  }

  tiles2[target] = [];
  var t = codearea2[target].getElementsByClassName('tile');
  for (var i = 0; i < t.length; i++) {
    t[i].windex = target;
    tiles2[target].push(t[i]);
  }


  updateTileIndicator(origin);
  generateCode(origin);
  reflow(origin);
  checkpointSave(origin);
  clearPopouts(origin);

  updateTileIndicator(target);
  generateCode(target);
  reflow(target);
  checkpointSave(target);
  clearPopouts(target);
}

function findAllTiles(tile, list, dir) {
  if (dir == 0 || dir == -1) {
    if (tile.prev) {
      findAllTiles(tile.prev, list, -1);
    }
  }

  if (dir == 0 || dir == 1) {
    if (tile.next) {
      findAllTiles(tile.next, list, 1);
    }
  }

  for (var i = 0; i < tile.children.length; i++) {
    findAllTiles(tile.children[i], list, 0);
  }

  if (tile.classList && tile.classList.contains('tile')) {
    list.push(tile);
  }
}



function codeRunningToggle(windex,b) {
  if (windex == null) { return; }
  if (b) {
    Array.prototype.forEach.call(windows[windex].getElementsByClassName('goPie'), function(el) {
      el.style.fill = 'red';
    });
    Array.prototype.forEach.call(windows[windex].getElementsByClassName('goPieText'), function(el) {
      el.textContent = "■";
      el.style.fontSize = "50px";
    });
  } else {
    Array.prototype.forEach.call(windows[windex].getElementsByClassName('goPie'), function(el) {
      el.style.fill = 'black';
    });
    Array.prototype.forEach.call(windows[windex].getElementsByClassName('goPieText'), function(el) {
      el.textContent = String.fromCharCode(9658);
      el.style.fontSize = "30px";
    });
  }
}

function checkExpandOutput(id) {
  // console.trace();
  if (canvas2[id].parentNode.style.display == "none") {
    expandOutput(id);
  }
}

function resizeCanvas(id) {
  canvas2[id].width = canvas2[id].offsetWidth;
  canvas2[id].height = canvas2[id].offsetHeight;
}

function expandOutput(id) {
  // console.trace();
  var o = document.getElementById("outputarea" + id);
  var w = windows[id];
  if (o.style.display == "none") {
    o.style.display = "";
    codeRunningToggle(id,minigraceRunning[id]);
  } else {
    o.style.display = "none";
    if (minigraceRunning[id]) {
      Array.prototype.forEach.call(windows[id].getElementsByClassName('goPie'), function(el) {
        el.style.fill = 'gold';
      });
      Array.prototype.forEach.call(windows[id].getElementsByClassName('goPieText'), function(el) {
      el.textContent = "\uE70A";
      el.style.fontSize = "40px";
      });
    }
  }
}



function testScaleWindow(s) {
  scaleWindow(s,windows[0]);
}

function propComparator(prop) {
    return function(a, b) {
        return a[prop] - b[prop];
    }
}

function bringToFront(t) {
}

function clearCode(b,id) {
  // console.log("ClearCode");

  var children = codearea2[id].children;
  // console.log(children.length);
  for (var i = 0; i < codearea2[id].children.length; i++) {
    if (children[i].classList.contains('tile')) {
      codearea2[id].removeChild(children[i]);
      i--;
    }
  }
  tiles2[id] = [];
  // if (!b) {
    generateCode(id);
  // }


  Array.prototype.forEach.call(codearea2[id].getElementsByClassName('errorPie'), function(el) {
    el.style.fill = 'green';
  });

}



function clearOutput(id) {
  text2[id].value = "";
  var context = canvas2[id].getContext("2d");
  context.clearRect(0, 0, canvas2[id].width, canvas2[id].height);
}


function moveWindow(x,y) {
  var f = window.frameElement;
  var l,t;
  if (!moved) {
    l = f.offsetLeft;
    t = f.offsetTop;
    moved = 1;
  } else {
    l = parseFloat(f.style.left);
    t = parseFloat(f.style.top);
  }
  f.style.left = l + x + "px";
  f.style.top = t + y + "px";
}

function scaleWindow(s,t) {
  // console.log("Scale: " + s);
  var f = window.frameElement || t;
  // console.log("Window: " + f);
  if (f) {
    var w, h, l, t;
    if (!scaled) {
      w = f.offsetWidth;
      h = f.offsetHeight;
      l = f.offsetLeft;
      t = f.offsetTop;
      scaled = 1;
    } else {
      w = parseFloat(f.style.width);
      h = parseFloat(f.style.height);
      l = parseFloat(f.style.left);
      t = parseFloat(f.style.top);
      // console.log("Scale: " + w + "," + h + "," + l + "," + t);
    }

    f.style.width = w + s + "px";
    f.style.height = h + s + "px";
    // console.log("WH: " + w + "," + h + " - " + f.style.width + "," + f.style.height);

    f.style.left = (l - s *.5) + "px";
    f.style.top = (t - s *.5) + "px";
  }
}

function testRotateWindow(s) {
  rotateWindow(s,windows[0]);
}

function rotateWindow(s,t) {
  var f = window.frameElement || t;
  // console.log("Window: " + f);
  if (f) {
    if (isNaN(f.rot)) {
      f.rot = 0;
    }
    var r = f.rot + s;
    f.style.transform = "rotate(" + r + "deg)";
    // console.log("R:" + f.rot + "," + r);
    f.rot = r % 360;
  }
}

function addBlockWindow(id) {
  // console.log("addBlockWindow " + id);
  var w = 1920/1080;
  var h = 1080/1920;
  if (windowCount < windowMax) {
    // var iframe = document.createElement('iframe');
    // iframe.setAttribute('src', "code.html");
    var iframe = document.getElementById(windowIdName + id);
    // if (!iframe) { return; }
    // document.body.appendChild(iframe);4
    if (id == 0 || id == 3) {
      iframe.style.top = "10%";
      iframe.style.left = "15%";
      iframe.style.width = "70%";
      iframe.style.height = "80%";
      iframe.rot = 0;
      if (id == 3) {
        iframe.style.left = "45%";
        iframe.style.width = "50%";
        iframe.style.transform = "rotate(180deg)";
        iframe.rot = 180;
      }
    } else {
      iframe.style.top = "-20%";
      iframe.style.left = "30%";
      iframe.style.width = (70 * h) + "%";
      iframe.style.height = (80 * w) + "%";
      if (id == 1) {
        iframe.style.transform = "rotate(90deg)";
        iframe.rot = 90;
      }
      if (id == 2) {
        iframe.style.transform = "rotate(-90deg)";
        iframe.rot = -90;
      }
    }
    // iframe.style.position = "fixed";
    iframe.idx = windowCount;
    windows[windowCount] = iframe;
    iframe.depth = depth + windowCount;
    iframe.style.zIndex = iframe.depth;
    windowCount++;
  } else {
    //Max windows reached...
  }
}

function addOutputWindow(id) {
  //<textarea id="stdout_txt" style="clear:both;" cols="100" rows="5"></textarea>
  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", 500);
  canvas.setAttribute("height", 500);
  canvas.setAttribute("id", "out1");
  canvas.style.right = "0px";
  canvas.style.top = "0px";
  canvas.style.position = "absolute";
  canvas.style.clear = "both";
  // canvas.setAttribute("cols", 100);
  // canvas.setAttribute("rows", 5);
  document.body.appendChild(canvas);
  document.out1 = canvas;
}

function testWidget() {
  if (windows.length) {
    windows[0].contentWindow.createWidget2();
  }
}

function testWidget2() {
  if (windows.length) {
    windows[0].contentWindow.createWidget3();
  }
}

function closeWindowMenu(id) {
  windowMenu[id].parentNode.removeChild(windowMenu[id]);
  windowMenu[id] = null;
}



function showWindowMenu2(event,x,y) {
  // console.log(event.target);
  var target = event.target;
  if (!event.target) {
    target = document.getElementById('svg_' + event);
  }
  while (target.tagName != "svg") {
      target = target.parentNode;
  }
  var x = x | event.clientX;
  var y = y | event.clientY;

  var id = parseInt(target.getAttribute("id").slice(-1));
  // console.log("SWM2: " + x + ", " + y + ", " + id);
  var svg0 = document.getElementById('window_svg');
  var svg = svg0.cloneNode(true);
  svg.removeAttribute('id');
  // svg.style.top = ((windowarea.scrollTop + y) - svg.getAttribute("height") * .5) + "px";
  // svg.style.left = ((x) - svg.getAttribute("width") * .5) + 'px';
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.idx = id;
  svg.setAttribute("class","wmenu piemenu");
  svg0.parentNode.appendChild(svg);
  svg.setAttribute("ts", Date.now());
  createWindowMenu(svg,id);

  var w = window.innerWidth;
  var h = window.innerHeight;
  var sw = 200;
  var sw2 = 100;
  var sh = 200;
  var sh2 = 100;
  var wh = h/w;
  var min = 0;
  // console.log("sw2: " + sw2);
  // console.log("wh: " + wh);
  var gap = "0px";

  if (id == 0 || id == 3) {
    var l = Math.min(w-sw-min,Math.max(min,x - sw2));
    svg.style.left = l + "px";
    if (id == 0) {
      svg.style.bottom = gap;
    } else if (id == 3) {
      // svg.style.left = '45%';
      // svg.style.width = '50%';
      svg.style.top = gap;
      svg.style.transform = "rotate(180deg)";
    }
  }

  if (id == 1 || id == 2) {
    y += 40;
    // y = event.clientY;
    var t = Math.min(h-sh-min,Math.max(sh2+min,y - sh2));
    svg.style.top = t + "px";
    if (id == 1) {
      svg.style.left = "-45px";
      svg.style.transform = "rotate(90deg)";
    } else if (id == 2) {
      svg.style.right = "-45px";
      svg.style.transform = "rotate(-90deg)";
    }
  }

}

function setRotation(idx,rid) {
  //Set Rotate
  windows[idx].style.transform = transforms[rid];
  windows[idx].rid = rid;
}
function maximiseWindowToggle(id) {
  windows[id].maximised = !windows[id].maximised;
  arrangeWindows();
}

function windowMenuClick(idx,rid,state,pos) {
  //Borders: 2px -> 100% - 6px
  //50% -> Left: Width 50% - 4px
  //      Right: Width 50% - 6px


  //State: 1 Tap, 2 Hold

  //Operations:
  //Window orientation: rid
  //If w.rid == rid
  //  Tap  -> Toggle Maximise
  //  Hold -> Hide
  //Else
  //  Tap  -> Rotate to rid
  //  Hold -> Hide
  //Also fix window menu opening and closing
  if (ws_disabled != 1 && !socket_attempt) {
    ws_startWebSocket();
    socket_attempt = true;
  }


  //Tap or Hold?
  //Mouse example
  var r = false;
  var arrange = 0;
  if (windows[idx].rid != null && windows[idx].rid == rid) { r = true; }
  // console.log("Idx: " + idx + ", rid: " + rid + ", " + r + ", " + windows[idx].rid + ", " + (windows[idx].rid == rid));
  //Show Window
  if (windows[idx].style.display == "none") {
    if (state == 1) {
      windows[idx].style.display = "";
      windowsActive++;
      arrange = 1;
    } else {
      return;
    }
  }

  if (state == 1) {
    if (r && !arrange) {
      //Tap -> Toggle Maximise
      // console.log("Window: " + idx + ", Rotation: " + rid + " -> Toggle Maximise");
      maximiseWindowToggle(idx);
    } else {
      //Tap -> Rotate
      setRotation(idx,rid);
      windows[idx].pos = pos;
      arrange = 1;
      // console.log("Window: " + idx + ", Rotation: " + rid + " -> Rotate");
    }
  } else if (state == 2) {
    if (windows[idx].style.display == "") {
      windows[idx].style.display = "none";
      windowsActive--;
      arrange = 2;
    }
  }

  //Place windows into space available
  if (arrange == 1) {
    //Added window
    arrangeWindows();
  } else if (arrange == 2) {
    //Removed window
    if (!windowsActive) { return; }
    arrangeWindows();
  }
}

function windowComparator(a,b) {
  //Left Aligned
  if (a.rid == 1 && b.rid == 1) {
    return a.idx > b.idx ? 1 : a.idx < b.idx ? -1 : 0;
  }
  if (a.rid == 1) { return -1; }
  if (b.rid == 1) { return 1; }

  //Right Aligned
  if (a.rid == b.rid == 2) {
    return a.idx > b.idx ? -1 : a.idx < b.idx ? 1 : 0;
  }
  if (a.rid == 2) { return 1; }
  if (b.rid == 2) { return -1; }

  //Left to right x position
  return a.pos[0] < b.pos[0] ? -1: a.pos[0] > b.pos[0] ? 1: 0;
}

function reverseRotateXY(id, rid, x, y) {
  if (rid == 1) {
    var t = windows[id].offsetHeight - y;
    y = x;
    x = t;

    y += 40;
  } else if (rid == 2) {
    var t = windows[id].offsetWidth - x;
    x = y;
    y = t;
    x += 20;
  } else if (rid == 3) {
    // x = windows[id].offsetWidth - x + windows[id].offsetLeft;
    // y = windows[id].offsetHeight - y;

    x = windows[id].offsetWidth - x;
    y = windows[id].offsetHeight - y;
  }
  return [x,y];
}

function rotateXY(id, rid, x, y, b) {
  var mod = 0;
  if (rid == 1) {
    //RID 1
    mod = windows[id].offsetHeight * windows[id].order;
    var t = windows[id].offsetHeight - x + mod + 20;
    x = y - 20;
    y = t;
  } else if (rid == 2) {
    //RID 2
    // var t = x - 20;
    if (windowsActive == 1 && !windows[id].maximised) {
      mod = windows[id].offsetHeight;
    } else if (windowsActive > 1) {
      var order = windowsActive - 1 - windows[id].order;
      mod = windows[id].offsetHeight * windows[id].order;
    }
    var t = x - mod - 20;
    x = windows[id].offsetWidth - y + 20;
    y = t;
  } else if (rid == 3) {
    //RID 3
    x = windows[id].offsetWidth - x + windows[id].offsetLeft + 20;
    y = windows[id].offsetHeight - y + 20;
  }
  return [x,y];
}

function arrangeWindows() {
  var ids = [];
  var pos = [];
  var widx = [];
  var winLeft = 0;
  var winWidth = windowContainer.offsetWidth;
  var winWidth2 = winWidth * .5;
  var winWidth3 = winWidth2 * .5;
  var winHeight = windowContainer.offsetHeight;
  var winHeight2 = winHeight * .5;
  var winTop = 0;
  // console.log("Arrange: " + windowsActive);
  for (var i = 0; i < windowMax; i++) {
    if (windows[i].style.display != "none") {
      widx.push(i);
      ids.push(windows[i].rid);
      pos.push(windows[i].pos);
      if (windows[i].rid == 1 || windows[i].rid == 2) {
        var idx = i;
        setTimeout(function() {
          fixAce(idx);
        }, 1000);
      }
    }
    resizeCanvas(i);
  }



  var items = [];
  for (var i = 0; i < windowsActive; i++) {
    items[i] = {idx:widx[i], rid:ids[i], pos:pos[i]};
  }

  items.sort(windowComparator);
  for (var i = 0; i < items.length; i++) {
    windows[items[i].idx].order = i;
  }


  if (windowsActive == 1) {
    var width, height, left, top;
    var max = windows[widx[0]].maximised;
    if (ids[0] == 0 || ids[0] == 3) {
      if (max) {
        width = "100%";
        left = "0px";
      } else {
        width = "50%";
        left = Math.min(winWidth - winWidth2, Math.max(pos[0][0] - winWidth3, winLeft)) + "px";
      }
      height = "100%";
      top = "0px";
    } else if (ids[0] == 1 || ids[0] == 2) {
      width = winHeight;
      if (max) {
        height = winWidth;
      } else {
        height = winWidth2;
      }

      top = (width - height) * .5 + "px";
      left = (height - width) * .5 + "px";

      width += "px";
      height += "px";
    }
    positionWindow(widx[0], left, width, top, height, (ids[0] == 2));
  } else {
    var inc = 1 / windowsActive;
    var amt = 0;
    for (var i = 0; i < windowsActive; i++) {
      positionWindowInto(items[i].idx, items[i].rid, amt, 0, inc, 1, i);
      amt += inc;
      windows[items[i].idx].maximised = 0;
    }
  }
}

function fixAce(idx) {
  Array.prototype.forEach.call(editor3[idx].getElementsByClassName('ace_line'), function(el) {
    el.style.height = "17px";
  });
  windows[idx].getElementsByClassName('ace_scroller')[0].style.left = "30px";
  windows[idx].getElementsByClassName('ace_layer')[0].style.width = "30px";
  windows[idx].getElementsByClassName('ace_gutter-active-line')[0].style.height = "17px";
  var al = windows[idx].getElementsByClassName('ace_active-line');
  if (al && al[0]) {
    al[0].style.height = "17px";
  }
  Array.prototype.forEach.call(editor3[idx].getElementsByClassName('ace_gutter-cell'), function(el) {
    el.style.height = "17px";
    var l = el.innerHTML.length;
    if (l == 1) {
      el.style.paddingLeft = pad1;
    } else if (l == 2) {
      el.style.paddingLeft = pad2;
    } else if (l == 3) {
      el.style.paddingLeft = pad3;
    }
  });
}

function positionWindowInto(id, rid, left, top, width, height, n, b) {
  var l, t, w, h;
  if (rid == 0 || rid == 3) {
    w = 100 * width + "%";
    h = 100 * height + "%";
    l = windowContainer.offsetWidth * left + "px";
    t = windowContainer.offsetHeight * top + "px";
  } else if (rid == 1 || rid == 2) {
    w = windowContainer.offsetHeight * height;
    h = windowContainer.offsetWidth * width;
    t = (w - h) * .5 + "px";
    l = (h - w) * .5 + h * (n) + "px";
    w += "px";
    h += "px";
  }
  positionWindow(id,l,w,t,h, b);
}

function positionWindow(id, left, width, top, height, b){
  windows[id].style.width = width;
  windows[id].style.height = height;
  if (!b) {
    windows[id].style.left = left;
    windows[id].style.right = "";
  } else {
    windows[id].style.right = left;
    windows[id].style.left = "";
  }
  windows[id].style.top = top;
}

function createWindowMenu(svg,rid) {
  //Create base pie
  var pieces = 4;
  var max = 180;
  var start = -90;
  var seg = max/pieces;
  for (var i = 0; i < pieces; i++) {
    createPieSegment(svgX,svgY,100,50,start,seg,svg,i,-3,i+1,rid);
    start += seg;
  }

  //Path for Text
  // var p1 = [50,200];
  // var p2 = [150,200];
  var p1 = [50,svgY];
  var p2 = [150,svgY+10];
  var r = [50,50];
  var ang = 180;

  var data =  "M " + p1[0] + " " + p1[1] + " ";
  data += "A " + r[0] + " " + r[1] + " " + ang + " 0 1 " + p2[0] + " " + p2[1] + " ";

  var mypath2 = document.createElementNS("http://www.w3.org/2000/svg","path");
  mypath2.setAttributeNS(null, "id", "path" + "w" + win1 + win2);
  mypath2.setAttributeNS(null, "d", data);
  mypath2.setAttributeNS(null,"fill", "none");
  mypath2.setAttributeNS(null,"stroke", "none");
  svg.appendChild(mypath2);

  //Text - Block Window
  var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text1.setAttributeNS(null, "fill", "black");
  text1.setAttributeNS(null,"font-size","15px");
  text1.setAttributeNS(null, "dominant-baseline", "hanging");
  var textpath = document.createElementNS("http://www.w3.org/2000/svg","textPath");
  textpath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#path" + "w" + win1 + win2);
  textpath.setAttribute("startOffset","50%");
  textpath.setAttribute("text-anchor","middle");
  var txtElem = document.createTextNode("Block Windows");
  text1.setAttribute("pointer-events", "none");
  textpath.appendChild(txtElem);
  text1.appendChild(textpath);
  svg.appendChild(text1);

  //Cancel Button - BG
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.setAttribute("cx", 100);
  newElement.setAttribute("cy", svgY);
  newElement.setAttribute("r", 30);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.9";
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event){ if (mouse) closePieMenu(event); });
  newElement.addEventListener("touchend", function(event) { closePieMenu(event); });
  newElement.style.pointerEvents = "all";

  //Line LR
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 90);
  newElement.setAttribute("y1", svgY-2);
  newElement.setAttribute("x2", 110);
  newElement.setAttribute("y2", svgY-22);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event){ if (mouse) closePieMenu(event); });
  newElement.addEventListener("touchend", function(event) { closePieMenu(event); });
  newElement.style.pointerEvents = "all";

  //Line RL
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 110);
  newElement.setAttribute("y1", svgY-2);
  newElement.setAttribute("x2", 90);
  newElement.setAttribute("y2", svgY-22);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event){ if (mouse) closePieMenu(event); });
  newElement.addEventListener("touchend", function(event) { closePieMenu(event); });
  newElement.style.pointerEvents = "all";





  //Text pathing counter
  if (win2 == "z") {
    win2 = "A";
  } else if (win2 == "Z") {
    if (win1 == "z") {
      win1 = "A";
      win2 = "a";
    } else if (win1 == "Z") {
      win1 = "a";
      win2 = "a";
    } else {
      win1 = nextChar(win1);
      win2 = "a";
    }
  } else {
    win2 = nextChar(win2);
  }
}


function createWidget3() {
  var vars = codearea.getElementsByClassName("tile");
  for (var i = 0; i < vars.length; i++) {
    var txt = document.createTextNode("   ");
    vars[i].appendChild(txt);
  }
}

function addPointer(tile) {
  var marker = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  marker.setAttribute("width", markerWidth);
  marker.setAttribute("height", markerHeight);
  tile.appendChild(marker);
  marker.style.position = "absolute";
  marker.style.left = "calc(50% - 15px)";
  marker.style.top = "-10px";

  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polygon'); //Create a path in SVG's namespace
  newElement.setAttribute("points", "0,10 15,0 30 10");
  newElement.style.fill = "gold";
  newElement.style.fillOpacity = "1";
  marker.appendChild(newElement);

  var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'polygon'); //Create a path in SVG's namespace
  newElement2.setAttribute("points", "0,10 15,0 30 10");
  newElement2.style.stroke = "goldenrod";
  newElement2.style.fill = "none";
  marker.appendChild(newElement2);
  var anim = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
  anim.setAttribute("attributeName", "fill-opacity");
  anim.setAttribute("begin", "0s");
  anim.setAttribute("dur", "1.5s");
  anim.setAttribute("from", 0.2);
  anim.setAttribute("to", 1);
  anim.setAttribute("repeatCount", "indefinite");


  tile.marker = marker;
  tile.oldBorder = tile.style.borderTop;
  tile.style.borderTop = "gold solid 2px";
}

function removePointer(tile) {
  if (tile.marker) {
    tile.removeChild(tile.marker);
    tile.style.borderTop = tile.oldBorder;
    tile.oldBorder = null;
    tile.marker = null;
  }
}

function createWidget2() {
  // interactMode = 1;

  var vars = codearea.getElementsByClassName("tile");
  // console.log("Widgets needed : " + vars.length);
  for (var i = 0; i < vars.length; i++) {
    // <div class="select_widget">+
    var div = document.createElement('div');
    div.className += "select_widget";
    var txt = document.createTextNode('+');
    div.appendChild(txt);
    // vars[i].appendChild(div);
    // div.style.left = "-97%";
    // div.style.position = "relative";
    // vars[i].width -= "30px";
    var box = document.createElement('div');
    var left = vars[i].style.left;
    var top = vars[i].style.top;
    var contained = false;
    if (vars[i].parentNode) {
      vars[i].parentNode.insertBefore(box,vars[i]);
      if (vars[i].parentNode.classList.contains("hole")) {
        contained = true;
      }
    }
    //#TODO move to css .box and .box .hole? ASAP!
    box.appendChild(div);
    box.appendChild(vars[i]);
    vars[i].style.display = "inline-flex";
    vars[i].style.left = "";
    vars[i].style.top = "";
    vars[i].style.position = "static";
    vars[i].style.float = "right";
    div.style.display = "inline-block";
    box.style.textAlign = "center";
    // box.style.display = "inline-flex";
    box.style.position = "absolute";
    box.style.width = "auto";
    box.style.left = left;
    box.style.top = top;
    if (contained) {
      box.style.position = "relative";
      vars[i].style.position = "inherit";
      box.style.display = "inline-flex";
    }

    //Append Touch Events
    div.tile = vars[i];
    // var img = document.createElement("img");
    // img.src = "move.png";
    // img.style.maxHeight = "100%";
    // div.appendChild(img);
    addWidgetTouch(div);

    vars[i].style.borderTop = "gold solid 2px";

    var marker = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    marker.setAttribute("width", 30);
    marker.setAttribute("height", 10);
    box.appendChild(marker);
    // if (box.parentNode.classList.contains("hole")) {
      // marker.style.position = "relative";
      // marker.style.left = "calc(-50% + 13px)";
    // } else {
      marker.style.position = "absolute";
      marker.style.left = "50%";
    // }
    marker.style.top = "-10px";

    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polygon'); //Create a path in SVG's namespace
    newElement.setAttribute("points", "0,10 15,0 30 10");
    // newElement.setAttribute("cx", 15);
    // newElement.setAttribute("cy", 15);
    // newElement.setAttribute("r", 15);
    newElement.style.fill = "gold";
    newElement.style.fillOpacity = "1";
    marker.appendChild(newElement);

    var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'polygon'); //Create a path in SVG's namespace
    newElement2.setAttribute("points", "0,10 15,0 30 10");
    newElement2.style.stroke = "goldenrod";
    newElement2.style.fill = "none";
    marker.appendChild(newElement2);
    var anim = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
    anim.setAttribute("attributeName", "fill-opacity");
    anim.setAttribute("begin", "0s");
    anim.setAttribute("dur", "1.5s");
    anim.setAttribute("from", 0.2);
    anim.setAttribute("to", 1);
    anim.setAttribute("repeatCount", "indefinite");
    // newElement.appendChild(anim);


    // marker.style.top = "50%";

  }
}
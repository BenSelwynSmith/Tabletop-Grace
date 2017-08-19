"use strict"
var targets = [];
var dragStarted = false;
var nodes = {};
var touches = {};
var pieMenuTouches = {};
var windowTouches = {};
var optTouches = {};
var btnTouches = {};
var windowMenuTouches = {};
var segmentTouches = {};

//Squared distance in pixels
var pieMenuMoveThresholdCount = 10;
var pieMenuMoveThresholdDistance = 40;
var tileMenuMoveThresholdDistance = 30;
var wMenuThresholdDistance = 50;
var optMoveThresholdDistance = 2;
var btnMoveThresholdDistance = 2;
var segMoveThresholdDistance = 20;
var secMenuDistance = 100;
var currentFocus;
var pieMenuEndDelay = 100;
var shortPress = 150;
var longPress = 400;

var aceContent;

var toDeg = (180 / Math.PI);
var toRad = Math.PI / 180;

var sameDirThresh = 10 * toRad //10deg
var rotateMinThresh = 3 * toRad //3deg
var moveThresh = 1;
var lastUpdate;

var tileZIndex2 = [5,5,5,5];
var tileLastZIndex2 = [5,5,5,5];
var tileMaxZIndex = 1000;

var keyboards = [];


function addTouch(i) {  
  // window.addEventListener('contextmenu', function(ev) {
    // ev.preventDefault();
  // });  
  // aceContent = document.getElementsByClassName("ace_content")[0];
  addPieTouch(i);
  addTileTouch(i);
}

function setTilesZIndex(id) {
  //Give all tiles a zindex  
  for (var i = 0; i < tiles2[id].length; i++) {
    tiles2[id][i].style.zIndex = tileZIndex2[id];
  }
}

function tileBringToFront(tile) {
  var id = tile.windex;
  if (tile.style.zIndex == tileLastZIndex2[id] && tileLastZIndex2[id] != tileZIndex2[id]) { return; }
  tileLastZIndex2[id]++;
  tile.style.zIndex = tileLastZIndex2[id];
  if (tileLastZIndex2[id] > tileMaxZIndex) {
    setTilesZIndex(id);
    tileLastZIndex2[id] = tileZIndex2[id] + 1;
    tile.style.zIndex = tileLastZIndex2[id];
  }
}

function resetPage() {
  window.location = window.location.pathname;
}

function addPieTouch(i) {  
  codearea2[i].addEventListener('touchstart', pieTouchStart);
  codearea2[i].addEventListener('touchmove', pieTouchMove);
  codearea2[i].addEventListener('touchend', pieTouchEnd);
  // aceContent.addEventListener('touchstart', pieTouchStart);
  // aceContent.addEventListener('touchmove', pieTouchMove);
  // aceContent.addEventListener('touchend', pieTouchEnd);
  // codearea.addEventListener('click', function(event) {
    // showPieMenu(event.pageX, event.pageY);
  // });
  codearea2[i].t1 = codearea2[i].t2 = null;
}


function addOptTouch(opt, func) {
  opt.addEventListener('touchstart', optTouchStart);
  opt.addEventListener('touchmove', optTouchMove);
  opt.addEventListener('touchend', optTouchEnd);
  opt.func = func;
}

function addButtonTouch(btn, func, src) {
  btn.addEventListener('touchstart', btnTouchStart);
  btn.addEventListener('touchmove', btnTouchMove);
  btn.addEventListener('touchend', btnTouchEnd);
  btn.btnFunc = func;
  btn.btnSrc = src;
}

function addWMenuTouch() {
  windowarea = document.getElementById("windowarea");
  windowarea.style.pointerEvents = "none";
  var blank = document.getElementById("blank");
  blank.addEventListener('click', function(event) { event.preventDefault(); });
  blank.addEventListener('touchstart', function(event) { event.preventDefault(); });
  blank.addEventListener('touchmove', function(event) { event.preventDefault(); });
  blank.addEventListener('touchend', function(event) { event.preventDefault(); });


  for (var i = 0; i < 4; i++) {    
    var id = "svg_" + i;
    var elem = document.getElementById(id);
    elem.addEventListener('touchstart', function(event) { event.preventDefault(); });
    elem.addEventListener('touchmove', function(event) { event.preventDefault(); });
    elem.addEventListener('touchend', function(event) { wMenuEnd(event); });
    // elem.addEventListener('click', function(event) { showWindowMenu2(event); event.preventDefault(); });
    elem.style.pointerEvents = "all";
  }
}


function btnTouchStart(event) {
  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;

    if (!(id in btnTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      btnTouches[id] = {x:x, y:y, target:event.target};
    }
  }
}

function btnTouchMove(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in btnTouches)) { continue; }
    if (btnTouches[id].target == event.target && id in btnTouches) {
      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - btnTouches[i].x, 2) + Math.pow(y - btnTouches[i].y, 2));
      if (dist > btnMoveThresholdDistance) {
        delete btnTouches[id];
        continue;
      }
    }
  }
}

function btnTouchEnd(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in btnTouches)) { continue; }
    if (btnTouches[id].target == event.target && id in btnTouches) {
      event.target.btnFunc(event, event.target.btnSrc);
    }
    delete btnTouches[id];
  }
}

function wMenuStart(event,idx) {
  event.preventDefault();
  // var idx = ((event.target.getAttribute("id").split("_"));
  var target = event.target;
  while (!(target.tagName == "svg") && target.parentNode != null) {
    target = target.parentNode;
  }
  var idx = target.getAttribute("id").split("_")[1];

  // console.log("wMenuStart: " + idx + "," + target);
  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;

    if (!(id in windowMenuTouches)) {
      //New Touch Event

      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      windowMenuTouches[id] = {x:x, y:y, target:event.target, origin:idx};
    }
  }
}

function wMenuMove(event) {
  console.log("wMenuMove");
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in windowMenuTouches)) { continue; }

    //Distance check
    var x = event.changedTouches[i].clientX;
    var y = event.changedTouches[i].clientY;
    var dist = Math.sqrt(Math.pow(x - windowMenuTouches[i].x, 2) + Math.pow(y - windowMenuTouches[i].y, 2));
    if (dist > wMenuThresholdDistance) {
      if (wMenuCheck(event.changedTouches[i],windowMenuTouches[id])) {
        showWindowMenu(windowMenuTouches[id].origin,windowMenuTouches[id].x,windowMenuTouches[id].y);
        delete windowMenuTouches[id];
      }
    }

  }
}

function wMenuEnd(event) {
  // console.log("wMenuEnd");
  event.preventDefault();
  for (var i = 0; i < event.changedTouches.length; i++) {
    var x = event.changedTouches[i].clientX;
    var y = event.changedTouches[i].clientY;
    showWindowMenu2(event, x, y)
    // var id = event.changedTouches[i].identifier;
    // if (!(id in windowMenuTouches)) { continue; }
    // delete windowMenuTouches[id];
  }
}

function wMenuCheck(touchEvent, wMenuTouch) {
  var x2 = wMenuTouch.x - touchEvent.clientX;
  var y2 = wMenuTouch.y - touchEvent.clientY;
  var targetAngle = [90,180,0,-90];
  var xAngle = Math.atan2(y2,x2) * toDeg;
  // var yAngle = 90 - xAngle;
  var success = 0;
  var variance = 45;
  // console.log("xA: " + (xAngle * toDeg));
  //0 B, 1 L, 2 R, 3 T
  // 90  180    0  -90
  if (wMenuTouch.origin == 0) {
    console.log((targetAngle[0] - variance) + " to " + (targetAngle[0] + variance) + ", actual:" + xAngle);
    if (targetAngle[0] + variance > xAngle && targetAngle[0] - variance < xAngle) {

      success = 1;
    }
  } else if (wMenuTouch.origin == 1) {
    console.log((targetAngle[1] - variance) + " to " + (targetAngle[1] + variance) + ", actual:" + xAngle);
    if (targetAngle[1] + variance > xAngle && targetAngle[1] - variance < xAngle) {

      success = 1;
    }
  } else if (wMenuTouch.origin == 2) {
    console.log((targetAngle[2] - variance) + " to " + (targetAngle[2] + variance) + ", actual:" + xAngle);
    if (targetAngle[2] + variance > xAngle && targetAngle[2] - variance < xAngle) {

      success = 1;
    }
  } else if (wMenuTouch.origin == 3) {
    console.log((targetAngle[3] - variance) + " to " + (targetAngle[3] + variance) + ", actual:" + xAngle);
    if (targetAngle[3] + variance > xAngle && targetAngle[3] - variance < xAngle) {

      success = 1;
    }
  }

  if (success) { console.log("success"); }
  return success;
}



function optTouchStart(event) {
  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;

    if (!(id in optTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      optTouches[id] = {x:x, y:y, target:event.target};
    }
  }
}

function optTouchMove(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in optTouches)) { continue; }
    if (optTouches[id].target == event.target && id in optTouches) {
      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - optTouches[i].x, 2) + Math.pow(y - optTouches[i].y, 2));
      if (dist > optMoveThresholdDistance) {
        delete optTouches[id];
        continue;
      }
    }
  }
}

function optTouchEnd(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in optTouches)) { continue; }
    if (optTouches[id].target == event.target && id in optTouches) {
      event.target.func(event);
    }
    delete optTouches[id];
  }
}

function pieTouchStart(event) {
  var s = "Touches: ";
  for (var i = 0; i < event.touches.length; i++) {
    s += event.touches[i].identifier + " ";
  }
  console.log(s);

  event.preventDefault();
  var menus = codearea.getElementsByClassName('popup-menu');
  if (menus.length) {
    for (var i=0; i<menus.length; i++) {
      codearea.removeChild(menus[i]);
      return;
    }
  }

  window.parent.bringToFront(window.frameElement);

  if (currentFocus) {
    currentFocus.blur();
    currentFocus = null;
  }

  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;

    if (!(id in pieMenuTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      pieMenuTouches[id] = {x:x, y:y, updates:0, ix:window.frameElement.offsetLeft, iy:window.frameElement.offsetTop};
      pieMenuTouches[id].sx = event.targetTouches[i].screenX;
      pieMenuTouches[id].sy = event.targetTouches[i].screenY;
      pieMenuTouches[id].id = id;



      /*if (codearea.t1 == null && (codearea.t2 != null || codearea.t2 != id)) {
        codearea.t1 = id;
      } else if (codearea.t2 == null && (codearea.t1 != null || codearea.t1 != id)) {
        codearea.t2 = id;
      }*/

    }
  }
  // event.preventDefault();
  console.log("Start: " + codearea.t1 + "," + codearea.t2);
}

function pieTouchMove(event) {
  event.preventDefault();
  if (!window.frameElement) { return; }
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (event.target == codearea && id in pieMenuTouches) {
      console.log("Move: " + id);
      if (pieMenuTouches[id].dying) {
        continue;
      }
      //Moves check - Number of updates since this touch began
      if (pieMenuTouches[id].updates > pieMenuMoveThresholdCount) {
        // console.log("ID M: " + id + "is dying");
        pieMenuTouches[id].dying = 1;
        window.setTimeout(pieTouchDelayedEnd, pieMenuEndDelay, id);
        continue;
      }

      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - pieMenuTouches[id].x, 2) + Math.pow(y - pieMenuTouches[id].y, 2));
      if (dist > pieMenuMoveThresholdDistance) {
        windowTouches[id] = pieMenuTouches[id];
        delete pieMenuTouches[id];

        if (codearea.t1 == codearea.t2 == null) {
          codearea.t1 = id;
        } else if (codearea.t1 == null) {
          if (codearea.t2 != id) {
            codearea.t1 = id;
          }
        } else if (codearea.t2 == null) {
          if (codearea.t1 != id) {
            codearea.t2 = id;
          }
        }

        if (codearea.t2 == codearea.t1) {
          codearea.t2 = null;
        }

        continue;
      }

      pieMenuTouches[id].updates++;
    }
  }

  if (codearea.t1 != null && codearea.t2 != null) {
    //Rotation and scaling
    var touch1;
    var touch2;
    var touch11;
    var touch21;
    var id1;
    var id2;
    console.log("SR");

    //Find touches
    for (var i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifier == codearea.t1) {
        touch1 = event.touches[i];
        id1 = event.touches[i].identfier;
      }
      if (event.touches[i].identifier == codearea.t2) {
        touch2 = event.touches[i];
        id2 = event.touches[i].identfier;
      }
    }

    // console.log("SR - T11: " + touch11 + ", T21: " + touch21);
    // console.log("SR: eventTouches: " + event.touches.length + ", windowTouches: " + windowTouches);


    if (touch1 != null && touch2 != null) {
      // var p1 = [touch1.clientX,touch1.clientY];
      // var p2 = [touch2.clientX,touch2.clientY];
      // console.log("SR0: " + v1[0] + "," + v1[1] + " - " + v2[0] + "," + v2[1]);

      
      if (lastUpdate) {
        var v = [];      
        v[0] = [touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY];
        v[1] = [lastUpdate.touch2.clientX - lastUpdate.touch1.clientX, lastUpdate.touch2.clientY - lastUpdate.touch1.clientY];
        v[2] = [touch1.clientX - lastUpdate.touch1.clientX, touch1.clientY - lastUpdate.touch1.clientY];
        v[3] = [touch2.clientX - lastUpdate.touch2.clientX, touch2.clientY - lastUpdate.touch2.clientY];
        

        var vm = [];      
        for (var i = 0; i < 4; i++) {
          vm[i] = Math.sqrt(Math.pow(v[i][0],2) + Math.pow(v[i][1],2));
        }

        var vd12 = v[0][0] * v[1][0] + v[0][1] * v[1][1];
        var vd34 = v[2][0] * v[3][0] + v[2][1] * v[3][1];
        
        var a1 = toDeg * Math.atan2(v[0][1],v[0][0]);
        var a2 = toDeg * Math.atan2(v[1][1],v[1][0]);
        var a3 = toDeg * Math.atan2(v[2][1],v[2][0]);
        var a4 = toDeg * Math.atan2(v[3][1],v[3][0]);
        
        // var va12 = Math.acos(vd12 / (vm[0] * vm[1]));
        // var va34 = Math.acos(vd34 / (vm[2] * vm[3]));

        var v3m = (Math.abs(v[2][0] + v[2][1]) > moveThresh);
        var v4m = (Math.abs(v[3][0] + v[3][1]) > moveThresh);

        console.log("Move: " + v3m + ", " + v4m);
        // console.log("Angle: " + va12 + ", " + va34);
        console.log("Angle : " + a1 + ", " + a2 + ", " + (a2 - a1));
        console.log("Angle2: " + a3 + ", " + a4 + ", " + (a4 - a3));
        
        // var done = 0;
        // if (v3m && v4m) {
          // Dragging
          // if (Math.abs(va34) < sameDirThresh) {
            // Perform Dragging
            // console.log("Drag");
            // return;
          // }
        // } 

        // if (!done && (v3m || v4m)) {
          // if (Math.abs(va12) > rotateMinThresh) {
            // console.log("Rotate");
            // return;
          // }
        // }
        // if (!done) { 
          // console.log("Other");
        // }
        
      }
      lastUpdate = {
        touch1 : {clientX: touch1.clientX, clientY: touch1.clientY},
        touch2 : {clientX: touch2.clientX, clientY: touch2.clientY}
      }
    }
  }
}

function pieTouchEnd(event) {

  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    console.log("End Touch: " + id + "," + codearea.t1 + "," + codearea.t2 + "," + (codearea.t1 == id) + "," + (codearea.t2 == id));
    if (id in pieMenuTouches) {
      if (pieMenuTouches[id].dying) {
        continue;
      }
      pieMenuTouches[id].dying = 1;
      console.log("ID E: " + id + "is dying");
      window.setTimeout(pieTouchDelayedEnd, pieMenuEndDelay, id);
      continue;
    } else if (id in windowTouches) {
      delete windowTouches[id];
    }
    if (id == codearea.t1) { codearea.t1 = null; lastUpdate = null; }
    if (id == codearea.t2) { codearea.t2 = null; lastUpdate = null; }
    console.log("End Touch2: " + id + "," + codearea.t1 + "," + codearea.t2 + "," + (codearea.t1 == id) + "," + (codearea.t2 == id));
  }
  event.preventDefault();
}

function pieTouchDelayedEnd(id) {
  // console.log("DelayEnd: " + id);
  if (!(id in pieMenuTouches)) { return; }
  if (pieMenuTouches[id].done) { delete pieMenuTouches[id]; return; }

  var p1 = [pieMenuTouches[id].x,pieMenuTouches[id].y];
  //Sec menu
  var count = 0;
  for (var i in pieMenuTouches) {
    var p2 = [pieMenuTouches[i].x,pieMenuTouches[id].y];
    var dist = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    // console.log("DelayEnd: " + id + ", Dist:" + (dist < secMenuDistance) + ", oid: " + i + ", done: " +
        // pieMenuTouches[i].done + ", dying: " + pieMenuTouches[i].dying);
    if (pieMenuTouches[i].id == id) { continue; }
    if (pieMenuTouches[i].done) { continue; }
    if (!pieMenuTouches[i].dying) { continue; }

    if (dist < secMenuDistance) {
      // console.log("showSecMenu");
      showSecMenu(p1[0] + (p2[0] - p1[0]) * .5,p1[1] + (p2[1] - p1[1]) * .5);
      delete pieMenuTouches[id];
      delete pieMenuTouches[i];
      return;
    }
    count++;
  }
  // console.log("PieTouchDelayEnd: " + id + ", " + count);

  //Pie menu
  if (currentView == 0) {
    showPieMenu(p1[0],p1[1]);
  }
  delete pieMenuTouches[id];
}


/*function pieTouchToggle(event) {
  console.log("PieTouch: " + event.changedTouches.length);
  for (var i = 0; i < event.changedTouches.length; i++) {
    var x = event.changedTouches[i].clientX;
    var y = event.changedTouches[i].clientY;
    showPieMenu(x,y);
  }
}*/

function addInputEventsToTile(tile) {
  input = tile.getElementsByTagName('input');
  for (var i = 0; i < input.length; i++) {
    attachInputEvents(input);
  }
}

function addWidgetTouch(widget, tile) {
    widget.addEventListener('touchstart', tileTouchStart);
    widget.addEventListener('touchmove', tileTouchMove);
    widget.addEventListener('touchend', tileTouchEnd);
}

function widgetTest(event) {
  console.log("Widget: " + event.target.tile);
}

function addTileTouchToTile(tile) {
    tile.addEventListener('touchstart', tileTouchStart);
    tile.addEventListener('touchmove', tileTouchMove);
    tile.addEventListener('touchend', tileTouchEnd);
    setTilesZIndex(tile.windex);
}

function addTileTouch(id) {
  //Adds touch listeners for touch start, move and end
  var tiles = codearea2[id].getElementsByClassName('tile');
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].windex = id;
    addTileTouchToTile(tiles[i]);
  }
  console.log(id + " Added touch to tiles " + tiles.length);
  holes2[id] = codearea2[id].getElementsByClassName("hole");
}

function tileTouchStart(event) {
  event.stopPropagation();
  event.preventDefault();
  for (var i = 0; i < event.targetTouches.length; i++) {
    var target = event.targetTouches[i].target;
    var id = event.targetTouches[i].identifier;
    console.log("TileTouchStart: " + id);

    var tileTarget = target;
    while (!tileTarget.classList.contains("tile")) {
      tileTarget = tileTarget.parentNode;
    }

    tileBringToFront(tileTarget);

    //New Touch Event
    if (!(id in touches)) {



      event.preventDefault();
      var xy = findOffsetTopLeft(tileTarget);
      var x = event.targetTouches[i].clientX - xy.left;
      var y = event.targetTouches[i].clientY - xy.top;



       touches[id] = {x:(event.targetTouches[i].clientX - xy.left), y:(event.targetTouches[i].clientY - xy.top),
          target:target, hasContinue:0, updates:0, xy: xy, ts:Date.now(), tile:tileTarget, ox: event.targetTouches[i].clientX, oy: event.targetTouches[i].clientY  };
      console.log("New Touch: " + id + ", " + touches[id].x + ", " + touches[id].y + ", " + touches[id].target + ", " + touches[id].hasContinue
        + ", " + touches[id].xy  + ", " + touches[id].ts + ", " + touches[id].tile);
    }
  }
}

function tileTouchMove(event) {
  event.stopPropagation();
  event.preventDefault();
  for (var i = 0; i < event.changedTouches.length; i++) {
    var target = event.targetTouches[i].target;
    var id = event.targetTouches[i].identifier;
    console.log("TileTouchMove: " + id);
    if (!(id in touches)) { continue; }
    if (!touches[id].hasContinue) {
      //Moves check - Number of updates since this touch began
      var timeDif = Date.now() - touches[id].ts;


      // var varTile = touches[id].tile.classList.contains('var');
      // var inputTile = touches[id].target.tagName.toUpperCase() == "INPUT";



      // if (timeDif > shortPress) {
        // if (!varTile && !inputTile) {
          // console.log(">shortPress");
          // touches[id].hasContinue = 1;
        // }
        // if (timeDif > longPress) {
          // if (varTile || inputTile) {
            // console.log(">longPress");
            // touches[id].hasContinue = 1;
          // }
        // }
      // }

      //Distance check
      // if (!touches[id].hasContinue) {
        var x = event.changedTouches[i].clientX;
        var y = event.changedTouches[i].clientY;
        var dist = Math.sqrt(Math.pow(x - touches[id].ox, 2) + Math.pow(y - touches[id].oy, 2));
        if (dist > tileMenuMoveThresholdDistance) {
          touches[id].hasContinue = 1;
          console.log(">distance: " + dist);
        }
      // }
    }

    target = touches[id].tile;
    var parent = target.parentNode;
    var origTarget = target;

    if (touches[id].hasContinue == 1) {
      //Start Drag

      //If tile is in another tile
      var originalHole = null;
      if (parent != codearea) {
          originalHole = parent;
          originalHole.style.width = originalHole.offsetWidth + 'px';
          originalHole.style.height = originalHole.offsetHeight + 'px';
      }
      var xy = touches[id].xy;
      target.style.position = 'absolute';
      target.style.top = xy.top + 'px';
      target.style.left = xy.left + 'px';

      var tmp = target;
      var runningTop = xy.top;
      if (event.shiftKey) {
          //#TODO make some alternative to shift key for touch,
          //      this bit lets you drag a single block out of a stack
          // if (tmp.prev)
              // tmp.prev.next = tmp.next;
          // if (tmp.next)
              // tmp.next.prev = tmp.prev;
          // tmp.next = false;
          // tmp.prev = false;
      } else if (tmp.prev) {
          tmp.prev.next = false;
      }
      while (tmp && parent != codearea) {
          parent.removeChild(tmp);
          codearea.appendChild(tmp);
          tmp.style.position = 'absolute';
          tmp.style.top = runningTop + 'px';
          tmp.style.left = xy.left + 'px';
          runningTop += tmp.offsetHeight;
          tmp = tmp.next;
      }
      touches[id].originalHole = originalHole;


      //Start dragging
      addPointer(target);
      target.classList.add('selected');
      target.classList.add('dragging');
      var ch = target.getElementsByClassName('tile');
      for (var j = 0; j < ch.length; j++) {
        ch[j].classList.add('dragging');
      }
      var tmp = target;
      while (typeof tmp.next != "undefined" && tmp.next) {
        tmp = tmp.next;
        tmp.classList.add('selected');
        tmp.classList.add('dragging');
        var ch2 = tmp.getElementsByClassName('tile');
        if (!ch2) { continue; }
        for (var j = 0; j < ch.length; j++) {
          if (!ch2[j]) { continue; }
          ch2[j].classList.add('dragging');
        }
      }
      if (typeof target.prev != "undefined" && target.prev) {
        target.prev.next = false;
        target.prev = false;
      }
      touches[id].hasContinue = 2;
    }

    if (touches[id].hasContinue == 2) {
      //Continue Drag
      var top = (event.changedTouches[i].clientY - touches[id].y);
      var left = (event.changedTouches[i].clientX - touches[id].x);
      target.style.top = top + 'px';
      target.style.left = left + 'px';
      

      top += codearea.scrollTop;
      left += codearea.scrollLeft;
      // var bestHole = findHole(target,touches[id].x,touches[id].y,left,top,true);
      var l2 = target.offsetLeft + target.offsetWidth * .5;
      var r2 = l2;
      var t2 = target.offsetTop - markerHeight * .9;
      var b2 = t2;
      // var r2 = target.offsetLeft + target.offsetWidth * .5;
      // var b2 = target.offsetTop + markerHeight * 0.2;
      var bestHole = findHole(target, l2, t2, r2, b2, true);


      if (bestHole != null && bestHole.children.length == 0) {
          bestHole.style.background = 'yellow';
          var reason = {};
          if (!holeCanHoldTile(bestHole, target, reason)) {
              bestHole.style.background = 'pink';
              overlayError(reason.error, bestHole);
          }
      }

      var tmp = target;
      while (typeof tmp.next != "undefined" && tmp.next) {
        var last = tmp;
        tmp = tmp.next;
        tmp.style.top = (last.offsetTop + last.offsetHeight) + 'px';
        tmp.style.left = last.offsetLeft + 'px';
      }


      for (var i=0; i<tiles.length; i++) {
        // console.log("IsBottomTarget Call: " + ch + ", " + target);
        var ch = tiles[i];
        if (ch.classList.contains('dragging')) { continue; }
        if (ch == target)
            continue;
        if (ch.parentNode == toolbox) { continue; }
        if (isBottomTarget(ch, target)) {
            ch.classList.add('bottom-join-target');
        } else {
            ch.classList.remove('bottom-join-target');
        }
      }
    }
  }
}

/*f (touches[id].target.classList.contains('var')) {
        if (timeDif < shortPress) {
          popupVarMenu(event);
          delete touches[id];
          continue;
        }
      }

      if (touches[id].target.tagName.toUpperCase() == "INPUT") {

        target.focus();
        // target.value = target.value;
        currentFocus = target;

        continue;
      }*/

function tileTouchEnd(event) {
  //For touch end only changed touches show up,
  event.preventDefault();
  event.stopPropagation();
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in touches)) { continue; }
    console.log("TileTouchEnd: " + id + ", hasContinue: " + touches[id].hasContinue);
    var target = touches[id].target;
    var top = (event.changedTouches[i].clientY - touches[id].y);
    var left = (event.changedTouches[i].clientX - touches[id].x);
    if (touches[id].hasContinue == 0) {
      var timeDif = Date.now() - touches[id].ts;
      var varTile = touches[id].tile.classList.contains('var');
      var inputTile = touches[id].target.tagName.toUpperCase() == "INPUT";


      //'Click' Events
      console.log("TileTouchEnd: " + id + ", timeDif: " + timeDif + ", var: " + varTile + ", input: " + inputTile + ", tile: "
        + touches[id].tile.classList.contains("tile") + ", class: " + touches[id].tile.classList);
      if (timeDif < shortPress) {
        if (varTile) {
          popupVarMenu(event);
          delete touches[id];
          continue;
        } else if (inputTile) {
          //Start input
          target.focus();
          currentFocus = target;
          // target.value = target.value;
          target.selectionStart = target.selectionEnd = target.value.length;
          showKeyboard(target);
          delete touches[id];
          continue;
        } else if (touches[id].tile.classList.contains('tile')) {
          //Show Tile Menu
          showTileMenu(left + touches[id].x, top + touches[id].y, touches[id].tile);
          delete touches[id];
          continue;
        }
      } else {
        showTileMenu(left + touches[id].x, top + touches[id].y, touches[id].tile);
        delete touches[id];
        continue;
      }
      // delete touches[id];
      // continue;
    }



    target = touches[id].tile;
    var x,y;
    // console.log("TouchEnd: " + id + ", " + target.classList);

    var hadDragContinue = touches[id].hasContinue;
    overlaidError.style.display = 'none';
    // var top = (event.changedTouches[i].clientY - touches[id].y);
    // var left = (event.changedTouches[i].clientX - touches[id].x);
    target.style.top = top + 'px';
    target.style.left = left + 'px';

    top += codearea.scrollTop;
    left += codearea.scrollLeft;
    target.classList.remove('selected');
    target.classList.remove('dragging');
    removePointer(target);
    var ch = target.getElementsByClassName('tile');
    for (var j = 0; j < ch.length; j++) {
      ch[j].classList.remove('dragging');
    }

    var tmp = target;
    while (typeof tmp.next != "undefined" && tmp.next) {
        tmp = tmp.next;
        tmp.classList.remove('selected');
        tmp.classList.remove('dragging');
        var ch2 = tmp.getElementsByClassName('tile');
        for (var j = 0; j < ch2.length; j++) {
          ch2[j].classList.remove('dragging');
        }
    }
    var l2 = target.offsetLeft + target.offsetWidth * .5;
    var r2 = l2;
    var t2 = target.offsetTop - markerHeight * .9;
    var b2 = t2;
      // var r2 = target.offsetLeft + target.offsetWidth * .5;
      // var b2 = target.offsetTop + markerHeight * 0.2;
    var bestHole = findHole(target, l2, t2, r2, b2,false);

    console.log("End - Best: " + bestHole + ", " + touches[id].x + "," + touches[id].y + " - " + left + "," + top);
    console.log("End get: " + touches[id].x + "," + touches[id].y + "," + touches[id].target + "," + touches[id].hasContinue);
    if (bestHole != null) {
      bestHole.style.background = '';
      if (bestHole.children.length == 0
              && holeCanHoldTile(bestHole, target)) {
        var tmp = target;
        while (tmp) {
          tmp.style.top = 0;
          tmp.style.left = 0;
          tmp.style.position = 'static';
          bestHole.appendChild(tmp);
          tmp = tmp.next;
        }
      } else {
        bestHole = null;
      }
    }
    for (var i=0; i<tiles.length; i++) {
      var ch = tiles[i];
      ch.classList.remove('bottom-join-target');
      // console.log("IsBottomTarget Call:" + ch + ", " + target);
      if (bestHole) { continue; }
      if (ch == target) { continue; }
      if (ch.parentNode == toolbox) { continue; }
      var t = ch.offsetTop + ch.offsetHeight;
      if (isBottomTarget(ch, target)) {
        if (ch.next) {
            var tmp = target;
            while (tmp.next)
                tmp = tmp.next;
            tmp.next = ch.next;
            ch.next.prev = tmp;
        }
        ch.next = target;
        target.prev = ch;
        var pe = ch.parentElement;
        var tmp = ch;
        var after = ch.nextSibling;
        while (tmp.next) {
          var last = tmp;
          tmp = tmp.next;
          if (tmp == after)
            break;
          tmp.parentElement.removeChild(tmp);
          pe.insertBefore(tmp, after);
          if (pe.classList.contains('multi')) {
            tmp.style.position = "static";
            tmp.style.left = "";
            tmp.style.top = "";
          }
          tmp.style.top = (last.offsetTop + last.offsetHeight) + 'px';
          tmp.style.left = last.offsetLeft + 'px';
        }
        if (after && pe != codearea) {
          last.next = after;
          after.prev = last;
        }
        break;
      }
    }
    if (touches[id].originalHole != null) {
      touches[id].originalHole.style.width = 'auto';
      touches[id].originalHole.style.height = 'auto';
    }
    runOnDrop(target);
    reflow();
    updateTileIndicator();
    generateCode();
    checkpointSave();
    delete touches[id];
  }
}

// function findHole(target,x,y,left,top,b) {
function findHole(target, left, top, right, bottom, b) {
  var holeSize = 1000000;
  var bestHole = null;
  var bestIdx = -1;


  for (var i=holes.length - 1; i>=0; i--) {
    // console.log("ChildNodes: " + holes[i].childNodes.length);
    var h = holes[i];
    if (h.childNodes.length) { continue; }
    if (b) {
      h.style.background = '';
    }
    if (h.offsetParent == target)
      continue;
    var xy = findOffsetTopLeft(h);
    xy.top = xy.top + codearea.offsetTop;
    xy.left = xy.left + codearea.offsetLeft;
    console.log("Tile: " + left + ", " + top + ", " + right + ", " + bottom);
    console.log("Hole: " + xy.left + ", " + xy.top + ", " + (xy.left + h.offsetWidth) + ", " + (xy.top + h.offsetHeight));

    if (left < xy.left || right > xy.left + h.offsetWidth) { continue; }
    if (top < xy.top - h.offsetHeight * .3 || bottom > xy.top + h.offsetHeight * .9) { continue; }
    // if (left + x < xy.left
    //         || left + x > xy.left + h.offsetWidth) {
    //   continue;
    // }
    // if (top + y < xy.top
    //         || top + y > xy.top + h.offsetHeight) {
    //   continue;
    // }
    if (h.offsetWidth * h.offsetHeight < holeSize) {
      holeSize = h.offsetWidth * h.offsetHeight;
      bestHole = h;
      bestIdx = i;
    }
  }
  var name = "null";
  if (bestHole != null) {
    name = bestHole.parentNode.classList;
  }
  console.log("Returning Best Hole: " + bestHole + " - " + name + "," + bestIdx);
  return bestHole;
}

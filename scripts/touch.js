"use strict"
var targets = [];
var dragStarted = false;
var nodes = {};
var touches = {};
var pieMenuTouches = {};
var windowTouches = {};
var optTouches = {};
var btnTouches = {};
var segTouches = {};
var windowMenuTouches = {};
var segmentTouches = {};

//Squared distance in pixels
var pieMenuMoveThresholdCount = 10;
var pieMenuMoveThresholdDistance = 40;
var tileMenuMoveThresholdDistance = 30;
var wMenuThresholdDistance = 50;
var wMenuMoveThresholdDistance = 20;
var optMoveThresholdDistance = 2;
var btnMoveThresholdDistance = 2;
var segMoveThresholdDistance = 20;
var secMenuDistance = 100;
var scrollTouchDist = 100;
var scrollTouchThresh = .2;

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
  editor4[i].addEventListener('touchstart', pieTouchStart);
  editor4[i].addEventListener('touchmove', pieTouchMove);
  editor4[i].addEventListener('touchend', pieTouchEnd);
  editor4[i].windex = codearea2[i].windex;
  // codearea2[i].addEventListener("click", function(event) {
    // if (!mouse) return;
    // showPieMenu(event.clientX, event.clientY, event.target.windex);
  // });
  codearea2[i].t1 = codearea2[i].t2 = null;
}

function addPieMenuTouch(seg, func) {
  seg.addEventListener('touchstart', segTouchStart);
  seg.addEventListener('touchmove', segTouchMove);
  seg.addEventListener('touchend', segTouchEnd);
  seg.func = func;
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
  // blank.addEventListener("click", function(event) { event.preventDefault(); });
  blank.addEventListener('touchstart', function(event) { event.preventDefault(); });
  blank.addEventListener('touchmove', function(event) { event.preventDefault(); });
  blank.addEventListener('touchend', function(event) { event.preventDefault(); });


  for (var i = 0; i < 4; i++) {
    var id = "svg_" + i;
    var elem = document.getElementById(id);
    elem.addEventListener('touchstart', function(event) { event.preventDefault(); });
    elem.addEventListener('touchmove', function(event) { event.preventDefault(); });
    elem.addEventListener('touchend', function(event) { wMenuEnd(event); });
    elem.addEventListener("click", function(event) { if (!mouse) { return; } showWindowMenu2(event); event.preventDefault(); });
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

/* function wMenuStart(event,idx) {
  event.preventDefault();
  // var idx = ((event.target.getAttribute("id").split("_"));
  var target = event.target;
  while (!(target.tagName == "svg") && target.parentNode != null) {
    target = target.parentNode;
  }
  var idx = target.getAttribute("id").split("_")[1];

  tryLog("wMenuStart: " + idx + "," + target);
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
  tryLog("wMenuMove");
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
} */

function wMenuEnd(event) {
  tryLog("wMenuEnd");
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
  tryLog("xA: " + (xAngle * toDeg));
  //0 B, 1 L, 2 R, 3 T
  // 90  180    0  -90
  if (wMenuTouch.origin == 0) {
    tryLog((targetAngle[0] - variance) + " to " + (targetAngle[0] + variance) + ", actual:" + xAngle);
    if (targetAngle[0] + variance > xAngle && targetAngle[0] - variance < xAngle) {

      success = 1;
    }
  } else if (wMenuTouch.origin == 1) {
    tryLog((targetAngle[1] - variance) + " to " + (targetAngle[1] + variance) + ", actual:" + xAngle);
    if (targetAngle[1] + variance > xAngle && targetAngle[1] - variance < xAngle) {

      success = 1;
    }
  } else if (wMenuTouch.origin == 2) {
    tryLog((targetAngle[2] - variance) + " to " + (targetAngle[2] + variance) + ", actual:" + xAngle);
    if (targetAngle[2] + variance > xAngle && targetAngle[2] - variance < xAngle) {

      success = 1;
    }
  } else if (wMenuTouch.origin == 3) {
    tryLog((targetAngle[3] - variance) + " to " + (targetAngle[3] + variance) + ", actual:" + xAngle);
    if (targetAngle[3] + variance > xAngle && targetAngle[3] - variance < xAngle) {

      success = 1;
    }
  }

  if (success) { tryLog("success"); }
  return success;
}

function segTouchStart(event) {
  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;

    if (!(id in segTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      segTouches[id] = {x:x, y:y, target:event.target};
    }
  }
}

function segTouchMove(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in segTouches)) { continue; }
    if (segTouches[id].target == event.target && id in segTouches) {
      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - segTouches[i].x, 2) + Math.pow(y - segTouches[i].y, 2));
      if (dist > segMoveThresholdDistance) {
        delete segTouches[id];
        continue;
      }
    }
  }
}

function segTouchEnd(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in segTouches)) { continue; }
    if (segTouches[id].target == event.target && id in segTouches) {
      event.target.func(event);
    }
    delete segTouches[id];
  }
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

function wMenuTouchStart(event) {
  tryLog('wMenuTouchStart: ' + event.target);
  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;

    if (!(id in windowMenuTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      windowMenuTouches[id] = {x:x, y:y, target:event.target, ts:Date.now()};
    }
  }
}

function wMenuTouchMove(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in windowMenuTouches)) { continue; }
    if (windowMenuTouches[id].target == event.target && id in windowMenuTouches) {
      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - windowMenuTouches[id].x, 2) + Math.pow(y - windowMenuTouches[id].y, 2));
      if (dist > wMenuMoveThresholdDistance) {
        delete windowMenuTouches[id];
        tryLog(id + " wMenuTouchMove delete");
        continue;
      }
    }
  }
}

function wMenuTouchEnd(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in windowMenuTouches)) { continue; }
    var timeDif = Date.now() - windowMenuTouches[id].ts;
    if (timeDif > shortPress) {
      windowMenuClick(windowMenuTouches[id].target.idx,windowMenuTouches[id].target.parentNode.idx,2);
    } else {
      windowMenuClick(windowMenuTouches[id].target.idx,windowMenuTouches[id].target.parentNode.idx,1, [windowMenuTouches[id].x,windowMenuTouches[id].y]);
    }

    delete windowMenuTouches[id];
  }
}

function pieTouchStart(event) {
  tryLog("P: " + event.target);
  if (event.target.style.display == "none") { return; }  
  if (!event.target.classList.contains('codearea') && !event.target.classList.contains('ace_content')) { return; }
  if (event.target.classList.contains('codearea') && event.target.style.visibility == 'hidden') { return; }  
  
  var s = "Touches: ";
  var windex = event.target.windex;
  if (windex) {
    var tt = event.target.parentNode;
    while (tt != null ) {
      windex = tt.windex;
      tt = tt.parentNode;
      if (windex) { break; }
    }
  }


  // var t = event.target.parentNode;
  // while (!windex) {
    // windex = t.windex;
    // t = t.parentNode;
  // }
  tryLog("pieTouchStart: " + event.target + ", " + windex);
  for (var i = 0; i < event.touches.length; i++) {
    s += event.touches[i].identifier + " ";
  }
  tryLog(s);

  event.preventDefault();
  var menus = codearea2[windex].getElementsByClassName('popup-menu');
  if (menus.length) {
    for (var i=0; i<menus.length; i++) {
      codearea2[windex].removeChild(menus[i]);
      return;
    }
  }

  // window.parent.bringToFront(window.frameElement);

  // if (currentFocus) {
    // currentFocus.blur();
    // currentFocus = null;
  // }

  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;
    if (!(id in pieMenuTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      pieMenuTouches[id] = {x:x, y:y, updates:0}
      //ix:window.frameElement.offsetLeft, iy:window.frameElement.offsetTop};
      // pieMenuTouches[id].sx = event.targetTouches[i].clientX;
      // pieMenuTouches[id].sy = event.targetTouches[i].clientY;
      pieMenuTouches[id].id = id;
      pieMenuTouches[id].windex = windex;

    }
  }    
}

function pieTouchMove(event) {
  if (event.target.style.display == "none") { return; }
  if (!event.target.classList.contains('codearea') && !event.target.classList.contains('ace_content')) { return; }
  event.preventDefault();
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (id in pieMenuTouches) {
      tryLog("Move: " + id);
      if (pieMenuTouches[id].dying) {
        continue;
      }
      //Moves check - Number of updates since this touch began
      if (pieMenuTouches[id].updates > pieMenuMoveThresholdCount) {
        tryLog("ID M: " + id + "is dying");
        pieMenuTouches[id].dying = 1;
        window.setTimeout(pieTouchDelayedEnd, pieMenuEndDelay, id);
        continue;
      }

      var windex = pieMenuTouches[id].windex;
      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - pieMenuTouches[id].x, 2) + Math.pow(y - pieMenuTouches[id].y, 2));
      if (dist > pieMenuMoveThresholdDistance) {
        windowTouches[id] = pieMenuTouches[id];
        delete pieMenuTouches[id];

        if (codearea2[windex].t1 == codearea2[windex].t2 == null) {
          codearea2[windex].t1 = id;
        } else if (codearea2[windex].t1 == null) {
          if (codearea2[windex].t2 != id) {
            codearea2[windex].t1 = id;
          }
        } else if (codearea2[windex].t2 == null) {
          if (codearea2[windex].t1 != id) {
            codearea2[windex].t2 = id;
          }
        }

        if (codearea2[windex].t2 == codearea2[windex].t1) {
          codearea2[windex].t2 = null;
        }

        continue;
      }

      pieMenuTouches[id].updates++;
    } else if (id in windowTouches) {
      var windex = windowTouches[id].windex;
      
      var t1 = event.changedTouches[codearea2[windex].t1];
      var t2 = event.changedTouches[codearea2[windex].t2];
      if (t1 != null && t2 != null) {
        var dist = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
        if (dist < scrollTouchDist) {
          if (lastUpdate != null) {
            var dir1 = [t1.clientX - lastUpdate.t1[0], t1.clientY - lastUpdate.t1[1]];            
            if (Math.abs(dir1[0] + dir1[1]) < scrollTouchThresh) { 
              tryLog("Drag dir1 was too small: " + (dir1[0] + dir1[1]) + " < " + scrollTouchThresh);
              continue;
            }
            var dir2 = [t2.clientX - lastUpdate.t2[0], t2.clientY - lastUpdate.t2[1]];
            if (Math.abs(dir2[0] + dir2[1]) < scrollTouchThresh) { 
              tryLog("Drag dir2 was too small: " + (dir2[0] + dir2[1]) + " < " + scrollTouchThresh);
              continue;
            }
            tryLog("Drag: " + dir1 + ", " + dir2);
            var aDir = [(dir1[0] + dir2[0]) * 0.5, (dir1[1] + dir2[1]) * 0.5];
            tryLog("Drag aDir: " + aDir);
            if (windows[windex].rid == 0) {
              codearea2[windex].scrollLeft += aDir[0];
              codearea2[windex].scrollTop += aDir[1];
            } else if (windows[windex].rid == 1) {
              codearea2[windex].scrollLeft += aDir[1];
              codearea2[windex].scrollTop -= aDir[0];
            } else if (windows[windex].rid == 2) {
              codearea2[windex].scrollLeft -= aDir[1];
              codearea2[windex].scrollTop += aDir[0];
            } else if (windows[windex].rid == 3) {
              codearea2[windex].scrollLeft -= aDir[0];
              codearea2[windex].scrollTop -= aDir[1];
            }
          }
          lastUpdate = {t1:[t1.clientX, t1.clientY], t2:[t2.clientX, t2.clientY]};
        } else {
          tryLog("Drag too big: " + dist + " >= " + scrollTouchDist);
        }
        
        
      } else {
       tryLog("Drag T1 or T2 is null: >" + t1 + "< , >" + t2 + "<"); 
      }
      
      // var dist = Math.sqrt(Math.pow(windowTouches[t1] - pieMenuTouches[id].x, 2) + Math.pow(y - pieMenuTouches[id].y, 2));
        
        
        
        
      
    }
  }
}

function pieTouchEnd(event) {
  if (event.target.style.display == "none") { return; }
  tryLog("PieTouchEnd");
  if (!event.target.classList.contains('codearea') && !event.target.classList.contains('ace_content')) { return; }
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;    
    var windex;
    if (id in pieMenuTouches) {
      if (pieMenuTouches[id].dying) {
        continue;
      }
      pieMenuTouches[id].dying = 1;
      tryLog("ID E: " + id + "is dying");
      window.setTimeout(pieTouchDelayedEnd, pieMenuEndDelay, id, (event.target.classList.contains('ace_content')));
      windex = pieMenuTouches[id].windex;
      // continue;
    } else if (id in windowTouches) {
      windex = windowTouches[id].windex;
      delete windowTouches[id];
    }

    if (windex != null) {
      if (id == codearea2[windex].t1) { codearea2[windex].t1 = null; lastUpdate = null; }
      if (id == codearea2[windex].t2) { codearea2[windex].t2 = null; lastUpdate = null; }
    }
  }
  event.preventDefault();
}

function pieTouchDelayedEnd(id,t) {
  tryLog("DelayEnd: " + id);
  if (!(id in pieMenuTouches)) { return; }
  if (pieMenuTouches[id].done) { delete pieMenuTouches[id]; return; }
  var windex = pieMenuTouches[id].windex;
  var p1 = [pieMenuTouches[id].x,pieMenuTouches[id].y];
  //Sec menu
  var count = 0;
  for (var i in pieMenuTouches) {
    var p2 = [pieMenuTouches[i].x,pieMenuTouches[id].y];

    tryLog("DelayEnd: " + id + ", Dist:" + (dist < secMenuDistance) + ", oid: " + i + ", done: " +
        pieMenuTouches[i].done + ", dying: " + pieMenuTouches[i].dying);
    if (pieMenuTouches[i].id == id) { continue; }
    if (pieMenuTouches[i].done) { continue; }
    if (!pieMenuTouches[i].dying) { continue; }
    if (pieMenuTouches[i].windex != windex) { continue; }

    var dist = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    if (dist < secMenuDistance) {
      tryLog("showSecMenu");
      showSecMenu(p1[0] + (p2[0] - p1[0]) * .5,p1[1] + (p2[1] - p1[1]) * .5, windex);
      delete pieMenuTouches[id];
      delete pieMenuTouches[i];
      return;
    }
    count++;
  }
  tryLog("PieTouchDelayEnd: " + id + ", " + count);

  //Pie menu
  if (t) {
    showKeyboard(pieMenuTouches[id].target, 1, windex);
  } else {
    showPieMenu(p1[0],p1[1],windex);
  }

  delete pieMenuTouches[id];
}


/*function pieTouchToggle(event) {
  tryLog("PieTouch: " + event.changedTouches.length);
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
  tryLog("Widget: " + event.target.tile);
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
  tryLog(id + " Added touch to tiles " + tiles.length);
  holes2[id] = codearea2[id].getElementsByClassName("hole");
}

function tileTouchStart(event) {
  event.stopPropagation();
  event.preventDefault();
  for (var i = 0; i < event.targetTouches.length; i++) {
    var target = event.targetTouches[i].target;
    var id = event.targetTouches[i].identifier;
    
    var tileTarget = target;
    var rl = tileTarget.offsetLeft;
    var rt = tileTarget.offsetTop;
    while (!tileTarget.classList.contains("tile")) {
      tileTarget = tileTarget.parentNode;
    }
    var windex = tileTarget.windex;


    tileBringToFront(tileTarget);

    //New Touch Event
    if (!(id in touches)) {
      var xy = findOffsetTopLeft(tileTarget);
      var x = event.targetTouches[i].clientX - xy.left;
      var y = event.targetTouches[i].clientY - xy.top;
      var pos = positionCorrection([x,y],windex);
      var x2 = xy.left - pos[0];
      var y2 = xy.top - pos[1];
      tryLog("TTS: " + xy.left + ", " + xy.top + ", " + x2 + ", " + y2 + ", " + x + ", " + y);
    tryLog("TileTouchStart: " + id + ", " + event.targetTouches[i].clientX + ", " + event.targetTouches[i].clientY + " | " + xy.left + ", " + xy.top);


      touches[id] = {x:(event.targetTouches[i].clientX - xy.left), y:(event.targetTouches[i].clientY - xy.top),
          target:target, hasContinue:0, windex:windex, xy: xy, ts:Date.now(), tile:tileTarget, ox: event.targetTouches[i].clientX, oy: event.targetTouches[i].clientY  };


      tryLog("New Touch: " + id + ", " + touches[id].x + ", " + touches[id].y + ", " + touches[id].target + ", " + touches[id].hasContinue
        + ", " + touches[id].xy  + ", " + touches[id].ts + ", " + touches[id].tile);
    }
  }
}

function tileTouchMove(event) {
  event.stopPropagation();
  event.preventDefault();
  for (var i = 0; i < event.targetTouches.length; i++) {
    var target = event.targetTouches[i].target;
    var id = event.targetTouches[i].identifier;
    tryLog("TileTouchMove: " + id);
    if (!(id in touches)) { continue; }
    var windex = touches[id].windex;
    if (!touches[id].hasContinue) {
      //Moves check - Number of updates since this touch began
      var timeDif = Date.now() - touches[id].ts;

      //Distance check
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - touches[id].ox, 2) + Math.pow(y - touches[id].oy, 2));
      if (dist > tileMenuMoveThresholdDistance) {
        touches[id].hasContinue = 1;
        tryLog(">distance: " + dist);
      }
    }

    target = touches[id].tile;
    var parent = target.parentNode;
    var origTarget = target;

    if (touches[id].hasContinue == 1) {
      //Start Drag

      //If tile is in another tile
      var originalHole = null;
      if (parent != codearea2[windex]) {
          originalHole = parent;
          originalHole.style.width = originalHole.offsetWidth + 'px';
          originalHole.style.height = originalHole.offsetHeight + 'px';
      }
      var xy = touches[id].xy;
      target.style.position = 'absolute';
      // target.style.top = xy.top + 'px';
      // target.style.left = xy.left + 'px';

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
      while (tmp && parent != codearea2[windex]) {
          parent.removeChild(tmp);
          codearea2[windex].appendChild(tmp);
          tiles2[windex].push(tmp);
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
      var left, top;
      
      //Tile moving fix for rotated windows - Messy
      if (windows[windex].rid == 1) {        
        var tileXY = [touches[id].xy.left,touches[id].xy.top];
        var tileTouchXY = reverseRotateXY(windex, windows[windex].rid, tileXY[0], tileXY[1]);
        var startEventTouchXY = [touches[id].ox, touches[id].oy];        
        var dx = tileTouchXY[0] - startEventTouchXY[0];
        var dy = startEventTouchXY[1] - tileTouchXY[1];
        var eventTouchXY = [event.targetTouches[i].clientX,event.targetTouches[i].clientY];
        var dx2 = tileTouchXY[0] - eventTouchXY[0];
        var dy2 = eventTouchXY[1] - tileTouchXY[1];
        var dx3 = dx2 - dx;
        var dy3 = dy2 - dy;
        left = tileXY[0] + dy3;
        top = tileXY[1] + dx3;
      } else if (windows[windex].rid == 2) {
        var tileXY = [touches[id].xy.left,touches[id].xy.top];
        var tileTouchXY = reverseRotateXY(windex, windows[windex].rid, tileXY[0], tileXY[1]);
        var startEventTouchXY = [touches[id].ox, touches[id].oy];        
        var dx = startEventTouchXY[0] - tileTouchXY[0];
        var dy = tileTouchXY[1] - startEventTouchXY[1];
        var eventTouchXY = [event.targetTouches[i].clientX,event.targetTouches[i].clientY];
        var dx2 = eventTouchXY[0] - tileTouchXY[0];
        var dy2 = tileTouchXY[1] - eventTouchXY[1];
        var dx3 = dx - dx2;
        var dy3 = dy - dy2;
        left = tileXY[0] - dy3;
        top = tileXY[1] - dx3;
      } else if (windows[windex].rid == 3) {
        var tileXY = [touches[id].xy.left,touches[id].xy.top];
        var tileTouchXY = reverseRotateXY(windex, windows[windex].rid, tileXY[0], tileXY[1]);
        var startEventTouchXY = [touches[id].ox, touches[id].oy];        
        var dx = tileTouchXY[0] - startEventTouchXY[0];
        var dy = tileTouchXY[1] - startEventTouchXY[1];
        var eventTouchXY = [event.targetTouches[i].clientX,event.targetTouches[i].clientY];
        var dx2 = tileTouchXY[0] - eventTouchXY[0];
        var dy2 = tileTouchXY[1] - eventTouchXY[1];
        var dx3 = dx - dx2;
        var dy3 = dy - dy2;
        left = tileXY[0] - dx3;
        top = tileXY[1] - dy3;
      } else {
        left = event.targetTouches[i].clientX - touches[id].x;
        top = event.targetTouches[i].clientY - touches[id].y;
      }
      
      
      
      target.style.top = top + 'px';
      target.style.left = left + 'px';
      if (windex == 0) {
        top += codearea2[windex].scrollTop;
        left += codearea2[windex].scrollLeft;
      }

      var l2 = target.offsetLeft + target.offsetWidth * .5;
      var r2 = l2;
      var t2 = target.offsetTop - markerHeight * .9;
      var b2 = t2;
      var bestHole = findHole(target, l2, t2, r2, b2, true, windex);
      if (bestHole != null && bestHole.children.length == 0) {
          bestHole.style.background = 'yellow';
          var reason = {};
          if (!holeCanHoldTile(bestHole, target, reason)) {
              bestHole.style.background = 'pink';
              overlayError(reason.error, bestHole, windex);
          }
      }

      var tmp = target;
      while (typeof tmp.next != "undefined" && tmp.next) {
        var last = tmp;
        tmp = tmp.next;
        tmp.style.top = (last.offsetTop + last.offsetHeight) + 'px';
        tmp.style.left = last.offsetLeft + 'px';
      }


      for (var i=0; i<tiles2[windex].length; i++) {
        tryLog("IsBottomTarget Call: " + ch + ", " + target);
        var ch = tiles2[windex][i];
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



function tileTouchEnd(event) {
  //For touch end only changed touches show up,
  event.preventDefault();
  event.stopPropagation();
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in touches)) { continue; }
    var windex = touches[id].windex;
    tryLog("TileTouchEnd: " + id + ", hasContinue: " + touches[id].hasContinue);
    var target = touches[id].target;
    var top = (event.changedTouches[i].clientY - touches[id].y);
    var left = (event.changedTouches[i].clientX - touches[id].x);
    if (touches[id].hasContinue == 0) {
      var classTile = touches[id].target.classList.contains('tile');
      var timeDif = Date.now() - touches[id].ts;
      var varTile, inputTile, paramTile, argTile;
      if (!classTile) {
        varTile = touches[id].tile.classList.contains('var');  
        if (!varTile) inputTile = touches[id].target.tagName.toUpperCase() == "INPUT";
        if (!inputTile) paramTile = touches[id].target.classList.contains('parameter-adder');  
        if (!paramTile) argTile = touches[id].target.classList.contains('argument-adder');
      }
      
 


      //'Click' Events
      tryLog("TileTouchEnd: " + id + ", timeDif: " + timeDif + ", var: " + varTile + ", input: " + inputTile + ", tile: "
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
          showKeyboard(target,0,windex);
          delete touches[id];
          continue;
        } else if (paramTile) {
          var newParam = addParameterToMethod(touches[id].target, "");          
        } else if (argTile) {
          addArgumentToRequest(touches[id].target);
          updateTileIndicator(windex);
          generateCode(windex);
          checkpointSave(windex);
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
    tryLog("TouchEnd: " + id + ", " + target.classList);

    var hadDragContinue = touches[id].hasContinue;
    overlaidError.style.display = 'none';
    
    if (windows[windex].rid == 1) {        
      var tileXY = [touches[id].xy.left,touches[id].xy.top];
      var tileTouchXY = reverseRotateXY(windex, windows[windex].rid, tileXY[0], tileXY[1]);
      var startEventTouchXY = [touches[id].ox, touches[id].oy];        
      var dx = tileTouchXY[0] - startEventTouchXY[0];
      var dy = startEventTouchXY[1] - tileTouchXY[1];
      var eventTouchXY = [event.changedTouches[i].clientX,event.changedTouches[i].clientY];
      var dx2 = tileTouchXY[0] - eventTouchXY[0];
      var dy2 = eventTouchXY[1] - tileTouchXY[1];
      var dx3 = dx2 - dx;
      var dy3 = dy2 - dy;
      left = tileXY[0] + dy3;
      top = tileXY[1] + dx3;
    } else if (windows[windex].rid == 2) {
      var tileXY = [touches[id].xy.left,touches[id].xy.top];
      var tileTouchXY = reverseRotateXY(windex, windows[windex].rid, tileXY[0], tileXY[1]);
      var startEventTouchXY = [touches[id].ox, touches[id].oy];        
      var dx = startEventTouchXY[0] - tileTouchXY[0];
      var dy = tileTouchXY[1] - startEventTouchXY[1];
      var eventTouchXY = [event.changedTouches[i].clientX,event.changedTouches[i].clientY];
      var dx2 = eventTouchXY[0] - tileTouchXY[0];
      var dy2 = tileTouchXY[1] - eventTouchXY[1];
      var dx3 = dx - dx2;
      var dy3 = dy - dy2;
      left = tileXY[0] - dy3;
      top = tileXY[1] - dx3;
    } else if (windows[windex].rid == 3) {
     var tileXY = [touches[id].xy.left,touches[id].xy.top];
      var tileTouchXY = reverseRotateXY(windex, windows[windex].rid, tileXY[0], tileXY[1]);
      var startEventTouchXY = [touches[id].ox, touches[id].oy];        
      var dx = tileTouchXY[0] - startEventTouchXY[0];
      var dy = tileTouchXY[1] - startEventTouchXY[1];
      var eventTouchXY = [event.changedTouches[i].clientX,event.changedTouches[i].clientY];
      var dx2 = tileTouchXY[0] - eventTouchXY[0];
      var dy2 = tileTouchXY[1] - eventTouchXY[1];
      var dx3 = dx - dx2;
      var dy3 = dy - dy2;
      left = tileXY[0] - dx3;
      top = tileXY[1] - dy3;
    } else {
      left = event.changedTouches[i].clientX - touches[id].x;
      top = event.changedTouches[i].clientY - touches[id].y;
    }
    
    target.style.top = top + 'px';
    target.style.left = left + 'px';

    // if (windex == 0) {
    top += codearea2[windex].scrollTop;
    left += codearea2[windex].scrollLeft;
    // }
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
    var bestHole = findHole(target, l2, t2, r2, b2,false,windex);

    tryLog("End - Best: " + bestHole + ", " + touches[id].x + "," + touches[id].y + " - " + left + "," + top);
    tryLog("End get: " + touches[id].x + "," + touches[id].y + "," + touches[id].target + "," + touches[id].hasContinue);
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
    for (var i=0; i<tiles2[windex].length; i++) {
      var ch = tiles2[windex][i];
      if (!ch) { continue; }
      ch.classList.remove('bottom-join-target');
      tryLog("IsBottomTarget Call:" + ch + ", " + target);
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
        if (after && pe != codearea2[windex]) {
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
    reflow(windex);
    updateTileIndicator(windex);
    generateCode(windex);
    checkpointSave(windex);
    delete touches[id];
  }
}

// function findHole(target,x,y,left,top,b) {
function findHole(target, left, top, right, bottom, b, windex) {
  var holeSize = 1000000;
  var bestHole = null;
  var bestIdx = -1;
  // var holes = codearea2[windex].getElementByClassName('hole');


  for (var i=holes2[windex].length - 1; i>=0; i--) {    
    var h = holes2[windex][i];
    if (h.childNodes.length) { continue; }
    if (b) {
      h.style.background = '';
    }
    if (h.offsetParent == target)
      continue;
    var xy = findOffsetTopLeft(h);
    xy.top = xy.top + codearea2[windex].offsetTop;
    xy.left = xy.left + codearea2[windex].offsetLeft;
    tryLog("Tile: " + left + ", " + top + ", " + right + ", " + bottom);
    tryLog("Hole: " + xy.left + ", " + xy.top + ", " + (xy.left + h.offsetWidth) + ", " + (xy.top + h.offsetHeight));

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
  tryLog("Returning Best Hole: " + bestHole + " - " + name + "," + bestIdx);
  return bestHole;
}

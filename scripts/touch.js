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

var pieMenuMoveThresholdCount = 3;
var pieMenuMoveThresholdDistance = 2;
var optMoveThresholdDistance = 2;
var btnMoveThresholdDistance = 2;
var currentFocus;

var interactMode = 0;
var moveCounter = 0;

function enableTouch() {
  //#TODO ?? Replace with prevent default on pie menu including all segments
  // window.addEventListener('contextmenu', function(ev) {
    // ev.preventDefault();
  // });
  if (window.frameElement) {
    //This is running in an iframe, this is intended behaviour so don't load scripts otherwise
    addPieTouch();
    addTileTouch();
  }
}

function reset_page() {
  window.location = window.location.pathname;
}

function addPieTouch() {
  codearea.addEventListener('touchstart', pieTouchStart);
  codearea.addEventListener('touchmove', pieTouchMove);
  codearea.addEventListener('touchend', pieTouchEnd);
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
  
  var menus = codearea.getElementsByClassName('popup-menu');
  if (menus.length) {
    for (var i=0; i<menus.length; i++) {
      codearea.removeChild(menus[i]);
      return;
    }
  }

  if (currentFocus) {
    currentFocus.blur();
    currentFocus = null;
    return;
  }

  for (var i = 0; i < event.targetTouches.length; i++) {    
    var id = event.targetTouches[i].identifier;

    if (!(id in pieMenuTouches)) {
      //New Touch Event
      event.preventDefault();
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      pieMenuTouches[id] = {x:x, y:y, updates:0, ix:window.frameElement.offsetLeft, iy:window.frameElement.offsetTop};
    }
  }
  event.preventDefault();
}

function pieTouchMove(event) {
  
  if (!window.frameElement) { return; }
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (event.target == codearea && id in pieMenuTouches) {
      //Moves check
      if (pieMenuTouches[id].updates > pieMenuMoveThresholdCount) {
        windowTouches[id] = pieMenuTouches[id];
        delete pieMenuTouches[id];
        continue;
      }

      //Distance check
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var dist = Math.sqrt(Math.pow(x - pieMenuTouches[i].x, 2) + Math.pow(y - pieMenuTouches[i].y, 2));
      if (dist > pieMenuMoveThresholdDistance) {
        windowTouches[id] = pieMenuTouches[id];
        delete pieMenuTouches[id];
        continue;


      }

      pieMenuTouches[id].updates++;
    } else if (event.target == codearea && id in windowTouches) {
      //Moving Canvas
      var x = event.changedTouches[i].clientX;
      var y = event.changedTouches[i].clientY;
      var iframe = window.frameElement;
      var dx = windowTouches[id].x - x;
      var dy = windowTouches[id].y - y;
      var l2 = windowTouches[id].ix - dx;
      var t2 = windowTouches[id].iy - dy;
      // iframe.style.left = (l2) + 'px';
      // iframe.style.top = (t2) + 'px';      
      // console.log("Move: " + l2 + "," + t2 + "," + windowTouches[id].ix + "," + windowTouches[id].iy + "," + x + "," + y + "," + windowTouches[id].x + "," + windowTouches[id].y + ",M:" + moveCounter + ",ID:" + id);
      window.setTimeout(function () { iframe.style.left = l2 + 'px'; iframe.style.top = t2 + 'px'},5);
      // windowTouches[id].x = x;
      // windowTouches[id].y = y;
      // windowTouches[id].ix = l2;
      // windowTouches[id].iy = t2;

      // alert("Moving iframe to " + l2 + "," + t2);
      // alert("Moving iframe to " + (windowTouches[id].ix + dx) + "," + (windowTouches[id].iy + dy));
    }
  }
  moveCounter++;
  event.preventDefault();
  // event.stopPropagation();
}

function pieTouchEnd(event) {

  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;    
    if (id in pieMenuTouches) {
      if (event.target == codearea) {
        showPieMenu(pieMenuTouches[id].x,pieMenuTouches[id].y);
      }
      delete pieMenuTouches[id];
    } else if (id in windowTouches) {
      if (event.target == codearea) {
        //Moving Canvas
        var x = event.changedTouches[i].clientX;
        var y = event.changedTouches[i].clientY;
        var iframe = window.frameElement;
        var dx = windowTouches[id].x - x;
        var dy = windowTouches[id].y - y;
        var l2 = windowTouches[id].ix - dx;
        var t2 = windowTouches[id].iy - dy;
        window.setTimeout(function () { iframe.style.left = l2 + 'px'; iframe.style.top = t2 + 'px'},10);
        // iframe.style.left = (l2) + 'px';
        // iframe.style.top = (t2) + 'px';      
        // iframe.left = windowTouches[id].ix + dx;
        // iframe.top = windowTouches[id].iy + dy;
      }    
      delete windowTouches[id];
    }
  }
  event.preventDefault();
}

function pieTouchToggle(event) {
  console.log("PieTouch: " + event.changedTouches.length);
  for (var i = 0; i < event.changedTouches.length; i++) {    
    var x = event.changedTouches[i].clientX;
    var y = event.changedTouches[i].clientY;
    showPieMenu(x,y);
  }
}

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
}

function addTileTouch() {
  //Adds touch listeners for touch start, move and end  
  var tiles = codearea.getElementsByClassName('tile');
  for (var i = 0; i < tiles.length; i++) {    
    addTileTouchToTile(tiles[i]);
  }
  console.log("Added touch to tiles " + tiles.length);
}

function tileTouchStart(event) {
  //Setup new touch event
  // console.log("TouchStart " + event.targetTouches.length);
  for (var i = 0; i < event.targetTouches.length; i++) {
    var target, parent;
    if (interactMode == 0) {
      target = event.targetTouches[i].target;
      parent = target.parentNode;
    } else if (interactMode == 1) {
      target = event.targetTouches[i].target.tile;
      parent = target.parentNode.parentNode;
    }
    var origTarget = target;
    var id = event.targetTouches[i].identifier;
    console.log("TouchStart: " + id);

    if (target.tagName.toUpperCase() == "INPUT") {
      // event.preventDefault();      
      target.focus();
      target.value = target.value;
      currentFocus = target;
      event.stopPropagation();
      continue;
    }

    while (target != null) {
      if (!target.classList.contains('tile')) {
        target = target.parentNode;
      } else { break; }
    }

    if (!(id in touches)) {
      //New Touch Event
      event.preventDefault();
      var xy = findOffsetTopLeft(target);
      var x = event.targetTouches[i].clientX - xy.left;
      var y = event.targetTouches[i].clientY - xy.top;

      if (origTarget.classList.contains('var-name')
            && x > target.offsetWidth
            && target.innerHTML) {
        //#TODO - Change to handle touch event
        popupVarMenu(event);
        continue;
      }

      console.log("Start: " + x + "," + y);

      touches[id] = {x:(event.targetTouches[i].clientX - xy.left), y:(event.targetTouches[i].clientY - xy.top),
          target:target, hasContinue:false  };
      console.log("Start set: " + touches[id].x + "," + touches[id].y + "," + touches[id].target + "," + touches[id].hasContinue);


      

      //After dragContinue
      var originalHole = null;
      if (parent != codearea) {
          originalHole = parent;
          originalHole.style.width = originalHole.offsetWidth + 'px';
          originalHole.style.height = originalHole.offsetHeight + 'px';
      }
      if (interactMode == 0) {
        target.style.position = 'absolute';
        target.style.top = xy.top + 'px';
        target.style.left = xy.left + 'px';
      } else if (interactMode == 1) {
        target.parentNode.style.position = 'absolute';
        target.parentNode.style.top = xy.top + 'px';
        target.parentNode.style.left = xy.left + 'px';
      }
      
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


      //After dragEnd
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
        for (var j = 0; j < ch.length; j++) {
          ch2[j].classList.add('dragging');
        }
      }
      if (typeof target.prev != "undefined" && target.prev) {
        target.prev.next = false;
        target.prev = false;
      }
      event.stopPropagation();
    }
  }
}

function tileTouchMove(event) {
  // console.log("TouchMove " + event.targetTouches.length);
  overlaidError.style.display = 'none';
  event.preventDefault();

  for (var i = 0; i < event.changedTouches.length; i++) {    
    var id = event.changedTouches[i].identifier;
    if (!(id in touches)) { continue; }
    // if (event.target != touches[id].target) { return; }
    touches[id].hasContinue = true;
    var target = touches[id].target;

    var top = (event.changedTouches[i].clientY - touches[id].y);
    var left = (event.changedTouches[i].clientX - touches[id].x);
    if (interactMode == 0) {
      target.style.top = top + 'px';
      target.style.left = left + 'px';
    } else if (interactMode == 1) {
      target.parentNode.style.top = top + 'px';
      target.parentNode.style.left = left + 'px';
    }
    // console.log("Touch: " + id + ", op; " + touches[id].x + "," + touches[id].y + " - np: " + left + "," + top);
    top += codearea.scrollTop;
    left += codearea.scrollLeft;
    // console.log("Touch: " + id + ", op; " + touches[id].x + "," + touches[id].y + " - np: " + left + "," + top);

    // var tmp = target;
    var bestHole = findHole(target,touches[id].x,touches[id].y,left,top,true);
    // if (bestHole) {
    // console.log("Move - Best: " + bestHole + ", " + touches[id].x + "," + touches[id].y + " - " + left + "," + top);

    // }
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
      var ch = tiles[i];      
      if (ch.classList.contains('dragging')) { continue; }
      if (ch == target)
          continue;
      if (isBottomTarget(ch, target)) {
          ch.classList.add('bottom-join-target');
      } else {
          ch.classList.remove('bottom-join-target');
      }
    }
  }
}

function tileTouchEnd(event) {
  //For touch end only changed touches show up,     
  event.preventDefault();
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in touches)) { continue; }
    var target = touches[id].target;    
    var x,y;
    console.log("TouchEnd: " + id + ", " + target.classList);

    var hadDragContinue = touches[id].hasContinue;    
    overlaidError.style.display = 'none';
    var top = (event.changedTouches[i].clientY - touches[id].y);
    var left = (event.changedTouches[i].clientX - touches[id].x);
    if (interactMode == 0) {
      target.style.top = top + 'px';
      target.style.left = left + 'px';
    } else if (interactMode == 1) {
      target.parentNode.style.top = top + 'px';
      target.parentNode.style.left = left + 'px';
    }
    top += codearea.scrollTop;
    left += codearea.scrollLeft;
    target.classList.remove('selected');
    target.classList.remove('dragging');
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
    var bestHole = findHole(target,touches[id].x,touches[id].y,left,top,false);
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
      if (bestHole)
          continue;
      if (ch == target)
          continue;
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
    if (!hadDragContinue) {
      if (touches[id].target.classList.contains('var')) {
        popupVarMenu(event);
        // So codearea click doesn't remove it
        event.stopPropagation();
      } else if (touches[id].target.classList.contains('tile')) {
        //Show Tile Menu
        showTileMenu(left + touches[id].x, top + touches[id].y, event.target);
      }
    }
    generateCode();
    checkpointSave();
    delete touches[id];
  }
}

function findHole(target,x,y,left,top,b) {
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
    if (left + x < xy.left
            || left + x > xy.left + h.offsetWidth) {
      continue;
    }
    if (top + y < xy.top
            || top + y > xy.top + h.offsetHeight) {
      continue;
    }
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
  // console.log("Returning Best Hole: " + bestHole + " - " + name + "," + bestIdx);
  return bestHole;
}

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
var wMenuThresholdDistance = 50;
var optMoveThresholdDistance = 2;
var btnMoveThresholdDistance = 2;
var segMoveThresholdDistance = 20;
var currentFocus;

var interactMode = 0;
var moveCounter = 0;

var toDeg = (180 / Math.PI);
var t1v;
var t2v;
var lastAngle;
var lastRot;
var lastX;
var lastY;

var tileZIndex = 5;
var tileLastZIndex = tileZIndex;
var tileMaxZIndex = 1000;


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



function setTilesZIndex() {
  //Give all tiles a zindex
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].style.zIndex = tileZIndex;
  }
}

function tileBringToFront(tile) {
  if (tile.style.zIndex == tileLastZIndex && tileLastZIndex != tileZIndex) { return; }
  tileLastZIndex++;
  tile.style.zIndex = tileLastZIndex;
  if (tileLastZIndex > tileMaxZIndex) {
    setTilesZIndex();
    tileLastZIndex = tileZIndex + 1;
    tile.style.zIndex = tileLastZIndex;
  }
}

function reset_page() {
  window.location = window.location.pathname;
}

function addPieTouch() {
  codearea.addEventListener('touchstart', pieTouchStart);
  codearea.addEventListener('touchmove', pieTouchMove);
  codearea.addEventListener('touchend', pieTouchEnd);
  codearea.addEventListener('click', function(event) { 
    showPieMenu(event.pageX, event.pageY);
  });
  codearea.t1 = codearea.t2 = null;
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
  for (var i = 0; i < 4; i++) {    
    var id = "svg_" + i;
    var elem = document.getElementById(id);
    elem.addEventListener('touchstart', function() { wMenuStart(event); });
    elem.addEventListener('touchmove', function() { wMenuMove(event); });
    elem.addEventListener('touchend', function() { wMenuEnd(event); });
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
      event.preventDefault();
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
  console.log("wMenuEnd");
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (!(id in windowMenuTouches)) { continue; }    
    delete windowMenuTouches[id];
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
      pieMenuTouches[id].sx = event.targetTouches[i].screenX;
      pieMenuTouches[id].sy = event.targetTouches[i].screenY;

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
      //Moves check
      if (pieMenuTouches[id].updates > pieMenuMoveThresholdCount) {
        windowTouches[id] = pieMenuTouches[id];
        // windowTouches[id].alt = 0;
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

    console.log("SR - T11: " + touch11 + ", T21: " + touch21);
    // console.log("SR: eventTouches: " + event.touches.length + ", windowTouches: " + windowTouches);


    if (touch1 != null && touch2 != null) {      
      var v1 = [touch1.clientX,touch1.clientY];
      var v2 = [touch2.clientX,touch2.clientY];
      console.log("SR0: " + v1[0] + "," + v1[1] + " - " + v2[0] + "," + v2[1]);
      
      var start = 0;

      if (t1v == null) {
        t1v = v1;
        start = 1;
      }
      if (t2v == null) {
        t2v = v2;
        start = 1;
      } 

      if (!start) {
        //Scaling

        //Vector of last movement
        var v11 = [v1[0] - t1v[0], v1[1] - t1v[1]];
        var v21 = [v2[0] - t2v[0], v2[1] - t2v[1]];        
        //Magnitude
        var v1m = Math.sqrt(Math.pow(v11[0],2) + Math.pow(v11[1],2));
        var v2m = Math.sqrt(Math.pow(v21[0],2) + Math.pow(v21[1],2));

        //Vector between new position of both
        var v0 = [v1[0] - v2[0], v1[1] - v2[1]];
        var v0m = Math.sqrt(Math.pow(v0[0],2) + Math.pow(v0[1],2));

        //Dot between 1 and 0, and 2 and 0
        var dot1 = v11[0] * v0[0] + v11[1] * v0[1];
        var dot2 = v21[0] * v0[0] + v21[1] * v0[1];

        //Angle between v1 and v0, and v2 and v0, in rads
        var a1 = (dot1 / (v1m * v0m)) * toDeg;
        var a2 = (dot2 / (v2m * v0m)) * toDeg;

        console.log("SR Angle: " + a1 + "," + a2);

        var magicNumber = 57;
        //Magic number 57
        //Around 57, -57 = <-- -->
        //      -57,  57 = --> <--
        var variance = 15;
        var scale = 30;
        var scaled = 1;
        if (!isNaN(a1) && !isNaN(a2)) {
          if (a2 - a1 < variance) {
            //Drag

            var x = touch1.screenX;
            var y = touch1.screenY;      
            var iframe = window.frameElement;
            var dx,dy,l2,t2;
            if (lastX != null) {
              dx = x - lastX;
              dy = y - lastY;
              moveWindow(dx,dy);              
              console.log("Dragging: " + dx + "," + dy);
            }
            lastX = x;
            lastY = y;
          } else if (a1 < magicNumber + variance && a1 > magicNumber - variance && a2 > -magicNumber - variance && a2 < -magicNumber + variance) {
            //Increase scale #TODO adjust scale by touch movement
            // scaleWindow(scale);            
          } else if (a2 < magicNumber + variance && a2 > magicNumber - variance && a1 > -magicNumber - variance && a1 < -magicNumber + variance) {
            // scaleWindow(-scale);            
          } else {
            scaled = 0;
          }


          //Rotation
          var rotScale = 1;
          var maxRot = 10;
          if (scaled == 0) {                        
            var dx = v2[0] - v1[0];
            var dy = v2[1] - v1[1];
            var vc1 = [v1[0] - t1v[0], v1[1] - t1v[1]];
            var vc2 = [v2[0] - t2v[0], v2[1] - t2v[1]];
            var noChange = 0;
            if (Math.abs(vc1[0] + vc1[1]) < 2) {
              noChange = 1;
            }
            if (Math.abs(vc2[0] + vc2[1]) < 2) {
              noChange = 1;
            }

            //#TODO Fix:
            //Same formula as scaling, but use line from t1 to t2 compared with previous line
            //Angular difference between the two is rotation
            
            if (noChange == 0) {
              var newAngle = Math.atan2(dy,dx) * toDeg;
              var rot = 0;
              if (lastAngle != null && (lastAngle > 0.1 || lastAngle < -0.1)) {
                var da = newAngle - lastAngle;
                rot = da * rotScale;
                if (rot > maxRot) { rot = maxRot; }
                if (rot < -maxRot) { rot = -maxRot; }

                
                if (da > 0.5) {
                  // rotateWindow(rot);
                } else if (da < -0.5) {
                  // rotateWindow(rot);
                }            
                
              }
              console.log("SR: Rotate by " + rot + ", L: " + lastAngle + ", N: " + newAngle);
              lastAngle = newAngle;
            }
          }          
        }
        //Update new position
        t1v = v1;
        t2v = v2;
      }
    }
  } else if (codearea.t1 != null) {        
    //Dragging (first registered drag touch event)
    console.log("Drag");
    for (var i = 0; i < event.touches.length; i++) {
      if (event.touches[i].identifierd == codearea.t1) {
        touch1 = event.touches[i];
      }
    }

    if (touch1 != null) {
      console.log("Drag: " + touch1.clientX + "," + touch1.clientY);
    }
  }

  /*var v1x = t1.clientX - t1w.x;
  var v1y = t1.clientY - t1w.y;
  var v2x = t2.clientX - t2w.x;
  var v2y = t2.clientY - t2w.y;  

  var v1m = Math.sqrt(Math.pow(v1x,2) + Math.pow(v1y,2));
  var v2m = Math.sqrt(Math.pow(v2x,2) + Math.pow(v2y,2));
  


  var vx = t2.clientX - t1.clientX;
  var vy = t2.clientY - t1.clientY;
  var vm = Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));

  var dot1 = v1x * vx + v1y * vy;
  var dot2 = v2x * vx + v2y * vy;


  var a1 = dot1 / v1m * vm;
  var a2 = dot2 / v2m * vm;
  console.log("ScaleRotate: " + t1.clientX + "," + t1.clientY + " - " + t1w.x + "," + t1w.y + ", 2: " + t2.clientX + "," + t2.clientY + " - " + t2w.x + "," + t2w.y);
  console.log("ScaleRotate: " + v1x + "," + v1y + " - " + v2x + "," + v2y + " - M: " + v1m + "," + v2m + ", D: " + dot1 + "," + dot2);
  console.log("ScaleRotate: " + (a1*toDeg) + "," + (a2*toDeg));
  */



  /*if (codearea.t1 != null &&) {
    //Dragging
  } else if (


     else if (event.target == codearea && id in windowTouches) {
      //Moving Canvas
      // if (windowTouches[id].alt < 2) {
        //windowTouches[id].alt++;
        // continue;
      // }
      console.log("Move: " + codearea.t1 + "," + codearea.t2 + "," + id + "," + 
            (codearea.t1 != null && codearea.t2 != null && codearea.t1 == id));
      if (id != codearea.t1 && id != codearea.t2) { continue; }

      //Perform calc for both t1 and t2 from t1      

      if (codearea.t1 == id) {
        var t1 = event.changedTouches[id];        
        var t2;
        var t12 = windowTouches[id];
        var t22;

        var vx = t1.clientX - t12.x;
        var vy = t1.clientY - t12.y;
        var xAngle = Math.atan2(vx,vy) * toDeg;
        console.log("T1 Angle: " + xAngle);


        if (codearea.t2 != null) {        
          t2 = event.touches[codearea.t2];
          t22 = windowTouches[codearea.t2];  
          var vx2 = t2.clientX - t22.x;
          var vy2 = t2.clientY - t22.y;
          var xAngle2 = Math.atan2(vx2,vy2) * toDeg;
          console.log("T2 Angle: " + xAngle2);
        }
        
      }
        




      // if (codearea.t1 != null && codearea.t2 != null && codearea.t1 == id) {
      //   var t1 = event.changedTouches[id];
      //   var t2 = event.touches[codearea.t2];
      //   if (scaleRotate(t1,t2,windowTouches[codearea.t1],windowTouches[codearea.t2])) {
      //     //
      //     codearea.changed = 1;          
      //   } else {
      //     codearea.changed = 0;
      //   }
      //   continue;
      // }

      // if (id == codearea.t2 && codearea.t1 != null) {
      //   continue;
      // }

      var x = event.changedTouches[i].screenX;
      var y = event.changedTouches[i].screenY;
      var iframe = window.frameElement;
      var dx = windowTouches[id].sx - x;
      var dy = windowTouches[id].sy - y;
      var l2 = windowTouches[id].ix - dx;
      var t2 = windowTouches[id].iy - dy;
      iframe.style.left = (l2) + 'px';
      iframe.style.top = (t2) + 'px';      
      console.log("Client: " + x + "," + y +" - Page; " + event.changedTouches[i].screenX + "," + event.changedTouches[i].screenY);
      // console.log("Move: " + l2 + "," + t2 + "," + windowTouches[id].ix + "," + windowTouches[id].iy + "," + x + "," + y + "," + windowTouches[id].x + "," + windowTouches[id].y + ",M:" + moveCounter + ",ID:" + id);
      //window.setTimeout(function () { iframe.style.left = l2 + 'px'; iframe.style.top = t2 + 'px'},5);
      // windowTouches[id].x = x;
      // windowTouches[id].y = y;
      // windowTouches[id].ix = l2;
      // windowTouches[id].iy = t2;

      // alert("Moving iframe to " + l2 + "," + t2);
      // alert("Moving iframe to " + (windowTouches[id].ix + dx) + "," + (windowTouches[id].iy + dy));
      // windowTouches[id].alt = 0;
    }
  }*/
  moveCounter++;
  // event.preventDefault();
  // event.stopPropagation();
}

function pieTouchEnd(event) {

  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;    
    console.log("End Touch: " + id + "," + codearea.t1 + "," + codearea.t2 + "," + (codearea.t1 == id) + "," + (codearea.t2 == id));
    if (id in pieMenuTouches) {
      if (event.target == codearea) {
        showPieMenu(pieMenuTouches[id].x,pieMenuTouches[id].y);
      }
      delete pieMenuTouches[id];
    } else if (id in windowTouches) {
      /*if (event.target == codearea) {
        if (id != codearea.t1 && id != codearea.t2) { continue; }

        //Perform calc for both t1 and t2 from t1
        //Set codearea var so t2 doesn't do anything
        if (codearea.t1 != null && codearea.t2 != null && codearea.t1 == id) {
          var t1 = event.changedTouches[id];
          var t2 = event.touches[codearea.t2];
          if (scaleRotate(t1,t2,windowTouches[codearea.t1],windowTouches[codearea.t2])) {
            //
          }
        }

        //Moving Canvas
        var x = event.changedTouches[i].screenX;
        var y = event.changedTouches[i].screenY;
        var iframe = window.frameElement;
        var dx = windowTouches[id].sx - x;
        var dy = windowTouches[id].sy - y;
        var l2 = windowTouches[id].ix - dx;
        var t2 = windowTouches[id].iy - dy;
        window.setTimeout(function () { iframe.style.left = l2 + 'px'; iframe.style.top = t2 + 'px'},10);        
        // iframe.style.left = (l2) + 'px';
        // iframe.style.top = (t2) + 'px';      
        // iframe.left = windowTouches[id].ix + dx;
        // iframe.top = windowTouches[id].iy + dy;
      }*/
      
      delete windowTouches[id];
    }
    if (id == codearea.t1) { codearea.t1 = null; t1v = null; lastAngle = null; lastX = lastY = null;}
    if (id == codearea.t2) { codearea.t2 = null; t2v = null; lastAngle = null; lastX = lastY = null;}  
    console.log("End Touch2: " + id + "," + codearea.t1 + "," + codearea.t2 + "," + (codearea.t1 == id) + "," + (codearea.t2 == id)); 
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
    setTilesZIndex();
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
    parent = target.parentNode;
    
    tileBringToFront(target);

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

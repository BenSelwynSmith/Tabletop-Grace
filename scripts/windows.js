"use strict"
var windowMenu = [];
var windowColors = ["red", "blue", "yellow", "green"];

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
var canvas;

var transforms = ["", "rotate(90deg)", "rotate(-90deg)", "rotate(180deg)"];


var windowCount = 0;
var windowMax = 4;
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
var svgY = 200;
var win1 = 'a';
var win2 = 'a';

var windowarea;
var windowCon;

var minigraceTermination;
var minigraceRunning = 0;
var mg2;

function removeWindows() {
  for (var i = 0; i < windows.length; i++) {
    windows[i].parentNode.removeChild(windows[i]);
  }
  windows = [];
  windowCount = 0;
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

function minigraceReset() {
  minigraceMagicToggle();
  // clearOutput();
  setTimeout(minigraceMagicToggle, 100);
}

function minigraceMagicToggle() {
  if (minigrace) {
    mg2 = minigrace;
    minigrace = null;
  } else {
    minigrace = mg2;
    mg2 = null;
  }
}

function weakTerminationChecker() {  
  minigraceTermination++;
  var t = minigraceTermination;
  setTimeout(function() {
    if (t == minigraceTermination) {
      // console.log("Termination.");
      minigraceRunning = 0;
      codeRunningToggle(0);
    }
  }, 300);
}

function codeRunningToggle(b) {
  if (b) {
    Array.prototype.forEach.call(document.getElementsByClassName('goPie'), function(el) {
      el.style.fill = 'red';
    });
  } else {
    Array.prototype.forEach.call(document.getElementsByClassName('goPie'), function(el) {
      el.style.fill = 'black';
    });
  }
}

function windowsSetup() {
  addWMenuTouch();
  windowCon = document.getElementById('windowContainer');
  //Setup initial dialect (Adds some tiles)
  addDialectMethods(document.getElementById('dialect').value);
  
  for (var i = 0; i < windowMax; i++) {
    addBlockWindow(i);
    windows[i].style.display = "none";
    windows[i].windex = i;
    codearea2[i] = windows[i].children[0];
    codearea2[i].windex = i;
    desaturator2[i] = document.getElementById('desaturator' + i);
    overlays2[i] = document.getElementById('overlay-canvas' + i);
  }
  setup();
  
  for (var i = 0; i < windowMax; i++) {
    editor4[i] = editor3[i].children[2].children[0];
    addTouch(i);
    tiles2[i] = [];
  }
  
  // canvas = document.getElementById('standard-canvas');
  // canvas.addEventListener('touchend', expandOutput);
  document.getElementById('stdout_txt').addEventListener('touchend', expandOutput);
  
  
  //Test Code
  testSetup(1);
  // showPieMenu(300,300,0);
  // showSecMenu(600,600,0);
  //


  getCode[0] = function() {
    if (codearea2[0].classList.contains("shrink"))
      return editor2[0].getValue();
    return document.getElementById('gracecode' + 0).value;
  };
  getCode[1] = function() {
    if (codearea2[1].classList.contains("shrink"))
      return editor2[1].getValue();
    return document.getElementById('gracecode' + 1).value;
  };
  getCode[2] = function() {
    if (codearea2[2].classList.contains("shrink"))
      return editor2[2].getValue();
    return document.getElementById('gracecode' + 2).value;
  };
  getCode[3] = function() {
    if (codearea2[3].classList.contains("shrink"))
      return editor2[3].getValue();
    return document.getElementById('gracecode' + 3).value;
  };



  // document.getElementById('standard-canvas').getContext("2d").clearRect(0,0,200,200)
  // document.getElementById('standard-canvas').getContext("2d").clearRect = function() { };
}

function testSetup(i) {
  if (i == 1) {
    for (var a = 1; a < 4; a++) {
      windows[a].style.display = "none";
    }
    windows[0].style.display = "";
    windows[0].style.left = "0%";
    windows[0].style.top = "0%";
    windows[0].style.width = "100%";
    windows[0].style.height = "100%";
  } else if (i == 2) {
    for (var a = 2; a < 4; a++) {
      windows[a].style.display = "none";
    }
    for (var a = 0; a < 2; a++) {
      windows[a].style.display = "";
      windows[a].style.top = "0%";
      windows[a].style.width = "50%";
      windows[a].style.height = "100%";
      windows[a].style.transform = "";
    }
    windows[0].style.left = "0%";
    windows[1].style.left = "50%";    
  } else if (i == 3) {
    for (var a = 0; a < 3; a++) {
      windows[a].style.display = "";
      windows[a].style.top = "0%";
      windows[a].style.width = "33%";
      windows[a].style.height = "100%";
      windows[a].style.transform = "";
    }
    windows[0].style.left = "0%";
    windows[1].style.left = "33%";
    windows[2].style.left = "66%";
    windows[3].style.width = "34%";
  } else if (i == 4) {
    for (var a = 0; a < 4; a++) {
      windows[a].style.display = "";
      windows[a].style.top = "0%";
      windows[a].style.width = "25%";
      windows[a].style.height = "100%";
      windows[a].style.transform = "";
    }
    windows[0].style.left = "0%";
    windows[1].style.left = "25%";
    windows[2].style.left = "50%";
    windows[3].style.left = "75%";    
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

function propComparator2(prop) {
    return function(a,b) {
        if (a[prop] < b[prop]) { return -1; }
        if (a[prop] > b[prop]) { return 1; }
        return 0;
    }
}

function bringToFront(t) {
 /*  var f = t;
  var topDepth = depth + windowCount - 1;

  // console.log("Windows: " + windows.length);

  if (f.depth != topDepth) {
    var tmp = windows.slice();
    tmp.sort(propComparator('depth'));
    console.log("Top Element: " + tmp[0].depth);
    var depthTracker = depth;
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].idx == f.idx) {
        tmp[i].depth = topDepth;
      } else {
        if (tmp[i].depth > depthTracker) {
          tmp[i].depth--;
        }
        depthTracker++;
      }
      tmp[i].style.zIndex = tmp[i].depth;
    }
    return false;
  } else {
    return true;
  } */
}

function checkExpandOutput() {
  if (expanded == 0) {
    expandOutput();
  }
}

function expandOutput(id) {
  var o = document.getElementById("outputarea");
  if (expanded == 0) {
    o.style.display = "";
    o.style.zIndex = "995";
    o.style.width = "50%";
    o.style.left = "25%";
    o.style.position = "fixed";
    o.style.top = "24px";
    o.style.height = "calc(100% - 48px)";

    expanded = 1;
  } else {
    o.style.display = "none";
    expanded = 0;
  }
  // var c = document.getElementById("codearea");
  // var o = document.getElementById("outputarea");
  // var b = document.getElementById("expand-button");
  // if (expanded == 0) {
    // c.style.width = "70%";
    // o.style.width = "30%";
    // b.innerHTML = ">";
    // expanded = 1;
  // } else {
    // c.style.width = "99%";
    // o.style.width = "1%";
    // b.innerHTML = "<";
    // expanded = 0;
  // }


}

function clearCode(b,id) {
  console.log("ClearCode");
  for (var i = tiles2[id].length; i--; ) {
    tiles2[id][i].remove();
  }
  var children = codearea2[id].children;
  // console.log(children.length);
  for (var i = 0; i < codearea2[id].children.length; i++) {
    if (children[i].classList.contains('tile')) {
      codearea2[id].removeChild(children[i]);
      i--;
    }
  }
  if (!b) {
    generateCode(id);
  }
  // var pie = codearea2[id].getElementsByClassName('errorPie');  
  // for (var i = 0; i < pie.length; i++) {
    // pie[i].setAttribute('style.fill', 'green');
  // }
  
  Array.prototype.forEach.call(codearea2[id].getElementsByClassName('errorPie'), function(el) {
    el.style.fill = 'green';
  });
}



function clearOutput() {
  var c = document.getElementById("standard-canvas");
  var t = document.getElementById("stdout_txt");
  t.value = "";
  var context = c.getContext("2d");
  context.clearRect(0, 0, c.width, c.height);
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
  console.log("Scale: " + s);
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
    console.log("R:" + f.rot + "," + r);
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
  var x = x | event.clientX ;
  var y = y | event.clientY;

  var id = parseInt(target.getAttribute("id").slice(-1));
  console.log("SWM2: " + x + ", " + y + ", " + id);
  var svg0 = document.getElementById('window_svg');
  var svg = svg0.cloneNode(true);
  svg.removeAttribute('id');
  // svg.style.top = ((windowarea.scrollTop + y) - svg.getAttribute("height") * .5) + "px";
  // svg.style.left = ((x) - svg.getAttribute("width") * .5) + 'px';
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.idx = id;
  svg.setAttribute("class","piemenu");
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
  var min = 20;
  // console.log("sw2: " + sw2);
  console.log("wh: " + wh);

  if (id == 0 || id == 3) {
    var l = Math.min(w-sw-min,Math.max(min,x - sw2));
    svg.style.left = l + "px";
    if (id == 0) {
      svg.style.bottom = "10px";
    } else if (id == 3) {
      // svg.style.left = '45%';
      // svg.style.width = '50%';
      svg.style.top = "10px";
      svg.style.transform = "rotate(180deg)";
    }
  }

  if (id == 1 || id == 2) {
    var t = Math.min(h-sh-min,Math.max(min,y - sh2));
    svg.style.top = t + "px";
    if (id == 1) {
      svg.style.left = "10px";
      svg.style.transform = "rotate(90deg)";
    } else if (id == 2) {
      svg.style.right = "10px";
      svg.style.transform = "rotate(-90deg)";
    }
  }

}

function setRotation(idx,rid) {  
  //Set Rotate
  windows[idx].style.transform = transforms[rid];
  windows[idx].rid = rid;  
}

function windowMenuClick(idx,rid,state) {
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

  //Tap or Hold?
  //Mouse example
  var r = false;
  if (windows[idx].rid != null && windows[idx].rid == rid) { r = true; }
  console.log("Idx: " + idx + ", rid: " + rid + ", " + r + ", " + windows[idx].rid + ", " + (windows[idx].rid == rid));
  //Show Window
  if (windows[idx].style.display == "none") {
    if (state == 1) {
      windows[idx].style.display = "";
    } else {
      return;
    }
  }
  
  if (state == 1) {
    if (r) {
      //Tap -> Toggle Maximise
      console.log("Window: " + idx + ", Rotation: " + rid + " -> Toggle Maximise");
    } else {
      //Tap -> Rotate  
      setRotation(idx,rid);
      console.log("Window: " + idx + ", Rotation: " + rid + " -> Rotate");
    }
  } else if (state == 2) {
    if (windows[idx].style.display == "") {
      windows[idx].style.display = "none";
    }
  }
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
  var p1 = [50,200];
  var p2 = [150,200];
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
  newElement.setAttribute("cy", 200);
  newElement.setAttribute("r", 30);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.9";
  svg.appendChild(newElement);
  // newElement.addEventListener("click", function(event){ closePieMenu(event); });
  newElement.addEventListener("touchend", function(event) { closePieMenu(event); });
  newElement.style.pointerEvents = "all";

  //Line LR
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 90);
  newElement.setAttribute("y1", 198);
  newElement.setAttribute("x2", 110);
  newElement.setAttribute("y2", 178);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  // newElement.addEventListener("click", function(event){ closePieMenu(event); });
  newElement.addEventListener("touchend", function(event) { closePieMenu(event); });
  newElement.style.pointerEvents = "all";

  //Line RL
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 110);
  newElement.setAttribute("y1", 198);
  newElement.setAttribute("x2", 90);
  newElement.setAttribute("y2", 178);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  // newElement.addEventListener("click", function(event){ closePieMenu(event); });
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
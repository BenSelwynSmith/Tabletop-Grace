"use strict"
var windowMenu = [];
var windowColors = ["red", "blue", "yellow", "green"];
var windows = [];
var windowCount = 0;
var windowMax = 4;

function createWindow() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', window.location.pathname);
  document.body.appendChild(iframe);
  iframe.style.top = "30px";
  iframe.style.left = "30px";

}

function runTest() {
  addBlockWindow(null, 0);
  addOutputWindow();    
}

function scaleWindow(s) {
  
  
}

function addBlockWindow(event, id) {
  var w = 1920/1080;
  var h = 1080/1920;
  if (windowCount < windowMax) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', "code.html");
    document.body.appendChild(iframe);
    if (id == 0 || id == 3) {
      iframe.style.top = "10%";
      iframe.style.left = "15%";
      iframe.style.width = "70%";
      iframe.style.height = "80%";
      if (id == 3) {
        iframe.style.transform = "rotate(180deg)";
      }
    } else {
      iframe.style.top = "-20%";
      iframe.style.left = "30%";
      iframe.style.width = (70 * h) + "%";
      iframe.style.height = (80 * w) + "%";
      if (id == 1) {
        iframe.style.transform = "rotate(90deg)";
      }
      if (id == 2) {
        iframe.style.transform = "rotate(-90deg)";
      }

    }
    iframe.idx = windowCount;
    windows[windowCount] = iframe;
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

function convertToH(elem) {

}

function convertToW(elem) {

}

function closeWindowMenu(id) {
  windowMenu[id].parentNode.removeChild(windowMenu[id]);
  windowMenu[id] = null;
}

//Width of Menu
var mw = 125;   //Half
var mw2 = 250;
//Height of Menu
var mh = 40;    //Half
var mh2 = 80;

function showWindowMenu(event) {
  //#Remove
  addBlockWindow(null,0);
  if (true) { return; }  

  // var target = event.target;
  //0 Bottom: bottom: 50px, left: 50%, margin-left: -125px
  //1 Left: top: 50%, margin-top: -5px, left: -70px, transform: rotate(90deg)
  //2 Right: -90deg, left -> right
  //3 Top: 180deg, bottom -> top
  var target = event.target;
  while (target.tagName != "svg") {
    target = target.parentNode;
  }
  var x = event.clientX;
  var y = event.clientY;
  var m = document.createElement("div");
  m.className = "window_menu";
  var id = parseInt(target.getAttribute('id').slice(-1));
  if (windowMenu[id]) {
    return closeWindowMenu(id);
  }
  var w = window.innerWidth;
  var h = window.innerHeight;
  console.log(w + "," + h);



  if (id == 0 || id == 3) {
    x = x - mw;
    m.style.animationName = "window_menu_anim_h";
    m.style.left = Math.min(Math.max(10, x),(w-(mw2+10))) + 'px';
    if (id == 0) {
      m.style.bottom = "10px";
    } else {
      m.style.top = "10px";
      m.style.transform = "rotate(180deg)";
    }
  } else {
    var wh = 1080 / 1920;
    y = y;
    var xy = x * wh;
    var wy = mw * wh;
    var wy2 = wy - mh;    
    // var yMin = 15 + (mw * wh - mh);
    var yMin = 15 + mw;
    var yMax = h - 5 - mw;
    // var yMax = h - 5 - (mw * wh - mh);
    console.log(yMin + "," + yMax);

    m.style.top = Math.min(Math.max(yMin, y),(yMax)) + 'px';
    if (id == 1) {
      m.style.animationName = "window_menu_anim_l";
      m.style.left = "-40px";
      m.style.transform = "rotate(90deg)";
    } else {
      m.style.animationName = "window_menu_anim_r";
      m.style.right = "-40px";
      m.style.transform = "rotate(-90deg)";
    }
  }

  var div = document.createElement("div");
  div.className = "window_menu_option";
  var txt = document.createTextNode("Add Block Window");
  div.appendChild(txt);
  m.appendChild(div);
  div.addEventListener("click", function(event) { addBlockWindow(event,id); closeWindowMenu(id);});

  div = document.createElement("div");
  div.className = "window_menu_option";
  txt = document.createTextNode("Add Output Window");
  div.appendChild(txt);
  m.appendChild(div);
  div.addEventListener("click", function(event) { addOutputWindow(event,id); closeWindowMenu(id);});

  //Add touch events here: #TODO



  target.parentNode.appendChild(m);
  windowMenu[id] = m;
}


var wW = 30;
var wH = 30;

function createWidget() {
  var vars = document.getElementsByClassName("vardec");
  for (var i = 0; i < vars.length; i++) {
    // <div class="select_widget">+
    var div = document.createElement('div');
    div.className += "select_widget";
    // var txt = document.createTextNode('+');
    // div.appendChild(txt);
    vars[i].appendChild(div);
    div.style.left = "-97%";
    div.style.position = "relative";
    vars[i].width -= "30px";
  }
}

function createWidget3() {
  var vars = codearea.getElementsByClassName("tile");
  for (var i = 0; i < vars.length; i++) {
    var txt = document.createTextNode("   ");
    vars[i].appendChild(txt);
  }
}

function createWidget2() {
  interactMode = 1;

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
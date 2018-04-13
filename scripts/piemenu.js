
var rad = Math.PI / 180;
var pieces = 4;
var max = 360;
var start = 0;
var currentExtend = -1;
var colours = ["red", "green", "blue", "pink", "orange", "khaki", "plum", "olive", "peru", "darkslategray"];
var closePieDelay = 50;
var ops = ["+","-","/","*","^","%"];
var comps = ["==","!=","<",">","<=",">="];
var sec1 = "a";
var sec2 = "a";
var pie1 = "a";
var pie2 = "a";
var pieE1 = "a";
var pieE2 = "a";
var curDialect = 0;
var curSample = 0;
var pieM = 200;
var maxPie = 355;
var maxSec = 355;
var currentView = 0;
var conID = 0;

var tileList = [];

function closeAllMenus(id,scope) {
  var m;
  var target = "piemenu";
  if (scope) { target = scope; }
  if (id >= 0 && id < 4) {
    m = windows[id].getElementsByClassName(target);
  } else {
    m = document.getElementsByClassName(target);
  }

  for (var i = 0; i < m.length;) {
    m[i].parentNode.removeChild(m[i]);
  }
}



function hasConMenus() {
  return (document.getElementsByClassName("con") != null);
}

function removeFromConMenu(sid) {
  if (sid == -1) {
    var cb = document.getElementsByClassName("conButton");
    if (!cb) { return; }
    for (i = 0; i < cb.length;) {
      cb[i].parentNode.removeChild(cb[i]);
    }
    
    var cons = document.getElementsByClassName("con");
    for (i = 0; i < cons.length; i++) {
      cons[i].devNums = null;
      cons[i].devList = null;
      cons[i].devices = 0;
    }
    
    return;
  }
  
  
  var cons = document.getElementsByClassName("con");
  for (i = 0; i < cons.length; i++) {
    var elems = cons[i].getElementsByClassName(sid);
    if (elems.length == 0) { continue; }
    var devNum = "-1";
    for (j = 0; elems.length != 0;) {
      elems[j].parentNode.removeChild(elems[j]);
      if (devNum == "-1") {
        devNum = elems[j].dev;
      }
    }
    var index = cons[i].devList.indexOf(sid+"");
    cons[i].devList.splice(index, 1);
    index = cons[i].devNums.indexOf(devNum);
    cons[i].devNums.splice(index,1);
    cons[i].devices = nextNum(cons[i].devNums);
  }

}

function nextNum(arr) {
  if (arr == null || arr.length == 0) {
    return 0;
  } else if (arr.length >= 6) {
    return -1;
  } else {
    var i = 0;
    for (i = 0; i < 6; i++) {
      if (!arr.includes(i)) { return i; }
    }
    return i;
  }

}

function conMenuStatusRequest() {    
  if (ws_conState == 2) {      
    ws_statusRequest();      
  } else if (ws_conState == 0) {
    connect();
  }
}

function connect() {
  if (ws_conState != 0) { return; }
  ws_startWebSocket();    
}

function sendTiles(event) {
  if (!websock) { console.log("Not connected."); return false; }
  if (event.target.failed == 1) { console.log("Transfer  to " + event.target.sid + " already failed."); return false; }
  var dialect = document.getElementById('dialect').value;
  if (event.target.targetDialect != dialect) { console.log("Target: " + event.target.sid + " has different dialect."); return false; }      

  var tile = event.target.parentNode.tileSrc;
  var con = event.target.parentNode.conID;
  if (!ws_sendTilesState(con)) {
    console.log("conID " + conID + " is already transfering data.");
    return false;
  }      
  var data = null;
  if (!tile) {
    var windex0 = event.target.parentNode.windex;
    if (tiles2[windex0] != null && tiles2[windex0].length!= 0) {
      data = stringifyAllTiles(windex0);
    } else {
      console.log("No Tiles to Transfer.");
      return false;
    }
  } else {
    data = stringifyTiles(tile, tile.windex);
  }
  event.target.setAttribute("id", con + "#");
  event.target.style.fill = "yellow";
  ws_sendTiles(event.target.sid,dialect,con,data);
  console.log("Send TO: " + event.target.sid + ", Data: " + data.length);
  return true;
}

// updateConMenu(0,"10. Anubis", "", "1", ["1"])
function updateConMenu(name,dialect,winCount,winActive) {
  var cons = document.getElementsByClassName("con");
  if (cons.length == 0) { return; }

  for (i = 0; i < cons.length; i++) {
    var svg = document.getElementById("con" + cons[i].conID);
    if (!svg) { return; }
    var w = svg.getAttribute("width");
    var h = svg.getAttribute("height");
    var r0 = 70;
    var r = 20;
    var r2 = 45;
    var r3 = 110;
    var xMid = w*.5;
    var yMid = h*.5;
    var c1 = xMid - r;
    var c2 = xMid + r;
    var txtMod = 12.5;
    var diagonal = .7071;
    var x1 = xMid - r0;
    var x2 = xMid + r0;
    var y1 = yMid - r0;
    var y2 = yMid + r0;
    var windex = svg.windex;
    var devices = svg.devices;

    var sid = ("" + name).split('.')[0];
    if (svg.devNums == null) {
      svg.devNums = [0];
      svg.devList = [sid];
      svg.devices = 1;
    } else {
      if (svg.devList.includes(sid)) { return; }
      svg.devNums.push(devices);
      var devNum = nextNum(svg.devNums);
      svg.devices = devNum;
      svg.devList.push(sid);
    }




    var newElement = null;
    var textElement = null;
    var elemClass = "conButton " + sid;

    var xPos1 = 0;
    var yPos1 = 0;
    var dir = -1;
    var align = "end";
    var bChar = "\u21D0";
    var fs = "25px";
    var fx = -2;
    var fy = 8;
    var xMod = 0;
    if (devices % 2 != 0) {
      dir = 1;
      align = "start";
      bChar = "\u21D2";      
      fx = 1;
      // fy = 15;
      // xMod = 10;
    }
    

    if (devices == 0 || devices == 1 || devices == 4 || devices == 5) {
      xPos1 = xMid + (r0*diagonal) * dir;
    } else if (devices == 2 || devices == 3) {
      xPos1 = xMid + r0 * dir;
    } else {
      //6 is the max
      console.log("Too many devices for conMenu: " + conID + ", devices: " + devices);
      return;
    }

    if (devices == 0 || devices == 1) {
      yPos1 = yMid - (r0*diagonal);
    } else if (devices == 2 || devices == 3) {
      yPos1 = yMid;
    } else if (devices == 4 || devices == 5) {
      yPos1 = yMid + (r0*diagonal);
    }

    //+7 y  +3 x
    //font 65


    newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
    newElement.style.stroke = "black"; //Set stroke colour
    newElement.style.strokeWidth = "5px"; //Set stroke width
    newElement.setAttribute("cx", xPos1);
    newElement.setAttribute("cy", yPos1);
    newElement.setAttribute("r", r);
    newElement.setAttribute("class",elemClass);
    newElement.dev = devices;
    newElement.sid = sid;
    newElement.targetDialect = dialect;
    newElement.style.fill = "white";
    svg.appendChild(newElement);
    newElement.style.pointerEvents = "all";
    newElement.addEventListener("click", 
    function(event) { 
      if (!mouse) { return; }
      var b = sendTiles(event);
      if (!b) { 
        event.target.style.fill = "red";
        window.setTimeout(function() {
          event.target.style.fill = "white";
        },500);
      }
    });
    newElement.addEventListener("touchend", function(event) {
      var b = sendTiles(event);
      if (!b) { 
        event.target.style.fill = "red";
        window.setTimeout(function() {
          event.target.style.fill = "white";
        },500);
      }
    });

    textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
    textElement.textContent = bChar;
    // textElement.textContent = "\u25C0"; //Left Arrow
    // textElement.textContent = "\u25B6"; //Right Arrow
    //25A9
    //25AA
    textElement.style.fontFamily = "entypo";
    textElement.style.fontSize = fs;
    textElement.setAttribute("x", xPos1+fx);
    textElement.setAttribute("y", yPos1+fy);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("class",elemClass);
    textElement.dev = devices;
    svg.appendChild(textElement);

    var d = "";
    if (dialect == "") { d += "standard"; } else { d += dialect; }
    var n = name;
    d = capitalizeFirstLetter(d);
    var w = "Windows: " + winCount + "(" + winActive + ")";


    var txt1 = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
    txt1.style.fontFamily = "entypo";
    txt1.style.fontSize = "12px";
    txt1.textContent = n;
    txt1.setAttribute("x", xPos1 + xMod + 24*dir); //-24
    txt1.setAttribute("y", yPos1 - 11); //-11
    txt1.setAttribute("text-anchor", align);
    txt1.setAttribute("class",elemClass);
    txt1.dev = devices;
    svg.appendChild(txt1);

    var txt2 = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
    txt2.style.fontFamily = "entypo";
    txt2.style.fontSize = "12px";
    txt2.textContent = d;
    txt2.setAttribute("x", xPos1 + xMod + 24*dir); //-24
    txt2.setAttribute("y", yPos1 + 2);  //+ 2
    txt2.setAttribute("text-anchor", align);
    txt2.setAttribute("class",elemClass);
    txt2.dev = devices;
    if (dialect != document.getElementById('dialect').value) {
      txt2.style.fill = "red";
    }
    svg.appendChild(txt2);

    var txt3 = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
    txt3.style.fontFamily = "entypo";
    txt3.style.fontSize = "12px";
    txt3.textContent = w;
    txt3.setAttribute("x", xPos1 + xMod + 24*dir); //-24
    txt3.setAttribute("y", yPos1 + 15);  //+15
    txt3.setAttribute("text-anchor", align);
    txt3.setAttribute("class",elemClass);
    txt3.dev = devices;
    svg.appendChild(txt3);

    window.setTimeout(function() {
      var d1 = txt1.getBBox();
      var d2 = txt2.getBBox();
      var d3 = txt3.getBBox();
      var dim = d1;
      if (d2.width > dim.width) {
        dim = d2;
      }
      if (d3.width > dim.width) {
        dim = d3;
      }
      var w2 = dim.width / 2;
      var y2 = d3.y - d1.y;
      var y3 = d1.y + (y2/2);

      var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      rect.setAttribute("x", dim.x-(2));
      rect.setAttribute("y", y3-12);
      rect.setAttribute("rx", 10);
      rect.setAttribute("ry", 10);
      rect.setAttribute("width", dim.width+4);
      rect.setAttribute("height", y2+16);
      rect.style.stroke = "black";
      rect.style.fill = "white";
      rect.style.fillOpacity = "0.8";
      rect.setAttribute("class",elemClass);
      rect.dev = devices;
      svg.insertBefore(rect,txt1);
    },2);
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function showConMenu(x,y,src,w) {
  //Create Menu
  var svg0 = document.getElementById('con_svg');
  var svg = svg0.cloneNode(true);  
  var windex = (src != null ? src.windex : w);

  svg.setAttribute("id",'con' + conID);
  svg.style.left = (x - svg.getAttribute("width")*.5) + "px";
  svg.style.top = (y - svg.getAttribute("height")*.5) + "px";  
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.conID = conID;
  svg.tileSrc = src;
  svg.setAttribute("class","con piemenu");  
  codearea2[windex].appendChild(svg);
  svg.setAttribute("ts", Date.now());
  svg.devices = 0;
  svg.windex = windex;
  createConMenu(svg);

  //Send Status Request...
  ws_statusRequest();
  conID++;

}



function createConMenu(svg) {
  //Delete
  // var c1 = 110;
  // var c1 = 120;
  // var c2 = 190;

  var w = svg.getAttribute("width");
  var h = svg.getAttribute("height");
  var r0 = 70;
  var r = 20;
  var r2 = 45;
  var r3 = 110;
  var xMid = w*.5;
  var yMid = h*.5;
  var c1 = xMid - r;
  var c2 = xMid + r;
  var txtMod = 12.5;
  var diagonal = .7071;
  var x1 = xMid - r0;
  var x2 = xMid + r0;
  var y1 = yMid - r0;
  var y2 = yMid + r0;
  var windex = svg.windex;
  // var xMind =

  var newElement = null;
  var textElement = null;

  //Back + X (close button)
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "white"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.setAttribute("cx", xMid);
  newElement.setAttribute("cy", yMid);
  newElement.setAttribute("r", r0);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.7";
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event) { if (mouse) { closeTileMenu(event) }});
  newElement.addEventListener('touchend', closeTileMenu);
  newElement.style.pointerEvents = "all";

  /* Line \  */
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", xMid - r);
  newElement.setAttribute("y1", yMid - r);
  newElement.setAttribute("x2", xMid + r);
  newElement.setAttribute("y2", yMid + r);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event) { if (mouse) { closeTileMenu(event) }});
  newElement.addEventListener('touchend', closeTileMenu);
  newElement.style.pointerEvents = "all";

  // Line /
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", xMid + r);
  newElement.setAttribute("y1", yMid - r);
  newElement.setAttribute("x2", xMid - r);
  newElement.setAttribute("y2", yMid + r);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event) { if (mouse) { closeTileMenu(event) }});
  newElement.addEventListener('touchend', closeTileMenu);
  newElement.style.pointerEvents = "all";

  //Refresh button
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "5px"; //Set stroke width
  newElement.setAttribute("cx", xMid);
  newElement.setAttribute("cy", y1+5);
  newElement.setAttribute("r", r);
  newElement.setAttribute("class","con-status-icon");
  
  

  newElement.addEventListener("click", function(event) { if (mouse) { refreshConMenu(event,svg); }});
  newElement.addEventListener("touchend", function(event) { refreshConMenu(event,svg); });
  svg.appendChild(newElement);
  newElement.style.pointerEvents = "all";

  textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  // textElement.textContent = "\u21BB";
  textElement.textContent = fixedFromCharCode(0x01F4F6);  
  textElement.style.fontFamily = "entypo";
  textElement.style.fontSize = "50px";
  textElement.setAttribute("x",xMid);
  textElement.setAttribute("y",y1+5);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("class","con-status-icon-text");  
  if (ws_conState == 0) {
    newElement.style.fill = "red";
  } else if (ws_conState == 1) {
    newElement.style.fill = "yellow";
  } else if (ws_conState == 2) {
    newElement.style.fill = "white";    
    textElement.textContent = "\u2315";
    textElement.style.fontSize = "30px";
  }
  
  svg.appendChild(textElement);
  
  if (mobile) {
    //Mobile
    textElement.setAttribute("alignment-baseline", "central"); //Chrome
    textElement.setAttribute("dominant-baseline", "central");  //Firefox
  } else {
    textElement.setAttribute("alignment-baseline", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
  }
  
  //Title
  var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  rect.setAttribute("x", xMid-(188/2));
  rect.setAttribute("y", y1-23-20);
  rect.setAttribute("rx", 10);
  rect.setAttribute("ry", 10);
  rect.setAttribute("width", 188);
  rect.setAttribute("height", 30);
  rect.style.stroke = "white";
  rect.style.fill = "black";
  rect.style.fillOpacity = "0.7";
  svg.appendChild(rect);
  
  var txt = ws_self();
  textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = txt;
  textElement.style.fontFamily = "entypo";
  textElement.style.fontSize = "23px";
  textElement.setAttribute("x",xMid);
  textElement.setAttribute("y",y1-23);
  textElement.setAttribute("text-anchor", "middle");
  textElement.style.fill = "white";
  textElement.setAttribute("class","con-status-text");
  svg.appendChild(textElement);

  // window.setTimeout(function() {
    // var dim = textElement.getBBox();
    // var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    // rect.setAttribute("x", dim.x-2);
    // rect.setAttribute("y", dim.y-2);
    // rect.setAttribute("rx", 10);
    // rect.setAttribute("ry", 10);
    // rect.setAttribute("width", dim.width+4);
    // rect.setAttribute("height", dim.height+4);
    // rect.style.stroke = "white";
    // rect.style.fill = "black";
    // rect.style.fillOpacity = "0.7";
    // svg.insertBefore(rect,textElement);
  // },10);
}



function refreshConMenu(event,svg) {
  if (ws_conState == 0) {
    ws_startWebSocket();
  } else if (ws_conState == 1) {
    return;
  } else if (ws_conState == 2) {
    if (ws_sending) { return; }
    ws_sending = true;
    removeFromConMenu(-1);
    Array.prototype.forEach.call(document.getElementsByClassName('con-status-icon'), function(el) {    
      el.style.fill = "greenyellow";
    });
    ws_statusRequest();
    window.setTimeout(function() {
      if (!ws_sending) { return; }
      Array.prototype.forEach.call(document.getElementsByClassName('con-status-icon'), function(el) {        
        el.style.fill = "white";        
      });
      ws_sending = false;
    },3000);
  }  
}

function showTileMenu(x,y,src) {
  // console.log("ShowTileMenu: " + x + "," + y);
  //Delete + Copy
  var svg0 = document.getElementById('tile_svg');
  var svg = svg0.cloneNode(true);
  var rid = windows[src.windex].rid;
  svg.windex = src.windex;

  var pos;
  if (rid != 0) {
    pos = rotateXY(src.windex, rid, x, y);
  } else {
    pos = positionCorrection([x,y],src.windex);
  }
  x = pos[0];
  y = pos[1];
  x += codearea2[src.windex].scrollLeft;
  y += codearea2[src.windex].scrollTop;

  svg.removeAttribute('id');
  svg.style.left = (x - svg.getAttribute("width")*.5) + "px";
  svg.style.top = (y - svg.getAttribute("height")*.5) + "px";
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.tileSrc = src;
  svg.setAttribute("class","piemenu");
  codearea2[src.windex].appendChild(svg);
  svg.setAttribute("ts", Date.now());
  createTileMenu(svg);
}


//Function that allows for 5 digit unicode chars
function fixedFromCharCode (codePt) {
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    else {
        return String.fromCharCode(codePt);
    }
}



function createTileMenu(svg) {
  //Delete
  // var c1 = 110;
  // var c1 = 120;
  // var c2 = 190;

  var w = svg.getAttribute("width");
  var h = svg.getAttribute("height");
  var r0 = 70;
  var r = 20;
  var r2 = 45;
  var r3 = 110;
  var xMid = w*.5;
  var yMid = h*.5;
  var c1 = xMid - r;
  var c2 = xMid + r;
  var txtMod = 12.5;
  var diagonal = .7071;
  var d1x = .643;
  var d1y = .766;
  var d2x = .985;
  var d2y = .174;
  var d3x = .866;
  var d3y = .500;
  var d4x = .342;
  var d4y = .940;  
  var x1 = xMid - r0;
  var x2 = xMid + r0;
  var y1 = yMid - r0;
  var y2 = yMid + r0;
  var windex = svg.windex;
  // var xMind =

  //Back
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "white"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.setAttribute("cx", xMid);
  newElement.setAttribute("cy", yMid);
  newElement.setAttribute("r", r0);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.5";
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event) { if (mouse) { closeTileMenu(event) }});
  newElement.addEventListener('touchend', closeTileMenu);
  newElement.style.pointerEvents = "all";

  /* Line \  */
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", xMid - r);
  newElement.setAttribute("y1", yMid - r);
  newElement.setAttribute("x2", xMid + r);
  newElement.setAttribute("y2", yMid + r);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event) { if (mouse) { closeTileMenu(event) }});
  newElement.addEventListener('touchend', closeTileMenu);
  newElement.style.pointerEvents = "all";

  // Line /
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", xMid + r);
  newElement.setAttribute("y1", yMid - r);
  newElement.setAttribute("x2", xMid - r);
  newElement.setAttribute("y2", yMid + r);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event) { if (mouse) { closeTileMenu(event) }});
  newElement.addEventListener('touchend', closeTileMenu);
  newElement.style.pointerEvents = "all";

  //Delete
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "5px"; //Set stroke width
  newElement.setAttribute("cx", xMid);
  newElement.setAttribute("cy", y1);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";

  newElement.addEventListener("click", function(event) { if (mouse) { deleteTile(event,svg.tileSrc); }});
  newElement.addEventListener("touchend", function(event) { deleteTile(event,svg.tileSrc); });
  svg.appendChild(newElement);
  newElement.style.pointerEvents = "all";

  var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = "\uE729";
  textElement.style.fontFamily = "entypo";
  textElement.style.fontSize = "50px";
  textElement.setAttribute("x",xMid);
  textElement.setAttribute("y",y1);
  textElement.setAttribute("text-anchor", "middle");

  if (mobile) {
    //Mobile
    textElement.setAttribute("alignment-baseline", "central"); //Chrome
    textElement.setAttribute("dominant-baseline", "central");  //Firefox
  } else {
    textElement.setAttribute("alignment-baseline", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
  }

  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);

  //Open Connection Menu
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "5px"; //Set stroke width
  newElement.setAttribute("cx", xMid+r0*d4x);
  newElement.setAttribute("cy", yMid+r0*d4y);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";

  newElement.addEventListener("click", function(event) {
    //Show Connection Menu      
    if (!mouse) { return; }
    showConMenu(svg.xPoint,svg.yPoint,svg.tileSrc);      
    closeTileMenu(event);
  });
  newElement.addEventListener("touchend", function(event) {
    //Show Connection Menu      
    showConMenu(svg.xPoint,svg.yPoint,svg.tileSrc);      
    closeTileMenu(event);
  });
  svg.appendChild(newElement);
  newElement.style.pointerEvents = "all";

  textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.style.fontFamily = "entypo";        
  textElement.style.fontSize = "50px";
  textElement.textContent = fixedFromCharCode(0x01f4f6); //1f4f6
  textElement.setAttribute("x",xMid+r0*d4x);
  textElement.setAttribute("y",yMid+r0*d4y);
  textElement.setAttribute("text-anchor", "middle");
  if (!mobile) {
    textElement.setAttribute("alignment-baseline", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
  } else {
    textElement.setAttribute("alignment-baseline", "central");
    textElement.setAttribute("dominant-baseline", "central");
  }
  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);
  
  if (system_mode == 0) {
    //Copy
    newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
    newElement.style.stroke = "black"; //Set stroke colour
    newElement.style.strokeWidth = "5px"; //Set stroke width
    newElement.setAttribute("cx", xMid-r0*d4x);
    newElement.setAttribute("cy", yMid+r0*d4y);
    newElement.setAttribute("r", r);
    newElement.style.fill = "white";

    newElement.addEventListener("touchend", function(event) {
      var t = svg.getElementsByClassName('moveTileButton');
      for (var i = 0; i < t.length; i++) {
        if (t[i].style.display == "") {
          t[i].style.display = "none";
        } else {
          t[i].style.display = "";
        }
      }
    });
    svg.appendChild(newElement);
    newElement.style.pointerEvents = "all";

    textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
    textElement.style.fontFamily = "entypo";        
    textElement.textContent = "\uE74D";

    //Special values to match this unicode char which has a border around it already
    textElement.style.fontSize = "50px";
    textElement.setAttribute("x",xMid-r0*d4x);
    textElement.setAttribute("y",yMid+r0*d4y);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("alignment-baseline", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("pointer-events", "none");
    svg.appendChild(textElement);
    
    
    
    
    
    //
    var xL = [xMid-r3*diagonal,xMid-r3*diagonal*.5,xMid+r3*diagonal*.5,xMid+r3*diagonal];
    var yL = [yMid+r3*diagonal,yMid+r3*diagonal*1.2,yMid+r3*diagonal*1.2,yMid+r3*diagonal];
    for (var i = 0; i < 4; i++) {
      newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
      newElement.style.stroke = "black"; //Set stroke colour
      newElement.style.strokeWidth = "5px"; //Set stroke width
      // xMid-r0*diagonal,yMid-r0*diagonal
      newElement.setAttribute("cx", xL[i]);
      newElement.setAttribute("cy", yL[i]);
      newElement.setAttribute("r", r);
      newElement.style.fill = "white";
      // newElement.addEventListener("click", function(event) { if (mouse) cloneTile(event,svg.tileSrc); });
      // newElement.addEventListener("touchend", function(event) { cloneTile(event,svg.tileSrc); });
      svg.appendChild(newElement);
      newElement.style.pointerEvents = "all";

      textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
      textElement.style.fontFamily = "entypo";
      textElement.textContent = i+1;
      newElement.idx = i;
      newElement.windex = windex;


      //Special values to match this unicode char which has a border around it already
      textElement.style.fontSize = "40px";
      textElement.setAttribute("x",xL[i]);
      textElement.setAttribute("y",yL[i]);
      textElement.setAttribute("text-anchor", "middle");


      textElement.setAttribute("alignment-baseline", "middle");
      textElement.setAttribute("dominant-baseline", "middle");


      textElement.setAttribute("pointer-events", "none");

      if (i == windex) {
        textElement.textContent = fixedFromCharCode(0x01F54E);
        textElement.style.fontSize = "80px";
        newElement.style.strokeWidth = "2px"; //Set stroke width
        newElement.addEventListener("click", function(event) { if (mouse) {
          cloneTile(event,svg.tileSrc);
          closeTileMenu(event);
        }});
        newElement.addEventListener("touchend", function(event) {
          cloneTile(event,svg.tileSrc);
          closeTileMenu(event);
        });
      } else {
        newElement.addEventListener("click", function(event) { if (mouse) {
          moveTileToWindow(event.target.windex,event.target.idx,svg.tileSrc);
          closeTileMenu(event);
        }});
        newElement.addEventListener("touchend", function(event) {
          moveTileToWindow(event.target.windex,event.target.idx,svg.tileSrc);
          closeTileMenu(event);
        });
      }
      newElement.style.display = "none";
      newElement.setAttribute('class', 'moveTileButton');
      textElement.setAttribute('class', 'moveTileButton');
      textElement.style.display = "none";
      svg.appendChild(textElement);
    }
  } else if (system_mode == 1) {
    //Copy
    newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
    newElement.style.stroke = "black"; //Set stroke colour
    newElement.style.strokeWidth = "5px"; //Set stroke width    
    newElement.setAttribute("cx", xMid-r0*d4x);
    newElement.setAttribute("cy", yMid+r0*d4y);
    newElement.setAttribute("r", r);
    newElement.style.fill = "white";
    // newElement.addEventListener("click", function(event) { if (mouse) cloneTile(event,svg.tileSrc); });
    // newElement.addEventListener("touchend", function(event) { cloneTile(event,svg.tileSrc); });
    svg.appendChild(newElement);
    newElement.style.pointerEvents = "all";

    textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
    textElement.style.fontFamily = "entypo";
    newElement.windex = windex;    
    textElement.setAttribute("x", xMid-r0*d4x);
    textElement.setAttribute("y", yMid+r0*d4y);
    textElement.setAttribute("text-anchor", "middle");
    if (mobile) {    
      textElement.setAttribute("alignment-baseline", "central"); //Chrome
      textElement.setAttribute("dominant-baseline", "central");  //Firefox
    } else {
      textElement.setAttribute("alignment-baseline", "middle"); //Chrome
      textElement.setAttribute("dominant-baseline", "middle");  //Firefox
    }
    textElement.setAttribute("pointer-events", "none");
    textElement.textContent = fixedFromCharCode(0x01F54E);
    textElement.style.fontSize = "80px";
    newElement.style.strokeWidth = "2px"; //Set stroke width
    newElement.addEventListener("click", function(event) { if (mouse) {
      cloneTile(event,svg.tileSrc);
      closeTileMenu(event);
    }});
    newElement.addEventListener("touchend", function(event) {
      cloneTile(event,svg.tileSrc);
      closeTileMenu(event);
    });
    newElement.setAttribute('class', 'moveTileButton');
    textElement.setAttribute('class', 'moveTileButton');
    svg.appendChild(textElement);

  }



  //Tiles with additional options
  // == < > <= >= !=     6    class: CMPOP
  // + - * / ^ %         6    class: OP
  // && and || is possible through code, but breaks the block version
  if (svg.tileSrc.classList.contains("comparison-operator")) {
    var opTxt = 7;
    var tileToChange = svg.tileSrc.children[1];
    if (comps.includes(tileToChange.innerHTML)) {
      createTileMenuElement(svg,"==",xMid-r0*d1x,yMid-r0*d1y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"!=",xMid+r0*d1x,yMid-r0*d1y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"<" ,xMid-r0*d2x,yMid-r0*d2y,r,opTxt,tileToChange);
      createTileMenuElement(svg,">" ,xMid+r0*d2x,yMid-r0*d2y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"<=",xMid-r0*d3x,yMid+r0*d3y,r,opTxt,tileToChange);
      createTileMenuElement(svg,">=",xMid+r0*d3x,yMid+r0*d3y,r,opTxt,tileToChange);
    }
  } else if (svg.tileSrc.classList.contains("operator")) {
    var opTxt = 7;
    var tileToChange = svg.tileSrc.children[1];
    if (ops.includes(tileToChange.innerHTML)) {      
      createTileMenuElement(svg,"+",xMid-r0*d1x,yMid-r0*d1y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"-",xMid+r0*d1x,yMid-r0*d1y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"*",xMid-r0*d2x,yMid-r0*d2y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"/",xMid+r0*d2x,yMid-r0*d2y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"^",xMid-r0*d3x,yMid+r0*d3y,r,opTxt,tileToChange);
      createTileMenuElement(svg,"%",xMid+r0*d3x,yMid+r0*d3y,r,opTxt,tileToChange);
    }
  }
  /*var data;
  data = "M 130 110"
  data += "A r2 r2 1 1 130 190"
  // data += "M

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  newElement.setAttribute("d",data); //Set path's data
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  // newElement.style.fill = colours[idx];
  // newElement.style.fillOpacity = "0.5";
  svg.appendChild(newElement);*/

  tile_created = 1;
}

function createTileMenuElement(svg,txt,x,y,r,t,tileToChange) {
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "5px"; //Set stroke width
  newElement.setAttribute("cx", x);
  newElement.setAttribute("cy", y);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";
  // addButtonTouch(newElement, changeTileTxt, svg.tileSrc); //??
  newElement.addEventListener("click", function() {
    if (!mouse) return;
    tileToChange.innerHTML = txt;
    closeTileMenu(null,svg);
    generateCode(tileToChange.parentNode.windex);
  });
  newElement.addEventListener("touchend", function() {
    tileToChange.innerHTML = txt;
    closeTileMenu(null,svg);
    generateCode(tileToChange.parentNode.windex);
  });
  svg.appendChild(newElement);
  newElement.style.pointerEvents = "all";

  var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = txt;
  // textElement.style.fontFamily = "entypo";
  textElement.style.fontSize = "20px";
  textElement.setAttribute("x",x);
  textElement.setAttribute("y",y);
  textElement.setAttribute("text-anchor", "middle");

  if (system_mode == 1) {
    //Mobile
    textElement.setAttribute("alignment-baseline", "central"); //Chrome
    textElement.setAttribute("dominant-baseline", "central");  //Firefox
  } else {
    textElement.setAttribute("alignment-baseline", "middle");
    textElement.setAttribute("dominant-baseline", "middle");
  }

  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);
}

function fixNextPrev(holes) {
  for (var i = 0; i < holes.length; i++) {
    for (var j = 0; j < holes[i].children.length; j++) {
      fixNextPrev(holes[i].children[j].getElementsByClassName('hole multi'));

      if (j == 0) {
        holes[i].children[j].prev = false;
      } else {
        holes[i].children[j].prev = holes[i].children[j-1];
      }

      if (j + 1 == holes[i].children.length) {
        holes[i].children[j].next = false;
      } else {
        holes[i].children[j].next = holes[i].children[j+1];
      }
    }
  }
}



function cloneTile (event, tile, b) {
  var svg = event.target.parentNode;
  var tmp = tile;


  while (!tmp.classList.contains('tile')) {
    tmp = tmp.parentNode;
  }

  var newTile = tmp.cloneNode(true);
  newTile.windex = tmp.windex;
  addTileTouchToTile(newTile);
  newTile.prev = false;
  newTile.next = false;
  var xy = findOffsetTopLeft(tile);
  var tileChildren = newTile.getElementsByClassName('tile');
  for (var i=0; i<tileChildren.length; i++) {
    if (tileChildren[i].classList.contains('tile')) {
      if (!tileChildren[i].windex) { tileChildren[i].windex = tmp.windex; }
      addTileTouchToTile(tileChildren[i]);
    }
  }

  // var holesO = tile.getElementsByClassName('hole multi');
  var holesN = newTile.getElementsByClassName('hole multi');
  fixNextPrev(holesN);


  var left = tile.offsetLeft;
  var top = tile.offsetTop;
  var p = tile.offsetParent;
  while (!p.classList.contains('codearea')) {
    left += p.offsetLeft;
    top  += p.offsetTop;
    p = p.offsetParent;
  }

  // newTile.style.left = tile.offsetLeft + 10 + 'px';
  // newTile.style.top = tile.offsetTop + 10 + 'px';
  // console.log("xy: " + left + ", " + top);
  newTile.style.left = left + 10 + 'px';
  newTile.style.top = top + 10 + 'px';
  newTile.style.position = "absolute";
  tiles2[tile.windex].push(newTile);
  Array.prototype.forEach.call(newTile.getElementsByClassName('tile'), function(el) {
    tiles2[tile.windex].push(el);
  });

  codearea2[tile.windex].appendChild(newTile);
  updateTileIndicator(tile.windex);
  generateCode(tile.windex);
  reflow(tile.windex);
  checkpointSave(tile.windex);
  clearPopouts(tile.windex);
  svg.parentNode.removeChild(svg);
  overlays2[tile.windex].style.display = 'none';
}



function deleteTile (event, tile) {
  var svg = event.target.parentNode;
  var tmp = tile;
  var windex = tile.windex;
  // console.log("Delete Tile: " + tile.classList + " - " + event.target.tagName);
  while (!tmp.classList.contains('tile')) {
    tmp = tmp.parentNode;
  }
  if (tmp.next) {
    tmp.next.prev = false;
  }
  if (tmp.prev) {
    tmp.prev.next = false;
  }
  tmp.parentNode.removeChild(tmp);
  // while (tmp) {
  //   tmp.parentNode.removeChild(tmp);
  //   tmp = tmp.next;
  // }
  tiles2[windex] = [];
  Array.prototype.forEach.call(codearea2[windex].getElementsByClassName('tile'), function(el) {
      // console.log(el.tagName + ", " + el.parentNode.classList);
      tiles2[windex].push(el);
    });
  updateTileIndicator(windex);
  generateCode(windex);
  reflow(windex);
  checkpointSave(windex);
  clearPopouts(windex);
  overlays2[windex].style.display = 'none';
  svg.parentNode.removeChild(svg);
  holes2[windex] = codearea2[windex].getElementsByClassName('hole');
}

function cloneSVG(target,x,y,id,cl) {
  var svg0 = document.getElementById(target);
  var svg = svg0.cloneNode(true);
  svg.removeAttribute('id');
  svg.setAttribute("class",cl);
  svg.style.top = ((y) - svg.getAttribute("height") * .5) + "px";
  svg.style.left = ((x) - svg.getAttribute("width") * .5) + "px"
  svg.style.fontFamily = "none";
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.windex = id;
  codearea2[id].appendChild(svg);
  svg.setAttribute("ts", Date.now());
  return svg;
}

function showPieMenu(x,y,id) {
  if (id < 0 || id > 3) { return; }
  var pos;
  // console.log("ShowPieMenu: " + x + ", " + y + ", " + windows[id].rid);
  if (windows[id].rid != 0) {
    pos = rotateXY(id,windows[id].rid, x, y);
  } else {
    pos = positionCorrection([x,y],id);
  }
  x = pos[0];
  y = pos[1];

  x += codearea2[id].scrollLeft;
  y += codearea2[id].scrollTop;

  // console.log("ShowPieMenu: " + x + ", " + y + ", " + windows[id].rid);
  createPieMenu(cloneSVG('pie_svg',x,y,id,"pie piemenu"));
}

function showSecMenu(x,y,id) {
  if (id < 0 || id > 3) { return; }
  var pos;
  if (windows[id].rid != 0) {
    pos = rotateXY(id,windows[id].rid, x, y);
  } else {
    pos = positionCorrection([x,y],id);
  }
  x = pos[0];
  y = pos[1];
  var svg;
  if (codearea2[id].style.visibility == "hidden") {
    svg = cloneSVG('sec_svg',x,y,id,"sec piemenu");
    editor4[id].appendChild(svg);
  } else {
    x += codearea2[id].scrollLeft;
    y += codearea2[id].scrollTop;
    svg = cloneSVG('sec_svg',x,y,id,"sec piemenu");
  }
  createSecondaryMenu(svg);

}

function closePieMenu(event) {
  event.preventDefault();
  event.stopPropagation();
  var elem = event.target;
  if (!elem.parentNode) { return; }

  // console.log("closePie: " + elem.tagName);
  //Get containing SVG
  while (elem.tagName != "svg" && elem.parentNode != null) {
    elem = elem.parentNode;
  }

  var timeDif = Date.now() - elem.getAttribute("ts");
  if (timeDif > closePieDelay) {
    window.setTimeout(function() {
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    },10);
  }
}

function closeTileMenu(event, svg) {
  var elem;
  if (!svg) {
     elem = event.target;
     while (elem.tagName != "svg" && elem.parentNode != null) {
      elem = elem.parentNode;
    }
  } else {
    elem = svg;
  }


  var timeDif = Date.now() - elem.getAttribute("ts");
  if (timeDif > closePieDelay) {
    window.setTimeout(function() {
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    },10);
  }
  // event.stopPropagation();
  // event.preventDefault();
}

function createPieMenu(svg) {
  //Find all tiles and create pie menu from them
  // console.log("Create pie menu: " + svg);
  var tmp = toolbox.getElementsByClassName('tile');
  var cats = [];
  var catTile = [];
  var catCount = 0;
  colours = [];
  for (var i in tmp) {
    if (tmp[i].nodeType == 1) {
      var cat = tmp[i].getAttribute("data-category");
      if (!cats.includes(cat)) {
        cats.push(cat);
        // colours[i] = tmp[i].style.background;
        colours[catCount] = window.getComputedStyle(tmp[i]).backgroundColor;
        if (catCount == 2) { colours[catCount] = "blue"; }
        catCount++;
      }
    }
  }





  var tiles = [];
  for (var c in cats) {
    for (var i in tmp) {
      if (tmp[i].nodeType != 1) { continue; }
      if (tmp[i].getAttribute("data-category") == cats[c]) {
        tiles.push(tmp[i]);
      }
    }
  }

  var redo = false;
  if (!tileList || tileList.length == 0) {
    redo = true;
  }

  var tileGroups = [];
  for (var i = 0; i < tiles.length; i++) {
    var tileType = tiles[i].getAttribute("data-category");

    if (redo) {
      tileList.push(tiles[i]);
    }

    var b = -1;
    for (var j = 0; j < tileGroups.length; j++) {
      if (tileGroups[j].type == tileType) {
        tileGroups[j].count++;
        b = j;
        break;
      }
    }

    if (b == -1) {
      tileGroups.push({ type: tileType, count: 1, idx: i});
    }
  }

  if (pie2 == "z") {
    pie2 = "A";
  } else if (pie2 == "Z") {
    if (pie1 == "z") {
      pie1 = "A";
      pie2 = "a";
    } else if (pie1 == "Z") {
      pie1 = "a";
      pie2 = "a";
    } else {
      pie1 = nextChar(pie1);
      pie2 = "a";
    }
  } else {
    pie2 = nextChar(pie2);
  }

  createPie(svg, tileGroups);
}

function createPie(svg, tileGroups) {
  //Create base pie
  this.pieces = tileGroups.length;
  this.max = 360;
  this.start = -45;
  seg = max/pieces;
  for (var i = 0; i < pieces; i++) {
    createPieSegment(pieM,pieM,100,50,start,seg,svg,i,-2,tileGroups[i].type);
    start += seg;
  }

  createCancelButton(svg,pieM,pieM);


  //Create popout segments
  for (var i = 0; i < tileGroups.length; i++) {
    createExtendMenus(tileGroups[i],i,svg);
  }
}

function createExtendMenus(tileGroup,idx,svg) {
  // console.log(idx);
  var p = tileGroup.count;
  // console.log("TileGroupIdx: " + tileGroup.idx);
  segAngle = start + idx * max / pieces + max / pieces / 2;
  defSize = 40;
  seg = maxPie/p;
  if (p * defSize > maxPie) {
    seg = maxPie/p;
  } else {
    seg = defSize;
  }
  s = segAngle - (seg*p)/2;
  for (var i = 0; i < p; i++) {
    createPieSegment(pieM,pieM,160,120,s,seg,svg,idx,"pie" + idx,tileGroup.idx+i);
    s += seg;
  }
}


function createExtendSec(svg,idx,txtData,start) {
  var x0 = 200;
  var y0 = 200;
  var r = 140;
  var r2 = 40;
  var r3 = r + r2;
  var txtMod = 0.6;
  var r4 = r + r2 * txtMod;
  var p = txtData.length;
  var w = 50;
  var seg = w;
  if (idx == 3) { seg = 25; }
  if (seg * p > 180) {
    seg = 180/p;
  }
  var windex = svg.windex;

  var left = start - seg * p *.5;
  // console.log("ext: " + txtData + "," + start + "," + seg + "," + left);

  var p1 = [x0,y0-r];
  var p2 = [x0,y0-r-r2];

  for (var i = 0; i < p; i++) {
    var ang = left + seg * i;
    var p1R = rotatePoint(x0,y0,ang*rad,p1[0],p1[1]);
    var p2R = rotatePoint(x0,y0,ang*rad,p2[0],p2[1]);
    var ang2 = ang + seg;
    var p3R = rotatePoint(x0,y0,ang2*rad,p2[0],p2[1]);
    var p4R = rotatePoint(x0,y0,ang2*rad,p1[0],p1[1]);
    // console.log("ext: " + (ang) + "," + (ang2));


    var data =  "M " + p1R[0] + " " + p1R[1] + " ";
    data += "L " + p2R[0] + " " + p2R[1] + " ";
    data += "A " + r3 + " " + r3 + " " + seg + " 0 1 " + p3R[0] + " " + p3R[1] + " ";
    data += "L " + p4R[0] + " " + p4R[1] + " ";
    data += "A " + r + " " + r + " " + (-seg) + " 0 0 " + p1R[0] + " " + p1R[1] + " ";



    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    newElement.setAttribute("d",data); //Set path's data
    newElement.style.stroke = "white";
    newElement.style.strokeWidth = "2px";
    if (idx == 6) {
      newElement.style.fill = "red";
    } else {
      newElement.style.fill = "black";
    }

    newElement.style.fillOpacity = "0.7";
    newElement.style.pointerEvents = "all";

    if (idx != 3 || i != 1) {
      svg.appendChild(newElement);
    }


    var xp = p1R[0] + (p2R[0] - p1R[0]) * txtMod;
    var yp = p1R[1] + (p2R[1] - p1R[1]) * txtMod;
    var xp2= p4R[0] + (p3R[0] - p4R[0]) * txtMod;
    var yp2= p4R[1] + (p3R[1] - p4R[1]) * txtMod;

    var other = 0;
    if (ang < 90 && ang > -90 || ang >= 270) {
      data = "M " + xp + " " + yp + " ";
      data += "A " + r4 + " " + r4 + " " + seg + " 0 1 " + xp2 + " " + yp2;
    } else {
      data = "M " + xp2 + " " + yp2 + " ";
      data += "A " + r4 + " " + r4 + " " + seg + " 0 0 " + xp + " " + yp;
      other = 1;
    }


    var mypath2 = document.createElementNS("http://www.w3.org/2000/svg","path");
    mypath2.setAttributeNS(null, "id", "path" + sec1 + sec2 + "e" + idx + i);
    mypath2.setAttributeNS(null, "d", data);
    mypath2.setAttributeNS(null,"fill", "none");
    mypath2.setAttributeNS(null,"stroke","none");
    svg.appendChild(mypath2);

    //Text1 White
    var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text1.setAttributeNS(null, "fill", "black");
    text1.setAttributeNS(null,"font-size","15px");
    text1.setAttributeNS(null, "dominant-baseline", "middle");
    textpath = document.createElementNS("http://www.w3.org/2000/svg","textPath");
    textpath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#path" + sec1 + sec2 + "e" + idx + i);
    textpath.setAttribute("startOffset","50%");
    textpath.setAttribute("text-anchor","middle");
    var txtD = txtData[i].text;
    if (!txtD) { txtD = txtData[i]; }
    txtElem = document.createTextNode(txtD);
    text1.setAttribute("pointer-events", "none");
    textpath.appendChild(txtElem);
    text1.appendChild(textpath);
    if (mobile) {
      text1.style.fill = "white";
    }
    svg.appendChild(text1);

    newElement.idx = i;

    if (idx == 0) {
      newElement.addEventListener("click", function(event) {
        if (!mouse) return;
        var d = document.getElementById("dialect");
        d.value = d.options[event.target.idx].value;
        curDialect = event.target.idx;
        changeDialect(windex);
        tileList = [];
        closeAllMenus(-1);
      });
      newElement.addEventListener("touchend", function(event) {
        var d = document.getElementById("dialect");
        d.value = d.options[event.target.idx].value;
        curDialect = event.target.idx;
        changeDialect(windex);
        tileList = [];
        closeAllMenus(-1);
      });

      newElement.setAttribute("class","sec" + idx);
      text1.setAttribute("class","sec" + idx);      
      newElement.style.display = "none";
      text1.style.display = "none";

      if (i == curDialect) {
        newElement.style.fill = "gray";
      }
    } else if (idx == 3) {
      newElement.setAttribute("class","sec" + idx);
      text1.setAttribute("class","sec" + idx);      
      newElement.style.display = "none";
      text1.style.display = "none";
      
      if (i == 0) {
        //Load
        newElement.addEventListener("click", function(event) {
          if (!mouse) { return; }
          expandSecMenu(svg,-1);          
          var uf = document.getElementById("userfile");
          uf.idx = svg.windex;
          uf.value = "";
          uf.click();
          closeSecondaryMenu(svg);
        });
        newElement.addEventListener("touchend", function(event) {
          expandSecMenu(svg,idx);          
          var uf = document.getElementById("userfile");
          uf.idx = svg.windex;
          uf.value = "";
          uf.click();
          closeSecondaryMenu(svg);
          event.preventDefault();
        });
        
      } else {
        //Save File
        //Needs a href        
        var a = document.createElementNS("http://www.w3.org/2000/svg","a");        
        a.appendChild(newElement);        
        a.addEventListener("click", function() { if (mouse) expandSecMenu(svg,-1); fakeDownload(svg.windex)});
        a.addEventListener("touchend", function() { expandSecMenu(svg,-1); fakeDownload(svg.windex)});
        svg.appendChild(a);
      }
    
    } else if (idx == 6) {
      newElement.addEventListener("click", function(event) {
        if (!mouse) return;
        clearCode(windex);
      });
      newElement.addEventListener("touchend", function(event) {
        clearCode(windex);
        expandSecMenu(svg,-1);
      });
      newElement.setAttribute("class","sec" + idx);
      text1.setAttribute("class","sec" + idx);
      newElement.style.display = "none";
      text1.style.display = "none";
      // newElement.setAttribute("fill", "red");
    } else if (idx == 5) {
      newElement.addEventListener("click", function(event) {
        if (!mouse) return;
        var d = document.getElementById("samples");
        d.value = d.options[event.target.idx+1].value;
        // curSample = event.target.idx;
        closeAllMenus(windex);
        // console.log("Loading: " + d.value);
        loadSample(d.value,windex);
        // addTileTouch();
        checkpointSave(windex);
        // svg.sampleID = event.target.idx;
      });
      newElement.addEventListener("touchend", function(event) {
        var d = document.getElementById("samples");
        d.value = d.options[event.target.idx+1].value;
        closeAllMenus(windex);
        // console.log("Loading: " + d.value);
        loadSample(d.value,windex);
        checkpointSave(windex);
      });
      newElement.setAttribute("class","sec" + idx);
      text1.setAttribute("class","sec" + idx);
      text1.setAttribute("font-size", "12px");
      newElement.style.display = "none";
      text1.style.display = "none";

      // if (!svg.sampleID && i == 0) {
        // newElement.style.fill = "gray";
      // }
      // if (svg.sampleID && i == svg.sampleID) {
        // newElement.style.fill = "gray";
      // }

    }
  }
}

function rotatePoint(cx, cy, a, px, py) {
  var s = Math.sin(a);
  var c = Math.cos(a);
  px -= cx;
  py -= cy;
  var xn = px * c - py * s;
  var yn = px * s + py * c;
  px = xn + cx;
  py = yn + cy;
  return [px,py];
}

function createPieSegment(rx,ry,rad1,rad2,a1,a2,svg,idx,c,idx2,c2) {
  //c :=
  // 2          -> Sec Menu
  //-2          -> Pie Menu
  //-3          -> Window Menu
  //'pie' + idx -> Pie Menu Outer Section

  if (c == 2) {
    // console.log(rx + "," + ry + "," + rad1 + "," + rad2 + "," + a1 + "," + a2 + "," + svg +
    // "," + idx + "," + c + "," + idx2 + "," + c2);
  }
  a1 = a1 % 360;
  var windex = svg.windex;

  var p1x = rx;
  var p1y = ry-rad2;
  var p2x = rx;
  var p2y = ry-rad1;
  var dx = 0 - rx;
  var dy = 0 - ry;
  var i;
  var p1x1 = p1x+dx;
  var p1y1 = p1y+dy;
  var p2x1 = p2x+dx;
  var p2y1 = p2y+dy;

  var a1r = a1 * rad;
  var a2r = (a1+a2) * rad;

  if (idx == 0) {
    // console.log("ext: " + a1 + "," + a2 + "," + (a1+a2*.5));
  }

  p1xR = Math.round(((p1x1) * Math.cos(a1r) - (p1y1) * Math.sin(a1r)) - dx);
  p1yR = Math.round(((p1y1) * Math.cos(a1r) + (p1x1) * Math.sin(a1r)) - dy);
  p2xR = Math.round(((p2x1) * Math.cos(a1r) - (p2y1) * Math.sin(a1r)) - dx);
  p2yR = Math.round(((p2y1) * Math.cos(a1r) + (p2x1) * Math.sin(a1r)) - dy);
  p3xR = Math.round(((p2x1) * Math.cos(a2r) - (p2y1) * Math.sin(a2r)) - dx);
  p3yR = Math.round(((p2y1) * Math.cos(a2r) + (p2x1) * Math.sin(a2r)) - dy);
  p4xR = Math.round(((p1x1) * Math.cos(a2r) - (p1y1) * Math.sin(a2r)) - dx);
  p4yR = Math.round(((p1y1) * Math.cos(a2r) + (p1x1) * Math.sin(a2r)) - dy);

  data =  "M " + p1xR + " " + p1yR + " ";
  data += "L " + p2xR + " " + p2yR + " ";
  data += "A " + rad1 + " " + rad1 + " " + a2 + " 0 1 " + p3xR + " " + p3yR + " ";
  data += "L " + p4xR + " " + p4yR + " ";
  data += "A " + rad2 + " " + rad2 + " " + a2 + " 0 0 " + p1xR + " " + p1yR + " ";

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  newElement.setAttribute("d",data); //Set path's data
  if (c == 2 || c == -3) {
    newElement.style.stroke = "white";
    newElement.style.strokeWidth = "4px";
    // if (idx % 2) {
      newElement.style.fill = "black";
    // } else {
      // newElement.style.fill = "dimgray";
    // }
  } else {
    newElement.style.stroke = "#000"; //Set stroke colour
    newElement.style.strokeWidth = "2px"; //Set stroke width
    newElement.style.fill = colours[idx];
  }
  newElement.style.fillOpacity = "0.7";
  newElement.style.pointerEvents = "all";

  if (c) {
    //Draw the secondary menu text using SVG textPath
    var other = 0;
    if (c != 2 && c != -2) {
      // // console.log("A: " + a1 + "," + a2);
    }
    if (a1 >= 90 && a1 < 270) {
      data = "M " + p3xR + " " + p3yR + " ";
      data += "A " + rad1 + " " + rad1 + " " + (-a2) + " 0 0 " + p2xR + " " + p2yR;
      other = 1;
    } else {
      data = "M " + p2xR + " " + p2yR + " ";
      data += "A " + rad1 + " " + rad1 + " " + a2 + " 0 1 " + p3xR + " " + p3yR;
    }

    var pathName = "path";
    if (c == 2) {
      pathName += "p" + sec1 + sec2 + idx;
    } else if (c == -2) {
      pathName += "s" + pie1 + pie2 + idx;
    // } else if (c == -3) {
      // pathName += "w" + win1 + win2 + idx;
    } else {
      pathName += pie1 + pie2 + idx + pieE1 + pieE2 + idx2;
    }

    if (c != -3) {
      var mypath2 = document.createElementNS("http://www.w3.org/2000/svg","path");
      mypath2.setAttributeNS(null, "id", pathName);
      mypath2.setAttributeNS(null, "d", data);
      mypath2.setAttributeNS(null,"fill", "none");
      mypath2.setAttributeNS(null,"stroke","none");
      svg.appendChild(mypath2);

      var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text1.setAttributeNS(null, "fill", "black");
      text1.setAttributeNS(null,"font-size","15px");
      if (other) {
        text1.setAttributeNS(null, "dominant-baseline", "hanging");
      } else {
        text1.setAttributeNS(null, "dominant-baseline", "ideographic");
      }


      var textpath = document.createElementNS("http://www.w3.org/2000/svg","textPath");
      textpath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + pathName);
      textpath.setAttribute("startOffset","50%");
      textpath.setAttribute("text-anchor","middle");

      //Text
      var txtElem;
      if (c == 2 || c == -2 || c == -3) {
        txtElem = document.createTextNode(idx2);
      } else {
        text1.setAttribute("class",c);
        text1.style.display = "none";
        var tileText = tileList[idx2].getAttribute("desc");
        if (!tileText) {
          tileText = (tileList[idx2].getElementsByTagName('span')[0]).innerText || "?";
        }
        // tileText = tileText.replace(/\W/g, '');
        tileText = tileText.replace(/[(){}:=]/gi, '')
        tileText = tileText.toUpperCase();
        tileText = tileText.trim();
        if (tileText == "IF" && idx2 == 19) { tileText = "IF ELSE"; }
        // // console.log(tileText + ", " + idx + ", " + idx2);

        txtElem = document.createTextNode(tileText);

      }

      textpath.appendChild(txtElem);
      text1.appendChild(textpath);
    }


    //SecMenu Main Button operations
    if (c == 2) {      
      svg.appendChild(newElement);
      newElement.idx = idx;

      //Menu Actions
      if (idx == 0) {
        //Expand menu - dialect
        var txt = document.getElementById("dialect").options;
        createExtendSec(svg,idx,txt,a1+a2*.5);


        newElement.addEventListener("click", function(event) {
          if (!mouse) return;
          expandSecMenu(svg,event.target.idx);
        });
        newElement.addEventListener("touchend", function(event) {
          expandSecMenu(svg,event.target.idx);
          event.preventDefault();
        });
      } else if (idx == 1) {
        //Run Code
        newElement.addEventListener("click", function() {
          if (!mouse) { return; }
          expandSecMenu(svg,idx);
          updateTileIndicator(windex);
          if (minigraceRunning[windex]) {
            if (output[windex].style.display == "none") {
              expandOutput(windex);
              return;
            } else {
              if (minigraceTerminationCounter == 0) {
                minigraceTerminationCounter = 1;
              }
              minigraceTerminationTarget[windex] = 1;

              setTimeout(minigraceStopCheck,600)
              return;
            }
          }
          if (errorTiles2[windex].length > 0) {
            highlightTileErrors(null,windex);
          } else {
            checkExpandOutput(windex);
            go(windex);
          }
        });
        newElement.addEventListener("touchend", function() {
          expandSecMenu(svg,idx);
          updateTileIndicator(windex);
          event.preventDefault();
          if (minigraceRunning[windex]) {
            if (output[windex].style.display == "none") {
              expandOutput(windex);
              return;
            } else {
              // minigrace.stopRunning = 1;
              if (minigraceTerminationCounter == 0) {
                minigraceTerminationCounter = 1;
              }
              minigraceTerminationTarget[windex] = 1;

              setTimeout(minigraceStopCheck,600)
              return;
            }
          }
          if (errorTiles2[windex].length > 0) {
            highlightTileErrors(null,windex);
          } else {
            checkExpandOutput(windex);
            go(windex);
          }
        });
        newElement.setAttribute('class', 'goPie');
        if (minigraceRunning[windex]) {
          if (output[windex].style.display == "none") {
            newElement.style.fill = "gold";
          } else {
            newElement.style.fill = "red";
          }
        }
      } else if (idx == 2) {
        //Code View
        newElement.addEventListener("click", function() {
          if (!mouse) return;
          expandSecMenu(svg,idx);
          if (!(document.getElementById("viewbutton").disabled)) {
              toggleShrink(windex);
              if (svg.currentView == 0) {
                svg.currentView = 1;
              } else {
                svg.currentView = 0;
              }
              closeSecondaryMenu(svg)
          }
        });
        newElement.addEventListener("touchend", function() {
          expandSecMenu(svg,idx);
          if (!(document.getElementById("viewbutton").disabled)) {
              toggleShrink(windex);
              if (svg.currentView == 0) {
                svg.currentView = 1;
              } else {
                svg.currentView = 0;
              }
              closeSecondaryMenu(svg)
          }
          event.preventDefault();
        });
      } else if (idx == 3) {
        //Files
        var txt = ["Load","Save"];
        createExtendSec(svg,idx,txt,a1+a2*.5);

        newElement.addEventListener("click", function(event) {
          if (!mouse) return;
          expandSecMenu(svg,event.target.idx);
        });
        newElement.addEventListener("touchend", function(event) {
          expandSecMenu(svg,event.target.idx);
          event.preventDefault();
        });
        
        
        
        //Load File
        /* newElement.addEventListener("click", function(event) {
          if (!mouse) { return; }
          expandSecMenu(svg,idx);
          var idx = svg.windex;
          var uf = document.getElementById("userfile");
          uf.idx = idx;
          uf.value = "";
          uf.click();
          closeSecondaryMenu(svg);
        });
        newElement.addEventListener("touchend", function(event) {
          expandSecMenu(svg,idx);
          var idx = svg.windex;
          var uf = document.getElementById("userfile");
          uf.idx = idx;
          uf.value = "";
          uf.click();
          closeSecondaryMenu(svg);
          event.preventDefault();
        }); */
        
        
      } else if (idx == 4) {
        //Connection Menu
        newElement.addEventListener("click", function(event) {
          if (!mouse) return;
          showConMenu(svg.xPoint,svg.yPoint,null,event.target.parentNode.windex);
          // console.log("Con Click: svg.win " + svg.windex + ", evt.win " + event.target.parentNode.windex);
          closeSecMenu(svg);
        });
        newElement.addEventListener("touchend", function(event) {
          showConMenu(svg.xPoint,svg.yPoint,null,event.target.parentNode.windex);
          closeSecMenu(svg);
          event.preventDefault();
        });
        
      
      } else if (idx == 5) {
        //Expand menu - sample
        var txt = document.getElementById("samples").options;
        txt = Array.from(txt);
        txt = txt.slice(1,txt.length);
        // console.log(txt);
        createExtendSec(svg,idx,txt,a1+a2*.5);


        newElement.addEventListener("click", function(event) {
          if (!mouse) return;
          expandSecMenu(svg,event.target.idx);
        });
        newElement.addEventListener("touchend", function(event) {
          expandSecMenu(svg,event.target.idx);
          event.preventDefault();
        });
      } else if (idx == 6) {
        //Reset Code
        createExtendSec(svg,idx,["Confirm"],a1+a2*.5);
        newElement.addEventListener("click", function() { if (mouse) expandSecMenu(svg,event.target.idx); });
        newElement.addEventListener("touchend", function() { expandSecMenu(svg,event.target.idx); event.preventDefault();});
      } else if (idx == 7) {
        //Reset Output
        newElement.addEventListener("click", function() { if (!mouse) { return; } expandSecMenu(svg,idx); clearOutput(windex); closeSecondaryMenu(svg) });
        newElement.addEventListener("touchend", function() { expandSecMenu(svg,idx); clearOutput(windex); closeSecondaryMenu(svg); event.preventDefault(); });
      } else if (idx == 8) {
        //View Errors
        newElement.setAttribute("class", "errorPie");
        if (errorTiles2[windex] == null) {
          updateTileIndicator(windex);
        }
        if (errorTiles2[windex].length > 0) {
          newElement.style.fill = "red";
        } else {
          newElement.style.fill = "green";
        }

         newElement.addEventListener("click", function() {
          if (!mouse) return;
          expandSecMenu(svg,idx);
          indicatorDisplay(errorTiles2[windex].length,windex);
          closeSecondaryMenu(svg);
        });
        newElement.addEventListener("touchend", function() {
          expandSecMenu(svg,idx);
          indicatorDisplay(errorTiles2[windex].length,windex);
          closeSecondaryMenu(svg);
          event.preventDefault();
        });

      }
    }


    if (c != -3) {
      svg.appendChild(text1);
    }

    if (c == -3) {
      newElement.addEventListener("click", function(event) { 
        if (!mouse) return; 
        windowMenuClick(event.target.idx,event.target.parentNode.idx,event.button == 0 ? 1 : 2,5);
      });
      newElement.addEventListener("touchstart", function(event) { wMenuTouchStart(event) });
      newElement.addEventListener("touchmove", function(event) { wMenuTouchMove(event) });
      newElement.addEventListener("touchend", function(event) { wMenuTouchEnd(event) });
      newElement.idx = idx;
      // newElement.addEventListener("touchend", function(event) { windowMenuClick(idx,c2,event); });
    }

    if (c == 2 || c == -3) {
      //SecMenu Icons
      //Find center point of segment
      var x1 = p4xR + (p3xR - p4xR) *.5;
      var y1 = p4yR + (p3yR - p4yR) *.5;
      var xy = rotatePoint(rx,ry,(-a2)*.5*rad,x1,y1);
      // console.log("a1: " + a1 + ", a2: " + a2);

      var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
      if (c == -3) {
        textElement.textContent = idx2;
      } else {
        textElement.textContent = c2;
        // textElement.textContent = idx + "E";
        if (idx == 1) { textElement.setAttribute("class", "goPieText"); }
      }
      if (mobile) {
        textElement.style.fill = "white";
      }

      textElement.setAttribute("x",xy[0]);
      textElement.setAttribute("y",xy[1]);
      textElement.setAttribute("text-anchor", "middle");

      if (mobile) {
        //Mobile
        textElement.setAttribute("dominant-baseline", "central"); //Firefox
        textElement.setAttribute("alignment-baseline", "central"); //Chrome
      } else {
        textElement.setAttribute("dominant-baseline", "middle");
        textElement.setAttribute("alignment-baseline", "middle");
      }

      textElement.setAttribute("pointer-events", "none");
      textElement.style.fontFamily = "entypo";
      if (c == -3) {
        textElement.style.fontSize = "30px";
      } else {
        textElement.style.fontSize = "40px";
      }
      if (idx == 1 && c != -3) {
        textElement.style.fontSize = "30px";
      }

      if (c == 2 && idx == 1) {
        if (minigraceRunning[windex]) {
          if (output[windex].style.display == "none") {
            textElement.textContent = "\uE70A";
            textElement.style.fontSize = "40px";
          } else {
            textElement.textContent = "■";
            textElement.style.fontSize = "50px";
          }

        }
      }

      svg.appendChild(textElement);
      if (c == 2) {
        return;
      }
    }
  }

  if (c && c != 2 && c != -2 && c != -3) {
    //Pie Outer Segment
    newElement.setAttribute("class",c);
    newElement.style.display = "none";
    newElement.addEventListener("touchstart", function(event) { segmentDragStart(event,windex); });
    newElement.addEventListener("touchmove", function(event) { segmentDragMove(event,windex); });
    newElement.addEventListener("touchend", function(event) { segmentDragEnd(event,windex); });
    newElement.addEventListener("click", function(event) { if (mouse) pieExtendClick(tileList[event.target.tileIdx],event.target.parentNode,event); });
    newElement.tileIdx = idx2;
  } else if (c != -3) {
    newElement.setAttribute("idx", idx);
    newElement.addEventListener("click", function(){ if (mouse) menuExtend(this.getAttribute("idx"),this); });
    newElement.addEventListener("touchend", function(){ menuExtend(this.getAttribute("idx"),this); event.preventDefault();});
  }
  svg.appendChild(newElement);
}

function expandSecMenu(svg, idx) {
  if (svg.idx != -1) {
    //Close expansion
    var txt = "sec" + svg.idx;
    var m = svg.getElementsByClassName(txt);
    for (var i = 0; i < m.length;i++) {
      // m[i].parentNode.removeChild(m[i]);
      m[i].style.display = "none";
    }
  }

  // console.log("Expand: " + svg + "," + svg.idx + "," + idx);
  var txt = "sec" + idx;
  if (idx == 0) {
    if (svg.idx != 0) {
      //Show dialect
      var m = svg.getElementsByClassName(txt);
      for (var i = 0; i < m.length;i++) {
        m[i].style.display = "";
      }
      svg.idx = 0;
    } else {
      svg.idx = -1;
    }
  } else if (idx == 3) {
    //Files
    if (svg.idx != 3) {
      var m = svg.getElementsByClassName(txt);
      for (var i = 0; i < m.length;i++) {
        m[i].style.display = "";
      }
      svg.idx = 3;
    } else {
      svg.idx = -1;
    }
  } else if (idx == 6) {
    if (svg.idx != 6) {
        //Show confirm delete
      var m = svg.getElementsByClassName(txt);
      for (var i = 0; i < m.length;i++) {
        m[i].style.display = "";
      }
      svg.idx = 6;
    } else {
      svg.idx = -1;
    }
  } else if (idx == 5) {
    if (svg.idx != 5) {
      //Show samples
      var m = svg.getElementsByClassName(txt);
      for (var i = 0; i < m.length;i++) {
        m[i].style.display = "";
      }
      svg.idx = 5;
    } else {
      svg.idx = -1;
    }
  } else {
    svg.idx = -1;
  }
}


function closeSecMenu(svg) {
  var timeDif = Date.now() - svg.getAttribute("ts");
  if (timeDif > closePieDelay) {
    window.setTimeout(function() { svg.parentNode.removeChild(svg); },10);
  }
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

//Secondary Menu
function closeSecondaryMenu(svg) {
  // var timeDif = Date.now() - svg.getAttribute("ts");
  // if (timeDif > closePieDelay) {
    // window.setTimeout(function() { svg.parentNode.removeChild(svg); },10);
  // }
}

function createSecondaryMenu(svg,id) {
  if (!svg) {
    svg = document.getElementById("pie_svg");
    svg.style.left = "0%";
    svg.style.display = "";
  }
  //Secondary Menu Commands:  -- -- -- -- -- -- -- Also needs to work in text mode!
  //Dialect+, Run, Run All, Code View, Load File, Save File?, Load Sample, Reset, Clear Output
  var options = ["Dialect", "Run", "Code View", "Files", "CrossDevice", "Samples", "Reset Code", "Reset Output", "View Errors"];//,"Clear Output"];
  // var subOptions = "[4, 0, 0, 0, 0, 0, 0, 5, 0, 0];
  // var oChars = ["\uE736",String.fromCharCode(9658),"\uE731",fixedFromCharCode(0x1F4E4),
  // fixedFromCharCode(0x1F4E5),"\uE005","\u27F3","\uE730","\u26A0"];
  var oChars = ["\uE736",String.fromCharCode(9658),"\uE731",fixedFromCharCode(0x1F4E5),
  fixedFromCharCode(0x01F4F6),"\uE005","\u27F3","\uE730","\u26A0"];
  var x0 = 200;
  var y0 = 200;
  this.pieces = options.length;
  this.max = 360;
  this.start = -45;
  var seg = max/pieces;
  // console.log("Pieces: " + pieces);
  for (var i = 0; i < pieces; i++) {
    createPieSegment(x0,y0,120,50,start,seg,svg,i,2,options[i],oChars[i]);
    start += seg;
  }

  //For unique ids aa-ZZ
  if (sec2 == "z") {
    sec2 = "A";
  } else if (sec2 == "Z") {
    if (sec1 == "z") {
      sec1 = "A";
      sec2 = "a";
    } else if (sec1 == "Z") {
      sec1 = "a";
      sec2 = "a";
    } else {
      sec1 = nextChar(sec1);
      sec2 = "a";
    }
  } else {
    sec2 = nextChar(sec2);
  }

  createCancelButton(svg,x0,y0);
}

function segmentDragStart(event,windex) {
  // console.log("S Drag Start");
  var menus = codearea2[windex].getElementsByClassName('popup-menu');
  // ???
  // if (currentFocus) {
    // currentFocus.blur();
    // currentFocus = null;
    // return;
  // }

  for (var i = 0; i < event.targetTouches.length; i++) {
    var id = event.targetTouches[i].identifier;
    var target = event.target;

    if (!(id in pieMenuTouches)) {
      //New Touch Event
      event.preventDefault();
      var pos = positionCorrection([event.changedTouches[i].clientX,event.changedTouches[i].clientY],windex);

      segmentTouches[id] = {x:pos[0], y:pos[1], updates:0}
      segmentTouches[id].tile = tileList[target.tileIdx];
      segmentTouches[id].svg = target.parentNode;
    }
    // console.log("S Drag Start Target:" + target + "," + segmentTouches[id].tile);
  }
  event.preventDefault();
}

function segmentDragMove(event,windex) {
  // console.log("S Drag Move: " + event.target + "," + (event.target == (codearea2[windex])));
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    //Target is always the path element
    if (/*event.target == codearea &&*/ id in segmentTouches) {
      //Moves check
      //?

      //Distance check - create tile after some distance
      if (!segmentTouches[id].ok) {
        var pos = positionCorrection([event.changedTouches[i].clientX,event.changedTouches[i].clientY],windex);
        var dist = Math.sqrt(Math.pow(pos[0] - segmentTouches[i].x, 2) + Math.pow(pos[1] - segmentTouches[i].y, 2));
        // console.log("SegDrag: " + dist + ", " + segMoveThresholdDistance);
        if (dist > segMoveThresholdDistance) {
          //#TODO
          //Start Dragging Tile
          // console.log("Segment Drag Distance Reached");
          segmentTouches[id].ok = 1;
          // createTile(segmentTouches[id].tile, null, event.changedTouches[id].clientX, event.changedTouches[id].clientY);
        }
      }
      segmentTouches[id].updates++;
    }
  }
  event.preventDefault();
  // event.stopPropagation();
}

function segmentDragEnd(event,windex) {
  // console.log("S Drag End");
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    // console.log("S Drag End: " + id + ", " + segmentTouches[id] + ", " + segmentTouches[id].tile);
    if (id in segmentTouches) {
      if (segmentTouches[id].ok) {
        //target is always svg element
        // if (event.target == codearea) {
          // showPieMenu(pieMenuTouches[id].x,pieMenuTouches[id].y);
          createTile(segmentTouches[id].tile, null, event.changedTouches[i].clientX, event.changedTouches[i].clientY, event.target.parentNode.windex);
        // }
      } else {
          var svg = event.changedTouches[i].target;
          while (svg.tagName != "svg") {
            svg = svg.parentNode;
          }
          pieExtendClick(segmentTouches[id].tile, svg, event);
      }
    }
    delete segmentTouches[id];
  }
  event.preventDefault();
}


function pieExtendClick(tile, svg, event) {
  // console.log("pieExtendClick: " + tile + ", " + svg + ", " + event + ", " + svg.windex);
  createTile(tile, svg, 0, 0, svg.windex);
  closePieMenu(event);
}

function createTile(tile, svg, x, y, id) {
  //Based on embedded function in main.js
  if (tile.nodeType != 1) {
    tile = tileList[tile];
  }
  var xPoint, yPoint;

  if (svg) {
    // // console.log("Tile: " + svg.xPoint + ", " + svg.yPoint + ", " + id);
    x = svg.xPoint;
    y = svg.yPoint;
  } else {
    if (windows[id].rid != 0) {
      pos = rotateXY(id,windows[id].rid, x, y);
    } else {
      pos = positionCorrection([x,y],id);
    }
    x = pos[0];
    y = pos[1];
    x += codearea2[id].scrollLeft;
    y += codearea2[id].scrollTop;
    // // console.log("Tile: " + x + ", " + y + ", " + id);
  }

  var cl = tile.cloneNode(true);
  cl.windex = id;
  addTileTouchToTile(cl);
  if (!cl.dataset) {
      cl.dataset = {};
      for (var k in this.dataset)
          cl.dataset[k] = this.dataset[k];
  }
  codearea2[id].appendChild(cl);
  cl.style.position = 'absolute';

  cl.style.left = x + "px";
  cl.style.top = y + "px";
  cl.style.display = "";
  attachTileBehaviour(cl);
  tiles2[id].push(cl);

  if (!cl.next)
    cl.next = false;
  if (!cl.prev)
    cl.prev = false;

  //Timeout function to center new tile as width cannot be accessed until element has been drawn
  cl.style.visibility = "hidden";
  holes2[cl.windex] = codearea2[cl.windex].getElementsByClassName('hole');
  setTimeout(function() {
    cl.style.left = cl.offsetLeft - cl.offsetWidth *.5 + 'px';
    cl.style.top = cl.offsetTop - cl.offsetHeight *.5 + 'px';
    cl.style.visibility = "";
  }, 5);
}

function createCancelButton(svg,x,y) {
  if (!x) { x = 150; }
  if (!y) { y = 150; }
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.setAttribute("cx", x);
  newElement.setAttribute("cy", y);
  newElement.setAttribute("r", 40);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.9";
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event){ if (mouse) closePieMenu(event); });
  newElement.addEventListener('touchend', function(event) { closePieMenu(event); event.preventDefault(); });
  newElement.style.pointerEvents = "all";
  // newElement.addEventListener("touchend", function(){ closePieMenu(event); });

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", x-20);
  newElement.setAttribute("y1", y-20);
  newElement.setAttribute("x2", x+20);
  newElement.setAttribute("y2", y+20);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event){ if (mouse) closePieMenu(event); });
  newElement.addEventListener('touchend', function(event) { closePieMenu(event); event.preventDefault();});
  newElement.style.pointerEvents = "all";
  // newElement.addEventListener("touchend", function(){ closePieMenu(event); });

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", x+20);
  newElement.setAttribute("y1", y-20);
  newElement.setAttribute("x2", x-20);
  newElement.setAttribute("y2", y+20);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  newElement.addEventListener("click", function(event){ if (mouse) closePieMenu(event); });
  newElement.addEventListener('touchend', function(event) { closePieMenu(event); event.preventDefault();});
  newElement.style.pointerEvents = "all";
  // newElement.addEventListener("touchend", function(){ closePieMenu(event); });
}

function menuExtend(n, tile) {
  // console.log("Menu Extend");
  // console.trace();
  var currentExtend =  tile.parentNode.getAttribute('idx') || -1;
  var svg = tile.parentNode; //??

  if (currentExtend != -1) {
    objs = svg.getElementsByClassName("pie" + currentExtend);
    for (i = 0; i < objs.length; i++) {
      objs[i].style.display = "none";
    }
  }
  if (currentExtend != n) {
    objs = svg.getElementsByClassName("pie" + n);
    for (i = 0; i < objs.length; i++) {
      objs[i].style.display = "";
    }
    currentExtend = n;
  } else {
    currentExtend = -1;
  }
  tile.parentNode.setAttribute('idx', currentExtend);
}

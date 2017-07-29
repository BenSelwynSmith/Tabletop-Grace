
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

var tileList = [];

function closeAllMenus() {
  var m = document.getElementsByClassName("piemenu");
  for (var i = 0; i < m.length;) {
    m[i].parentNode.removeChild(m[i]);
  }
}

function showTileMenu(x,y,src) {
  console.log("ShowTileMenu: " + x + "," + y);
  //Delete + Copy
  var svg0 = document.getElementById('tile_svg');
  var svg = svg0.cloneNode(true);
  svg.removeAttribute('id');
  svg.style.top = ((codearea.scrollTop + y) - svg.getAttribute("height") * .5) + "px";
  svg.style.left = ((x) - svg.getAttribute("width") * .5) + 'px';
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.tileSrc = src;
  svg.setAttribute("class","piemenu");
  svg0.parentNode.appendChild(svg);
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
  newElement.addEventListener("click", closeTileMenu);

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
  newElement.addEventListener("click", closeTileMenu);

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
  newElement.addEventListener("click", closeTileMenu);

  //Delete
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "5px"; //Set stroke width
  newElement.setAttribute("cx", xMid);
  newElement.setAttribute("cy", y1);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";
  // newElement.style.fillOpacity = "1";
  // newElement.addEventListener("click", function(event){ deleteNode(); });
  // newElement.addEventListener("touchend", function(event) { deleteNode(); });
  // addButtonTouch(newElement, deleteTile, svg.tileSrc);
  newElement.addEventListener("click", function(event) { deleteTile(event,svg.tileSrc); });
  svg.appendChild(newElement);

  var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = "\uE729";
  textElement.style.fontFamily = "entypo";
  textElement.style.fontSize = "50px";
  textElement.setAttribute("x",xMid);
  textElement.setAttribute("y",y1+txtMod);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("alignment-baseline", "middle");
  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);

  //Copy
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.setAttribute("cx", xMid);
  newElement.setAttribute("cy", y2);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";
  // newElement.addEventListener("click", function(event){ cloneTile() });
  // newElement.addEventListener("touchend", function(event) { cloneTile(); });
  // addButtonTouch(newElement, cloneTile, svg.tileSrc);
  newElement.addEventListener("click", function(event) { cloneTile(event,svg.tileSrc); });
  svg.appendChild(newElement);

  textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.style.fontFamily = "entypo";
  textElement.textContent = fixedFromCharCode(0x01F54E);
  // textElement.textContent = fixedFromCharCode(0x01F4CB);
  // textElement.textContent = fixedFromCharCode(0x2398);

  //Special values to match this unicode char which has a border around it already
  textElement.style.fontSize = "80px";
  textElement.setAttribute("x",xMid);
  textElement.setAttribute("y",y2+20);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("alignment-baseline", "middle");
  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);

  //Tiles with additional options
  // == < > <= >= !=     6    class: CMPOP
  // + - * / ^ %         6    class: OP
  // && and || is possible through code, but breaks the block version
  if (svg.tileSrc.classList.contains("comparison-operator")) {
    var opTxt = 7;
    var tileToChange = svg.tileSrc.children[1];
    if (comps.includes(tileToChange.innerHTML)) {
      createTileMenuElement(svg,"==",xMid-r0*diagonal,yMid-r0*diagonal,r,opTxt,tileToChange);
      createTileMenuElement(svg,"!=",xMid+r0*diagonal,yMid-r0*diagonal,r,opTxt,tileToChange);
      createTileMenuElement(svg,"<",x1,yMid,r,opTxt,tileToChange);
      createTileMenuElement(svg,">",x2,yMid,r,opTxt,tileToChange);
      createTileMenuElement(svg,"<=",xMid-r0*diagonal,yMid+r0*diagonal,r,opTxt,tileToChange);
      createTileMenuElement(svg,">=",xMid+r0*diagonal,yMid+r0*diagonal,r,opTxt,tileToChange);
    }
  } else if (svg.tileSrc.classList.contains("operator")) {
    var opTxt = 7;
    var tileToChange = svg.tileSrc.children[1];
    if (ops.includes(tileToChange.innerHTML)) {
      createTileMenuElement(svg,"+",xMid-r0*diagonal,yMid-r0*diagonal,r,opTxt,tileToChange);
      createTileMenuElement(svg,"-",xMid+r0*diagonal,yMid-r0*diagonal,r,opTxt,tileToChange);
      createTileMenuElement(svg,"*",x1,yMid,r,opTxt,tileToChange);
      createTileMenuElement(svg,"/",x2,yMid,r,opTxt,tileToChange);
      createTileMenuElement(svg,"^",xMid-r0*diagonal,yMid+r0*diagonal,r,opTxt,tileToChange);
      createTileMenuElement(svg,"%",xMid+r0*diagonal,yMid+r0*diagonal,r,opTxt,tileToChange);
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
  /* // addButtonTouch(newElement, changeTileTxt, svg.tileSrc); */
  newElement.addEventListener("click", function() {
    tileToChange.innerHTML = txt;
    closeTileMenu(null,svg);
    generateCode();
  });
  svg.appendChild(newElement);

  var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = txt;
  // textElement.style.fontFamily = "entypo";
  textElement.style.fontSize = "20px";
  textElement.setAttribute("x",x);
  textElement.setAttribute("y",y+t);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("alignment-baseline", "middle");
  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);
}



function cloneTile (event, tile) {
  var svg = event.target.parentNode;
  var tmp = tile;

  while (!tmp.classList.contains('tile')) {
    tmp = tmp.parentNode;
  }

  var newTile = tmp.cloneNode(true);
  addTileTouchToTile(newTile);
  newTile.prev = false;
  newTile.next = false;
  var tileChildren = newTile.getElementsByClassName('tile');
  for (var i=0; i<tileChildren.length; i++) {
    if (tileChildren[i].classList.contains('tile')) {
      addTileTouchToTile(tileChildren[i]);
    }
  }
  newTile.style.left = tile.style.left + 5;
  newTile.style.top = tile.style.top + 5;
  codearea.appendChild(newTile);
  updateTileIndicator();
  generateCode();
  reflow();
  checkpointSave();
  clearPopouts();
  svg.parentNode.removeChild(svg);
  document.getElementById('overlay-canvas').style.display = 'none';
}

function deleteTile (event, tile) {
  var svg = event.target.parentNode;
  var tmp = tile;
  console.log("Delete Tile: " + tile.classList + " - " + event.target.tagName);
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
  updateTileIndicator();
  generateCode();
  reflow();
  checkpointSave();
  clearPopouts();
  document.getElementById('overlay-canvas').style.display = 'none';
  svg.parentNode.removeChild(svg);
}

function showPieMenu(x,y) {
  var svg0 = document.getElementById('pie_svg');
  var svg = svg0.cloneNode(true);
  svg.removeAttribute('id');
  svg.style.top = ((codearea.scrollTop + y) - svg.getAttribute("height") * .5) + "px";
  svg.style.left = ((x) - svg.getAttribute("width") * .5) + 'px';
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.setAttribute("class","piemenu");
  svg0.parentNode.appendChild(svg);
  svg.setAttribute("ts", Date.now());
  createPieMenu(svg);
}

function showSecMenu(x,y) {
  var svg0 = document.getElementById('sec_svg');
  var svg = svg0.cloneNode(true);
  svg.removeAttribute('id');
  svg.style.top = ((codearea.scrollTop + y) - svg.getAttribute("height") * .5) + "px";
  svg.style.left = ((x) - svg.getAttribute("width") * .5) + 'px';
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg.idx = -1;
  svg.setAttribute("class","piemenu");
  svg0.parentNode.appendChild(svg);
  svg.setAttribute("ts", Date.now());
  createSecondaryMenu(svg);
}

//window.setTimeout(function () { iframe.style.left = l2 + 'px'; iframe.style.top = t2 + 'px'},5);

function closePieMenu(event) {
  var elem = event.target;

  // console.log("closePie: " + elem.tagName);
  //Get containing SVG
  while (elem.tagName != "svg" && elem.parentNode != null) {
    elem = elem.parentNode;
  }



  var timeDif = Date.now() - elem.getAttribute("ts");
  // console.log("closePie2: " + elem.tagName + ", Time: " + timeDif);
  if (timeDif > closePieDelay) {
    window.setTimeout(function() { elem.parentNode.removeChild(elem); },10);
    // elem.parentNode.removeChild(elem);
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
    window.setTimeout(function() { elem.parentNode.removeChild(elem); },10);
  }
  // event.stopPropagation();
  // event.preventDefault();
}

function createPieMenu(svg) {
  //Find all tiles and create pie menu from them
  var tmp = toolbox.getElementsByClassName('tile');  
  var cats = [];  
  for (var i in tmp) {
    if (tmp[i].nodeType == 1) {
      var cat = tmp[i].getAttribute("data-category");      
      if (!cats.includes(cat)) {
        cats.push(cat);
      }
    }
  }  
  
  tiles = [];
  for (var c in cats) {       
    for (var i in tmp) {
      if (tmp[i].nodeType != 1) { continue; }
      if (tmp[i].getAttribute("data-category") == cats[c]) {
        tiles.push(tmp[i]);
      }
    }
  }
  
  var tileGroups = [];
  for (var i = 0; i < tiles.length; i++) {    
    var tileType = tiles[i].getAttribute("data-category");    
    
    tileList.push(tiles[i]);    
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
  if (seg * p > 180) {
    seg = 180/p;
  }

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
    newElement.style.fill = "black";
    newElement.style.fillOpacity = "0.5";

    svg.appendChild(newElement);


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
    txtElem = document.createTextNode(txtData[i].text);
    text1.setAttribute("pointer-events", "none");
    textpath.appendChild(txtElem);
    text1.appendChild(textpath);
    svg.appendChild(text1);

    newElement.idx = i;

    if (idx == 0) {
      newElement.addEventListener("click", function(event) {
        var d = document.getElementById("dialect");
        d.value = d.options[event.target.idx].value;
        curDialect = event.target.idx;
        changeDialect();
        closeAllMenus();
      });
      newElement.setAttribute("class","sec" + idx);
      text1.setAttribute("class","sec" + idx);
      newElement.style.display = "none";
      text1.style.display = "none";

      if (i == curDialect) {
        newElement.style.fill = "gray";
      }

    } else if (idx == 5) {
      newElement.addEventListener("click", function(event) {
        var d = document.getElementById("samples");
        d.value = d.options[event.target.idx].value;
        curSample = event.target.idx;
        closeAllMenus();
        console.log("Loading: " + d.value);
        loadSample(d.value);
        checkpointSave();
      });
      newElement.setAttribute("class","sec" + idx);
      text1.setAttribute("class","sec" + idx);
      text1.setAttribute("font-size", "12px");
      newElement.style.display = "none";
      text1.style.display = "none";

      if (i == curSample) {
        newElement.style.fill = "gray";
      }

    }
  }
}

function rotatePoint(cx, cy, a, px, py) {
  // console.log("RP: " + cx + "," + cy + "," + a + "," + px + "," + py);
  var s = Math.sin(a);
  var c = Math.cos(a);
  // console.log("S:" + s + ", C: " + c);
  px -= cx;
  py -= cy;
  var xn = px * c - py * s;
  var yn = px * s + py * c;
  // console.log("xn: " + xn + ", yn: " + yn);
  px = xn + cx;
  py = yn + cy;
  // console.log("px: " + px + ", py: " + py);
  return [px,py];
}

function createPieSegment(rx,ry,rad1,rad2,a1,a2,svg,idx,c,idx2,c2) {
  if (c != 2 && c != -2) {
    // console.log(rx + "," + ry + "," + rad1 + "," + rad2 + "," + a1 + "," + a2 + "," + svg +
    // "," + idx + "," + c + "," + idx2 + "," + c2);
  }
  a1 = a1 % 360;
  
  p1x = rx;
  p1y = ry-rad2;
  p2x = rx;
  p2y = ry-rad1;
  dx = 0 - rx;
  dy = 0 - ry;
  var i;
  p1x1 = p1x+dx;
  p1y1 = p1y+dy;
  p2x1 = p2x+dx;
  p2y1 = p2y+dy;

  a1r = a1 * rad;
  a2r = (a1+a2) * rad;

  if (idx == 0) {
    console.log("ext: " + a1 + "," + a2 + "," + (a1+a2*.5));
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
  if (c == 2) {
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
  newElement.style.fillOpacity = "0.5";






  if (c) {
    //Draw the secondary menu text using SVG textPath
    var other = 0;
    if (c != 2 && c != -2) { 
      // console.log("A: " + a1 + "," + a2);
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
      pathName += sec1 + sec2 + idx;
    } else if (c == -2) {
      pathName += pie1 + pie2 + idx;
    } else {
      pathName += pie1 + pie2 + idx + pieE1 + pieE2 + idx2;
    }
    
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
    if (c == 2 || c == -2) {
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
      txtElem = document.createTextNode(tileText);
      
    }
    
    textpath.appendChild(txtElem);
    text1.appendChild(textpath);
    
    //SecMenu Main Button operations
    if (c == 2) {
      //Save File (download)
      if (idx == 4) {
        //Needs a href
        var dl = document.getElementById("downloadlink");
        var a = document.createElementNS("http://www.w3.org/2000/svg","a");
        a.setAttributeNS("http://www.w3.org/1999/xlink", "href", dl.getAttribute("href"));
        // a.setAttribute("href",dl.getAttribute("href"));
        a.setAttribute("download",dl.getAttribute("download"));
        a.appendChild(newElement);
        a.setAttribute("class","downloadlink2");
        a.addEventListener("click", function() { expandSecMenu(svg,idx); });
        svg.appendChild(a);
      } else {
        svg.appendChild(newElement);
      }

      newElement.idx = idx;

      //Menu Actions
      if (idx == 0) {
        //Expand menu - dialect
        var txt = document.getElementById("dialect").options;
        createExtendSec(svg,idx,txt,a1+a2*.5);


        newElement.addEventListener("click", function(event) {
          expandSecMenu(svg,event.target.idx);
        });
      } else if (idx == 1) {
        //Run Code
        newElement.addEventListener("click", function() {
          expandSecMenu(svg,idx);
          updateTileIndicator();
          if (errorTiles.length > 0) {
            highlightTileErrors();
          } else {
            checkExpandOutput();
            go();
          }
        });
      } else if (idx == 2) {
        //Code View
        newElement.addEventListener("click", function() {
          expandSecMenu(svg,idx);
          if (!(document.getElementById("viewbutton").disabled)) {
              toggleShrink();
              closeSecondaryMenu(svg)
          }
        });
      } else if (idx == 3) {
        //Load File
        newElement.addEventListener("click", function() { expandSecMenu(svg,idx); document.getElementById("userfile").click(); closeSecondaryMenu(svg) });
      } else if (idx == 5) {
        //Expand menu - sample
        var txt = document.getElementById("samples").options;
        createExtendSec(svg,idx,txt,a1+a2*.5);


        newElement.addEventListener("click", function(event) {
          expandSecMenu(svg,event.target.idx);
        });
      } else if (idx == 6) {
        //Reset Code
        newElement.addEventListener("click", function() { expandSecMenu(svg,idx); clearCode(); closeSecondaryMenu(svg) });
      } else if (idx == 7) {
        //Reset Output
        newElement.addEventListener("click", function() { expandSecMenu(svg,idx); clearOutput(); closeSecondaryMenu(svg) });
      } else if (idx == 8) {
        //View Errors
        newElement.setAttribute("class", "errorPie");
        if (errorTiles == null) {
          updateTileIndicator();
        }
        // console.log("Error: " + errorTiles.length);
        if (errorTiles.length > 0) {
          newElement.style.fill = "red";
        } else {
          newElement.style.fill = "green";
        }

        newElement.addEventListener("click", function() {
          expandSecMenu(svg,idx);
          indicatorDisplay(errorTiles.length);
          closeSecondaryMenu(svg);
        });

      }
    }

    svg.appendChild(text1);

    if (c == 2) {
      //SecMenu Icons
      //Find center point of segment
      var x1 = p4xR + (p3xR - p4xR) *.5;
      var y1 = p4yR + (p3yR - p4yR) *.5;
      var xy = rotatePoint(rx,ry,(-a2)*.5*rad,x1,y1);
      // console.log("a1: " + a1 + ", a2: " + a2);

      var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
      textElement.textContent = c2;
      textElement.setAttribute("x",xy[0]);
      textElement.setAttribute("y",xy[1]);
      textElement.setAttribute("text-anchor", "middle");
      textElement.setAttribute("dominant-baseline", "middle");
      textElement.setAttribute("pointer-events", "none");
      // textElement.setAttribute("font-family", "entypo");
      textElement.style.fontFamily = "entypo";
      textElement.style.fontSize = "40px";
      if (idx == 1) {
        textElement.style.fontSize = "30px";
      }

      svg.appendChild(textElement);
      return;
    }
  }

  if (c && c != 2 && c != -2) {
    //Pie Outer Segment
    newElement.setAttribute("class",c);
    newElement.style.display = "none";
    newElement.addEventListener("click", function(event){ pieExtendClick(idx2,svg,event); });
    newElement.addEventListener("touchstart", function(event) { segmentDragStart(event); });
    newElement.addEventListener("touchmove", function(event) { segmentDragMove(event) });
    newElement.addEventListener("touchend", function(event) { segmentDragEnd(event) });
    newElement.tileIdx = idx2;
    // newElement.addEventListener("mousedown", segmentDragStart);
    // newElement.addEventListener("mousemove", segmentDragMove);
    // newElement.addEventListener("mouseend", segmentDragEnd);

    svg.appendChild(newElement);
    // var tileText = tileList[idx2].getAttribute("desc");
    // if (!tileText) {
      // tileText = (tileList[idx2].getElementsByTagName('span')[0]).innerText || "?";
      // tileText = tileText.replace(/[:=)]*/, "");
      // if (tileText == "") { tileText = "?"; }
    // }
    // var xList = [p1xR,p2xR,p3xR,p4xR];
    // var yList = [p1yR,p2yR,p3yR,p4yR];
    // var bbox = calcBoundingBox(xList,yList);
    // var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace

    // textElement.textContent = tileText;
    // textElement.setAttribute("x",bbox[0]);
    // textElement.setAttribute("y",bbox[1]);
    // textElement.setAttribute("text-anchor", "middle");
    // textElement.setAttribute("alignment-baseline", "middle");
    // textElement.style.display = "none";
    // textElement.setAttribute("pointer-events", "none");
    // textElement.setAttribute("class",c);
    // svg.appendChild(textElement);
  } else {
    // if (idx == 0) { newElement.className += " tile vardec"; }
    newElement.setAttribute("idx", idx);
    newElement.addEventListener("click", function(){ menuExtend(this.getAttribute("idx"),this); });
    svg.appendChild(newElement);
  }
}

function expandSecMenu(svg, idx) {
  if (svg.idx != -1) {
    //Close expansion
    var txt = "sec" + svg.idx;
    var m = document.getElementsByClassName(txt);
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
      var m = document.getElementsByClassName(txt);
      for (var i = 0; i < m.length;i++) {
        m[i].style.display = "";
      }
      svg.idx = 0;
    } else {
      svg.idx = -1;
    }
  } else if (idx == 5) {
    if (svg.idx != 5) {
      //Show samples
      var m = document.getElementsByClassName(txt);
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

function createSecondaryMenu(svg) {
  if (!svg) {
    svg = document.getElementById("pie_svg");
    svg.style.left = "0%";
    svg.style.display = "";
  }
  //Secondary Menu Commands:  -- -- -- -- -- -- -- Also needs to work in text mode!
  //Dialect+, Run, Run All, Code View, Load File, Save File?, Load Sample, Reset, Clear Output
  var options = ["Dialect", "Run", "Code View", "Load File", "Save File", "Load Sample", "Reset Code", "Reset Output", "View Errors"];//,"Clear Output"];
  // var subOptions = "[4, 0, 0, 0, 0, 0, 0, 5, 0, 0];
  var oChars = ["\uE736",String.fromCharCode(9658),"\uE731",fixedFromCharCode(0x1F4E4),
  fixedFromCharCode(0x1F4E5),"\uE005","\u27F3","\uE730","\u26A0"];
  var x0 = 200;
  var y0 = 200;
  // this.pieces = options.length;
  this.pieces = options.length;
  this.max = 360;
  this.start = -45;
  var seg = max/pieces;
  console.log("Pieces: " + pieces);
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


  //Create popout segments
  // for (var i = 0; i < tileGroups.length; i++) {
    // createExtendMenus(tileGroups[i],i,svg);
  // }




}

/* function createPie(svg, tileGroups) {
  //Create base pie
  this.pieces = tileGroups.length;
  this.max = 360;
  this.start = -45;
  seg = max/pieces;
  for (var i = 0; i < pieces; i++) {
    createPieSegment(150,150,100,50,start,seg,svg,i);
    start += seg;
  }

  createCancelButton(svg);


  //Create popout segments
  for (var i = 0; i < tileGroups.length; i++) {
    createExtendMenus(tileGroups[i],i,svg);
  }
} */

/* function createExtendMenus(tileGroup,idx,svg) {
  // console.log(idx);
  var p = tileGroup.count;
  // console.log("TileGroupIdx: " + tileGroup.idx);
  segAngle = start + idx * max / pieces + max / pieces / 2;
  defSize = 30;
  seg = 180/p;
  if (p * defSize > 180) {
    seg = 180/p;
  } else {
    seg = defSize;
  }
  s = segAngle - (seg*p)/2;
  for (var i = 0; i < p; i++) {
    createPieSegment(150,150,130,105,s,seg,svg,idx,"pie" + idx,tileGroup.idx+i);
    s += seg;
  }
}
 */


function segmentDragStart(event) {
  console.log("S Drag Start");
  var menus = codearea.getElementsByClassName('popup-menu');
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
      var x = event.targetTouches[i].clientX;
      var y = event.targetTouches[i].clientY;

      segmentTouches[id] = {x:x, y:y, updates:0, ix:window.frameElement.offsetLeft, iy:window.frameElement.offsetTop};
      segmentTouches[id].sx = event.targetTouches[i].screenX;
      segmentTouches[id].sy = event.targetTouches[i].screenY;
      segmentTouches[id].tile = tileList[target.tileIdx];
      segmentTouches[id].svg = target.parentNode;
    }
    console.log("S Drag Start Target:" + target + "," + segmentTouches[id].tile);
  }
  event.preventDefault();
}

function segmentDragMove(event) {
  console.log("S Drag Move: " + event.target + "," + (event.target == (codearea)));
  if (!window.frameElement) { return; }
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    //Target is always the path element
    if (/*event.target == codearea &&*/ id in segmentTouches) {
      //Moves check
      //?

      //Distance check - create tile after some distance
      if (!segmentTouches[id].ok) {
        var x = event.changedTouches[i].clientX;
        var y = event.changedTouches[i].clientY;
        var dist = Math.sqrt(Math.pow(x - segmentTouches[i].x, 2) + Math.pow(y - segmentTouches[i].y, 2));
        if (dist > segMoveThresholdDistance) {
          //#TODO
          //Start Dragging Tile
          console.log("Segment Drag Distance Reached");
          segmentTouches[id].ok = 1;
        }
      }
      segmentTouches[id].updates++;
    }
  }
  moveCounter++;
  event.preventDefault();
  // event.stopPropagation();
}

function segmentDragEnd(event) {
  console.log("S Drag End");
  for (var i = 0; i < event.changedTouches.length; i++) {
    var id = event.changedTouches[i].identifier;
    if (id in segmentTouches) {
      if (segmentTouches[id].ok) {
        //target is always svg element
        // if (event.target == codearea) {
          // showPieMenu(pieMenuTouches[id].x,pieMenuTouches[id].y);
          createTile(segmentTouches[id].tile, null, event.changedTouches[id].clientX, event.changedTouches[id].clientY);
        // }
      } else {
          pieExtendClick(segmentTouches[id].tile, segmentTouches[id].tile.parentNode, event.changedCoutches[id]);
      }
    }
    delete segmentTouches[id];
  }
  event.preventDefault();
}






function calcBoundingBox(xList,yList) {
  var xMin = Number.MAX_VALUE;
  var xMax = Number.MIN_VALUE;
  var yMin = Number.MAX_VALUE;
  var yMax = Number.MIN_VALUE;
  for (var i = 0; i < xList.length; i++) {
    if (xList[i] < xMin) { xMin = xList[i]; }
    if (xList[i] > xMax) { xMax = xList[i]; }
    if (yList[i] < yMin) { yMin = yList[i]; }
    if (yList[i] > yMax) { yMax = yList[i]; }
  }

  return [(xMin + (xMax - xMin)*.5),(yMin + (yMax - yMin)*.5)];
}

function pieExtendClick(tile, svg, event) {
  createTile(tile, svg);
  closePieMenu(event);
}

function createTile(tile, svg, x, y) {
  //Based on embedded function in main.js
  console.log("Tile: " + tile);
  if (tile.nodeType != 1) {
    tile = tileList[tile];
  }
  var xPoint, yPoint;
  if (svg) {
    xPoint = svg.xPoint;
    yPoint = svg.yPoint;
  } else {
    xPoint = x;
    yPoint = y;
  }

  var cl = tile.cloneNode(true);
  addTileTouchToTile(cl);
  if (!cl.dataset) {
      cl.dataset = {};
      for (var k in this.dataset)
          cl.dataset[k] = this.dataset[k];
  }
  codearea.appendChild(cl);
  cl.style.position = 'absolute';
  cl.style.top = (codearea.scrollTop + yPoint - tile.offsetWidth * 0.5) + "px";
  cl.style.left = (xPoint - tile.offsetHeight * 0.5) + 'px';
  cl.style.display = "";
  attachTileBehaviour(cl);

  // tile.addEventListener("click",
  //   function (event) {
  //     if (tile_showing) { return; }
  //     if (event.shiftKey) {
  //       current_tile = event.target;
  //       if (!(current_tile.className).includes("tile")) {
  //         current_tile = current_tile.parentNode;
  //       }
  //       showTileMenu(event.clientX,event.clientY);
  //       event.stopPropagation();
  //     }
  //   });

  if (!cl.next)
    cl.next = false;
  if (!cl.prev)
    cl.prev = false;
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
  newElement.addEventListener("click", function(event){ closePieMenu(event); });
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
  newElement.addEventListener("click", function(event){ closePieMenu(event); });
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
  newElement.addEventListener("click", function(event){ closePieMenu(event); });
  // newElement.addEventListener("touchend", function(){ closePieMenu(event); });
}

function menuExtend(n, tile) {
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

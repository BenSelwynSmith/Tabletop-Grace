
var rad = Math.PI / 180;
var pieces = 4;
var max = 360;
var start = 0;
var currentExtend = -1;
var colours = ["red", "green", "blue", "pink", "orange", "gold", "mauve"];
var closePieDelay = 50;

var tileList = [];

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
  svg0.parentNode.appendChild(svg);
  svg.setAttribute("ts", Date.now());
  createTileMenu(svg);
}

function createTileMenu(svg) {  
  //Delete
  var c1 = 110;
  var c2 = 190;
  var r = 20;
  var r2 = 40;
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "white"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.setAttribute("cx", 150);
  newElement.setAttribute("cy", 150);
  newElement.setAttribute("r", 50);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.5";
  svg.appendChild(newElement);
  newElement.addEventListener("touchend", closeTileMenu);

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 130);
  newElement.setAttribute("y1", 130);
  newElement.setAttribute("x2", 170);
  newElement.setAttribute("y2", 170);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);  
  newElement.addEventListener("touchend", closeTileMenu);

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 170);
  newElement.setAttribute("y1", 130);
  newElement.setAttribute("x2", 130);
  newElement.setAttribute("y2", 170);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);  
  newElement.addEventListener("touchend", closeTileMenu);


  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.setAttribute("cx", 150);
  newElement.setAttribute("cy", c1);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";
  // newElement.style.fillOpacity = "1";
  // newElement.addEventListener("click", function(event){ deleteNode(); });
  // newElement.addEventListener("touchend", function(event) { deleteNode(); });
  addButtonTouch(newElement, deleteTile, svg.tileSrc);
  svg.appendChild(newElement);

  var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = "DEL";
  textElement.setAttribute("x",150);
  textElement.setAttribute("y",c1);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("alignment-baseline", "middle");
  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);

  //Copy
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.style.stroke = "black"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.setAttribute("cx", 150);
  newElement.setAttribute("cy", c2);
  newElement.setAttribute("r", r);
  newElement.style.fill = "white";
  // newElement.addEventListener("click", function(event){ cloneTile() });
  // newElement.addEventListener("touchend", function(event) { cloneTile(); });  
  addButtonTouch(newElement, cloneTile, svg.tileSrc);
  svg.appendChild(newElement);

  textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace
  textElement.textContent = "COPY";
  textElement.setAttribute("x",150);
  textElement.setAttribute("y",c2);
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("alignment-baseline", "middle");
  textElement.setAttribute("pointer-events", "none");
  svg.appendChild(textElement);



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
  console.log("C: " + x + "," + y);  
  var svg0 = document.getElementById('pie_svg');
  var svg = svg0.cloneNode(true);  
  svg.removeAttribute('id');
  svg.style.top = ((codearea.scrollTop + y) - svg.getAttribute("height") * .5) + "px";
  svg.style.left = ((x) - svg.getAttribute("width") * .5) + 'px';
  svg.style.display = "";
  svg.xPoint = x;
  svg.yPoint = y;
  svg0.parentNode.appendChild(svg);  
  svg.setAttribute("ts", Date.now());  
  createPieMenu(svg);
}


function closePieMenu(event) {
  var elem = event.target;

  console.log("closePie: " + elem.tagName);
  while (elem.tagName != "svg" && elem.parentNode != null) {
    elem = elem.parentNode;
  }
  var timeDif = Date.now() - elem.getAttribute("ts");
  console.log("closePie2: " + elem.tagName + ", Time: " + timeDif);  
  if (timeDif > closePieDelay) {
    elem.parentNode.removeChild(elem);
  }
}

function closeTileMenu(event) {
  var elem = event.target;
  
  while (elem.tagName != "svg" && elem.parentNode != null) {
    elem = elem.parentNode;
  }
  var timeDif = Date.now() - elem.getAttribute("ts");  
  if (timeDif > closePieDelay) {
    elem.parentNode.removeChild(elem);
  }
} 

function createPieMenu(svg) {
  //Find all tiles and create pie menu from them
  var tiles = toolbox.getElementsByClassName('tile');
  // var tiles = document.getElementsByClassName('tile');
  var tileGroups = [];
  for (var i = 0; i < tiles.length; i++) {
    var tileType = tiles[i].getAttribute("data-category");
    tileList.push(tiles[i]);
    // console.log(i + " Tile Class: " + tiles[i].className);
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

  createPie(svg, tileGroups);
}

function createPie(svg, tileGroups) {
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
  pie_created = true;

  // showPieMenu();
}

function createExtendMenus(tileGroup,idx,svg) {
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

function createPieSegment(rx,ry,rad1,rad2,a1,a2,svg,idx,c,idx2) {
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
  newElement.style.stroke = "#000"; //Set stroke colour
  newElement.style.strokeWidth = "2px"; //Set stroke width
  newElement.style.fill = colours[idx];
  newElement.style.fillOpacity = "0.5";
  if (c) {
    newElement.setAttribute("class",c);
    newElement.style.display = "none";
    newElement.addEventListener("click", function(){ pieExtendClick(idx2,event); });
    svg.appendChild(newElement);
    var tileText = tileList[idx2].getAttribute("desc");
    if (!tileText) {
      tileText = (tileList[idx2].getElementsByTagName('span')[0]).innerText || "?";
      // tileText = tileText.replace(/[:=)]*/, "");
      // if (tileText == "") { tileText = "?"; }
    }
    var xList = [p1xR,p2xR,p3xR,p4xR];
    var yList = [p1yR,p2yR,p3yR,p4yR];
    var bbox = calcBoundingBox(xList,yList);
    var textElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); //Create a path in SVG's namespace

    textElement.textContent = tileText;
    textElement.setAttribute("x",bbox[0]);
    textElement.setAttribute("y",bbox[1]);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("alignment-baseline", "middle");
    textElement.style.display = "none";
    textElement.setAttribute("pointer-events", "none");
    textElement.setAttribute("class",c);
    svg.appendChild(textElement);
  } else {
    // if (idx == 0) { newElement.className += " tile vardec"; }
    newElement.setAttribute("idx", idx);
    newElement.addEventListener("click", function(){ menuExtend(this.getAttribute("idx"),this); });
    svg.appendChild(newElement);
  }

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

function pieExtendClick(tileIdx, pieSeg) {
  createTile(tileList[tileIdx], pieSeg.target.parentNode);
  closePieMenu(pieSeg);
}

function createTile(tile, svg) {
  //Based on embedded function in main.js
  var xPoint = svg.xPoint;
  var yPoint = svg.yPoint;

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
  xPoint = yPoint = null;

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

function createCancelButton(svg) {
  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
  newElement.setAttribute("cx", 150);
  newElement.setAttribute("cy", 150);
  newElement.setAttribute("r", 40);
  newElement.style.fill = "black";
  newElement.style.fillOpacity = "0.9";
  svg.appendChild(newElement);
  // newElement.addEventListener("click", function(){ closePieMenu(newElement); });    
  newElement.addEventListener("touchend", function(){ closePieMenu(event); });

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 130);
  newElement.setAttribute("y1", 130);
  newElement.setAttribute("x2", 170);
  newElement.setAttribute("y2", 170);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  // newElement.addEventListener("click", function(){ closePieMenu(newElement); });
  newElement.addEventListener("touchend", function(){ closePieMenu(event); });

  newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
  newElement.setAttribute("x1", 170);
  newElement.setAttribute("y1", 130);
  newElement.setAttribute("x2", 130);
  newElement.setAttribute("y2", 170);
  newElement.style.stroke = "red";
  newElement.style.strokeWidth = 5;
  newElement.style.strokeOpacity = .5;
  svg.appendChild(newElement);
  // newElement.addEventListener("click", function(){ closePieMenu(newElement); });
  newElement.addEventListener("touchend", function(){ closePieMenu(event); });
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

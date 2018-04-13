//Handles the client portion of the WebSocket connection

var websock;
var ws_sid;
var ws_auth = false;
var ws_hook = false;
var ws_hub = false;
var ws_cid;
var ws_cid_length = 8;
var ws_hubName = "default";
var ws_cname = "";
var ws_localsid;
var ws_sidList = [];
var ws_sidList2 = [];
var ws_sidCount = 0;
var ws_name;
var ws_nameList = Array("Amun","Amunet","Anhur","Anput","Anubis","Anuket","Apis","Apophis","Aten","Babi","Bast","Bes","Geb","Hapi","Hathor","Heket","Horus","Isis","Kebechet","Khepri","Khnum","Khonsu","Kuk","Maahes","Ma'at","Mafdet","Menhit","Nephthys","Nekhbet","Nut","Osiris","Pakhet","Ptah","Qebui","Qetesh","Ra","Raet-Tawy","Sekhmet","Seker","Serqet","Seshat","Set","Shu","Sobek","Sopdu","Tawaret","Tefnut","Thoth","Wadjet","Wadj-wer");
var ws_disabled = 1;
var ws_dataID = 0;
var ws_dataState = [];
var ws_attempts = 1;
var ws_attempt = 0;
var ws_alerts = 1;
var ws_network = 1;
var ws_sreq = false;
var ws_srep = [];
var ws_conState = 0;
var ws_err = 0;
var ws_sending = false;

var ws_ninja_guid = "832dcf02-c2df-4f7c-9a9f-8056ce753427";



function ws_startWebSocket(id) {
  if (id) { ws_network = id; }
  ws_sending = false;
  console.log("WebSocket - Connecting...");
  if (ws_network == 1) {
    //achex.ca
    websock = new WebSocket('wss://cloud.achex.ca/');
  } else if (ws_network == 2) {
    //wsninja.io
    websock = new WebSocket('wss://node2.wsninja.io');
  } else {
    //??
    return;
  }
  ws_updateConStatus(1,"Connecting...");


  //Message Handlers
  websock.onopen = function(evt) { ws_handleOpen(); }
  websock.onmessage = function(evt) {
    if (ws_network == 1) {
      ws_handleMessage(evt.data);
    } else if (ws_network == 2) {
      ws_handleMessage2(evt.data);
    }
  }
  websock.onerror = function(evt) {
    ws_err = 1;
    if (websock != null) {
      if (mobile && ws_alerts) {
        alert("WS ERROR: " + evt.data);
      } else {
        console.log("WS Error: " + evt.data);
      }
    } else {
      //Failed to connect
      ws_retryConnection();
    }
  }
  websock.onclose = function(evt) { ws_handleClose(evt.data); }

  if (!ws_hook) {
    //Shutdown hook attempt
    var myEvent = window.attachEvent || window.addEventListener;
    var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload';
    myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
      ws_shutdown();
    });
    ws_hook = true;
  }
}

function ws_retryConnection(msg) {
  if (ws_attempt < ws_attempt) {
    ws_attempt++;
    console.log("WS connection closed: retry attempt: " + ws_attempt + " of " + ws_attempts);
    window.setTimeout(ws_startWebSocket,500);
  } else {
    ws_network++;
    ws_attempt = 0;
    window.setTimeout(ws_startWebSocket,500);
  }
}

function ws_handleMessage2(_msg) {
  msg = JSON.parse(_msg);
  // console.log("MSG: " + _msg);
  if (msg.accepted) {
    //Auth
    ws_sid = "" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
    ws_name = ws_sid + ". " + ws_nameList[Math.floor(Math.random()*ws_nameList.length)];
    console.log("WebSocket 2 - Authenticated: " + ws_name);

    ws_auth = true;
    ws_updateConStatus(2,ws_name);
    // console.log("msg:- "+ _msg);
  } else if (msg.sreq) {
    ws_statusResponse(msg.sreq);
    // websock.send(JSON.stringify({"srep":ws_sid}));
    console.log("Received srep request from " + msg.sreq);
  } else if (msg.srep != null) {
    // if (!ws_sreq) { return; }
    if (msg.srep != ws_sid) { return; }
    // if (ws_srep.includes(msg.srep)) { return; }
    // ws_srep.push(msg.srep);
    console.log("Received srep from: " + msg.sID);
    updateConMenu(msg.name,msg.dia,msg.win,msg.wina);
  } else if (msg.tdat != null) {
    if (msg.sid != ws_sid) { return; }
    ws_receiveTiles(msg);
    console.log("Received tile data from: " + msg.tdat);
  } else if (msg.trep != null) {
    if (msg.trep != ws_sid) { return; }
    if (msg.ok == "0") {
        //Failed
        console.log("SID: " + msg.sID + " reports failure on tile transfer - " + msg.conID);
        var lastB = document.getElementById(msg.conID + "#");
        lastB.style.fill = "red";
        lastB.failed = 1;
        lastB.removeAttribute("id");
      } else if (msg.ok == "1") {
        //Success
        console.log("SID: " + msg.sID + " reports success on tile transfer - " + msg.conID);
        var lastB = document.getElementById(msg.conID + "#");
        lastB.style.fill = "green";
        lastB.removeAttribute("id");
      }
      ws_dataState[msg.conID] = null;
  }
}

function ws_handleMessage(_msg) {
  msg = JSON.parse(_msg);
  if (msg.auth) {
    //Auth

    if (msg.auth != "OK" || !msg.SID) {
    // if (!ws_sid) {
      console.log("WebSocket - Authentication failed");
      return;
    } else {
      console.log("WebSocket - Authentication success");
    }
    ws_sid = msg.SID;
    ws_name = ws_sid + ". " + ws_nameList[Math.floor(Math.random()*ws_nameList.length)];
    ws_auth = true;
    ws_joinHub();
    // console.log("Auth OK: " + ws_name + " -: " + _msg);
  } else if (msg.joinHub) {
    //Join Hub
    console.log("WebSocket - Joined hub");
    ws_hub = true;
    ws_announce(0);
    ws_updateConStatus(2,ws_name);
    // for (i = 0; i < windowMax; i++) {
      // closeAllMenus(i,"con");
    // }
    // console.log("JHub-: " + _msg);
  } else if (msg.leftHub) {
    removeFromConMenu(msg.sID);
    console.log("SID: " + msg.sID + " left hub.");
    // console.log("LHub-: " + _msg);
  } else if (msg.toH) {
    //Hub Broadcast
    if (msg.sID == ws_sid) { return; }
    if (msg.announce) {
      if (hasConMenus()) {
        ws_statusRequest(msg.sID);
      }
    } else if (msg.sreq) {
      //Respond to requester
      ws_statusResponse(msg.sID);
    }
    console.log(" toH-: " + _msg);
  } else if (msg.toS) {
    if (msg.sID == ws_sid) { return; }
    if (msg.sreq) {
      ws_statusResponse(msg.sID);
    } else if (msg.srep) {
      updateConMenu(msg.name,msg.dia,msg.win,msg.wina);
    } else if (msg.tdat) {
      //Receive Tiles
      ws_receiveTiles(msg);
      return;
    } else if (msg.trep) {
      if (msg.ok == "0") {
        //Failed
        console.log("SID: " + msg.sID + " reports failure on tile transfer - " + msg.conID);
        var lastB = document.getElementById(msg.conID + "#");
        lastB.style.fill = "red";
        lastB.failed = 1;
        lastB.removeAttribute("id");
      } else if (msg.ok == "1") {
        //Success
        console.log("SID: " + msg.sID + " reports success on tile transfer - " + msg.conID);
        var lastB = document.getElementById(msg.conID + "#");
        lastB.style.fill = "green";
        lastB.removeAttribute("id");
      }
      ws_dataState[msg.conID] = null;
    }
    console.log(" toS-: " + _msg);
  } else {
    console.log(" Msg-: " + _msg);
  }
}



function ws_self() {
  if (ws_conState == 0) { return "Not Connected."; }
  else if (ws_conState == 1) { return "Connecting..."; }
  else if (ws_conState == 2) { return ws_name; }
}



function ws_joinHub() {
  if (!ws_auth) { return; }
  console.log("WebSocket - Joining hub...");
  websock.send(JSON.stringify({"joinHub":ws_hubName + "@" + ws_cid}));
  console.log("Sent hub join request");
}

function ws_handleOpen() {
  if (ws_network == 1) {
    //Authenticate
    if (!ws_auth && !ws_hub) {
      ws_attempt = 0;
      if (!ws_cid) {
        var c = prompt("Enter client id");
        if (!c) { ws_forceClose(); return; }
        while (c.length < ws_cid_length) {
          c = "0" + c;
        }
        ws_cid = c;
      }
      console.log("WebSocket - Authenticating...");
      websock.send(JSON.stringify({"auth":"1@" + ws_cid,"passwd":"tbltop1"}));
      // console.log("Sent auth request");
    }
  } else {
    //Authenticate
    if (!ws_auth) {
      websock.send(JSON.stringify({guid:ws_ninja_guid}));
      console.log("WebSocket 2 - Authenticating...");
    }
  }
}



function ws_statusRequest(sid) {
  if (!websock) { return; }
  if (ws_network == 1) {
    if (!ws_auth || !ws_hub) { return; }
    if (sid == null) {
      websock.send(JSON.stringify({"toH":ws_hubName + "@" + ws_cid,"sreq":"1"}));
      console.log("Sent status request to hub");
    } else {
      websock.send(JSON.stringify({"toS":sid + "@" + ws_cid,"sreq":"1"}));
    }
  } else if (ws_network == 2) {
    if (!ws_auth) { return; }
    websock.send(JSON.stringify({"sreq":ws_sid}));
  }
}



function ws_statusResponse(sid,conID) {
  var win_active = ["1"];
  if (windowMax && windowMax > 1) {
    win_active = getActiveWindows();
  }
  if (win_active.length == 0) {
    win_active = ["0"];
  }
  var dialect = document.getElementById('dialect').value;

  if (ws_network == 1) {
    websock.send(JSON.stringify({"toS":sid + "@" + ws_cid,"srep":"1","win":windowMax,"wina":win_active,"dia":dialect,"name":ws_name}));
  } else if (ws_network == 2) {
    websock.send(JSON.stringify({"srep":sid,"sID":ws_sid,"win":windowMax,"wina":win_active,"dia":dialect,"name":ws_name}));
  }
}

function ws_sendTilesState(conID) {
  if (ws_dataState[conID] != 1) {
    return true;
  } else {
    return false;
  }
}

function ws_sendTiles(sid, dialect, conID, tiles) {
  //Send tiles to SID over WebSocket
  if (tiles.size > 2000) {
    console.log("Too much tile data to send: " + tiles.size);
    return;
  }
  ws_dataState[conID] = 1;

  if (ws_network == 1) {
    websock.send(JSON.stringify({"toS":sid + "@" + ws_cid,"tdat":"1","dia":dialect,"conID":conID,"data":tiles}));
  } else if (ws_network == 2) {
    websock.send(JSON.stringify({"tdat":ws_sid,"sid":sid,"dia":dialect,"conID":conID,"data":tiles}));
  }
  console.log("Sent tile data - sid: " + sid + ", dialect: " + dialect + ", conID: " + conID);
  // ws_dataID++;
}

function ws_receiveTiles(msg) {
  var ok = "1";
  var dialect = document.getElementById('dialect').value;
  if (msg.dia != dialect) {
    ok = "0";
  }

  console.log(msg.data);
  
  if (ok == "1") {
    //Process tiles
    var blob = new Blob([msg.data], {type: "text/x-grace;charset=utf-8"});
    //#TODO change hardcoded windex (0)
    try {
      loadTiles(blob,0);
    } catch (err) { ok = "0"; }
  }

  if (ws_network == 1) {
    websock.send(JSON.stringify({"toS":msg.sID + "@" + ws_cid,"trep":"1","ok":ok,"conID":msg.conID}));
    console.log("Received tile data - sid: " + msg.sID + ", conID: " + msg.conID + ", my dia: " + dialect + ", other dia: " + msg.dia + ", ok: " + ok);
  } else if (ws_network == 2) {
    websock.send(JSON.stringify({"trep":msg.tdat,"sID":ws_sid,"ok":ok,"conID":msg.conID}));
    console.log("Received tile data - sid: " + msg.tdat + ", conID: " + msg.conID + ", my dia: " + dialect + ", other dia: " + msg.dia + ", ok: " + ok);
  }
}

function ws_byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

function ws_announce(id) {
  if (!ws_auth && !ws_hub) { return; }
  if (id == 0) {
    //Id request
    websock.send(JSON.stringify({"toH":ws_hubName + "@" + ws_cid,"announce":"1"}));
    console.log("Sent idreq");
  } else if (id == 1) {
    //Id response
    websock.send(JSON.stringify({"toH":ws_hubName + "@" + ws_cid,"idrep":ws_sid}));
    console.log("Sent idrep");
  }
}

function ws_reset() {
  ws_auth = false;
  ws_sid = null;
  ws_hub = false;
  ws_sending = false;
  // for (i = 0; i < windowMax; i++) {
    // closeAllMenus(i,"con");
  // }
}

function ws_updateConStatus(state, txt, override) {
  ws_conState = state;

  Array.prototype.forEach.call(document.getElementsByClassName('con-status-icon'), function(el) {
    if (ws_conState == 0) {
      el.style.fill = "red";
    } else if (ws_conState == 1) {
      el.style.fill = "yellow";
    } else if (ws_conState == 2) {
      el.style.fill = "greenyellow";
    }
  });

  Array.prototype.forEach.call(document.getElementsByClassName('con-status-icon-text'), function(el) {
    if (ws_conState == 2) {
      //Refresh
      // el.innerHTML = "\u21BB"
      el.innerHTML = "\u2315";
      el.style.fontSize = "30px";
    } else {
      //Connect
      el.innerHTML = fixedFromCharCode(0x01F4F6);
      el.style.fontSize = "50px";
    }
  });

  Array.prototype.forEach.call(document.getElementsByClassName('con-status-text'), function(el) {
    el.innerHTML = txt;
  });

  if (!override) {
    refreshConMenu();
  }
}



function ws_handleClose(msg) {  
  ws_reset();
  if (ws_err) {
    console.log("WS closed" + (msg == null ? "" : ": " + msg) + ". Switching to network " + (ws_network+1));
    ws_network++;
    ws_err = 0;
    ws_startWebSocket();
  } else {
    console.log("WS closed timeout / close()");
    ws_updateConStatus(0,"Not Connected.");
  }
}

function ws_forceClose() {
  console.log("WebSocket - Terminated");
  ws_reset();
  ws_shutdown();
  ws_updateConStatus(0,"Not Connected.",true);
}

function ws_shutdown() {
  if (websock != null) {
    websock.onclose = function () {}; // disable onclose handler first
    websock.close()
    websock = null;
  }
}
"use strict"

function findOffsetTopLeft(el) {
    var id = el.windex;
    var x = el.offsetLeft;
    var y = el.offsetTop;
    if (el.offsetParent && el.offsetParent != codearea2[id] && el.offsetParent != toolbox) {
        var xy = findOffsetTopLeft(el.offsetParent);
        x = x + xy.left;
        y = y + xy.top;
    }
    return {left: x, top: y};
}
function isBottomTarget(ch, obj) {
    if (ch.parentNode == null) { return false; }

    // console.log("IsBottomTarget: " + ch + ", " + obj + ", " + ch.parentElement.classList);
    if (ch.parentElement.classList.contains('hole')) {
        if (!ch.parentElement.classList.contains('multi')) {
            return false;
        }
        if (obj.classList.contains('method')
                && !ch.parentElement.classList.contains('object-scope')) {
            return false;
        }
    }    
    var p = ch.parentNode;
    var id = ch.windex;
    while (p != codearea2[id]) {
        // console.log("isBottomTarget: " + p + ", " + p.classList);        
        if (p.classList.contains('locked'))
            return false;
        p = p.parentNode;
    }
    var chXY = findOffsetTopLeft(ch);
    var objXY = findOffsetTopLeft(obj);
    var t = chXY.top + ch.offsetHeight;
    var l = chXY.left - ch.offsetWidth / 2;
    var r = chXY.left + ch.offsetWidth;
    var m = objXY.left + obj.offsetWidth / 2;
    var l2 = chXY.left;
    var r2 = chXY.left + ch.offsetWidth;
    var ot = objXY.top - markerHeight;
    if (ot < t + markerHeight * 0.3 && ot > t - markerHeight) {
        if (m + markerWidth * .6 >= l2 && m - markerWidth * .6 <= r2) {
            return true;
        }
    }
    return false;
}

function runOnDrop(tile) {
    if (tile.classList.contains('var')) {
        var vars = [];
        if (tile.parentNode.classList.contains('bind-lhs'))
            findMutableVarsInScope(tile, vars, []);
        else
            findVarsInScope(tile, vars, []);
        if (tile.childNodes[0].innerHTML == 'Variable')
            tile.childNodes[0].innerHTML = '';
        if (vars.length == 1 && tile.childNodes[0].innerHTML == '') {
            tile.getElementsByClassName('var-name')[0].innerHTML = vars[0];
        } else if (vars.length != 0) {
            var curname = tile.childNodes[0].innerHTML;
            for (var i=0; i<vars.length; i++)
                if (vars[i] == curname)
                    return;
            popupVarMenu({target: tile.childNodes[0],
                stopImmediatePropagation: function(){}});
        } else if (tile.childNodes[0].innerHTML != ''
                && tile.parentNode.classList.contains('bind-lhs')) {
            tile.childNodes[0].innerHTML = '';
            popupVarMenu({target: tile.childNodes[0],
                stopImmediatePropagation: function(){}});
        }
    }
}
function reflow(id) {
    for (var i=0; i<tiles2[id].length; i++) {
        if (tiles2[id][i].parentNode != codearea2[id])
            continue;
        if (tiles2[id][i].prev)
            continue;
        var tmp = tiles2[id][i];
        var runningTop = +tmp.style.top.substring(0, tmp.style.top.length - 2);
        var left = tmp.style.left;
        while (tmp) {
            tmp.style.top = runningTop + 'px';
            runningTop += tmp.offsetHeight;
            tmp.style.left = left;
            tmp = tmp.next;
        }
    }
}

function updateTileIndicator(id) {
    if (markErrorsAlways) {
        var wereErrors = codearea2[id].getElementsByClassName('has-error');
        while (wereErrors.length) {
            wereErrors[0].title = "";
            wereErrors[0].classList.remove('has-error');
        }
    }
    var reasons = [];
    errorTiles2[id] = findErroneousTiles(reasons,id);
    if (errorTiles2[id].length > 0) {
        document.getElementById('indicator').style.background = 'red';
        var err2 = document.getElementsByClassName("errorPie");
        for (var i = 0; i < err2.length; i++) {
          err2[i].style.fill = "red";
        }
    } else {
        document.getElementById('indicator').style.background = 'green';
        var err2 = document.getElementsByClassName("errorPie");
        for (var i = 0; i < err2.length; i++) {
          err2[i].style.fill = "green";
        }
    }
    if (markErrorsAlways) {
        for (var i=0; i<errorTiles2[id].length; i++) {
            errorTiles2[id][i].classList.add('has-error');
            errorTiles2[id][i].title = reasons[i];
        }
    }
    return errorTiles2[id].length;
}
function renameVar(oldValue, newValue, relativeTo) {
    if (!relativeTo) {
        // relativeTo = codearea[0];
      console.error("RelativeTo was null");  
    } else {
      while (!(relativeTo.classList.contains('codearea'))) {
        relativeTo = relativeTo.parentNode;
        if (relativeTo == null) { break; }
      }
      if (!relativeTo || !relativeTo.classList.contains('codearea')) {
        console.error("RelativeTo not correct");
      }
    }
    
    
    
    
    
    // else {
        // if (relativeTo.classList.contains('class-name'))
            // relativeTo = codearea;
        // else {
            // while (relativeTo && !relativeTo.classList.contains('tile'))
                // relativeTo = relativeTo.parentNode;
            // if (!relativeTo)
                // relativeTo = codearea;
        // }
    // }
    var tmp = relativeTo;
    while (tmp) {
        var vars = tmp.getElementsByClassName('var-name');
        for (var i=0; i<vars.length; i++) {
            if (vars[i].innerHTML == oldValue)
                vars[i].innerHTML = newValue;
        }
        tmp = tmp.next;
    }
}

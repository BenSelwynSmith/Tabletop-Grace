"use strict"
var shrinkFuncs = [];
var growFuncs = [];
function shrink(id) {
    tryLog("Shrink: " + id);
    if (codearea2[id].viewChange) { return; }
    if (highlightTileErrors(null,id))
        return;
    // closeAllMenus(id,"pie");
    
    codearea2[id].viewChange = 1;
    editor2[id].setValue(document.getElementById('gracecode'+id).value, -1);
    editor2[id].getSession().clearAnnotations();
    codearea2[id].classList.add('shrink');
    shrinkFuncs.forEach(function(f){f()});
    // toolbox.style.visibility = 'hidden';
    var starts = [];
    chunkLine = "\n// chunks:";
    var chunks = sortChunks(id);
    for (var i=0; i<chunks.length; i++) {
        var child = chunks[i];
        chunkLine += " " + child.style.left + "," + child.style.top;
        starts.push(child);
        continue;
    }
    
      
    
    
    setTimeout(function() {
        var leftEdge = (document.getElementById(windowIdName + id).getElementsByClassName('ace_gutter')[0].offsetWidth + 3) + 'px';
        var runningTop = -1;
        var offset = document.getElementById(windowIdName + id).getElementsByClassName('ace_gutter-cell')[0].offsetHeight;
        if (document.getElementById('dialect').value)
            runningTop += offset;
        for (var i=0; i<starts.length; i++) {
            starts[i].oldTop = starts[i].style.top;
            starts[i].oldLeft = starts[i].style.left;
            starts[i].style.left = leftEdge;
            starts[i].style.top = runningTop + 'px';
            runningTop += +starts[i].offsetHeight;
            var child = starts[i].next;
            while (child) {
                child.oldTop = child.style.top;
                child.oldLeft = child.style.left;
                child.style.left = leftEdge;
                child.style.top = runningTop + 'px';
                runningTop += +child.offsetHeight;
                child = child.next;
            }
            runningTop += offset;
        }
        tryLog("Ace ID: " + id + ", " + windows[id].rid);
        if (windows[id].rid == 1 || windows[id].rid == 2) {
          fixAce(id);
        }
        setTimeout(function() {
            editor3[id].style.visibility = 'visible';
            codearea2[id].style.visibility = 'hidden';
            // document.getElementById('indicator').style.background = 'green';
            // viewButton.disabled = "";
            codearea2[id].viewChange = 0;
            var pies = codearea2[id].getElementsByClassName('piemenu');
            for (var i = 0; i < pies.length;) {      
              if (pies[i].classList.contains('sec')) {
                editor4[id].appendChild(pies[i]);
              } else {
              pies[i].parentNode.removeChild(pies[i]);        
              }
            }
        }, 1100);
    }, 700);
}
function grow(id) {
    if (codearea2[id].viewChange) { return; }
    
    
    if (editor2[id].getValue() != document.getElementById('gracecode'+id).value) {
        document.getElementById('stderr_txt').value = "";
        minigrace.modname = "main";
        minigrace.mode = "json";
        minigrace.compile(editor2[id].getValue() + chunkLine);
        minigrace.mode = "js";
        if (minigrace.compileError) {
            var errmsg = showErrorInEditor(document.getElementById('stderr_txt').value,id);
            if (confirm("This code did not compile: " + errmsg + "\nDo you want to revert to the previous version that did?")) {
                editor2[id].setValue(document.getElementById('gracecode'+id).value, -1);
                editor2[id].getSession().clearAnnotations();
                return;
            }
            return;
        }
        editor2[id].getSession().clearAnnotations();
        rebuildTilesInBackground(minigrace.generated_output,id);
    }
    codearea2[id].viewChange = 1;
    var pies = editor4[id].getElementsByClassName('piemenu');
    for (var i = 0; i < pies.length;) {
      if (pies[i].classList.contains('sec')) {
        codearea2[id].appendChild(pies[i]);
      }
    }    
    editor3[id].style.visibility = "hidden";
    codearea2[id].style.visibility = 'visible';
    setTimeout(function() {
        for (var i=0; i<codearea2[id].children.length; i++) {
            var child = codearea2[id].children[i];
            if (child.prev != false)
                continue;
            while (child) {
                child.style.top = child.oldTop;
                child.style.left = child.oldLeft;
                child = child.next;
            }
        }
        setTimeout(function() {
            codearea2[id].classList.add('growing');
            codearea2[id].classList.remove('shrink');
            growFuncs.forEach(function(f){f()});
            setTimeout(function() {
                codearea2[id].classList.remove('growing');
                // toolbox.style.visibility = 'visible';
                // viewButton.disabled = "";
                codearea2[id].viewChange = 0;
                
            }, 1000);
        }, 1100);
    }, 300);
}
function toggleShrink(id) {
    if (codearea2[id].classList.contains('shrink'))
        grow(id);
    else
        shrink(id);
}
function rebuildTilesInBackground(jsonStr,id) {
    codearea2[id].classList.add("no-transition");
    codearea2[id].classList.remove('shrink');
    loadJSON(jsonStr,id);
    checkpointSave(id);
    var leftEdge = (document.getElementById(windowIdName + id).getElementsByClassName('ace_gutter')[0].offsetWidth + 4) + 'px';
    var runningTop = 0;
    if (document.getElementById('dialect').value)
        runningTop = 19;
    var starts = [];
    for (var i=0; i<codearea2[id].children.length; i++) {
        var child = codearea2[id].children[i];
        if (child.prev != false)
            continue;
        starts.push(child);
        continue;
    }
    codearea2[id].classList.add('shrink');
    for (var i=0; i<starts.length; i++) {
        starts[i].oldTop = starts[i].style.top;
        starts[i].oldLeft = starts[i].style.left;
        starts[i].style.left = leftEdge;
        starts[i].style.top = runningTop + 'px';
        runningTop += +starts[i].offsetHeight;
        var child = starts[i].next;
        while (child) {
            child.oldTop = child.style.top;
            child.oldLeft = child.style.left;
            child.style.left = leftEdge;
            child.style.top = runningTop + 'px';
            runningTop += +child.offsetHeight;
            child = child.next;
        }
        runningTop += 19;
    }
    codearea2[id].classList.remove("no-transition");
}
function showErrorInEditor(errstr,id) {
    var lines = errstr.split("\n");
    var errmsg = "";
    for (var i=0; i<lines.length; i++) {
        if (lines[i].substring(0, 10) != 'minigrace:') {
            errmsg += lines[i].substring(11) + "\n";
            break;
        }
    }
    var bits = errmsg.split(':');
    var errstr = errmsg.substring(bits[0].length + bits[1].length + 3);
    editor2[id].getSession().setAnnotations([{
        row: bits[0] - 1,
        column: bits[1] - 1,
        text: errstr,
        type: "error"
    }]);
    return errstr;
}
coddleBrowser('blink', function() {
    // Chrome has unusual ideas of what input sizes mean
    // shrinkFuncs.push(
        // function() {
            // var inputs = codearea.getElementsByTagName('input');
            // Array.prototype.forEach.call(inputs, function(el) {
                // el.style.width = (el.size * 8) + 'px';
            // });
        // }
    // );
    // growFuncs.push(
        // function() {
            // var inputs = codearea.getElementsByTagName('input');
            // Array.prototype.forEach.call(inputs, blinkCoddleInputs);
        // }
    // );
});

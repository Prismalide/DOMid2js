//patch css:checked pour IE<9 et android<4.4. Beta version
//détection IE <9
  if (!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)) {
    var ver = navigator.userAgent.match(/MSIE ([0-9.]+);/);
    if (ver != null && ver[1] != undefined) {
      ver = parseInt(ver[1]);
      if (ver < 9) {
// IE<9
//alert("IE<9") 
    //*///Patch EventListener
    if (document.addEventListener){
    //    alert ("DOM addEventListener");
        var addEventPatch = function (obj, evt, fn, phase) { obj.addEventListener(evt, fn, phase)}
        var removeEventPatch = function (obj, evt, fn ,phase) {obj.removeEventListener(evt, fn, phase)}}
    else if (document.attachEvent) {
    //    alert ("IE attachEvent");
        var addEventPatch = function (obj, evt, fn) { obj.attachEvent('on' + evt, fn)}
        var removeEventPatch = function (obj, evt, fn) { obj.detachEvent('on' + evt, fn)}}
//*///INITIALISATION////INITIALISATION////INITIALISATION////INITIALISATION////INITIALISATION////*******INITIALISATION
    var tmpTimer= setInterval( (function (){
                              bodyMemo =document.getElementsByTagName("BODY") || document.getElementsByTagName("body");
                              bodyMemo=bodyMemo[0];
                              if (bodyMemo && bodyMemo.firstChild){
                                clearInterval(tmpTimer);
                                addEventPatch(bodyMemo,"click",clickTraitement,false);
                              };
                        }),50);
    function clickTraitement(evt){
        var evt = evt || window.event;
        var tmpTarget=evt.target || evt.srcElement;
        if (tmpTarget.tagName=="LABEL" || tmpTarget.tagName=="label"){
            var tmpParent=tmpTarget.parentNode;
            var tmpUL=tmpParent.parentNode;
            if (tmpUL.tagName=="UL" || tmpUL.tagName=="ul"){
                for (i=0;i<tmpUL.childNodes.length;i++){
                    for (j=0;j<tmpUL.childNodes[i].childNodes.length;j++){
                        var tmpFix=tmpUL.childNodes[i].childNodes[j];
                        if (tmpUL.className=="ulN1"){
                            if (tmpFix.tagName=="UL" || tmpFix.tagName=="ul"){
                                tmpUL.childNodes[i]===tmpParent ? tmpFix.style.display="block":tmpFix.style.display="";                         
                                tmpUL.childNodes[i]===tmpParent ? tmpFix.style.visibility="visible":tmpFix.style.visibility="";                         
                        }}else{if (tmpUL.className=="ulN3"){
                            if (tmpFix.tagName=="DIV" || tmpFix.tagName=="div"){
                                tmpUL.childNodes[i]===tmpParent ? tmpFix.style.display="block":tmpFix.style.display="";                         
//                                tmpUL.childNodes[i]===tmpParent ? tmpFix.style.visibility="visible":tmpFix.style.visibility="";                         
                            }
                        }else{
                            if (tmpFix.tagName=="UL" || tmpFix.tagName=="ul"){
                                tmpUL.childNodes[i]===tmpParent ? tmpFix.style.visibility="visible":tmpFix.style.visibility="";                         
                            }
                        }
                        }
/*sur label*/           tmpFix.parentNode.childNodes[1].style.backgroundColor=tmpUL.childNodes[i]===tmpParent ?"whitesmoke":"";                         
                    }
                }
            }
        }
    }
//fin détection IE<9
      }
    }
  }
//fin patch css:checked pour IE<9

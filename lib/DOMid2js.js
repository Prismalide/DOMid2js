/* DOMid2js.js *//*04/2017
/* from prismalide.com 
/* license : CC BY ND
/* version: 1
/* invasion : Na
/* compatibility: IE>8
/***/

//Look function_diagram at the end of the file !

"use strict"
try{ "".a = ""; console.log( "DOMid2js","not in strict mode" ) } catch( e ){}

//====== Anonymous Launcher ========================////  START  \\\\

; ( function ( ){
//!-autoexec:
//!-anonyme:
//!-closure:
    ///  wait for body  \\\
    var tmpTimer = setInterval( ( function ( ){ if ( document.getElementsByTagName ( "BODY" )[ 0 ] ){ initBody( ) } } ), 50 )
    function initBody( ){ clearInterval( tmpTimer ); DOMid2js() }   

    //______ DOMid2js ______________________________////  START  \\\\
    function DOMid2js ( ) { //!-use:resCom-light //!-use:setJs-light
        //!-single:
    //!-var:
        var settings = {}
    //!-init:
//        resources = resComlight ( resourcesTypes(), resources, {} )
        resources = resComlight ( resourcesTypes(), resources, {} )
        settingOptions = settingOptions()
        settings = setJslight( "DOMid2js.js", "di2j", settingOptions )
        if ( settings.ui || settings.idui ) return userInterface( )
        return noUI()

    //!-branch:
        function noUI ( ) {
            settings.popupout
                ? popUp( convert( ) )        
                : clipBoardCopy( document.getElementsByTagName( "body" )[ 0 ], convert, copyNotify )// pour test, en attendant une UI, click on windows pour copy vers clipBoardbo
            }

    //!-data:
        //______ resourcesTypes ______//
        function resourcesTypes ( where ){
            where = where || {}
            var t = true
            var where = {
                string:t,
                html:t
                }
            return where
            }
        //______ setSettingOptions ___//
        function settingOptions ( where ){
        //!-var:
            where = where || {}
            var t = true
            where.flags = {
                formathtml:t ,//TODO: option to come => mise en forme innerHTML
                popupout:t ,//vue en popup de la conversion
                linebreak:t ,//saut de ligne en fin de string
                noendlineempty:t ,//saut de ligne en fin de string
                template:t ,//pas de " (double quotes) mais `  littéraux de gabarits (backtick, template literals)
                templatestyle:t ,//pour balise style, pas de " (double quotes) mais ` (backtick, template literals)
                singlequote:t  ,//TODO:  option to come  => pas " mais '
                nofunction : function ( ){ exploreIn = noFunction; this.nofunction = true } ,//encodage directement par le DOM
                nostyle :t ,//ne pas inclure le style[0]
                ui:t //user interface
                }
            where.values = { 
                root:t , //id de départ
                varroot:t ,//TODO: option to come
                idRoot:t ,//TODO: option to come
                idui:t  ,//TODO: option to come =>UI perso
                style:t ,//TODO: option to come
                styleVar:t ,//TODO: option to come 
                beforeId:t ,//TODO: option to come =>pre id name (modify also in Style)
                beforeclass:t ,//TODO: option to come =>pre className (modify also in Style)
                }
            where.reset = function (){}                
            where.after = function (){
                this.where = ( this.root ) ? document.getElementById( this.root ) : document.getElementsByTagName("body")[0]
                this.rootVar = ( this.whereVar ) ? this.whereVar+'.' : '' 
                this.rootPath = ( this.whereVar ) ? this.whereVar : ( this.root ) ? this.root : 'jsDOM' 
//this.whereVar = this.whereVar+"." || 'var '
                this.whereVar = ( this.whereVar ) ? this.whereVar+"." : 'var '
                }                
            return where
            }

    //!-functions
        //______ convert _____________//
        function convert ( ) {
            var rootPath = settings.rootPath
            ///  start jsDOM reply  \\\
            var all2js = "/****\\\\\\\n/*\t" + rootPath + "--from--DOMid2js---->\n\t*///\n"
            all2js += styleToJs( )
            all2js += "/// <---nodes--jsDOM--->\n"
            all2js += "/// <---user--tools--" + rootPath + "--->\n"
            ///  function innerId one  \\\
            if ( settings.nofunction ) {
                all2js += "\tfunction innerId ( nodeId, parentId, inner ) {\n"+ 
                '\t\t'+rootPath+".nodeId = ( ( rootPath == parentId ) ? "+rootPath+" : "+rootPath+"[ parentId ]).querySelector( '#'+nodeId)\n"+
                '\t\t'+rootPath+".nodeId.innerHTML = inner \n"+
                '\t\t}\n'
                }
            ///  start jsDOM  \\\
            all2js += "/// <---start--" + rootPath + "--->\n"
            ///  exploreNode  \\\
            return all2js + exploreNode( )
            }
        //______ styleToJs ___________//
        function styleToJs ( ) {
            if ( settings.nostyle ) return ''
            var style2js = "/// <---style--js2DOM--->\n"
            var s = document.style || document.getElementsByTagName("style")[0]
            var memotemplate = settings.template
            if ( settings.templatestyle ) settings.template = true
            if ( s ) {
                style2js += '\tvar s = document.createElement("style")\n'+
                    '\ts.type = "text/css"\n'+
                    '\ts.appendChild(document.createTextNode('
                style2js +=  decodeInner ( s.innerHTML, '' )//'\t\t' )
                style2js += '\t\t))\n'
                style2js += '\tvar head = document.head || document.getElementsByTagName("head")[0]\n'+
                    '\thead.appendChild(s)\n'
                }
            settings.template = memotemplate
            return style2js
            }
        //______ exploreNode _________//
        function exploreNode ( ){ //convert with function//TODO: plus tard 
        //!-bringvar:
            var where = settings.where.cloneNode( true );
            var rootPath = settings.rootPath
            var actualExplore = exploreIn 
        //!-init:
            where.id = rootPath            
            if ( settings.nofunction ) actualExplore = settings.noFunction
            var rep = exploreIn( where, '\t\t', rootPath )
            var outer = where.outerHTML
            if ( where.nodeName.toLowerCase() == 'body' ) outer = outer.replace( '<body', '<div' ).replace( 'body>', 'div>' ).replace( '<BODY', '<div' ).replace( 'BODY>', 'div>' )
            return "\tvar "+rootPath+" = document.createElement( 'div' )"+
                "\n\t"+rootPath+".innerHTML = "+decodeInner( outer, '\t\t' )+
                "\t"+rootPath+" = "+rootPath+".firstElementChild\n" + rep
        //!-branch:
            //______ exploreIn ___________//
            function exploreIn ( where , tabs , nodePath ){ //convert with function//TODO: plus tard 
                var nextTab = tabs + '\t' 
                var innerNode2js = ""
                for ( var i = where.children.length-1; i>=0  ; i-- ){
                    var node = where.children[i]
                    if ( node.id ) {
                        var nodeId = node.id.trim() 
                        innerNode2js = exploreIn ( node, nextTab, nodeId ) + innerNode2js 
                        var rep = decodeInner( node.innerHTML, nextTab )
                        innerNode2js = 
                            tabs +rootPath+'.'+ nodeId+ " = " +rootPath+( ( rootPath == nodePath ) ? '' : '.'+ nodePath )+ ".querySelector('#"+nodeId+"')\n"+
                            ( rep ? tabs +rootPath+'.'+ nodeId+".innerHTML =" + rep : '' )+ innerNode2js  
                        node.innerHTML = ""
                        continue
                        }
                    innerNode2js += exploreIn ( node, tabs, nodePath )
                    }//,"")
                return innerNode2js //return le codage en javascript des balises, dans l'arborescence de where, ayant un 'id'   
                }
            //______ noFunction __________//
            function noFunction ( where , tabs , nodePath ){ //convert with function//TODO: plus tard 
                var nextTab = tabs + '\t' 
                var innerNode2js = ""
                for ( var i = 0; i < where.children.length ; i++ ){
                    var node = where.children[i]
                    if ( node.id ) {
                        var nodeId = node.id.trim() 
                        innerNode2js += exploreIn ( node, nextTab, nodeId )  
                        var rep = decodeInner( node, nextTab )
                        innerNode2js = 
                            tabs +rootPath+'.'+ nodeId+ " = " +rootPath+((rootPath==nodePath)?'':'.'+ nodePath)+ ".querySelector('#"+nodeId+"')\n"+
                            ( rep ? tabs +rootPath+'.'+ nodeId+".innerHTML =" + rep : '' )+ innerNode2js  
                        node.innerHTML = ""
                        continue
                        }
                    innerNode2js += exploreIn ( node, tabs, nodePath )
                    }
                return innerNode2js //return le codage en javascript des balises, dans l'arborescence de where, ayant un 'id'   
                }
            }
        //______ decodeInner _________//
        function decodeInner ( whoNode , tabs ){
            var template = settings.template
            if ( template ) tabs = ""
            var rep = whoNode.split( "\n" ).reduce( function ( out, current, i, a ){
                    if ( current.replace( / /g, '') == '' ) return out  
                    current = current.replace( /\r/g,'' )
                    if ( !template )current = current.replace( /"/g, '\\"' ) + ( settings.linebreak  ? '\\n' : '' )
                    if ( !out ) return '\n'+tabs+( template ? '`' : '"')+current  
                    return  out+( template ? '\n' : '"+\n'+tabs+'"' )+current
                    },false)
            return  !rep ? "" : rep + ( settings.noendlineempty ? template ? '"\n':'`\n' : ( template ? '\n`' : '" + \n'+tabs+'""' ) ) + '\n'   
            }
                                        
        //______ popUp _______________//
        function popUp ( innerHtmlPopup ) {
        //!-closure:
        //!-var:
            var popupOut = outerHtml2node( resources.popUp ) 
            var memoScroll = { x:0, y:0 } 
        //!-init:
            popupOut.memoScroll = memoScroll
        //!-function:
            popUp = suite
            return suite ( innerHtmlPopup )
            function suite ( innerHtmlPopup ){ 
                memoScroll.x = window.top.window.scrollX
                memoScroll.y = window.top.window.scrollY    
                popupOut.querySelector( '#popupdata' ).firstElementChild.innerHTML = htmlEncode( innerHtmlPopup )
                window.top.window.scroll( 0, 0 )
                window.top.document.body.appendChild( popupOut ) 
            }///function
            }///closure

        //______ userInterface _______//
        function userInterface ( ) {
        //!-closure:
            //!-var:
            var gui = outerHtml2node( resources.gui )
            //!-init:
            var memoScroll = { x:0, y:0 } 
            var selectId = gui.getElementsByTagName( "select" )[0]
            {var listeId = Array.prototype.map.call(
                    document.querySelectorAll('*[id]:not([id=""])'), function( el, i ) { return el.id } 
                    ).sort()
            for ( var i = 0; i < listeId.length; i++ ){
                selectId.add ( new Option( listeId[i], listeId[i] ) )                    
                }//avant appendChild
            }//later for let
            window.top.document.body.appendChild( gui ) 
            gui = gui.firstElementChild
            gui.guiClick = guiView
            gui.guiRemove = guiRemove
            gui.guiViewCode = guiViewCode
            gui.guiCopyCode = guiCopyCode
            var guiContent = gui.children[2]
            //popupOut.memoScroll = memoScroll
            memoScroll.x = window.top.window.scrollX
            memoScroll.y = window.top.window.scrollY    
            window.top.window.scroll( 0, 0 )
            //!-event:
            function guiView ( ){
                guiContent.style.display = "inline-block"
                gui.guiClick = guiNoView
                } 
            function guiNoView ( ){
                guiContent.style.display = "none"
                gui.guiClick = guiView
                } 
            function guiRemove ( ){
                window.top.document.body.removeChild( gui.parentNode )
                } 
            function guiViewCode ( that ){
                settings = {}
                settings = newSettingsUI ( that.parentNode )
                popUp( convert( ) )
                } 
            function guiCopyCode ( that ){
                settings = {}
                settings = newSettingsUI ( that.parentNode )
                clipBoardCopy( '', convert, copyNotify )
                }
            ///  tools events  \\\
            function newSettingsUI ( where, reset ) {
                where = where.getElementsByTagName( 'input' )
                var settingsLine = ""
                if(reset) { for ( var i = 0; i<where.length; i++){ where[ i ].checked = false }; return }//clear input
                else {
                    settingsLine = "di2j "
                    for ( var i = 0; i<where.length; i++){
                        if ( where[ i ].title == "root" && where[i].checked ){
                            settingsLine += "root:" + where[ i ].nextElementSibling.nextElementSibling.value + " "
                            continue
                            }
                        if ( where[ i ].checked ) settingsLine += where[ i ].title + " " 
                        }
                    }
                return setJslight( settingsLine, "di2j", settingOptions )
                } 
            }///closure

        //______ copyNotify __________//
        function copyNotify ( ) {
        //!-closure:
            var memoBody = document.getElementsByTagName( "body" )[ 0 ] 
            var nodeNotify = outerHtml2node( resources.copyNotify )
        //!-function:
            copyNotify = suite
            return suite ( )
            function suite ( ){ 
                memoBody.appendChild( nodeNotify )
            }///function
            }///closure

        //______ resources ___________//

function resources ( ){                
/*!-js:testscript
<script>
if ( true ) console.log("test ok")
</script>

/*!-html:copyNotify
<div style='position: absolute; top: 0px; background-color: white;font-size: 22px;'>
<br />Le body ce trouve maintenant dans le clipBoard (au format javascript jsDOM).<br />
Vous pouvez le récupérer dans votre éditeur de code.<br /><br />

/*!-html:popUp
<div onclick="this.parentNode.removeChild(this); window.scroll( this.memoScroll.x, this.memoScroll.y )"
       style=" z-index: 500; top:20px; position: absolute; text-align: center; width: 100%; " >
<div style="display: inline-block;" >
<div id="popupdata" style="padding: 8px; border-radius: 10px; display:  block;background-color: #F7E8D7; text-align: left;">
<pre style="text-align: left;">test et retest e rerererbbere,b   </pre>
</div></div></div>

/*!-html:gui                
<div style=" z-index: 500; top:0px; position: fixed; text-align: center; width: 100%; " >
<div style = "display: inline-block; width: 100%;" >
    <div onclick="this.parentNode.guiClick( this )" style="border-radius: 10px; top: 0px; display: inline-block; background-color: #F7E8D7;">
        <div style="width: 30px; padding: 2px 6px 2px 2px;">
            <div style="padding-left: 2px; width: 100%; height: 1px; color: #FFFFFF; text-align: center; font-size: 18px;; font-family: times new roman; position: relative; top: 0px;">
                <b>did</b></div>
            <div style="margin: 2px;width: 100%; height: 5px; background-color: royalblue;"></div>
            <div style="margin: 2px;width: 100%; height: 5px; background-color: blueviolet;"></div>
            <div style="margin: 2px;width: 100%; height: 5px; background-color: violet;"></div>
        </div>
    </div><br />
    <div style="padding: 8px; border-radius: 10px; display: none; background-color: #F7E4D2;">
        <div>
            <div>
                <div style="background-color: #E7D8E7; text-align: right " >
                    <span style="float:left" >
                        <span style="margin: 3px; border: 1px solid #88888888; border-radius: 8px; top: 0px; display: inline-block; background-color: #F7E8D7;">
                            <div onclick="this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.guiClick( this )" style="width: 22px; padding: 0px 5px 1px 1px;">
                                <div style="padding-left: 1px; width: 100%; height: 1px; color: #FFFFFF; text-align: center; font-size: 18px;; font-family: times new roman; position: relative; top: -2px;">
                                    <b>&#9965;</b></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: royalblue;"></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: blueviolet;"></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: violet;"></div>
                            </div>
                        </span><span style="position: relative; margin-top: 0px; color:#FFFFFF;"><b>DOMid2js</b></span>
                    </span>
                    <span >
                        <span onclick="this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.guiClick( this )" style="margin: 3px; border: 1px solid #88888888; border-radius: 8px; top: 0px; display: inline-block; background-color: #F7E8D7;">
                            <div style="width: 22px; padding: 0px 5px 1px 1px;">
                                <div style="padding-left: 1px; width: 100%; height: 1px; color: #FFFFFF; text-align: center; font-size: 18px;; font-family: times new roman; position: relative; top: 2px;">
                                    <b>&#10134;</b></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: royalblue;"></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: blueviolet;"></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: violet;"></div>
                            </div>
                        </span>
                        <span onclick="this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.guiRemove( this )" style="margin: 3px; border: 1px solid #88888888; border-radius: 8px; top: 0px; display: inline-block; background-color: #F7E8D7;">
                            <div style="width: 22px; padding: 0px 5px 1px 1px;">
                                <div style="padding-left: 1px; width: 100%; height: 1px; color: #FFFFFF; text-align: center; font-size: 18px;; font-family: times new roman; position: relative; top: -2px;">
                                    <b>&#10060;</b></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: royalblue;"></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: blueviolet;"></div>
                                <div style="margin: 2px; width: 100%; height: 4px; background-color: violet;"></div>
                            </div>    
                        </span>
                    </span>
                </div>
                <br />
                <p>Choisir les options</p>
                <div id="choisdi2ju" style="text-align: left;" >
                    <label><br /><input title="templatestyle" type="checkbox" />
                        <b>templatestyle</b>, pour style, pas de " mais `</label>
                    <label><br /><input title="linebreak" type="checkbox" />
                        <b>linebreak</b>, saut de ligne en fin de strings</label>
                    <label><br /><input title="noendlineempty" type="checkbox" />
                        <b>noendlineempty</b>, saut de ligne en fin de strings</label>
                    <label ><br /><input title="nostyle" type="checkbox" />
                        <b>nostyle</b>, ne pas inclure le style[0]</label>
                    <label ><br /><input title="template" type="checkbox" />
                        <b>template</b>, pas de " mais ` </label>
                    <label ><br /><input title="root" type="checkbox" />
                        <b>root:j</b> et sélectionez l'id de départ 
                        <select onChange= "this.previousElementSibling.previousElementSibling.checked = true" name = "selectClick"></select></label>
                    <br />
                    <br />
                </div>
            </div>
            <br />
    
           <span onclick="this.parentNode.parentNode.parentNode.guiViewCode( this )" style="padding: 0px 8px 0px 10px; margin : -3px 6px 0px 6px; border: #AE8964; border-bottom-style: solid; border-radius: 30px; height: 22px; display: inline-block; background-color: #FFFFFF;">  
               <div style="padding: 0px 10px 0px 10px; margin : 0px 0px 0px 0px; width: 12px; height: 22px; border-radius: 50px; display: inline-block; background-color: #BBBC82; border: 1px solid #666666;">
                   <div style="padding: 3px 3px 3px 2px; margin: 2px 2px 2px -2px; width: 12px; height: 12px; border-radius: 30px; background-color: #000000;">
                       <div style="padding: 4px 0px 0px 0px; margin: 2px 4px 4px 5px; border-radius: 30px; height: 2px;  background-color: #FFFFFF;"></div>
                   </div>
               </div>
           </span>
           <span onclick="this.parentNode.parentNode.parentNode.guiCopyCode( this )" style="padding: 0px 8px 0px 10px; margin : -3px 6px 0px 6px; border: #000000; border-bottom-style: solid; border-radius: 30px 0px 30px 3px; border-left-style: solid; height: 22px; width: 25px; display: inline-block; background-color: #FFFFFF;">  
               <div style="top: -0.3em; left: 9px; position: relative; padding: 3px 3px 3px 2px; margin: 2px 2px 2px -2px; width: 12px; height: 12px;">
                   <div style="top: 11px; left: -8px; position: absolute; display: inline-block; border: 7px; width: 16px; border-bottom-style: solid; background-color: #00FF00;"></div>
                   <div style="top: 7px; left: 5px; position: absolute; display: inline-block;border-left: 13px solid #000000; border-top: 8px solid transparent;  border-bottom: 8px solid transparent;"></div>
               </div>
           </span>
            <br />
        </div>
    </div>
</div>
</div>
//!-end:*/
}
            
    //______ DOMid2js ______________________________\\\\\  END  /////
        }///single

    //______ Generic _______________________________////  START  \\\\
         
    //______ htmlEncode _______//
    function htmlEncode ( htmlString ) { 
    //!-closure:
    //!-var:
        var tmpDiv = document.createElement( "span" );
    //!-function:
        htmlEncode = suite
        return suite (htmlString)
        function suite (htmlString){ 
            //!-note: Le saut de ligne est traduit par \n et par \r\n dans IE8 et XMLHttpRequest lecture de fichier.
            if ( htmlString.substr( htmlString.length-1,1 ) == "\r" ) { htmlString = htmlString.substr( 0, htmlString.length - 1 ) }//!-: htmlString.substr(-2,1) marche pas sur IE8
            tmpDiv.textContent = tmpDiv.innerText = htmlString
            return tmpDiv.innerHTML;
        }///function
        }///closure

    //______ clipBoardCopy ____//
    function clipBoardCopy( clickArea, startCallBack, endCallBack  ){
    //!-closure:
    //!-var:
        var copyArea = document.createElement( 'textarea' )
        var memoBody = document.getElementsByTagName( "body" )[ 0 ]
    //!-init:
        clipBoardCopy = function clipBoardCopy( clickArea2, startCallBack2, endCallBack2  ) {
            startCallBack = startCallBack2 || function( data ) { return data }
            endCallBack = endCallBack2 || function( data ) { return data }
            clickArea = clickArea2
            if ( clickArea2 != "" ) { clickArea2.addEventListener( 'click', click ); return }
            copy ()
            endCallBack2()
            }
        clipBoardCopy( clickArea, startCallBack, endCallBack )
        function copy (){
            copyArea.value = startCallBack( )
            memoBody.appendChild( copyArea )
            copyArea.select( )
            try {
                document.execCommand( 'copy' )
                } catch ( e ) {
                console.log( "DOMid2js can not copy" )
                }
            }
    //!-event:
        function click ( event ) {
            copy ()
            memoBody.removeChild( copyArea )
            clickArea.removeEventListener( 'click', click )
            endCallBack()
        }///event
        }///closure

    //______ outerHtml2node ___//
    function outerHtml2node ( outerHtmlString ){
    //!-closure:
        var workDiv = document.createElement( "div" )
    //!-function:
        outerHtml2node = suite
        return suite ( outerHtmlString )
        function suite ( outerHtmlString ) {
            workDiv.innerHTML = outerHtmlString
            return  workDiv.firstElementChild
        }///function
        }///closure

    //______ Generic _______________________________\\\\\  END  /////

    //______ Use ___________________________________////  START  \\\\

    //______ setJslight ____________// /// setJslight gitHub for details
    function setJslight ( fileName, id, settingOptions, stettingObject ){
    //!-reply:{}
    //!-var:
        var settingLine = []
        stettingObject = stettingObject || {}
        var settingFlags = settingOptions.flags
        var settingValues = settingOptions.values
    //!-init:
        if ( fileName.substr( fileName.length - 3, 3 ) == '.js' ){
            ///  explore balises script for settings  \\\                            
            for ( var scripts = document.getElementsByTagName( "script" ) 
                , i = 0 ; i < scripts.length ; i++ ){
                if ( scripts[ i ].src.substr( - fileName.length ) == fileName ){
                    settingLine = scripts[ i ].title.toLowerCase( ).split( /\s\W*|:/ )
                    break
                    }
                }
            ///  explore URL for settings  \\\                            
            { var curName = ( decodeURIComponent( ( window.location || document.location ).href ).split( "?" ).pop( ) ).split( /\s\W*|=/ )
                if ( curName[ 0 ] == id ){
                    settingLine = ( settingLine + curName.toString( ).substr( id.length+1 ) ).replace( /,/g , ' ' ).toLowerCase( ).split( /\s\W*|:/ )
                    }  
            }
        ///  fileName is string for settings  \\\
        }else { settingLine = fileName.split( /\s\W*|:/ ) }
    ///  reset  \\\
        try{ if ( settingOptions.reset != undefined ) settingOptions.reset()
            }catch ( e) { throw  new Error ("reset error in settings") } 
    ///  process setting  \\\
        if ( !settingFlags[id] )settingFlags[id] =  function ( ){ } //ajout: pas d'action sur "id" commande 
        if (settingLine[0] == id ){//"id" obligatoire en premier => sinon pas de paramètres
            for ( var i = 1; i<settingLine.length; i++ ){ 
                var settingValue, settingName = settingLine[ i ]
                if (  settingName == "" ) continue
                ///  autre façon de coder un switch  \\\
                if ( ( settingValue = settingFlags[ settingName ] ) == undefined ){
                        if ( settingValues[ settingName ] != undefined ) {
                            settingValue = settingLine[ i + 1 ]
                            i++     
                        }else { console.error ( fileName + ' unknown parameter: ' + settingValue ); continue } 
                    }
                if ( typeof settingValue == 'function' ) { settingValue( ); continue }//exécute la function 
                stettingObject[ settingName ] = settingValue || true //mémorise value ou positionne le flag
                }
            }
    ///  after setting  \\\
        try{ if ( settingOptions.after != undefined ) settingOptions.after.call( stettingObject )
            }catch ( e) { throw  new Error ("after error in settings") } 
        return stettingObject
        }///reply
        
    //______ resComlight __________// /// code from prismalide, resCom-light gitHub for details 
    function resComlight ( resourcesTypes, resources, resourceObject ){ ///décode instructions resComlight
        resourceObject = resourceObject || resources
        if ( typeof resources == 'function' ) resources = resources.toString()
        var lines = resources.split( /\/[\/|*]!-/ ).reverse()
        if ( !( resources.substr(0,2) == '//' || resources.substr(0,2) == '/*' ) ) lines.pop()
        lines.every( function( c ){
            var index = c.indexOf( ':' )
            if ( index != -1 ){
                if ( resourcesTypes[ c.substr( 0, index  )] ){ //init nouvelle ressource
                    var index2 = c.indexOf( ' ', index )
                    if ( index2 == -1 ) index2 = index
                    var index3  = c.indexOf( '\n', index )
                    if ( index3 == -1 ) index2 = index
                    if ( index2 > index3 ) index2 = index3
                    resourceObject[ c.substr( ++index , index2-index  ).trim() ] = 
                            c.substr( ++index2, (c.length-index2-( c.substr( c.length  - 1 ) == '\n'  ? 1 : 0 ) ) )
                    return true
                    }
                }
            return true    
            })
        return resourceObject
        }

    //______ Use ___________________________________\\\\\  END  /////

//====== Anonymous Launcher ========================\\\\\  END  /////

    }///closure
    )///anonyme
    ()//autoexec


//====== function_diagram ==========================////  START  \\\\

/*!-diagram:function:DOMid2js
;( ( ){
    DOMid2js() 0 {
        ()? noUi : userInterface
        noUI(){
            ()? popUp : clipBoardCopy 
            }
        setSettingOptions()r:obj:settingOptions {}
        out() r:str:all2js {}
        styleToJs() r:str:style2js {}
        exploreNode() r:str:outerNode2js{
            exploreIn( node:where , str:tabs , nodePath ) r:str:innerNode2js {}
            noFunction( node:where , str:tabs , nodePath ) r:str:innerNode2js {}
            }
        decodeInner( node:whoNode, str:tabs ) r:str:inner2js {}
        popUp( str:innerHtmlPopup ) c(){} {}
        userInterface() c:
            click:guiView()e{}
            click:guiNoView()e{}
            click:guiRemove()e{}
            {}
        copyNotify() c(){} {}
        resources(){
            html:copyNotify,
            html:popUp,
            html:gui,
            } 
        }
    htmlEncode( str:htmlString ){}    
    clipBoardCopy( node:clickArea, [fnc:startCallBack], [fnc:endCallBack] )
        e:click:click(){}
        {}
    outerHtml2node( str:outerHtmlString ) r:node: {}
    setJslight( str:fileName||settingLine, str:id, obj:settingOptions ) r:obj:settings {
        setSettings()r:obj:settings{}
        }
    resComlight( str||fnc:resources ) c(){} r:obj:resourceObject {
        resComlight( obj:lookFor, str:resources, obj:resourceObject ){}
        }
    )}()
//!-.:*/
                            
//====== function_diagram ==========================\\\\\  END  /////



//TODO: controler/valider que les innerHTML fonctionne avec toutes les balises ex: pas avec body 
//TODO: controler la fermeture des balises auto-fermantes
//TODO: possible de regrouper, dans javascript, les id en incluant un '.' ex: myGroup.oneId  
//TODO: virtual id, préfixer l'id par 'vid.' => connu uniquement par javascript

if(window != top) return;

var remove_risks=function(htmldoc){var attr="allowscriptaccess";$X("descendant-or-self::embed[@allowscriptaccess]",htmldoc).forEach(function(elm){elm.setAttribute(attr,"never")});$X("descendant-or-self::param",htmldoc).forEach(function(elm){if(!elm.getAttribute("name")||elm.getAttribute("name").toLowerCase().indexOf(attr)<0){return}elm.setAttribute("value","never");});};function filter(a,f){for(var i=a.length;i-->0;f(a[i])||a.splice(i,1));}function path_resolver(base){var top=base.match(/^https?:\/\/[^\/]+/)[0],current=base.replace(/\/[^\/]+$/,'/');return function(url){if(url.match(/^https?:\/\//)){return url}else if(url.indexOf("/")===0){return top+url}else{var result=current;if(url.indexOf(".")===0){var count=15;while(url.indexOf(".")===0&&!(--count===0)){if(url.substring(0,3)==="../")result=result.replace(/\/[^\/]+\/$/,"/");url=url.replace(/^\.+\/?/,"")}}return result+url;}}}function parse(str, url){try{var htmldoc=document.implementation.createHTMLDocument('fullfeed');var df=$CF(str);nl=df.childNodes;htmldoc.body.appendChild(df);remove_risks(htmldoc);var resolver=path_resolver(url);rel2abs(resolver,htmldoc);postFilters.forEach(function(f){try{f(htmldoc,url)}catch(e){}});return htmldoc;}catch(e){console.info(e);throw 'Parse Error';}}var $CF=(function(){var range=document.createRange();range.selectNodeContents(document.body);return function(str){return range.createContextualFragment(str);}})();function rel2abs(resolver,htmldoc){$X("descendant-or-self::a[@href]",htmldoc).forEach(function(elm){elm.setAttribute("href",resolver(elm.getAttribute("href")));});$X("descendant-or-self::*[self::img[@src] or self::embed[@src]]",htmldoc).forEach(function(elm){elm.setAttribute("src",resolver(elm.getAttribute("src")));});$X("descendant-or-self::object[@data]",htmldoc).forEach(function(elm){elm.setAttribute("data",resolver(elm.getAttribute("data")));});}
// http://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/plugin/html-sanitizer.js
{var css={'properties':(function(){var s=['|left|center|right','|top|center|bottom','#(?:[\\da-f]{3}){1,2}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|rgb\\(\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\s*,\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\s*,\\s*(?:-?\\d+|0|[+\\-]?\\d+(?:\\.\\d+)?%)\\)','[+\\-]?\\d+(?:\\.\\d+)?(?:[cem]m|ex|in|p[ctx])','\\d+(?:\\.\\d+)?(?:[cem]m|ex|in|p[ctx])','none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset','[+\\-]?\\d+(?:\\.\\d+)?%','\\d+(?:\\.\\d+)?%','url\\(\"[^()\\\\\"\\r\\n]+\"\\)','repeat-x|repeat-y|(?:repeat|space|round|no-repeat)(?:\\s+(?:repeat|space|round|no-repeat)){0,2}'],c=[RegExp('^\\s*(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,2}\\s*$','i'),RegExp('^\\s*(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,4}(?:\\s*\\/(?:\\s*(?:0|'+s[3]+'|'+s[6]+')){1,4})?\\s*$','i'),RegExp('^\\s*(?:\\s*none|(?:(?:\\s*(?:'+s[2]+')\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*inset)?|(?:\\s*inset)?\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*(?:'+s[2]+'))?)\\s*,)*(?:\\s*(?:'+s[2]+')\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*inset)?|(?:\\s*inset)?\\s+(?:0|'+s[3]+')(?:\\s*(?:0|'+s[3]+')){1,4}(?:\\s*(?:'+s[2]+'))?))\\s*$','i'),RegExp('^\\s*(?:'+s[2]+'|transparent|inherit)\\s*$','i'),RegExp('^\\s*(?:'+s[5]+'|inherit)\\s*$','i'),RegExp('^\\s*(?:thin|medium|thick|0|'+s[3]+'|inherit)\\s*$','i'),RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+'|'+s[5]+'|'+s[2]+'|transparent|inherit)(?:\\s+(?:thin|medium|thick|0|'+s[3]+')|\\s+(?:'+s[5]+')|\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent|\\s+inherit){0,2}|inherit)\\s*$','i'),/^\s*(?:none|inherit)\s*$/i,RegExp('^\\s*(?:'+s[8]+'|none|inherit)\\s*$','i'),RegExp('^\\s*(?:0|'+s[3]+'|'+s[6]+'|auto|inherit)\\s*$','i'),RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|none|inherit|auto)\\s*$','i'),RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|inherit|auto)\\s*$','i'),/^\s*(?:0(?:\.\d+)?|\.\d+|1(?:\.0+)?|inherit)\s*$/i,RegExp('^\\s*(?:(?:'+s[2]+'|invert|inherit|'+s[5]+'|thin|medium|thick|0|'+s[3]+')(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+invert|\\s+inherit|\\s+(?:'+s[5]+'|inherit)|\\s+(?:thin|medium|thick|0|'+s[3]+'|inherit)){0,2}|inherit)\\s*$','i'),RegExp('^\\s*(?:'+s[2]+'|invert|inherit)\\s*$','i'),/^\s*(?:visible|hidden|scroll|auto|no-display|no-content)\s*$/i,RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),/^\s*(?:auto|always|avoid|left|right|inherit)\s*$/i,RegExp('^\\s*(?:0|[+\\-]?\\d+(?:\\.\\d+)?m?s|'+s[6]+'|inherit)\\s*$','i'),/^\s*(?:0|[+\-]?\d+(?:\.\d+)?|inherit)\s*$/i,/^\s*(?:clip|ellipsis)\s*$/i,RegExp('^\\s*(?:normal|0|'+s[3]+'|inherit)\\s*$','i')];return{'-moz-border-radius':c[1],'-moz-border-radius-bottomleft':c[0],'-moz-border-radius-bottomright':c[0],'-moz-border-radius-topleft':c[0],'-moz-border-radius-topright':c[0],'-moz-box-shadow':c[2],'-moz-opacity':c[12],'-moz-outline':c[13],'-moz-outline-color':c[14],'-moz-outline-style':c[4],'-moz-outline-width':c[5],'-o-text-overflow':c[20],'-webkit-border-bottom-left-radius':c[0],'-webkit-border-bottom-right-radius':c[0],'-webkit-border-radius':c[1],'-webkit-border-radius-bottom-left':c[0],'-webkit-border-radius-bottom-right':c[0],'-webkit-border-radius-top-left':c[0],'-webkit-border-radius-top-right':c[0],'-webkit-border-top-left-radius':c[0],'-webkit-border-top-right-radius':c[0],'-webkit-box-shadow':c[2],'azimuth':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?(?:g?rad|deg)|(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind)(?:\s+(?:left-side|far-left|left|center-left|center|center-right|right|far-right|right-side|behind))?|leftwards|rightwards|inherit)\s*$/i,'background':RegExp('^\\s*(?:\\s*(?:'+s[8]+'|none|(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|'+s[9]+'|scroll|fixed|local|(?:border|padding|content)-box)(?:\\s*'+s[8]+'|\\s+none|(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)){1,2})(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|\\s+repeat-x|\\s+repeat-y|(?:\\s+(?:repeat|space|round|no-repeat)){1,2}|\\s+(?:scroll|fixed|local)|\\s+(?:border|padding|content)-box){0,4}\\s*,)*\\s*(?:'+s[2]+'|transparent|inherit|'+s[8]+'|none|(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|'+s[9]+'|scroll|fixed|local|(?:border|padding|content)-box)(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent|\\s+inherit|\\s*'+s[8]+'|\\s+none|(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)){1,2})(?:\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain))?|\\s*\\/\\s*(?:(?:0|'+s[4]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[4]+'|'+s[6]+'|auto)){0,2}|cover|contain)|\\s+repeat-x|\\s+repeat-y|(?:\\s+(?:repeat|space|round|no-repeat)){1,2}|\\s+(?:scroll|fixed|local)|\\s+(?:border|padding|content)-box){0,5}\\s*$','i'),'background-attachment':/^\s*(?:scroll|fixed|local)(?:\s*,\s*(?:scroll|fixed|local))*\s*$/i,'background-color':c[3],'background-image':RegExp('^\\s*(?:'+s[8]+'|none)(?:\\s*,\\s*(?:'+s[8]+'|none))*\\s*$','i'),'background-position':RegExp('^\\s*(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?)(?:\\s*,\\s*(?:(?:0|'+s[6]+'|'+s[3]+s[0]+')(?:\\s+(?:0|'+s[6]+'|'+s[3]+s[1]+'))?|(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?)(?:\\s+(?:center|(?:lef|righ)t(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?|(?:top|bottom)(?:\\s+(?:0|'+s[6]+'|'+s[3]+'))?))?))*\\s*$','i'),'background-repeat':RegExp('^\\s*(?:'+s[9]+')(?:\\s*,\\s*(?:'+s[9]+'))*\\s*$','i'),'border':RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+'|'+s[5]+'|'+s[2]+'|transparent)(?:\\s+(?:thin|medium|thick|0|'+s[3]+')|\\s+(?:'+s[5]+')|\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent){0,2}|inherit)\\s*$','i'),'border-bottom':c[6],'border-bottom-color':c[3],'border-bottom-left-radius':c[0],'border-bottom-right-radius':c[0],'border-bottom-style':c[4],'border-bottom-width':c[5],'border-collapse':/^\s*(?:collapse|separate|inherit)\s*$/i,'border-color':RegExp('^\\s*(?:(?:'+s[2]+'|transparent)(?:\\s*#(?:[\\da-f]{3}){1,2}|\\s+aqua|\\s+black|\\s+blue|\\s+fuchsia|\\s+gray|\\s+green|\\s+lime|\\s+maroon|\\s+navy|\\s+olive|\\s+orange|\\s+purple|\\s+red|\\s+silver|\\s+teal|\\s+white|\\s+yellow|\\s+rgb\\(\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\s*,\\s*(?:-?\\d+|0|'+s[6]+')\\)|\\s+transparent){0,4}|inherit)\\s*$','i'),'border-left':c[6],'border-left-color':c[3],'border-left-style':c[4],'border-left-width':c[5],'border-radius':c[1],'border-right':c[6],'border-right-color':c[3],'border-right-style':c[4],'border-right-width':c[5],'border-spacing':RegExp('^\\s*(?:(?:\\s*(?:0|'+s[3]+')){1,2}|\\s*inherit)\\s*$','i'),'border-style':RegExp('^\\s*(?:(?:'+s[5]+')(?:\\s+(?:'+s[5]+')){0,4}|inherit)\\s*$','i'),'border-top':c[6],'border-top-color':c[3],'border-top-left-radius':c[0],'border-top-right-radius':c[0],'border-top-style':c[4],'border-top-width':c[5],'border-width':RegExp('^\\s*(?:(?:thin|medium|thick|0|'+s[3]+')(?:\\s+(?:thin|medium|thick|0|'+s[3]+')){0,4}|inherit)\\s*$','i'),'bottom':c[9],'box-shadow':c[2],'caption-side':/^\s*(?:top|bottom|inherit)\s*$/i,'clear':/^\s*(?:none|left|right|both|inherit)\s*$/i,'clip':RegExp('^\\s*(?:rect\\(\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\s*,\\s*(?:0|'+s[3]+'|auto)\\)|auto|inherit)\\s*$','i'),'color':RegExp('^\\s*(?:'+s[2]+'|inherit)\\s*$','i'),'counter-increment':c[7],'counter-reset':c[7],'cue':RegExp('^\\s*(?:(?:'+s[8]+'|none|inherit)(?:\\s*'+s[8]+'|\\s+none|\\s+inherit)?|inherit)\\s*$','i'),'cue-after':c[8],'cue-before':c[8],'cursor':RegExp('^\\s*(?:(?:\\s*'+s[8]+'\\s*,)*\\s*(?:auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|progress|all-scroll|col-resize|hand|no-drop|not-allowed|row-resize|vertical-text)|\\s*inherit)\\s*$','i'),'direction':/^\s*(?:ltr|rtl|inherit)\s*$/i,'display':/^\s*(?:inline|block|list-item|run-in|inline-block|table|inline-table|table-row-group|table-header-group|table-footer-group|table-row|table-column-group|table-column|table-cell|table-caption|none|inherit|-moz-inline-box|-moz-inline-stack)\s*$/i,'elevation':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?(?:g?rad|deg)|below|level|above|higher|lower|inherit)\s*$/i,'empty-cells':/^\s*(?:show|hide|inherit)\s*$/i,'filter':RegExp('^\\s*(?:\\s*alpha\\(\\s*opacity\\s*=\\s*(?:0|'+s[6]+'|[+\\-]?\\d+(?:\\.\\d+)?)\\))+\\s*$','i'),'float':/^\s*(?:left|right|none|inherit)\s*$/i,'font':RegExp('^\\s*(?:(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)(?:\\s+(?:normal|italic|oblique|inherit|small-caps|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)){0,2}\\s+(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|'+s[4]+'|'+s[7]+'|inherit)(?:\\s*\\/\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[4]+'|'+s[7]+'|inherit))?(?:(?:\\s*\"\\w(?:[\\w-]*\\w)(?:\\s+\\w([\\w-]*\\w))*\"|\\s+(?:serif|sans-serif|cursive|fantasy|monospace))(?:\\s*,\\s*(?:\"\\w(?:[\\w-]*\\w)(?:\\s+\\w([\\w-]*\\w))*\"|serif|sans-serif|cursive|fantasy|monospace))*|\\s+inherit)|caption|icon|menu|message-box|small-caption|status-bar|inherit)\\s*$','i'),'font-family':/^\s*(?:(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace)(?:\s*,\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|serif|sans-serif|cursive|fantasy|monospace))*|inherit)\s*$/i,'font-size':RegExp('^\\s*(?:xx-small|x-small|small|medium|large|x-large|xx-large|(?:small|larg)er|0|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),'font-stretch':/^\s*(?:normal|wider|narrower|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded)\s*$/i,'font-style':/^\s*(?:normal|italic|oblique|inherit)\s*$/i,'font-variant':/^\s*(?:normal|small-caps|inherit)\s*$/i,'font-weight':/^\s*(?:normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)\s*$/i,'height':c[9],'left':c[9],'letter-spacing':c[21],'line-height':RegExp('^\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[4]+'|'+s[7]+'|inherit)\\s*$','i'),'list-style':RegExp('^\\s*(?:(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit|inside|outside|'+s[8]+')(?:\\s+(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)|\\s+(?:inside|outside|inherit)|\\s*'+s[8]+'|\\s+none|\\s+inherit){0,2}|inherit)\\s*$','i'),'list-style-image':c[8],'list-style-position':/^\s*(?:inside|outside|inherit)\s*$/i,'list-style-type':/^\s*(?:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit)\s*$/i,'margin':RegExp('^\\s*(?:(?:0|'+s[3]+'|'+s[6]+'|auto)(?:\\s+(?:0|'+s[3]+'|'+s[6]+'|auto)){0,4}|inherit)\\s*$','i'),'margin-bottom':c[9],'margin-left':c[9],'margin-right':c[9],'margin-top':c[9],'max-height':c[10],'max-width':c[10],'min-height':c[11],'min-width':c[11],'opacity':c[12],'outline':c[13],'outline-color':c[14],'outline-style':c[4],'outline-width':c[5],'overflow':/^\s*(?:visible|hidden|scroll|auto|inherit)\s*$/i,'overflow-x':c[15],'overflow-y':c[15],'padding':RegExp('^\\s*(?:(?:\\s*(?:0|'+s[4]+'|'+s[7]+')){1,4}|\\s*inherit)\\s*$','i'),'padding-bottom':c[16],'padding-left':c[16],'padding-right':c[16],'padding-top':c[16],'page-break-after':c[17],'page-break-before':c[17],'page-break-inside':/^\s*(?:avoid|auto|inherit)\s*$/i,'pause':RegExp('^\\s*(?:(?:\\s*(?:0|[+\\-]?\\d+(?:\\.\\d+)?m?s|'+s[6]+')){1,2}|\\s*inherit)\\s*$','i'),'pause-after':c[18],'pause-before':c[18],'pitch':/^\s*(?:0|\d+(?:\.\d+)?k?Hz|x-low|low|medium|high|x-high|inherit)\s*$/i,'pitch-range':c[19],'play-during':RegExp('^\\s*(?:'+s[8]+'\\s*(?:mix|repeat)(?:\\s+(?:mix|repeat))?|auto|none|inherit)\\s*$','i'),'position':/^\s*(?:static|relative|absolute|inherit)\s*$/i,'quotes':c[7],'richness':c[19],'right':c[9],'speak':/^\s*(?:normal|none|spell-out|inherit)\s*$/i,'speak-header':/^\s*(?:once|always|inherit)\s*$/i,'speak-numeral':/^\s*(?:digits|continuous|inherit)\s*$/i,'speak-punctuation':/^\s*(?:code|none|inherit)\s*$/i,'speech-rate':/^\s*(?:0|[+\-]?\d+(?:\.\d+)?|x-slow|slow|medium|fast|x-fast|faster|slower|inherit)\s*$/i,'stress':c[19],'table-layout':/^\s*(?:auto|fixed|inherit)\s*$/i,'text-align':/^\s*(?:left|right|center|justify|inherit)\s*$/i,'text-decoration':/^\s*(?:none|(?:underline|overline|line-through|blink)(?:\s+(?:underline|overline|line-through|blink)){0,3}|inherit)\s*$/i,'text-indent':RegExp('^\\s*(?:0|'+s[3]+'|'+s[6]+'|inherit)\\s*$','i'),'text-overflow':c[20],'text-shadow':c[2],'text-transform':/^\s*(?:capitalize|uppercase|lowercase|none|inherit)\s*$/i,'text-wrap':/^\s*(?:normal|unrestricted|none|suppress)\s*$/i,'top':c[9],'unicode-bidi':/^\s*(?:normal|embed|bidi-override|inherit)\s*$/i,'vertical-align':RegExp('^\\s*(?:baseline|sub|super|top|text-top|middle|bottom|text-bottom|0|'+s[6]+'|'+s[3]+'|inherit)\\s*$','i'),'visibility':/^\s*(?:visible|hidden|collapse|inherit)\s*$/i,'voice-family':/^\s*(?:(?:\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)\s*,)*\s*(?:"\w(?:[\w-]*\w)(?:\s+\w([\w-]*\w))*"|male|female|child)|\s*inherit)\s*$/i,'volume':RegExp('^\\s*(?:0|\\d+(?:\\.\\d+)?|'+s[7]+'|silent|x-soft|soft|medium|loud|x-loud|inherit)\\s*$','i'),'white-space':/^\s*(?:normal|pre|nowrap|pre-wrap|pre-line|inherit|-o-pre-wrap|-moz-pre-wrap|-pre-wrap)\s*$/i,'width':RegExp('^\\s*(?:0|'+s[4]+'|'+s[7]+'|auto|inherit)\\s*$','i'),'word-spacing':c[21],'word-wrap':/^\s*(?:normal|break-word)\s*$/i,'z-index':/^\s*(?:auto|-?\d+|inherit)\s*$/i,'zoom':RegExp('^\\s*(?:normal|0|\\d+(?:\\.\\d+)?|'+s[7]+')\\s*$','i')}})(),'alternates':{'MozBoxShadow':['boxShadow'],'WebkitBoxShadow':['boxShadow'],'float':['cssFloat','styleFloat']},'HISTORY_INSENSITIVE_STYLE_WHITELIST':{'display':true,'filter':true,'float':true,'height':true,'left':true,'opacity':true,'overflow':true,'position':true,'right':true,'top':true,'visibility':true,'width':true,'padding-left':true,'padding-right':true,'padding-top':true,'padding-bottom':true}},html,html4;html4={},html4.atype={'NONE':0,'URI':1,'URI_FRAGMENT':11,'SCRIPT':2,'STYLE':3,'ID':4,'IDREF':5,'IDREFS':6,'GLOBAL_NAME':7,'LOCAL_NAME':8,'CLASSES':9,'FRAME_TARGET':10},html4.ATTRIBS={'*::class':9,'*::dir':0,'*::id':4,'*::lang':0,'*::onclick':2,'*::ondblclick':2,'*::onkeydown':2,'*::onkeypress':2,'*::onkeyup':2,'*::onload':2,'*::onmousedown':2,'*::onmousemove':2,'*::onmouseout':2,'*::onmouseover':2,'*::onmouseup':2,'*::style':3,'*::title':0,'a::accesskey':0,'a::coords':0,'a::href':1,'a::hreflang':0,'a::name':7,'a::onblur':2,'a::onfocus':2,'a::rel':0,'a::rev':0,'a::shape':0,'a::tabindex':0,'a::target':10,'a::type':0,'area::accesskey':0,'area::alt':0,'area::coords':0,'area::href':1,'area::nohref':0,'area::onblur':2,'area::onfocus':2,'area::shape':0,'area::tabindex':0,'area::target':10,'bdo::dir':0,'blockquote::cite':1,'br::clear':0,'button::accesskey':0,'button::disabled':0,'button::name':8,'button::onblur':2,'button::onfocus':2,'button::tabindex':0,'button::type':0,'button::value':0,'caption::align':0,'col::align':0,'col::char':0,'col::charoff':0,'col::span':0,'col::valign':0,'col::width':0,'colgroup::align':0,'colgroup::char':0,'colgroup::charoff':0,'colgroup::span':0,'colgroup::valign':0,'colgroup::width':0,'del::cite':1,'del::datetime':0,'dir::compact':0,'div::align':0,'dl::compact':0,'font::color':0,'font::face':0,'font::size':0,'form::accept':0,'form::action':1,'form::autocomplete':0,'form::enctype':0,'form::method':0,'form::name':7,'form::onreset':2,'form::onsubmit':2,'form::target':10,'h1::align':0,'h2::align':0,'h3::align':0,'h4::align':0,'h5::align':0,'h6::align':0,'hr::align':0,'hr::noshade':0,'hr::size':0,'hr::width':0,'iframe::align':0,'iframe::frameborder':0,'iframe::height':0,'iframe::marginheight':0,'iframe::marginwidth':0,'iframe::width':0,'img::align':0,'img::alt':0,'img::border':0,'img::height':0,'img::hspace':0,'img::ismap':0,'img::name':7,'img::src':1,'img::usemap':11,'img::vspace':0,'img::width':0,'input::accept':0,'input::accesskey':0,'input::align':0,'input::alt':0,'input::autocomplete':0,'input::checked':0,'input::disabled':0,'input::ismap':0,'input::maxlength':0,'input::name':8,'input::onblur':2,'input::onchange':2,'input::onfocus':2,'input::onselect':2,'input::readonly':0,'input::size':0,'input::src':1,'input::tabindex':0,'input::type':0,'input::usemap':11,'input::value':0,'ins::cite':1,'ins::datetime':0,'label::accesskey':0,'label::for':5,'label::onblur':2,'label::onfocus':2,'legend::accesskey':0,'legend::align':0,'li::type':0,'li::value':0,'map::name':7,'menu::compact':0,'ol::compact':0,'ol::start':0,'ol::type':0,'optgroup::disabled':0,'optgroup::label':0,'option::disabled':0,'option::label':0,'option::selected':0,'option::value':0,'p::align':0,'pre::width':0,'q::cite':1,'select::disabled':0,'select::multiple':0,'select::name':8,'select::onblur':2,'select::onchange':2,'select::onfocus':2,'select::size':0,'select::tabindex':0,'table::align':0,'table::bgcolor':0,'table::border':0,'table::cellpadding':0,'table::cellspacing':0,'table::frame':0,'table::rules':0,'table::summary':0,'table::width':0,'tbody::align':0,'tbody::char':0,'tbody::charoff':0,'tbody::valign':0,'td::abbr':0,'td::align':0,'td::axis':0,'td::bgcolor':0,'td::char':0,'td::charoff':0,'td::colspan':0,'td::headers':6,'td::height':0,'td::nowrap':0,'td::rowspan':0,'td::scope':0,'td::valign':0,'td::width':0,'textarea::accesskey':0,'textarea::cols':0,'textarea::disabled':0,'textarea::name':8,'textarea::onblur':2,'textarea::onchange':2,'textarea::onfocus':2,'textarea::onselect':2,'textarea::readonly':0,'textarea::rows':0,'textarea::tabindex':0,'tfoot::align':0,'tfoot::char':0,'tfoot::charoff':0,'tfoot::valign':0,'th::abbr':0,'th::align':0,'th::axis':0,'th::bgcolor':0,'th::char':0,'th::charoff':0,'th::colspan':0,'th::headers':6,'th::height':0,'th::nowrap':0,'th::rowspan':0,'th::scope':0,'th::valign':0,'th::width':0,'thead::align':0,'thead::char':0,'thead::charoff':0,'thead::valign':0,'tr::align':0,'tr::bgcolor':0,'tr::char':0,'tr::charoff':0,'tr::valign':0,'ul::compact':0,'ul::type':0},html4.eflags={'OPTIONAL_ENDTAG':1,'EMPTY':2,'CDATA':4,'RCDATA':8,'UNSAFE':16,'FOLDABLE':32,'SCRIPT':64,'STYLE':128},html4.ELEMENTS={'a':0,'abbr':0,'acronym':0,'address':0,'applet':16,'area':2,'b':0,'base':18,'basefont':18,'bdo':0,'big':0,'blockquote':0,'body':49,'br':2,'button':0,'caption':0,'center':0,'cite':0,'code':0,'col':2,'colgroup':1,'dd':1,'del':0,'dfn':0,'dir':0,'div':0,'dl':0,'dt':1,'em':0,'fieldset':0,'font':0,'form':0,'frame':18,'frameset':16,'h1':0,'h2':0,'h3':0,'h4':0,'h5':0,'h6':0,'head':49,'hr':2,'html':49,'i':0,'iframe':4,'img':2,'input':2,'ins':0,'isindex':18,'kbd':0,'label':0,'legend':0,'li':1,'link':18,'map':0,'menu':0,'meta':18,'noframes':20,'noscript':20,'object':16,'ol':0,'optgroup':0,'option':1,'p':1,'param':18,'pre':0,'q':0,'s':0,'samp':0,'script':84,'select':0,'small':0,'span':0,'strike':0,'strong':0,'style':148,'sub':0,'sup':0,'table':0,'tbody':1,'td':1,'textarea':8,'tfoot':1,'th':1,'thead':1,'title':24,'tr':1,'tt':0,'u':0,'ul':0,'var':0},html=(function(){varENTITIES,INSIDE_TAG_TOKEN,OUTSIDE_TAG_TOKEN,ampRe,decimalEscapeRe,entityRe,eqRe,gtRe,hexEscapeRe,lcase,looseAmpRe,ltRe,nulRe,quotRe;'script'==='SCRIPT'.toLowerCase()?(lcase=function(s){return s.toLowerCase()}):(lcase=function(s){return s.replace(/[A-Z]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)|32)})}),ENTITIES={'lt':'<','gt':'>','amp':'&','nbsp':'\xa0','quot':'\"','apos':'\''},decimalEscapeRe=/^#(\d+)$/,hexEscapeRe=/^#x([0-9A-Fa-f]+)$/;functionlookupEntity(name){var m;return name=lcase(name),ENTITIES.hasOwnProperty(name)?ENTITIES[name]:(m=name.match(decimalEscapeRe),m?String.fromCharCode(parseInt(m[1],10)):(m=name.match(hexEscapeRe))?String.fromCharCode(parseInt(m[1],16)):'')}functiondecodeOneEntity(_,name){return lookupEntity(name)}nulRe=/\0/g;function stripNULs(s){return s.replace(nulRe,'')}entityRe=/&(#\d+|#x[0-9A-Fa-f]+|\w+);/g;functionunescapeEntities(s){return s.replace(entityRe,decodeOneEntity)}ampRe=/&/g,looseAmpRe=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,ltRe=/</g,gtRe=/>/g,quotRe=/\"/g,eqRe=/\=/g;functionescapeAttrib(s){return s.replace(ampRe,'&amp;').replace(ltRe,'&lt;').replace(gtRe,'&gt;').replace(quotRe,'&#34;').replace(eqRe,'&#61;')}functionnormalizeRCData(rcdata){return rcdata.replace(looseAmpRe,'&amp;$1').replace(ltRe,'&lt;').replace(gtRe,'&gt;')}INSIDE_TAG_TOKEN=newRegExp('^\\s*(?:(?:([a-z][a-z-]*)(\\s*=\\s*(\"[^\"]*\"|\'[^\']*\'|(?=[a-z][a-z-]*\\s*=)|[^>\"\'\\s]*))?)|(/?>)|.[^a-z\\s>]*)','i'),OUTSIDE_TAG_TOKEN=newRegExp('^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!\\w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&>]+)|([<&>]))','i');functionmakeSaxParser(handler){return function parse(htmlText,param){var attribName,attribs,dataEnd,decodedValue,eflags,encodedValue,htmlLower,inTag,m,openTag,tagName;htmlText=String(htmlText),htmlLower=null,inTag=false,attribs=[],tagName=void0,eflags=void 0,openTag=void 0,handler.startDoc&&handler.startDoc(param);while(htmlText){m=htmlText.match(inTag?INSIDE_TAG_TOKEN:OUTSIDE_TAG_TOKEN),htmlText=htmlText.substring(m[0].length);if(inTag){if(m[1]){attribName=lcase(m[1]);if(m[2]){encodedValue=m[3];switch(encodedValue.charCodeAt(0)){case34:case 39:encodedValue=encodedValue.substring(1,encodedValue.length-1)}decodedValue=unescapeEntities(stripNULs(encodedValue))}elsedecodedValue=attribName;attribs.push(attribName,decodedValue)}else if(m[4])eflags!==void0&&(openTag?handler.startTag&&handler.startTag(tagName,attribs,param):handler.endTag&&handler.endTag(tagName,param)),openTag&&eflags&(html4.eflags.CDATA|html4 .eflags.RCDATA)&&(htmlLower===null?(htmlLower=lcase(htmlText)):(htmlLower=htmlLower.substring(htmlLower.length-htmlText.length)),dataEnd=htmlLower.indexOf('</'+tagName),dataEnd<0&&(dataEnd=htmlText.length),eflags&html4.eflags.CDATA?handler.cdata&&handler.cdata(htmlText.substring(0,dataEnd),param):handler.rcdata&&handler.rcdata(normalizeRCData(htmlText.substring(0,dataEnd)),param),htmlText=htmlText.substring(dataEnd)),tagName=eflags=openTag=void0,attribs.length=0,inTag=false}else if(m[1])handler.pcdata&&handler.pcdata(m[0],param);elseif(m[3])openTag=!m[2],inTag=true,tagName=lcase(m[3]),eflags=html4 .ELEMENTS.hasOwnProperty(tagName)?html4.ELEMENTS[tagName]:void 0;else if(m[4])handler.pcdata&&handler.pcdata(m[4],param);elseif(m[5]){if(handler.pcdata)switch(m[5]){case'<':handler.pcdata('&lt;',param);break;case'>':handler.pcdata('&gt;',param);break;default:handler.pcdata('&amp;',param)}}}handler.endDoc&&handler.endDoc(param)}}return{'normalizeRCData':normalizeRCData,'escapeAttrib':escapeAttrib,'unescapeEntities':unescapeEntities,'makeSaxParser':makeSaxParser}})(),html.makeHtmlSanitizer=function(sanitizeAttributes){varignoring,stack;return html.makeSaxParser({'startDoc':function(_){stack=[],ignoring=false},'startTag':function(tagName,attribs,out){varattribName,eflags,i,n,value;if(ignoring)return;if(!html4 .ELEMENTS.hasOwnProperty(tagName))return;eflags=html4.ELEMENTS[tagName];if(eflags&html4 .eflags.FOLDABLE)return;else if(eflags&html4 .eflags.UNSAFE)return ignoring=!(eflags&html4.eflags.EMPTY),void 0;attribs=sanitizeAttributes(tagName,attribs);if(attribs){eflags&html4.eflags.EMPTY||stack.push(tagName),out.push('<',tagName);for(i=0,n=attribs.length;i<n;i+=2)attribName=attribs[i],value=attribs[i+1],value!==null&&value!==void0&&out.push(' ',attribName,'=\"',html.escapeAttrib(value),'\"');out.push('>')}},'endTag':function(tagName,out){vareflags,i,index,stackEl;if(ignoring)return ignoring=false,void 0;if(!html4 .ELEMENTS.hasOwnProperty(tagName))return;eflags=html4.ELEMENTS[tagName];if(!(eflags&(html4 .eflags.UNSAFE|html4 .eflags.EMPTY|html4 .eflags.FOLDABLE))){if(eflags&html4.eflags.OPTIONAL_ENDTAG)for(index=stack.length;--index>=0;){stackEl=stack[index];if(stackEl===tagName)break;if(!(html4.ELEMENTS[stackEl]&html4 .eflags.OPTIONAL_ENDTAG))return}else for(index=stack.length;--index>=0;)if(stack[index]===tagName)break;if(index<0)return;for(i=stack.length;--i>index;)stackEl=stack[i],html4.ELEMENTS[stackEl]&html4 .eflags.OPTIONAL_ENDTAG||out.push('</',stackEl,'>');stack.length=index,out.push('</',tagName,'>')}},'pcdata':function(text,out){ignoring||out.push(text)},'rcdata':function(text,out){ignoring||out.push(text)},'cdata':function(text,out){ignoring||out.push(text)},'endDoc':function(out){vari;for(i=stack.length;--i>=0;)out.push('</',stack[i],'>');stack.length=0}})};functionhtml_sanitize(htmlText,opt_uriPolicy,opt_nmTokenPolicy){var out=[];return html.makeHtmlSanitizer(functionsanitizeAttribs(tagName,attribs){var attribKey,attribName,atype,i,value;for(i=0;i<attribs.length;i+=2){attribName=attribs[i],value=attribs[i+1],atype=null,((attribKey=tagName+'::'+attribName,html4.ATTRIBS.hasOwnProperty(attribKey))||(attribKey='*::'+attribName,html4 .ATTRIBS.hasOwnProperty(attribKey)))&&(atype=html4.ATTRIBS[attribKey]);if(atype!==null)switch(atype){case html4 .atype.NONE:break;casehtml4 .atype.SCRIPT:case html4 .atype.STYLE:value=null;break;case html4 .atype.ID:casehtml4 .atype.IDREF:case html4 .atype.IDREFS:case html4 .atype.GLOBAL_NAME:case html4.atype.LOCAL_NAME:case html4 .atype.CLASSES:value=opt_nmTokenPolicy?opt_nmTokenPolicy(value):value;break;casehtml4 .atype.URI:value=opt_uriPolicy&&opt_uriPolicy(value);break;case html4 .atype.URI_FRAGMENT:value&&'#'===value.charAt(0)?(value=opt_nmTokenPolicy?opt_nmTokenPolicy(value):value,value&&(value='#'+value)):(value=null);break;default:value=null}elsevalue=null;attribs[i+1]=value}return attribs})(htmlText,out),out.join('')}}

function message(msg){
  document.getElementById("entries-status").textContent = msg
}

var siteinfos = [];
var lastItem = {};
var autoLoad = false;
var preFilters = [
  (function(doc, url) {
    url = url.replace(/#/g, '%23');
    icon = document.createElement('span');
    icon.innerHTML = '<a href="http://b.hatena.ne.jp/entry/' + url + '" title="Hatena Bookmark" target="_blank">'
        + '<img src="http://b.hatena.ne.jp/entry/image/' + url + '" class="hatena-bookmark-counter"/>'
        + '</a>';
    var grff = document.getElementById('grff-icon');
    grff.insertBefore(icon, grff.firstChild);
  })
], postFilters = [
  (function(doc, url) {
    var anchors = $X('descendant-or-self::a', doc);
    if (anchors) {
      anchors.forEach(function(i) {
        i.target = '_blank';
      });
    }
  })
];

var port = chrome.extension.connect();
var task = {}

task["update-siteinfo"] = function(data){
  message("Fetching siteinfos : ...");
  port.postMessage({task: 'siteinfo'});
};

task["siteinfo"] = function(data){
  if(data.result){
    message("Fetching siteinfos : Done");
    siteinfos = data.content;
  }else{
    message("Fetching siteinfos : Failed(" + data.reason + ")")
  }
};

task["expand"] = function(data){
  if(data.result){
    message("Expanding URL : Done");
    var exp = 'id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]';
    $X(exp)[0].href = data.content;
  } else {
    message("Expanding URL : Failed(" + data.reason + ")")
  }
}

task["fullfeed"] = function(data){
  if (data.result){
    message("Fetching full story : Done");
    var text = data.content;
    text = html_sanitize(text, function(u){if(/^(?:https?:\/\/|\.|\/)/.test(u))return u}, function(d){return d});
    /*
    text = text.replace(/(<[^>]+?[\s"'])on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi, "$1");
    text = text.replace(/<iframe(?:\s[^>]+?)?>[\S\s]*?<\/iframe\s*>/gi, "");
    */
    var htmldoc = parse(text, data.url);
    var exp = 'id("current-entry")//div[contains(concat(" ", @class, " "), " entry-body ")]';
    var body = $X(exp)[0];
    while(body.firstChild){ body.removeChild(body.firstChild) }
    var entry = $X(lastItem.siteinfo.xpath, htmldoc);
    var content = document.createDocumentFragment();
    entry.map(function(i) {
      try{
        i = document.adoptNode(i, true);
      }catch(e){
        i = document.importNode(i, true);
      }
      content.appendChild(i);
    });
    body.appendChild(content);
  }else{
    message("Fetching full story : Failed(" + data.reason + ")")
  }
  var e = $X('id("current-entry")//div[contains(concat(" ", @class, " "), " entry-body ")]')[0];
  e.className = e.className.replace(/ fullfeed-loading /g, '');
};

port.onMessage.addListener(function(data){
  try {
    task[data.task].call(data, data)
  } catch(e) {
    message("Failed to task : " + JSON.stringify(data));
  }
});

function request_full_story() {
  message("Fetching full story : ...");
  $X('id("current-entry")//div[contains(concat(" ", @class, " "), " entry-body ")]')[0].className += ' fullfeed-loading ';
  port.postMessage({task: 'fullfeed', url: lastItem.url});
}

function request_update_siteinfo() {
  message("Fetching siteinfos : ......");
  port.postMessage({task: 'siteinfo'});
}

var timer = setTimeout(function() {
  if (timer) clearTimeout(timer);
  try {
    var exp = 'id("current-entry")//div[contains(concat(" ", @class, " "), " entry-body ")]';
    if ($X(exp).length == 0) {
      lastItem.url = '';
      throw "nothing to do...";
    }

    exp = 'id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]';
    var url =  $X(exp)[0].href;
    if (lastItem.url == url) throw "nothing to do..."
    lastItem.url = url;

    [
      /^http:\/\/www\.pheedo\.jp\/click\.phdo\?/,
      /^http:\/\/feedproxy\.google\.com\/\~r\//,
    ].forEach(function(i) {
      if (url.match(i)) {
        message("Exapding URL : ...");
        port.postMessage({task: 'expand', url: url});
        throw "nothing to do...";
      }
    });

    var icon = document.getElementById('grff-icon');
    if (icon) icon.parentNode.removeChild(icon);
    for (var n = 0; n < siteinfos.length; n++) {
      if ((new RegExp(siteinfos[n].url)).test(url)) {
        icon = document.createElement('span');
        icon.id = 'grff-icon';
        icon.title = "ready to fetch full entry";
        icon.innerHTML = '<img src="' + chrome.extension.getURL('btn.png') +
          '" class="fullfeed-btn"/>';
        icon.addEventListener('click', request_full_story, false);
        var container = $X('id("current-entry")//div[contains(concat(" ", @class, " "), " entry-container ")]//div[contains(concat(" ", @class, " "), " entry-main ")]')[0];
        container.appendChild(icon);
        lastItem.siteinfo = siteinfos[n];
        if (autoLoad) request_full_story();
        var entry = $X('id("current-entry")')[0];
        preFilters.forEach(function(f) { try{ f(entry, url) }catch(e){  } });
        break;
      }
    }
  } catch(e) {}
  timer = setTimeout(arguments.callee, 200);
});

setTimeout(function() {
  message("Fetching siteinfos : ...");
  port.postMessage({task: 'siteinfo'});
  if(!!document["listenerAdded"]){ return }
  document.addEventListener('keydown', function(e){
    if(e.target.tagName.toLowerCase() == "input" || e.target.tagName.toLowerCase() == "textarea"){
      return
    }else if(e.keyCode == 188){
      // "," "<"
      var c = document.getElementById("entries");
      c.scrollTop = c.scrollTop - 100;
    }else if(e.keyCode == 190){
      // "." ">"
      var c = document.getElementById("entries");
      c.scrollTop = c.scrollTop + 100;
    }else if(e.shiftKey && e.keyCode == 86) {
      // Shift + V
      var exp = 'id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]';
      var url =  $X(exp)[0].href;
      port.postMessage({task: "open", url: url});
    }else if(e.keyCode == 90) {
      // Z
      if(e.ctrlKey){
        autoLoad = !autoLoad;
        message('AutoLoad : ' + (autoLoad ? 'on' : 'off'));
      }else if(e.shiftKey){
        request_update_siteinfo();
      }else{
        var exp = 'id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]';
        var url =  $X(exp)[0].href;
        if (!document.getElementById('grff-icon')) return;
        request_full_story();
      }
    }else{
      return;
    }
    e.preventDefault();
  }, false);
  document["listenerAdded"] = true;
}, 500);


// simple version of $X
// $X(exp);
// $X(exp, context);
// @source http://gist.github.com/3242.txt
// @author id:os0x
function $X (exp, context) {
  context || (context = document);
  var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
    return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
      context.namespaceURI || document.documentElement.namespaceURI || "";
  });

  var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
      // not ensure the order.
      var ret = [], i = null;
      while (i = result.iterateNext()) ret.push(i);
      return ret;
  }
  return null;
}

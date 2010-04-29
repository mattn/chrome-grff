if(window != top) return;

// --BlackBox--
var remove_risks=function(htmldoc){var attr="allowscriptaccess";$X("descendant-or-self::embed[@allowscriptaccess]",htmldoc).forEach(function(elm){elm.setAttribute(attr,"never")});$X("descendant-or-self::param",htmldoc).forEach(function(elm){if(!elm.getAttribute("name")||elm.getAttribute("name").toLowerCase().indexOf(attr)<0){return}elm.setAttribute("value","never");});};function filter(a,f){for(var i=a.length;i-->0;f(a[i])||a.splice(i,1));}function path_resolver(base){var top=base.match(/^https?:\/\/[^\/]+/)[0],current=base.replace(/\/[^\/]+$/,'/');return function(url){if(url.match(/^https?:\/\//)){return url}else if(url.indexOf("/")===0){return top+url}else{var result=current;if(url.indexOf(".")===0){var count=15;while(url.indexOf(".")===0&&!(--count===0)){if(url.substring(0,3)==="../")result=result.replace(/\/[^\/]+\/$/,"/");url=url.replace(/^\.+\/?/,"")}}return result+url;}}}function parse(str, url){try{var htmldoc=document.implementation.createHTMLDocument('fullfeed');var df=$CF(str);nl=df.childNodes;htmldoc.body.appendChild(df);remove_risks(htmldoc);var resolver=path_resolver(url);rel2abs(resolver,htmldoc);postFilters.forEach(function(f){try{f(htmldoc,url)}catch(e){}});return htmldoc;}catch(e){console.info(e);throw 'Parse Error';}}var $CF=(function(){var range=document.createRange();range.selectNodeContents(document.body);return function(str){return range.createContextualFragment(str);}})();function rel2abs(resolver,htmldoc){$X("descendant-or-self::a[@href]",htmldoc).forEach(function(elm){elm.setAttribute("href",resolver(elm.getAttribute("href")));});$X("descendant-or-self::*[self::img[@src] or self::embed[@src]]",htmldoc).forEach(function(elm){elm.setAttribute("src",resolver(elm.getAttribute("src")));});$X("descendant-or-self::object[@data]",htmldoc).forEach(function(elm){elm.setAttribute("data",resolver(elm.getAttribute("data")));});}
// --/BlackBox--

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
    icon.innerHTML = '<img src="http://b.hatena.ne.jp/entry/image/' + url +
      '" class="hatena-bookmark-counter"/>'
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
    text = text.replace(/(<[^>]+?[\s"'])on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi, "$1");
    text = text.replace(/<iframe(?:\s[^>]+?)?>[\S\s]*?<\/iframe\s*>/gi, "");
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
        icon.innerHTML = '<img src="' + chrome.extension.getURL('btn.gif') +
          '" class="fullfeed-btn"/>';
        icon.addEventListener('click', request_full_story, false);
        var container = $X('id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]')[0].parentNode;
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

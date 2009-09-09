if (window != top) return;

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

function rel2abs(resolver, htmldoc){
  $X("descendant-or-self::a[@href]", htmldoc)
    .forEach(function(elm) {
    elm.setAttribute("href", resolver(elm.getAttribute("href")));
  });
  $X("descendant-or-self::*[self::img[@src] or self::embed[@src]]", htmldoc)
    .forEach(function(elm) {
    elm.setAttribute("src", resolver(elm.getAttribute("src")));
  });
  $X("descendant-or-self::object[@data]", htmldoc)
    .forEach(function(elm) {
    elm.setAttribute("data", resolver(elm.getAttribute("data")));
  });
}

var remove_risks = function(htmldoc){
  var attr = "allowscriptaccess";
  $X("descendant-or-self::embed[@allowscriptaccess]", htmldoc)
    .forEach(function(elm){
    elm.setAttribute(attr, "never");
  });
  $X("descendant-or-self::param", htmldoc)
    .forEach(function(elm){
    if(!elm.getAttribute("name") || elm.getAttribute("name").toLowerCase().indexOf(attr) < 0) return;
    elm.setAttribute("value", "never");
  });
}

function filter(a, f) {
  for (var i = a.length; i --> 0; f(a[i]) || a.splice(i, 1));
}

function parse(str, url) {
  try {
    var htmldoc = document.implementation.createHTMLDocument('fullfeed');
    var df = $CF(str);
    nl = df.childNodes;
    htmldoc.body.appendChild(df);
    remove_risks(htmldoc);
    var resolver = path_resolver(url);
    rel2abs(resolver, htmldoc);
    postFilters.forEach(function(f) { try { f(htmldoc, url) } catch(e) {} });
    return htmldoc;
  } catch(e) {
    console.info(e);
    throw 'Parse Error';
  }
}

function path_resolver(base) {
  var top = base.match(/^https?:\/\/[^\/]+/)[0];
  var current = base.replace(/\/[^\/]+$/, '/');
  return function(url){
    if (url.match(/^https?:\/\//)) {
      return url;
    } else if (url.indexOf("/") === 0) {
      return top + url;
    } else {
      var result = current;
      if(url.indexOf(".") === 0){
        var count = 15;// ñ≥å¿ÉãÅ[Évñhé~óp. 15âÒÇ‡../Ç‚./égÇ¡ÇƒÇÈURLÇÕÇ≥Ç∑Ç™Ç…Ç»Ç¢ÇæÇÎÇ∆Ç¢Ç§Ç±Ç∆Ç≈.
        while(url.indexOf(".") === 0 && !(--count === 0)){
          if(url.substring(0, 3) === "../")
            result = result.replace(/\/[^\/]+\/$/,"/");
          url = url.replace(/^\.+\/?/,"")
        }
      }
      return result + url;
    }
  }
}

var $CF = (function(){
  var range = document.createRange();
  range.selectNodeContents(document.body);
  return function(str){
    return range.createContextualFragment(str);
  }
})();

// copied from LDRize (c) id:snj14
function addStyle(css,id) { // GM_addStyle is slow
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'data:text/css,' + escape(css);
  document.body.appendChild(link);
}

var FlashMessage = new function(){
  addStyle([
    '#FLASH_MESSAGE{',
      'position : fixed;',
      'font-size : 200%;',
      'z-index : 10000;',
      'padding : 20px 50px 20px 50px;',
      'left : 50%;',
      'top : 50%;',
      'margin : -1em;',
      'background-color : #444;',
      'color : #FFF;',
      '-webkit-border-radius: 0.3em;',
      'min-width : 1em;',
      'text-align : center;',
    '} '
  ].join(''))
  var opacity = 0.9;
  var flash = document.createElement('div');
  flash.id = 'FLASH_MESSAGE';
  hide(flash);
  document.body.appendChild(flash);
  var canceler;
  this.showFlashMessageWindow = function (string, duration) {
    duration = duration || 400;
    canceler && canceler();
    flash.innerHTML = string;
    flash.style.opacity = opacity;
    show(flash);
    flash.style.marginLeft = (-(flash.offsetWidth/2))+'px';

    canceler = callLater(function(){
      canceler = tween(function(value){
        flash.style.opacity = opacity * (1-value);
      }, 100, 5);
    }, duration);
  };

  // ----[Utility]-------------------------------------------------
  function callLater(callback, interval){
    var timeoutId = setTimeout(callback, interval);
    return function(){
      clearTimeout(timeoutId)
    }
  }
  function tween(callback, span, count){
    count = (count || 20);
    var interval = span / count;
    var value = 0;
    var calls = 0;
    var intervalId = setInterval(function(){
      callback(calls / count);

      if(count == calls){
        canceler();
        return;
      }
      calls++;
    }, interval);
    var canceler = function(){
      clearInterval(intervalId)
      hide(flash)
    }
    return canceler;
  }
  function hide(target){
    target.style.display='none';
  }
  function show(target, style){
    target.style.display=(style || '');
  }
};

function message (mes){
  FlashMessage.showFlashMessageWindow(mes, 1000);
}

var siteinfos = [];
var lastItem = {};
var autoLoad = false;
var preFilters = [
  (function(doc, url) {
    var container = $X('id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]')[0].parentNode;
    icon = document.createElement('span');
    icon.innerHTML = ''
      + '&nbsp;<img src="http://b.hatena.ne.jp/entry/image/' + url.replace(/#/g, '%23') + '" title="\u306f\u3066\u306a\u30d6\u30c3\u30af\u30de\u30fc\u30af"/>'
      + '&nbsp;<img src="http://image.clip.livedoor.com/counter/' + url.replace(/#/g, '%23') + '" title="livedoor \u30af\u30ea\u30c3\u30d7"/>'
    container.appendChild(icon);
  })
];
var postFilters = [
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
port.onMessage.addListener(function(data) {
  try {
    switch (data.task) {
    case "update-siteinfo":
      {
        message("fetching siteinfos: ...");
        port.postMessage({'task': 'siteinfo'});
      }
      break;
    case "siteinfo":
      {
        if (!data.result) return message("fetching siteinfos: failed(" + data.reason + ")");
        message("fetching siteinfos: done");
        siteinfos = data.content;
      }
      break;
    case "fullfeed":
      {
        if (!data.result) return message("fetching full story: failed(" + data.reason + ")");
        message("fetching full story: done");
        var text = data.content;
        text = text.replace(/(<[^>]+?[\s"'])on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi, "$1");
        text = text.replace(/<iframe(?:\s[^>]+?)?>[\S\s]*?<\/iframe\s*>/gi, "");
        var htmldoc = parse(text, data.url);
        var exp = 'id("current-entry")//div[contains(concat(" ", @class, " "), " entry-body ")]';
        var body = $X(exp)[0]
        while (body.firstChild) body.removeChild(body.firstChild);
        var entry = $X(lastItem.siteinfo.xpath, htmldoc);
        var content = document.createDocumentFragment();
        entry.map(function(i) {
          try {
            i = document.adoptNode(i, true);
          } catch (e) {
            i = document.importNode(i, true);
          }
          content.appendChild(i);
        });
        body.appendChild(content);
      }
      break;
    }
  } catch(e) {
    message("failed to task: " + data.task);
  }
});

function request_full_story() {
  message("fetching full story: ...");
  port.postMessage({'task': 'fullfeed', 'url': lastItem.url});
}

function request_update_siteinfo() {
  message("fetching siteinfos: ...");
  port.postMessage({'task': 'siteinfo'});
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

    for (var n = 0; n < siteinfos.length; n++) {
      if ((new RegExp(siteinfos[n].url)).test(url)) {
        var icon = document.createElement('span');
        icon.title = "ready to fetch full entry";
        icon.innerHTML = '<img src="' + chrome.extension.getURL('google_reader_full_feed.gif') + '" style="cursor: pointer;"/>';
        icon.addEventListener('click', request_full_story, false);
        icon.id = 'grff-icon';
        var container = $X('id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]')[0].parentNode;
        container.appendChild(document.createTextNode(' '));
        container.appendChild(icon);
        lastItem.siteinfo = siteinfos[n];
        if (autoLoad) request_full_story();
        var entry = $X('id("current-entry")')[0];
        preFilters.forEach(function(f) { try { f(entry, url) } catch(e) {} });
        break;
      }
    }
  } catch(e) {}
  timer = setTimeout(arguments.callee, 200);
});

setTimeout(function() {
  message("fetching siteinfos: ...");
  port.postMessage({'task': 'siteinfo'});
  document.addEventListener('keyup', function(e) {
    if (e.keyCode == 90/* z */) {
      if (e.ctrlKey) {
        autoLoad = !autoLoad;
        message('AutoLoad: ' + (autoLoad ? 'on' : 'off'));
      } else
      if (e.shiftKey) {
        request_update_siteinfo();
      } else {
        var exp = 'id("current-entry")//a[contains(concat(" ", @class, " "), " entry-title-link ")]';
        var url =  $X(exp)[0].href;
        if (!document.getElementById('grff-icon')) return;
        request_full_story();
      }
    }
  }, false);
}, 500);


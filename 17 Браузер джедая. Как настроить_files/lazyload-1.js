var lzld="03022001";function t_lazyload_update(){"undefined"!=typeof lazyload_cover&&lazyload_cover.update(),"undefined"!=typeof lazyload_img&&lazyload_img.update(),"undefined"!=typeof lazyload_bgimg&&lazyload_bgimg.update(),"undefined"!=typeof lazyload_iframe&&lazyload_iframe.update()}function t_lazyload_getResizeUrl(t,e,o,i,a,n,l,r){if("undefined"==o||null==o)return o;if(0<o.indexOf(".svg")||0<o.indexOf(".gif")||0<o.indexOf(".ico")||-1===o.indexOf("static.tildacdn.com")||0<o.indexOf("-/empty/")||0<o.indexOf("-/resizeb/"))return o;if(-1<o.indexOf("/-/"))return o;if(0==i&&0==a)return o;if("y"==window.lazy_err)return o;if(-1<o.indexOf("lib"))return o;if("IMG"!=t&&"DIV"!=t&&"TD"!=t&&"A"!=t)return o;var s;if(1<window.devicePixelRatio&&window.t_lazyload_domloaded<2500&&(0<i&&(i=parseInt(2*i)),0<a&&(a=parseInt(2*a))),1e3<i||1800<a)return d=t_lazyload_getWebPUrl(o);if("resize"==e){(s=o.split("/")).splice(o.split("/").length-1,0,"-/resize/"+i+"x"+("DIV"==t&&0<a?a:"")+"/"+("y"==window.lazy_webp?"-/format/webp":""));var d=s.join("/").replace("/static.tildacdn.com","/thumb.tildacdn.com")}else{if(!(0<i&&0<a))return o;"left"==n||"right"==n||(n="center"),"top"==l||"bottom"==l||(l="center"),(s=o.split("/")).splice(o.split("/").length-1,0,"-/"+e+"/"+i+"x"+a+"/"+n+"/"+l+"/"+("y"==window.lazy_webp?"-/format/webp":""));d=s.join("/").replace("/static.tildacdn.com","/thumb.tildacdn.com")}return d}function t_lazyload_round(t,e,o,i){var a;return"cover"==t&&0<e&&0<o?(a=e/o)<=(t=1)?(a<=.8&&(t=.8),a<=.751&&(t=.75),a<=.667&&(t=.667),a<=.563&&(t=.562),a<=.501&&(t=.5),o=Math.ceil(o/i)*i,e=Math.ceil(o*t),e=10*Math.ceil(e/10)):(1.25<=a&&(t=1.25),1.332<=a&&(t=1.333),1.5<=a&&(t=1.5),1.777<=a&&(t=1.777),2<=a&&(t=2),e=Math.ceil(e/i)*i,o=Math.ceil(e/t),o=10*Math.ceil(o/10)):(0<e&&(e=Math.ceil(e/i)*i),0<o&&(o=Math.ceil(o/i)*i)),[e,o]}function t_lazyload_reloadonError(t,i,e){if(void 0!==i&&null!=i&&""!=i&&-1!==i.indexOf("https://thumb.tildacdn.com")&&-1!==i.indexOf("/-/")){var a=1<e?Date.now()-e:"",o=i.split("/"),n="",l="";if(3<o.length)for(var r=0;r<o.length;r++)""!=o[r]&&("til"==o[r].substring(0,3)&&36==o[r].length&&4==(o[r].match(/-/g)||[]).length&&(n=o[r]),r==o.length-1&&(l=o[r]));""!=n&&""!=l&&(e="https://static3.tildacdn.com/"+n+"/"+l,console.log("try reload:"+e),"IMG"===t.tagName?e&&t.setAttribute("src",e):e&&(t.style.backgroundImage="url("+e+")"));try{$.ajax({method:"POST",url:"https://sysstat.tildacdn.com/api/img/error/",data:{url:i,time:a,details:'{domloaded:"'+window.t_lazyload_domloaded+'"}'}});var s=Date.now();$.ajax({method:"HEAD",url:i,error:function(t,e,o){t="{ts:"+(Date.now()-s)+',status:"'+t.status+'",textstatus:"'+e+'",responsetext:"'+t.responseText+'",domloaded:"'+window.t_lazyload_domloaded+'",readystate:"'+t.readyState+'"}';$.ajax({method:"POST",url:"https://sysstat.tildacdn.com/api/img/detailederror/",data:{url:i,time:a,details:t}})},timeout:1e4})}catch(t){console.log(t)}}}function t_lazyload_getWebPUrl(t){if("undefined"==t||null==t)return t;if(0<t.indexOf(".svg")||0<t.indexOf(".gif")||0<t.indexOf(".ico")||-1===t.indexOf("static.tildacdn.com")||0<t.indexOf("-/empty/")||0<t.indexOf("-/resizeb/"))return t;if(-1<t.indexOf("/-/"))return t;if(-1<t.indexOf("lib"))return t;if("y"!=window.lazy_webp)return t;if("y"==window.lazy_err)return t;var e=t.split("/");return e.splice(t.split("/").length-1,0,"-/format/webp"),e.join("/").replace("/static.tildacdn.com","/thumb.tildacdn.com")}function t_lazyload_onWindowResize(){$(".t-cover__carrier, .t-bgimg, .t-img").each(function(){window.t_lazyload_updateResize_elem($(this))})}function t_lazyload_detectwebp(){var t=new Image;t.onload=t.onerror=function(){2!=t.height?console.log("no webp support"):window.lazy_webp="y"},t.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"}!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.LazyLoad=e()}(this,function(){var e,a,n,o,i=!1;function l(t,e,o){var i;a?t.addEventListener(e,o):n&&(t.attachEvent("on"+e,(i=t,function(){o.call(i,window.event)})),t=null)}function r(t,e,o){a?t.removeEventListener(e,o):n&&t.detachEvent("on"+e,o)}function s(t,e,o){var i,a,n;function l(){return window.innerWidth||i.documentElement.clientWidth||document.body.clientWidth}function r(t){return t.getBoundingClientRect().top+a-i.documentElement.clientTop}function s(t){return t.getBoundingClientRect().left+n-i.documentElement.clientLeft}return!0!==window.flag_performance_pass3000&&"object"==typeof performance&&performance.now()<3e3?o=300:window.flag_performance_pass3000=!0,i=t.ownerDocument,a=window.pageYOffset||i.body.scrollTop,n=window.pageXOffset||i.body.scrollLeft,"fixed"===t.getAttribute("data-content-cover-parallax")&&t.closest&&t.closest(".t-cover__container")&&(t=t.closest(".t-cover__container")),!((e===window?(window.innerHeight||i.documentElement.clientHeight||document.body.clientHeight)+a:r(e)+e.offsetHeight)<=r(t)-o||(e===window?a:r(e))>=r(t)+o+t.offsetHeight||(e===window?l()+window.pageXOffset:s(e)+l())<=s(t)-o||(e===window?n:s(e))>=s(t)+o+t.offsetWidth)}function d(){return(new Date).getTime()}function c(t,e){o?t.classList.add(e):t.className+=(t.className?" ":"")+e}function x(t,e){o?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}function u(t,e,o,i){var a=e.getAttribute("data-"+i);if(null!=a){var n=e.clientWidth,l=e.clientHeight,r=$(e);!r.hasClass("t-slds__bgimg")&&!r.hasClass("t-slds__img")||r.hasClass("t827__image")||(0==(c=r.parents(".t-slds__container")).length&&(c=r.parents(".t-slds__thumbsbullet").length),c.length&&(n=c.width(),l=c.height()));var s,d="",i="",c="",x="",u=1,_=!0,f=!1;if("yes"==window.lazy_imgoptimoff&&(_=!1),"IMG"===e.tagName?x="resize":("50%"==(d=(s=r.css("backgroundPosition").split(" "))[0])?d="center":"0%"==d?d="left":"100%"==d&&(d="right"),"50%"==(i=s[1])?i="center":"0%"==i?i="top":"100%"==i&&(d="bottom"),x="contain"==(c=r.css("background-size"))?"contain":"cover","fixed"==r.css("background-attachment")&&(f=!0)),void 0!==r.attr("data-lazy-rule"))for(var h=r.attr("data-lazy-rule").split(","),p=0;p<h.length;p++)-1<h[p].indexOf("round:")&&(u=+h[p].split(":")[1]),-1<h[p].indexOf("comm:")&&"resize"!=(x=h[p].split(":")[1])&&"cover"!=x&&"contain"!=x&&(_=!1),-1<h[p].indexOf("skip")&&(f=!0),-1<h[p].indexOf("optimoff")&&(_=!1);1<u&&(n=(s=t_lazyload_round(x,n,l,u))[0],l=s[1]),"cover"==x&&0<n&&0<l&&n<=1e3&&(n===5*Math.ceil(n/5)&&l===5*Math.ceil(l/5)||-1<["200x151","640x712","320x356","670x744","335x372","300x225","500x375","400x301","748x832","374x416","670x502","335x251","360x234","560x622","280x311","640x416"].indexOf(n+"x"+l)||-1<["353x245","155x151","158x164","372x495","280x272","117x117","291x280","280x269","335x241","283x283","150x156","353x233","414x730","372x362","275x206","290x322","248x207","177x136","173x173","280x308","195x214","248x191","155x196","163x203","320x444","158x162","176x203","412x700","360x88","360x616","167x167","130x144","280x233","560x314","320x299","372x275","320x178","372x242","360x352","353x294","260x182","372x310","335x344","374x432","414x500","374x360","220x338","150x146","335x239","176x176","320x302","374x260","360x568","191x221","192x192","372x558","335x188","320x358","335x258","374x575","26x26","353x360","360x206","335x248","335x322","167x256","560x364","155x172","163x216","163x181","360x257","374x561","374x243","220x212","177x148","291x324","167x160","375x749","335x387","172x172","260x302","414x700","220x254","177x172","374x519","176x169","320x352","335x233","150x203","360x207","158x121","360x396","158x131","150x98","220x169","182x202","320x179","372x413","181x226","353x200","158x153","375x628","176x271","374x364","320x492","374x247","414x833","353x393","335x218","560x399","412x264","293x164","56x56","177x204","248x382","181x181","118x118","260x346","374x497","260x202","393x251","158x158","372x200","373x414","320x229","177x177","312x175","374x312","84x84","320x329","177x194","353x350","335x503","335x446","335x326","374x200","158x182","320x237","335x221","176x196","150x229","320x224","248x276","360x299","260x289","196x216","335x279","177x272","320x426","260x172","155x194","320x369","372x350","360x302","360x402","169x186","158x242","173x199","167x185","360x238","220x123","320x308","414x265","374x350","300x333","177x170","320x222","320x311","260x169","150x173","320x246","353x265","192x222","158x151","372x414","150x144","760x502","314x176","320x208","182x182","320x211","163x163","372x279","360x202","360x252","260x252","260x286","353x392","160x104","374x281","353x353","150x231","320x267","372x372","177x197","275x154","158x175","374x374","150x167","260x146"].indexOf(n+"x"+l)||r.hasClass("tn-atom")||r.hasClass("tn-atom__img")||(r.hasClass("t-cover__carrier")||(x="resize"),n=(s=t_lazyload_round(x,n,l,100))[0],l=s[1])),"resize"==x&&n<30&&(f=!0),!0===_&&(a=!0===f||1e3<n||1e3<l||0==n||"IMG"!=e.tagName&&0==l?t_lazyload_getWebPUrl(a):t_lazyload_getResizeUrl(e.tagName,x,a,n,l,d,i,c)),"IMG"!==t.tagName&&"IFRAME"!==t.tagName?t.style.backgroundImage="url("+a+")":a&&t.setAttribute("src",a)}}function _(t,e){return function(){return t.apply(e,arguments)}}function t(t){i||(e={elements_selector:"img",container:window,threshold:300,throttle:50,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,show_while_loading:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null,placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},a=!!window.addEventListener,n=!!window.attachEvent,o=!!document.body.classList,i=!0),this._settings=function(t,e){var o,i={};for(o in t)t.hasOwnProperty(o)&&(i[o]=t[o]);for(o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);return i}(e,t),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=_(this.handleScroll,this),l(window,"resize",this._handleScrollFn),this.update(),this.loadAnimatedImages()}return t.prototype._showOnLoad=function(e){var o,i,a=this._settings;e.getAttribute("src")||e.setAttribute("src",a.placeholder),l(o=document.createElement("img"),"load",function t(){null!==a&&(a.callback_load&&a.callback_load(e),u(e,e,a.data_srcset,a.data_src),a.callback_set&&a.callback_set(e),x(e,a.class_loading),c(e,a.class_loaded),r(o,"load",t))}),l(o,"error",function(t){x(e,a.class_loading),a.callback_error&&a.callback_error(e),window.lazy_err="y",console.log("lazy loading err"),void 0!==t.path?t_lazyload_reloadonError(e,t.path[0].currentSrc,i):void 0!==t.target&&t_lazyload_reloadonError(e,t.target.currentSrc,i)}),c(e,a.class_loading),i=Date.now(),u(o,e,a.data_srcset,a.data_src)},t.prototype._showOnAppear=function(e){var o=this._settings;function i(){null!==o&&(o.callback_load&&o.callback_load(e),x(e,o.class_loading),c(e,o.class_loaded),r(e,"load",i))}"IMG"!==e.tagName&&"IFRAME"!==e.tagName||(l(e,"load",i),l(e,"error",function(t){r(e,"load",i),x(e,o.class_loading),o.callback_error&&o.callback_error(e),window.lazy_err="y",console.log("lazy loading err"),void 0!==t.path?t_lazyload_reloadonError(e,t.path[0].currentSrc,startTime):void 0!==t.target&&t_lazyload_reloadonError(e,t.target.currentSrc,startTime)}),c(e,o.class_loading)),startTime=Date.now(),u(e,e,o.data_srcset,o.data_src),o.callback_set&&o.callback_set(e)},t.prototype._loopThroughElements=function(){for(var t,e=this._settings,o=this._elements,i=o?o.length:0,a=[],n=0;n<i;n++)t=o[n],e.skip_invisible&&t.isSkipByPosition||s(t,e.container,e.threshold)&&(e.show_while_loading?this._showOnAppear(t):this._showOnLoad(t),a.push(n),t.wasProcessed=!0);for(;0<a.length;)o.splice(a.pop(),1),e.callback_processed&&e.callback_processed(o.length);0===i&&this._stopScrollHandler()},t.prototype._purgeElements=function(){for(var t=this._elements,e=t.length,o=[],i=0;i<e;i++)t[i].wasProcessed&&o.push(i);for(;0<o.length;)t.splice(o.pop(),1)},t.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,l(this._settings.container,"scroll",this._handleScrollFn))},t.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,r(this._settings.container,"scroll",this._handleScrollFn))},t.prototype.loadAnimatedImages=function(){var t,e,a=this._settings,o=this._elements,i=o?o.length:0,n=[];function l(t,e){var o,o=(o=t,"trigger"===(e=e)?(i=o.attr("data-animate-sbs-trgels"),i=$('[data-elem-id="'+i+'"]')):"viewport"===e&&(i=o.parents(".t396")),i?i.offset():null);if(o){var i=Math.abs(o.top-t.offset().top),t=Math.abs(o.left-t.offset().left);return i>a.threshold||t>a.threshold}}for(t=0;t<i;t++){e=o[t];var r,s=$(e).parents(".tn-elem"),d=s.attr("data-animate-sbs-opts"),c=s.attr("data-animate-sbs-event");"intoview"!==c&&"blockintoview"!==c||(r="viewport"),s.attr("data-animate-sbs-trgels")&&(r="trigger"),a.skip_invisible&&null===e.offsetParent||!d||l(s,r)&&(a.show_while_loading?this._showOnAppear(e):this._showOnLoad(e),n.push(t),e.wasProcessed=!0)}for(;0<n.length;)o.splice(n.pop(),1),a.callback_processed&&a.callback_processed(o.length)},t.prototype.handleScroll=function(){var t,e,o;this._settings&&(e=d(),0!==(o=this._settings.throttle)?(t=o-(e-this._previousLoopTime))<=0||o<t?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=e,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(_(function(){this._previousLoopTime=d(),this._loopTimeout=null,this._loopThroughElements()},this),t)):this._loopThroughElements())},t.prototype.update=function(){this._elements=function(e){var o;try{o=Array.prototype.slice.call(e)}catch(t){for(var i=[],a=e.length,n=0;n<a;n++)i.push(e[n]);o=i}return o.forEach(function(t){t.isSkipByPosition=null===t.offsetParent&&0===$(t).parents(".t396__carrier-wrapper").length&&"fixed"!==t.getAttribute("data-content-cover-parallax")}),o}(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},t.prototype.destroy=function(){r(window,"resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},t}),window.lazy="y",$(document).ready(function(){t_lazyload_detectwebp(),$("#allrecords").length&&"yes"==$("#allrecords").attr("data-tilda-imgoptimoff")?window.lazy_imgoptimoff="yes":window.lazy_imgoptimoff="",$(".t156").find(".t-img").attr("data-lazy-rule","skip"),$(".t492,.t552,.t251,.t603,.t660,.t661,.t662,.t680,.t827,.t909,.t218,.t740,.t132,.t694,.t762,.t786,.t546").find(".t-bgimg").attr("data-lazy-rule","comm:resize,round:100"),setTimeout(function(){lazyload_cover=new LazyLoad({elements_selector:".t-cover__carrier",show_while_loading:!1,data_src:"content-cover-bg",placeholder:"",threshold:700})},100),setTimeout(function(){lazyload_img=new LazyLoad({elements_selector:".t-img",threshold:800}),lazyload_bgimg=new LazyLoad({elements_selector:".t-bgimg",show_while_loading:!1,placeholder:"",threshold:800}),lazyload_iframe=new LazyLoad({elements_selector:".t-iframe"}),$(document).bind("slide.bs.carousel",function(){setTimeout(function(){lazyload_cover.update(),lazyload_img.update(),lazyload_bgimg.update()},500)}),window.isMobile&&($("body").append("<div class='t-mbfix'></div>"),setTimeout(function(){$(".t-mbfix").addClass("t-mbfix_hide")},50),setTimeout(function(){$(".t-mbfix").remove()},1e3))},500),"yes"!=window.lazy_imgoptimoff&&$(window).bind("resize",t_throttle(function(){clearTimeout(window.t_lazyload_resize_timerid),window.t_lazyload_resize_timerid=setTimeout(t_lazyload_onWindowResize,1e3)},500)),setTimeout(function(){void 0!==window.performance&&(window.t_lazyload_domloaded=+window.performance.timing.domContentLoadedEventEnd-+window.performance.timing.navigationStart)},0)}),window.t_lazyload_updateResize_elem=function(t){var e,o,i,a,n,l,r;0!=t.length&&(n="IMG"==(e=(l=t.get(0)).tagName)?(o=t.attr("src"),"-/resize/"):(o=t.css("background-image").replace("url(","").replace(")","").replace(/\"/gi,""),"contain"==t.css("background-size")?"-/contain/":"-/cover/"),void 0===o||-1===o.indexOf(n)||0<o.indexOf(".svg")||0<o.indexOf(".gif")||0<o.indexOf(".ico")||-1===o.indexOf("thumb.tildacdn.com")||0<o.indexOf("-/empty/")&&0<o.indexOf("-/resizeb/")||(i=o.indexOf(n)+n.length,r=o.indexOf("/",i),0<i&&0<r&&(a=o.slice(i,r).split("x"),n=l.clientWidth,l=l.clientHeight,0<n&&0<l&&(0<a[0]||0<a[1])&&(0<a[0]&&n>a[0]||0<a[1]&&l>a[1])&&(0<a[0]&&100<n-a[0]||0<a[1]&&100<l-a[1])&&(r=o.slice(0,i)+(0<a[0]?n:"")+"x"+(0<a[1]?l:"")+o.substring(r),"IMG"==e?t.attr("src",r):t.css("background-image","url("+r+")")))))},function(l,o){l.uuid4=function(){var t=l.crypto||l.msCrypto;if(void 0!==t&&t.getRandomValues){var e=new Uint16Array(8);return t.getRandomValues(e),e[3]=4095&e[3]|16384,e[4]=16383&e[4]|32768,(t=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e})(e[0])+t(e[1])+t(e[2])+t(e[3])+t(e[4])+t(e[5])+t(e[6])+t(e[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*o.random()|0;return("x"===t?e:3&e|8).toString(16)})},l.capture_js_errors=function(t,e,o,i,a){var n=new XMLHttpRequest;n.open("POST","https://sysstat.tildacdn.com/api/js/error/",!0),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify({account_id:"ws",event_id:l.uuid4(),request:{url:l.location.href},exception:{values:[{type:a.name,value:t,stacktrace:{frames:[{filename:e,colno:i,lineno:o}]}}]},stacktrace:void 0!==a.stack?a.stack:""}))},l.onerror=function(t,e,o,i,a){l.capture_js_errors(t,e,o,i,a)}}(window,Math);
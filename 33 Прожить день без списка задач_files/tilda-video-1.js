function t_video_lazyload_init(){t_video_lazyload_add_video(),$(window).bind("scroll",t_throttle(t_video_lazyload_add_video,300))}function t_video_lazyload_add_video(){var l=$(window).height();$(".t-video-lazyload").each(function(){var a=$(this),t=a.attr("data-videolazy-height")?$(this).attr("data-videolazy-height"):"100%";-1!=t.indexOf("vh")&&(t="100%");var e=a.offset().top,d=a.attr("data-videolazy-id").trim(),o=a.attr("data-blocklazy-id")||"";if(void 0!==a.attr("data-videolazy-two-id"))var i="_"+a.attr("data-videolazy-two-id")+"_";else i="";$(window).scrollTop()>e-l-700&&("false"!=a.attr("data-videolazy-load")||a.hasClass("t-video__isload")||(a.attr("data-videolazy-load","true"),"youtube"==a.attr("data-videolazy-type")&&a.prepend('<iframe id="youtubeiframe'+i+o+'" width="100%" height="'+t+'" src="//www.youtube.com/embed/'+d+'?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>'),"vimeo"==a.attr("data-videolazy-type")&&a.prepend('<iframe src="//player.vimeo.com/video/'+d+'?title=0&byline=0&portrait=0&badge=0&color=ffffff" width="100%" height="'+t+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')))})}$(document).ready(function(){0<$(".t-video-lazyload").length&&t_video_lazyload_init()});

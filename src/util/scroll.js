"use strict";function scrollWheel(d,u){function p(e){(e=e||window.event).preventDefault?e.preventDefault():window.event.returnValue,window.event?window.event.cancelBubble=!0:e.stopPropagation()}var e,t=-1<window.navigator.userAgent.indexOf("Trident");function l(){parseInt(getComputedStyle(d,null).width)+parseInt(getComputedStyle(d,null).paddingLeft)+parseInt(getComputedStyle(d,null).paddingRight)>=d.scrollWidth?u.style.display="none":u.style.display="block"}e=t?parseInt(getComputedStyle(u,null).width)+parseInt(getComputedStyle(u,null).paddingLeft)+parseInt(getComputedStyle(u,null).paddingRight):parseInt(getComputedStyle(u,null).width),d.style.whiteSpace="nowrap",d.style.overflow="hidden";for(var i,s,n=d.children,o=0;o<n.length;o++)"inline-block"!=getComputedStyle(n[0],null).display&&(n[o].style.display="inline-block");function r(){s=t?(i=parseInt(getComputedStyle(d,null).width)+parseInt(getComputedStyle(d,null).paddingLeft)+parseInt(getComputedStyle(d,null).paddingRight)-e,d.scrollWidth-parseInt(getComputedStyle(d,null).width)-parseInt(getComputedStyle(d,null).paddingLeft)-parseInt(getComputedStyle(d,null).paddingRight)):(i=parseInt(getComputedStyle(d,null).width)-e,d.scrollWidth-parseInt(getComputedStyle(d,null).width))}return u.style.position="relative",u.style.top=-parseInt(getComputedStyle(u,null).height)+"px",window.onresize=function(){r(),l()},d.addEventListener("wheel",function(e){p(e);var t=e.wheelDelta||4*-e.deltaY;d.scrollLeft=d.scrollLeft+t/4,d.scrollLeft=d.scrollLeft+t/4;var l=i*d.scrollLeft/s;u.style.left=i<=l?i+"px":l+"px"}),u.onmousedown=function(e){p(e);var o=e.clientX;document.documentElement.onmousemove=function(e){p(e);var t=e.clientX,l=t-o;u.style.left=u.style.left||"0px";var n=parseInt(u.style.left)+l;n<=0?n=0:i<=n&&(n=i),u.style.left=n+"px",d.scrollLeft=n*s/i,o=t,document.documentElement.onmouseup=function(e){p(e),document.documentElement.onmousemove=null,document.documentElement.onmouseup=null}}},function(){r(),l()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=scrollWheel,module.exports=exports.default;
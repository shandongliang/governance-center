"use strict";function hasClass(s,a){var e=s.className;return a=a.replace(/ +/g,""),new RegExp("\\b"+a+"\\b").test(e)}function addClass(a,s){(s=s.trim()).split(/ +/).forEach(function(s){hasClass(a,s)||(a.className+=" "+s)})}function removeClass(s,a){var e=(a=a.trim()).split(/ +/),t=s.className.trim().split(/ +/);e.forEach(function(s){for(var a=0;a<t.length;a++){t[a]===s&&(t[a]=t[t.length-1],t.length--,a--)}}),s.className=t.join(" ")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={hasClass:hasClass,addClass:addClass,removeClass:removeClass},module.exports=exports.default;
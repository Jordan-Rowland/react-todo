(this["webpackJsonpreact-todo"]=this["webpackJsonpreact-todo"]||[]).push([[0],{10:function(t,e,n){},11:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),r=n(4),o=n.n(r),u=(n(10),n(2)),i=n(1);var l=function(t){return c.a.createElement("div",{className:"todo-item"},c.a.createElement("h2",{onClick:function(){t.onEdit(t.text)}},t.text),c.a.createElement("span",{className:"delete-icon",onClick:function(){t.onDelete(t.text)}},"\u221a"))};var f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=Object(a.useState)(t),n=Object(i.a)(e,2),c=n[0],r=n[1];function o(t){r(t.target.value)}return[c,r,o]};var s=function(t){return[function(){var e=localStorage.getItem(t);return e="string"===typeof e?e.split("|"):[]},function(e){"object"===typeof e&&(e=e.join("|")),e.length&&localStorage.setItem(t,e)}]};var m=function(){var t=Object(a.useState)(""),e=Object(i.a)(t,2),n=e[0],r=e[1],o=Object(a.useRef)(null),m=f(""),v=Object(i.a)(m,3),d=v[0],b=v[1],j=v[2],p=s("todos"),E=Object(i.a)(p,2),g=E[0],O=E[1],h=g(),x=Object(a.useState)(h),y=Object(i.a)(x,2),k=y[0],S=y[1];function I(t){var e=[];S((function(n){return e=n.filter((function(e){return e!==t})),O(e),e})),e.length||localStorage.clear()}function N(t){var e=t.trim();b(e),r(e),o.current.focus()}return c.a.createElement("div",{className:"todo-container"},c.a.createElement("input",{className:"todo-input",type:"text",onChange:j,onKeyDown:function(t){var e=k.findIndex((function(t){return t===n})),a=d.trim();if("Enter"===t.key&&a)if(n){var c=Object(u.a)(k);c[e]=a,S(c),O(c),b(""),r("")}else S((function(t){return O([].concat(Object(u.a)(t),[a])),[].concat(Object(u.a)(t),[a])})),b("")},value:d,ref:o}),k.map((function(t){return c.a.createElement(l,{key:t,text:t,onDelete:I,onEdit:N})})))};var v=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(m,null))};o.a.render(c.a.createElement(v,null),document.getElementById("root"))},5:function(t,e,n){t.exports=n(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.1b94c24b.chunk.js.map
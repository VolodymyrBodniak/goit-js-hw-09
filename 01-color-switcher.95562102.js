const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let n;function d(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}t.addEventListener("click",(function(){if(n)return;t.disabled=!0,e.disabled=!1,n=setInterval(d,1e3)})),e.addEventListener("click",(function(){if(!n)return;t.disabled=!1,e.disabled=!0,clearInterval(n),n=null}));
//# sourceMappingURL=01-color-switcher.95562102.js.map

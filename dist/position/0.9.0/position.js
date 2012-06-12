define("#position/0.9.0/position",["$"],function(a,b){function g(a){a=l(a)||{},a.nodeType&&(a={element:a});var b=l(a.element)||d;if(b.nodeType!==1)throw new Error("posObject.element is invalid.");var c={element:b,x:a.x||0,y:a.y||0},g=b===d||b._id==="VIEWPORT";return c.offset=function(){return f?{left:0,top:0}:g?{left:window.scrollX,top:window.scrollY}:e(b).offset()},c.size=function(){var a=g?e(window):e(b);return a[0].nodeType!==1?{width:k(document.documentElement.clientWidth),height:k(document.documentElement.clientHeight)}:{width:a[0].offsetWidth,height:a[0].offsetHeight}},c}function h(a){a.x=i(a.x,a,"width"),a.y=i(a.y,a,"height")}function i(a,b,c){a+="",a=a.replace(/px/gi,""),/\D/.test(a)&&(a=a.replace(/(?:top|left)/gi,"0%").replace(/center/gi,"50%").replace(/(?:bottom|right)/gi,"100%")),a.indexOf("%")!==-1&&(a=a.replace(/(\d+\.?\d+)%/gi,function(a,d){return b.size()[c]*(d/100)}));if(/[+\-*\/]/.test(a))try{a=(new Function("return "+a))()}catch(d){throw new Error("Invalid position value: "+a)}return k(a)}function j(a){var b=a[0].offsetParent;if(!b)return{top:0,left:0};b[0]===document.documentElement&&(b=e(document.querySelector("body")));var c=b===document.querySelector("body")?{left:0,top:0}:e(b).offset();return c.top+=k(e(b).css("border-top-width")),c.left+=k(e(b).css("border-left-width")),c}function k(a){return parseFloat(a,10)||0}function l(a){return e(a)[0]}var c=b,d={_id:"VIEWPORT",nodeType:1},e=a("$"),f=!1;c.pin=function(a,b){a=g(a),b=g(b);var c=e(a.element);c.css("position")!=="fixed"?(c.css("position","absolute"),f=!1):f=!0,h(a),h(b);var d=j(c),i=b.offset(),k=i.top+b.y-a.y-d.top,l=i.left+b.x-a.x-d.left;c.css({left:l,top:k})},c.center=function(a,b){c.pin({element:a,x:"50%",y:"50%"},{element:b,x:"50%",y:"50%"})},c.VIEWPORT=d});
define("#android-shim/0.9.0/android-shim",["$","position"],function(a,b,c){function f(a){this.target=d(a).eq(0)}function h(){return d("<div>").css({display:"none",border:"none",background:"rgba(255,255,255,0.01)","-webkit-tap-highlight-color":"rgba(0,0,0,0)",position:"absolute",left:0,top:0,padding:0,margin:0}).appendTo(document.querySelector("body"))}var d=a("$"),e=a("position");f.prototype.sync=function(){var a=this.target,b=this.shim,c=a[0].offsetHeight,d=a[0].offsetWidth;return!c||!d||a.css("display")==="none"?b&&b.css("display","none"):(b||(b=this.shim=h()),b.css({height:c,width:d,zIndex:parseInt(a.css("zIndex"),10)-1||1}),e.pin(b[0],a[0]),b.css("display","block")),this},f.prototype.destroy=function(){this.shim&&(this.shim.remove(),delete this.shim),delete this.target};if(d.os.android)c.exports=f;else{function g(){}g.prototype.sync=g,g.prototype.destroy=g,c.exports=g}});
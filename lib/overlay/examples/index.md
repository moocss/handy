<style type="text/css">
        .box {
            width: auto;
            margin: 0;
            padding: 20px;
        }

        caption {
            text-align: left;
        }

        td {
            text-align: left;
        }

        table {
            margin: 10px 0;
        }

        table td:first-child {
            width: 100px;
        }
        .des{
            background:#F0F1F8;
            border:1px solid #D4D8EB;
            padding:10px;
            line-height:22px;
        }
        pre,code{
            padding:10px;
            background:#FCFBFA;
            border:1px solid #EFEEED;
            border-left-width:5px;
        }
        .green{color:green;}
        .red{color:red;}
        .J-confirm{
            background:#d4d4d4;
            padding:10px;
            border:1px solid gray;
            color:#fff;
        }
        .J-confirm a{
            color: #f50;
        }
        a{
            text-decoration:none;
            margin-bottom:20px;
        }
        body{
            margin:0;
            padding:0;
        }
</style>

<div class="box">
  <a href="javascript:void(0)" id="J-overlay-one">把一个 select 显示在我的右侧</a>
  <a href="http://weibo.com/askmarket#1337321564730" target="_blank">
    <img src="http://tp4.sinaimg.cn/1660497691/50/1290994036/1" alt="颂赞" />
  </a>
  <br /><br /><br />
  <input type="radio" /><br />
  <input type="checkbox" /><br />
  <input type="text" /><br />
  <a href="javascript:void(0)" id="J-overlay-two">在我的上方显示一个浮层</a><br />
  <span class="tip">建议您使用 android 观察这个示例</span><br />
  <br /><br /><br />
  <input type="submit" value="有动画的 overlay" id="J-anim-overlay" />
  <select style="display:none;">
      <option>one</option>
      <option>two</option>
  </select><br />
  <div style="color:#fff;text-align:left;background:rgba(0,0,0,0.4);padding:30px 150px 100px 10px;border:1px solid gray;" id="J-customise-layer">
      自定义浮层
      <br />
      <a href="javascript:void(0)" class="hide" style="margin-right:30px;">隐藏</a>
      <a href="javascript:void(0)" class="destroy">销毁</a>
  </div>
</div>

```javascript
    function getDOM(dom){return document.querySelector(dom);}

    seajs.use(['overlay','$','position'], function (Overlay,$,Position) {
        // 把一个 select 显示在我的右侧
        var overlayOne = new Overlay({
            element: 'select',
            align: {
                baseElement: '#J-overlay-one',
                baseXY: ['100%',0]
            }
        });
        getDOM('#J-overlay-one').addEventListener('click',function (){
            overlayOne.show();
        },false);

        getDOM('#J-overlay-two').addEventListener('click',function (){
            overlayTwo.show();
        },false);

        // 在我的上方显示一个浮层
        var overlayTwo = new Overlay({
            element: '#J-customise-layer',
            zIndex: 88888,
            position: 'absolute',
            align: {
                selfXY: [0,'100%'],
                baseElement: '#J-overlay-two'
            }
        });
        overlayTwo.render();
        overlayTwo.after('show',function (o){
            $(o.get('element')).css({
                '-webkit-box-shadow': '0px 0px 10px rgba(0,0,0,.7)'
            }).find('.hide').unbind('click').click(function (){
                o.hide();
            });
            $(o.get('element')).find('.destroy').unbind('click').click(function (){
                o.destroy();
            });
            $.os.android && $('.tip').css('color','red').html('这个浮层在 android 平台下是可以阻止事件的穿透，'+
                                                              '你无法点击后面的表单控件<br />');
        });
        overlayTwo.after('hide',function (o){
            $.os.android && $('.tip').css('color','red').html('浮层隐藏，后面的元素可正常点击');
        });

        // 有动画模式的 overlay
        var AnimOverlay = Overlay.extend({
            hide: function (){
                this.element.animate({
                    scale: 0
                },300,'ease',$.proxy(function (){
                    // 为使用 Overlay 原型方法 show 能够准确取到 element 的宽,高的值
                    // 需要手动清除 scale(0) 的值
                    this.element.css({
                        '-webkit-transform': 'none'
                    });

                },this));
                this.set('visible', false);
            }
        });
        var animoverlay = new AnimOverlay({
            template: '<div style="background:rgba(255,255,255,.7);width:260px;height:240px;padding:10px;'+
                     'border:1px solid gray;"><h4>一个带有动画模式的扩展</h4>'+
                     '<a href="javascript:void(0)" style="margin-right:40px;" '+
                     'data-overlay-role="trigger" data-overlay-action="hide">关闭</a><a href="javascript:void(0)" '+
                     'data-overlay-role="trigger" data-overlay-action="destroy">销毁</a></div>',
            position: 'absolute',
            zIndex: 99999
        });
        animoverlay.after('show',function (o){
            o.element.css({
                '-webkit-box-shadow': '0 0 20px #000',
                '-webkit-transform': 'scale(0)'
            });
        });
        getDOM('#J-anim-overlay').addEventListener('click',function (){
            animoverlay.show().element.animate({
                scale: 1
            },300,'ease',function (){

            });
        },false);
    });
```
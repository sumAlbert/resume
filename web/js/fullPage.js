(function (window,undefined) {
    var $fullPage=function(viewPort_id,wrapper_id){
        return new $fullPage.prototype.create(viewPort_id,wrapper_id);
    };

    $fullPage.prototype={
        constructor: $fullPage,
        //fullPage内部参数
        $_fullPageViewPort_DOM: undefined,//fullPage的视口
        $_fullPageWrapper_DOM: undefined,//fullPage外层DOM
        $_fullPageContent_DOMs: undefined,//fullPage内层DOM
        $_fullPage_currentPage: 1,//当前页面
        $_fullPage_totalPage: 1,//总页面
        $_fullPage_turnFlag: false,//是否正在进行翻页操作
        $_fullPage_turnInterval: 800,//翻页的间隔函数
        $_fullPage_touch_startY: 0,//移动端touch初始位置纵坐标
        $_fullPage_touch_stopY: 0,//移动端touch结束位置纵坐标
        $_fullPage_scrollInterval: 1200,//触发一次滚动的时间间隔

        //fullPage可调用的函数
        /**
         * 通过id创建fullPage对象
         * @param id DOM的id
         * @returns {$fullPage} fullPage的对象
         */
        create:function (viewPort_id,wrapper_id) {
            var viewPort_DOM=document.getElementById(viewPort_id);
            var wrapper_DOM=document.getElementById(wrapper_id);
            if(viewPort_DOM){
                this.$_fullPageViewPort_DOM=viewPort_DOM;
            }
            if(wrapper_DOM){
                this.$_fullPageWrapper_DOM=wrapper_DOM;
                this.$_fullPageContent_DOMs=wrapper_DOM.children;
                this.$_fullPage_totalPage=wrapper_DOM.children.length;
            }
            return this;
        },
        /**
         * 给fullPage的wrapper添加默认的样式，并且添加滚动监听
         */
        init:function () {
            //添加默认的css样式
            if(this.$_fullPageViewPort_DOM){
                this.$_fullPageViewPort_DOM.className=this.$_fullPageViewPort_DOM.className?this.$_fullPageViewPort_DOM.className+" _fullPageViewPort":"_fullPageViewPort";
            }
            if(this.$_fullPageContent_DOMs){
                for(var i=0;i<this.$_fullPageContent_DOMs.length;i++){
                    this.$_fullPageContent_DOMs[i].className=this.$_fullPageContent_DOMs[i].className?this.$_fullPageContent_DOMs[i].className+"_fullPageContent":"_fullPageContent";
                }
            }
            if(this.$_fullPageWrapper_DOM){
                this.$_fullPageWrapper_DOM.className=this.$_fullPageWrapper_DOM.className?this.$_fullPageWrapper_DOM.className+"_fullPageWrapper":"_fullPageWrapper";
            }

            //添加PC端滚动监听
            var mouseScroll=function (event) {
                var direction;
                if(event.wheelDelta){
                    direction=event.wheelDelta > 0;
                }
                else{
                    direction=event.detail<0;
                }

                if(direction){
                    this.prev();
                }
                else{
                    this.next();
                }
            };
            if(document.addEventListener){
                document.addEventListener("DOMmouseScroll",mouseScroll.bind(this));
            }
            window.onmousewheel=document.onmousewheel=mouseScroll.bind(this);

            //添加移动端滚动监听
            document.body.ontouchstart=function (event) {
                this.$_fullPage_touch_startY=event.touches[0].pageY;
            }.bind(this);
            document.body.ontouchmove=function (event) {
                event.preventDefault();
                this.$_fullPage_touch_stopY=event.touches[0].pageY;
                if(this.$_fullPage_touch_startY>this.$_fullPage_touch_stopY){
                    this.next();
                }
                else{
                    this.prev();
                }
            }.bind(this);
            return this;
        },
        /**
         * 去下一个页面
         */
        next:function () {
            if(!this.$_fullPage_turnFlag&&this.$_fullPage_currentPage<this.$_fullPage_totalPage){
                this.$_fullPage_turnFlag=true;

                //向下翻页
                this.$_fullPageWrapper_DOM.style.cssText="top: -"+this.$_fullPage_currentPage+"00vh;";


                setTimeout(function () {
                    this.$_fullPage_turnFlag=false;
                    this.$_fullPage_currentPage=this.$_fullPage_currentPage+1;
                }.bind(this),this.$_fullPage_scrollInterval);
            }
        },
        /**
         * 翻到上一面
         */
        prev:function () {
            if(!this.$_fullPage_turnFlag&&this.$_fullPage_currentPage>1){
                this.$_fullPage_turnFlag=true;

                //向上翻页
                this.$_fullPageWrapper_DOM.style.cssText="top: -"+(this.$_fullPage_currentPage-2)+"00vh;";


                setTimeout(function () {
                    this.$_fullPage_turnFlag=false;
                    this.$_fullPage_currentPage=this.$_fullPage_currentPage-1;
                }.bind(this),this.$_fullPage_scrollInterval);
            }
        }

    };
    $fullPage.prototype.create.prototype=$fullPage.prototype;

    window.$fullPage=$fullPage;
})(window);
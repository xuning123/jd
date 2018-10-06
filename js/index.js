/*入口函数*/
document.addEventListener('DOMContentLoaded', function (e) {
    /*实现轮播图*/
    /*1. 自动轮播图  （无缝滚动，滑动无缝）*/
    /*2. 点做对应的改变*/
    /*3. 实现滑动功能*/
    /*4. 当滑动的距离不够  吸附回去*/
    /*5. 当滑动的距离足够  切换图片 上一张 下一张*/
    /*6. 当滑动的速度足够  切换图片 上一张 下一张*/
    /*建议使用面向对象的方式*/
    new Banner();
});
var Banner = function (selector) {
    //主体容器
    this.$el = document.querySelector(selector || '.jd_banner');
    //每次切换的宽度
    this.width = this.$el.offsetWidth;
    //获取图片容器
    this.$imageBox = this.$el.querySelector('ul:first-child');
    //获取点容器
    this.$pointBox = this.$el.querySelector('ul:last-child');
    //定时器
    this.timer = null;
    //索引
    this.index = 1;
    //切换的时间
    this.interval = 4000;
    //可以切换的滑动距离
    this.swipeWidth = this.width/3;
    /*丰富属性*/
    this.init();
};
/*丰富方法*/
Banner.prototype.init = function () {
    /*入口函数*/
    this.autoPlay();
    this.animated();
    this.initSwipe();
};
Banner.prototype.autoPlay = function () {
    var _this = this;
    /*自动轮播*/
    _this.timer = setInterval(function () {
        _this.index ++;
        /*动画的切换到下一张*/
        /*加过渡*/
        _this.addTransition();
        /*改变位移*/
        var translateX = - _this.index * _this.width;
        _this.setTranslateX(translateX);
    },_this.interval);
};
Banner.prototype.animated = function () {
    /*动画结束后的处理函数*/
    var _this = this;
    _this.$imageBox.addEventListener('transitionend',function(){
        /*等索引为9且动画执行完毕 瞬间定位到索引为1的图片位置*/
        if(_this.index >= 9){
            _this.index = 1;
            /*去过渡*/
            _this.removeTransition();
            /*改变位移*/
            var translateX = - _this.index * _this.width;
            _this.setTranslateX(translateX);
        }
        /*当你滑动当最左边的图片索引0的图 瞬间切换到第8张图的位置*/
        else if(_this.index <= 0){
            _this.index = 8;
            /*去过渡*/
            _this.removeTransition();
            /*改变位移*/
            var translateX = - _this.index * _this.width;
            _this.setTranslateX(translateX);
        }

        /*设置点*/
        _this.setPoint();
    });
};
Banner.prototype.setPoint = function(){
    /*根据索引去设置  图片0->点7  图片9->点0 图片1-8 -> 点0-7  */
    /*去掉之前的选中*/
    this.$pointBox.querySelector('li.now').classList.remove('now');
    /*给当前的选中*/
    this.$pointBox.querySelectorAll('li')[this.index-1].classList.add('now');
};
//实现滑动相关的功能
Banner.prototype.initSwipe = function(){
    var _this = this;
    //1.滑动（图片容器随着手指的滑动进行位移）
    var startX = 0;
    var distance = 0;
    var time = 0;
    _this.$imageBox.addEventListener('touchstart',function(e){
        startX = e.touches[0].clientX;//起始坐标
        time = Date.now();
        //在滑动的时候禁用自动轮播图功能
        clearInterval(_this.timer);
    });
    _this.$imageBox.addEventListener('touchmove',function(e){
        var moveX = e.touches[0].clientX;//滑动中的坐标
        distance = moveX - startX; //坐标的改变
        // 计算图片容器应该做的位移是多少
        // 将要去做定位的位置  = 现在的位置 + 滑动的距离（不分正负） (位置及基于原来的位置去滑动)
        var translateX = - _this.index * _this.width + distance;
        _this.removeTransition();
        //注意这里不能有动画
        _this.setTranslateX(translateX);
    });
    _this.$imageBox.addEventListener('touchend',function(){
        /*速度=路程/时间*/
        /*路程 离开屏幕的点和开始触摸屏幕的点的距离*/
        var s = Math.abs(distance);
        /*时间 离开屏幕的时间和开始触摸屏幕的时间的差*/
        var t = Date.now() - time;
        var v = s / t;
        console.log(v); //px/ms  手速在 0.25 以上快
        //速度满足
        if(v > 0.25){
            /*切换效果*/
            if(distance > 0){
                /*右滑动 上一张*/
                _this.index --;
            }else{
                /*左滑动 下一张*/
                _this.index ++;
            }
            var translateX = - _this.index * _this.width;
            _this.addTransition();
            _this.setTranslateX(translateX);
        }else{
            /*1.滑动的距离  取绝对值  去判断是否超过三分之一*/
            if(Math.abs(distance) < _this.swipeWidth){
                //吸附效果
                var translateX = - _this.index * _this.width;
                _this.addTransition();
                _this.setTranslateX(translateX);
            }else{
                /*切换效果*/
                if(distance > 0){
                    /*右滑动 上一张*/
                    _this.index --;
                }else{
                    /*左滑动 下一张*/
                    _this.index ++;
                }
                var translateX = - _this.index * _this.width;
                _this.addTransition();
                _this.setTranslateX(translateX);
            }
        }
        //开启自动轮播
        _this.autoPlay();
    });
};
/*加过渡*/
Banner.prototype.addTransition = function () {
    this.$imageBox.style.transition = 'all 0.3s';
    this.$imageBox.style.webkitTransition = 'all 0.3s';
};
/*去过渡*/
Banner.prototype.removeTransition = function () {
    this.$imageBox.style.transition = 'none';
    this.$imageBox.style.webkitTransition = 'none';
};
/*改变位移*/
Banner.prototype.setTranslateX = function (translateX) {
    this.$imageBox.style.transform = 'translateX('+translateX+'px)';
    this.$imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
};

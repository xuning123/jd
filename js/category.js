document.addEventListener('DOMContentLoaded',function (e) {
    /*左侧栏区域滚动*/
    /*1. 使用一个ISCROLL的插件 区域滚动插件*/
    /*2. 下载  https://github.com/cubiq/iscroll 引入 iscroll.js 核心文件*/
    /*3. 注意：只能一个父容器套这一个子容器*/
    /*4. 初始化 传入选择器 或者dom对象 */
    /*5. 如果要实现滚动效果 子容器尺寸必须大于父容器尺寸*/
    new IScroll('.jd_left');
    new IScroll('.jd_right');
    /*右侧栏区域左右滚动*/
    // new IScroll('.jd_right',{
    //     scrollX:true,
    //     scrollY:false
    // });
});
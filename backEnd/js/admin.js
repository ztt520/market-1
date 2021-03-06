// 该文件的功能是用来写首页的js交互的

// 1. 进度条 不让进度条显示圆圈
NProgress.configure({ showSpinner : false });

// 全局监听 当页面中某一个ajax 请求发起的时候 让进度条开始
$(window).ajaxStart(function () {
    NProgress.start();
})
//当ajax请求完成的时候 让进度条完成
$(window).ajaxComplete(function () {
    NProgress.done();
})

// 2. 功能： 点击左侧的菜单按钮，让左侧的侧边栏消失
// 让右侧的内容占满全屏
// 属性选择器$([''])
$('[data-menu]').on('click', function () {
    //toggle()切换
    $('.lt-aside').toggle();
    $('.lt-section').toggleClass('menu');
})
// 3. 功能：点击分类管理 滑出 菜单
$('.lt-aside .menu').on('click','[href="javascript:;"]',
function () {
    var _this = $(this);
    var child = _this.siblings();
    child.slideToggle();
})

// 4. 功能：点击退出按钮，弹出遮罩层，发起请求，退出用户登录
// 1. 点击确定按钮
$('#myModal').on('click', function () {
    // console.log('pg one');
// 2. 发送ajax请求
    $.ajax({
        type : 'get',
        url : '/employee/employeeLogout',
        data : {},
        dataType : 'json',
        success : function (data) {
            if (data.success == true) {
                $('#myModal').modal('hide');
                setTimeout(function () {
                    location.href = './login.html';
                },500)
            }
        }
    })
})


$(function () {
  // 1. 进行表单验证 
  $('#login-form').bootstrapValidator({
    // 提示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 属性对应的是表单元素的名字
    fields: {
      // 字段名是name的属性值  配置校验的规则
      username: {
        // 规则
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 4,
            max: 16,
            message: '用户名长度在1到16位之间'
          },
          // 设置错误信息，和规则无关，和后台校验有关系
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 16,
            message: '密码长度在6到16之间'
          },
          different: {
            field: '密码不能和用户名相同'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
    // 表单校验成功
  }).on('success.form.bv', function (e) {
    // 禁用默认提交的事件
    // 因为要使用ajax提交而不是默认的提交方式
    e.preventDefault();
    // 获取当前的表单
    var $form = $(e.target);

    // serialize(); 序列化
    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');
    // 使用ajax 提交表单数据 
    // 发送登录请求
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      dataType: 'json',
      success: function (data) {
        if (data.success) {
          // 登陆成功，跳转到index页面
          location.href = './index.html';
        } else if (data.error == 1001) {
          // 密码错误
          // 指定某一个表单元素的错误提示
          $('#login-form').data('bootstrapValidator').
          updateStatus('password', 'INVALID', 'callback');
        } else if (data.error == 1000) {
          // 用户名不存在
          $('#login-form').data('bootstrapValidator').
          updateStatus('username', 'INVALID', 'callback');
        }
      }
    })
  })
  // 重置功能
  $('[type="reset"]').on('click', function () {
    //重置验证
    $('#login-form').data('bootstrapValidator').resetForm();
  })
})
function check(){
    var userName = "",password = "",flag=true;

    userName = $("#userName").val();
    password = $("#password").val();

    if(userName==""){
        flag=false;
        layer.msg('用户名不能为空');
    }else if(password ==""){
        flag=false;
        layer.msg('密码不能为空');
    }
    return flag;


}

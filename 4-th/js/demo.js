var omail=document.querySelectorAll("#mail");
var obutton=document.querySelectorAll("button");
var pass=document.querySelectorAll('#passwords');
var xmlhttp;
var code;
function chick(x){
    location.href="#warp";
    switch(x){
        case 0:
            if(omail[0].value==""){
                    alert("请输入邮箱");
            }
            else{
                if(isMail(omail[0].value)){
                    if(pass[0].value==""){
                        alert("请设置密码");
                    }
                    else{
                        var mail=omail[0].value.replace('@',"%40");
                        if (window.XMLHttpRequest)
                        {// code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp=new XMLHttpRequest();
                        }
                        else
                        {// code for IE6, IE5
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        xmlhttp.onreadystatechange=function(){
                            code=xmlhttp.responseText.slice(8,11);
                            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                                if(code=='200'){
                                    alert("验证码发送成功");
                                }
                                if(code=='100'){
                                    alert("该用户已存在")
                                }
                                console.dir(xmlhttp.responseText);
                            }
                        }
                        xmlhttp.open("GET","http://120.24.93.68:8085/api/register/sendCheckCode?email="+mail,true);
                        xmlhttp.send();
                    }
                }
                else{
                    alert("邮箱格式错误");
                }
            }
            break;
        case 1: 
        if(pass[0].value==""){
                        alert("请设置密码");
                    }
        var getcode=document.getElementById("code").value;
            if(getcode==""){
                alert("请输入验证码");
            }
            else{
                var message={
                                "checkCode": getcode,
                                "email": omail[0].value,
                                "password": pass[0].value,
                                "role": 0
                            }
                    if (window.XMLHttpRequest)
                        {// code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp=new XMLHttpRequest();
                        }
                        else
                        {// code for IE6, IE5
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                        }
                xmlhttp.onreadystatechange=function(){
                    code=xmlhttp.responseText.slice(8,11);
                    if(code!='200' && xmlhttp.readyState==4){
                        alert("验证码错误");
                        code=0;
                        return 0;
                    }
                    if(xmlhttp.readyState==4&&code=='200'){
                        alert("注册成功,请尝试登录!");
                        code=0;
                        return 0;
                    }
                }
                xmlhttp.open("POST","http://120.24.93.68:8085/api/user/register",true);
                xmlhttp.setRequestHeader("Content-Type","application/json");
                xmlhttp.send(JSON.stringify(message));
            }
            break;
        case 2: 
            if(omail[1].value==""){
                    alert("请输入邮箱");
            }
            else{
                if(isMail(omail[1].value)){

                }
                else{
                    alert("邮箱格式错误");
                    return 0;
                }
            }
            if(pass[1].value==""){
                        alert("请输入密码");
                    }
            else{
                var login ={
                                "email": omail[1].value,
                                "password": pass[1].value
                            }
                if (window.XMLHttpRequest)
                        {// code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp=new XMLHttpRequest();
                        }
                        else
                        {// code for IE6, IE5
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                        }
                xmlhttp.onreadystatechange=function(){
                    if(xmlhttp.readyState==4){
                        code=xmlhttp.responseText.slice(8,11);
                        if(code!='200'){
                            alert("用户名或密码错误");
                        }
                        else{
                        alert("登录成功--3s后跳转");
                        setTimeout(function(){
                            location.href="login.html";
                        },3000);
                        sessionStorage.setItem("message",xmlhttp.responseText);
                        }
                    }
                }
                xmlhttp.open("POST","http://120.24.93.68:8085/api/login",true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.send(JSON.stringify(login));
            }
            break;
        default: 
            console.dir(x);
            alert("传参错误!!!"); break;
    }
}
function isMail(x){
var mail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
return mail.test(x);
}
// 显示部分
function changeAccountPageVisibility(){
    const panel = document.querySelector('div#panel');
    const accountPage = document.querySelector('div#account-page');
    if(localStorage.getItem('accountPageVisibility') === 'false'){
        panel.style.marginLeft = 0;
        setTimeout(() => {
            panel.style.borderRadius = '12px 0px 12px 12px';
            accountPage.style.opacity = 1;
        }, 50);
        localStorage.setItem('accountPageVisibility', 'true');
    } else {
        accountPage.style.opacity = 0;
        setTimeout(() => {
            panel.style.marginLeft = '270px';
            panel.style.borderRadius = '12px';
        }, 100);
        localStorage.setItem('accountPageVisibility', 'false');
    }
}

// 登录组件
function tryLogin(){
    const username = document.querySelector('input#input-username').value;
    const password = document.querySelector('input#input-password').value;
    if (username == null || password == null || username == '' || password == ''){
        return;
    }
    const LoginHost = `${ServerHost}/user/login?username=${username}&password=${password}&via=form`
    sendGetRequest(LoginHost)
        .then(function(responseText){
            const [status, response] = responseText
            if (status == 200){
                console.log(JSON.parse(response))
                const [permission, avatar, cookie] = JSON.parse(response)
                // Cookie 处理
                const date = new Date()
                date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                document.cookie = `login=${cookie}; expires=${date.toGMTString()}`
                // 权限处理
                localStorage.setItem('permission', permission)
                // 头像 & 名字 & 用户等级 - 显示处理
                if (avatar != null){ document.querySelector('img#user-avator').setAttribute('src', avatar) }
                document.querySelector('span#user-name').innerHTML = username
                const prem_text = {'1':'I 访客','2':'II 成员','3':'III 精英','4':'IV 副会长','5':'V 会长'}
                document.querySelector('span#user-perm').innerHTML = prem_text[permission]
                // 子页面交换
                document.querySelector('div#not-login').style.display = 'none'
                document.querySelector('div#is-login').style.display = 'block'
            } else if (status == 400) {
                // 提示
                console.log('用户不存在')
            } else if (status == 401) {
                // 清空输入
                document.querySelector('input#input-username').value = ''
                document.querySelector('input#input-password').value = ''
                // 提示
                console.log('用户名或密码错误')
            }
        })
}

// Onload 初始化
localStorage.setItem('accountPageVisibility', 'false')
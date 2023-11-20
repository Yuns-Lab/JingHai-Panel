// 显示部分
function changeAccountPageVisibility(){
    const panel = document.querySelector('div#panel');
    const accountPage = document.querySelector('div#account-page');
    if(localStorage.getItem('accountPageVisibility') === 'false'){
        tryCookieLogin()
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
    if (username == null || password == null || username == '' || password == ''){ GmAlert.notice(`用户名或密码不能为空`, 'warning'); return; }
    const LoginHost = `${ServerHost}/user/login?username=${username}&password=${password}&via=form`
    sendGetRequest(LoginHost)
        .then(function(responseText){
            const [status, response] = responseText
            if (status == 400) { GmAlert.notice('用户不存在，请先注册或检查填写的内容', 'warning'); return; }
            if (status == 401) { GmAlert.notice('用户名或密码错误', 'error'); return; }
            const [premission, avatar, cookie] = JSON.parse(response)
            // Cookie 处理
            const date = new Date()
            date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
            document.cookie = `login=${cookie}; expires=${date.toGMTString()}`
            // 权限处理
            localStorage.setItem('premission', premission)
            // 头像 & 名字 & 用户等级 - 显示处理
            if (avatar != null){ document.querySelector('img#user-avator').setAttribute('src', avatar) }
            localStorage.setItem('username', username)
            document.querySelector('span#user-name').innerHTML = username
            document.querySelector('span#user-perm').innerHTML = prem_text[premission]
            // 子页面交换
            document.querySelector('div#not-login').style.display = 'none'
            document.querySelector('div#is-login').style.display = 'block'
            document.querySelector('input#input-username').value = ''
            document.querySelector('input#input-password').value = ''
            GmAlert.notice('登录成功','success')
        })
        .catch(function(errText){
            GmAlert.notice(`连接到服务器时发生错误：<p>${errText}`, 'error')
        })
}

function getAuthCookie() {
    const cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('login=')) {
            return cookie.substring('login='.length);
        }
    }
    return null;
}

function tryCookieLogin(){
    const cookie = getAuthCookie()
    if (cookie == null) { return; } // GmAlert.notice('无法自动登录，请手动登录。原因：<p>Cookie 过期或未在此设备/浏览器上登录过', 'info');
    const LoginHost = `${ServerHost}/user/login?&password=${cookie}&via=cookie`
    sendGetRequest(LoginHost)
        .then(function(responseText){
            const [status, response] = responseText
            if (status == 401) { GmAlert.notice('尝试自动登录失败，请手动登录', 'warning'); return; }
            const [username, premission, avatar] = JSON.parse(response)
            // 权限处理
            localStorage.setItem('premission', premission)
            // 头像 & 名字 & 用户等级 - 显示处理
            if (avatar != null){ document.querySelector('img#user-avator').setAttribute('src', avatar) }
            localStorage.setItem('username', username)
            document.querySelector('span#user-name').innerHTML = username
            document.querySelector('span#user-perm').innerHTML = prem_text[premission]
            // 子页面交换
            document.querySelector('div#not-login').style.display = 'none'
            document.querySelector('div#is-login').style.display = 'block'
            document.querySelector('input#input-username').value = ''
            document.querySelector('input#input-password').value = ''
            GmAlert.notice('自动登录成功', 'success')
        })
        .catch(function(errText){
            GmAlert.notice(`连接到服务器时发生错误：<p>${errText}`, 'error')
        })
}

function tryRegister(){
    const username = document.querySelector('input#input-username').value;
    const password = document.querySelector('input#input-password').value;
    if (username == null || password == null || username == '' || password == ''){ GmAlert.notice(`用户名或密码不能为空`, 'warning'); return; }
    GmAlert.alert('确认?', 'warning', {
        showClose: true,
        text: `是否确认要注册用户 ${username} ？`,
        showConfirm: true,
        showCancel: true,
        onClosed: (status) => {
            if (status == 1){
                const RegistHost = `${ServerHost}/user/register?username=${username}&password=${password}`
                sendGetRequest(RegistHost)
                    .then(function(responseText){
                        const [status, _] = responseText
                        if (status == 409){ GmAlert.notice(`用户 ${username} 已存在，请直接登录`, 'warning'); return;}
                        GmAlert.notice('注册成功，请登录', 'success')
                    })
                    .catch(function(errText){
                        GmAlert.notice(`连接到服务器时发生错误：<p>${errText}`, 'error')
                    })
            }
        },
    })
}

function tryLogout(){
    const username = document.querySelector('span#user-name').innerHTML;
    if (username == null || username == ''){ return; }
    const LogoutHost = `${ServerHost}/user/logout?username=${username}`
    sendGetRequest(LogoutHost)
        .then(function(responseText){
            const [status, _] = responseText
            // 数据清除
            if (status == 409){ GmAlert.notice('注销失败：用户已注销', 'warning'); return;}
            document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem('username')
            localStorage.removeItem('premission')
            // 子页面交换
            document.querySelector('div#not-login').style.display = 'block'
            document.querySelector('div#is-login').style.display = 'none'
            GmAlert.notice('注销成功', 'success')
        })
}

// Onload 初始化
localStorage.setItem('accountPageVisibility', 'false');
localStorage.removeItem('username'); localStorage.removeItem('premission')
GmAlert.notice.config({ timeout: '3000' })
var prem_text = {'1':'I 访客','2':'II 成员','3':'III 精英','4':'IV 副会长','5':'V 会长'}
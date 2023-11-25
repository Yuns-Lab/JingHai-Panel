// Unit: 切换
function changePage(index){
    document.querySelector('.nav-button-this').classList.remove('nav-button-this');
    removePageThis(document.querySelector('.page-this'))
    document.querySelector(`.nav-button:nth-child(${index})`).classList.add('nav-button-this');
    setPageThis(document.querySelector(`.page:nth-child(${index})`))
}

function setPageThis(element){
    element.classList.add('page-this')
    element.setAttribute('style', 'display:block;')
    setTimeout(() => {
        element.setAttribute('style', 'display:block; opacity:1;')
    }, 10);
}

function removePageThis(element){
    element.classList.remove('page-this')
    element.removeAttribute('style')
}

setPageThis(document.querySelector(`.page:nth-child(1)`))

// Unit: 分页面
// 公共函数
function public_getElementContent(){
    const permission = localStorage.getItem('permission');
    if (permission == null){ // 未登录
        var text1 = '你现在啥也干不了...';
        var text2 = '或许登录能解锁更多内容?';
        var text3 = '请先登录';
        var text4 = '登陆后即可操作';
        var is23  = false;
    } else if (permission == "1"){ // 新人
        var text1 = '填写入会预审表单';
        var text2 = '<span style="font-size:15px">你只能干这件事 ...</span>';
        var text3 = '你还不是京海公会成员，请提交入会预审表单';
        var text4 = '请在下方选择审核方向，如已提交入会预审表单请通知对应审核员';
        var is23  = false;
    } else if (permission == "2"){ // 成员
        var text1 = '查看成员列表 / 查看工单列表 / 提交工单';
        var text2 = '';
        var text3 = '你已经是京海工会成员，无需再次提交入会预审表单';
        var text4 = '';
        var is23  = true;
    } else if (permission == "3"){ // 精英
        var text1 = '查看成员列表 / 查看工单列表 / 提交工单';
        var text2 = '';
        var text3 = '你已经是京海工会成员，无需再次提交入会预审表单';
        var text4 = '';
        var is23  = true;
    } else if (permission == "4"){ // 副会长
        var text1 = '查看入会预审列表 / 批准/拒绝入会预审 / 查看成员列表';
        var text2 = '修改成员权限等级 / 查看工单 / 提交工单 / 批准 or 拒绝工单';
        var text3 = '你已经是京海工会成员，无需再次提交入会预审表单';
        var text4 = '同时，你可以查看其他玩家提交的表单';
        var is23  = false;
    } else if (permission == "5"){ // 会长
        var text1 = '查看入会预审列表 / 批准/拒绝入会预审 / 查看成员列表 / 修改成员权限等级';
        var text2 = '查看工单 / 提交工单 / 批准/拒绝工单 / 以及其他没想到的全部可用项目';
        var text3 = '你已经是京海工会成员，无需再次提交入会预审表单';
        var text4 = '同时，你可以查看其他玩家提交的表单';
        var is23  = false;
    }
    return [text1, text2, text3, text4, is23];
}

// 主页
function getHourNow(){
    const now = new Date();
    if (localStorage.getItem("hour") != null){
        const hour = localStorage.getItem("hour") // debug
        return hour
    } else {
        const hour = now.getHours();
        return hour
    }
}

function getTimeText(){
    const hour = getHourNow()
    let username = '请先登录'
    if (localStorage.getItem('username') != null){ username = localStorage.getItem('username') }
    if (hour >= 23 || hour < 6){
        var TimeText = "夜已深，记得休息哦";
    } else if (hour >= 6 && hour < 8){
        var TimeText = "早上好, " + username;
    } else if (hour >= 8 && hour < 12){
        var TimeText = "上午好, " + username;
    } else if (hour >= 12 && hour < 14){
        var TimeText = "中午好, " + username;
    } else if (hour >= 14 && hour < 16){
        var TimeText = "下午好, " + username;
    } else if (hour >= 16 && hour < 18){
        var TimeText = "傍晚好, " + username;
    } else if (hour >= 18 && hour < 23){
        var TimeText = "晚上好, " + username;
    }
    return TimeText;
}

function editElementsTextPage1(){
    document.querySelector('#page-container .page:nth-child(1) h1#title').innerHTML = getTimeText()
    const [text1, text2, _3, _4] = public_getElementContent()
    document.querySelector('#page-container .page:nth-child(1) h2#you-can-do span#line1').innerHTML = text1;
    document.querySelector('#page-container .page:nth-child(1) h2#you-can-do span#line2').innerHTML = text2;
}

editElementsTextPage1()
setInterval(() => {
    editElementsTextPage1()
}, 100);

// 预审核
function editElementsTextPage2(){
    const [text1, text2, text3, text4, is23] = public_getElementContent()
    document.querySelector('#page-container .page:nth-child(2) h2#you-can-do span#line1').innerHTML = text1;
    document.querySelector('#page-container .page:nth-child(2) h2#you-can-do span#line2').innerHTML = text2;
    document.querySelectorAll('#page-container .page:nth-child(2) div.card').forEach(element => { element.style.display = "none"; })
    document.querySelector('#page-container .page:nth-child(2) h2#you-can-do').style.display = "none";
    if (localStorage.getItem('permission') == 1){ document.querySelectorAll('#page-container .page:nth-child(2) div.card').forEach(element => { element.style.display = "flex"; }) }
    if (is23){ document.querySelector('#page-container .page:nth-child(2) h2#you-can-do').style.display = "block"; }
    document.querySelector('#page-container .page:nth-child(2) h1#title').innerHTML = text3;
    document.querySelector('#page-container .page:nth-child(2) h2#subtitle').innerHTML = text4;
}

editElementsTextPage2()
setInterval(() => {
    editElementsTextPage2()
}, 100);
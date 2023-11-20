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

function editYouCanDoText(element1, element2){
    permission = localStorage.getItem("premission");
    if (permission == null){ // 未登录
        element1.innerHTML = '你现在啥也干不了...'
        element2.innerHTML = '或许登录能解锁更多内容?'
    }
    if (permission == "1"){ // 新人
        element1.innerHTML = '填写入会预审表单';
        element2.innerHTML = '<span style="font-size:15px">你只能干这件事 ...</span>';
    } else if (permission == "2"){ // 成员
        element1.innerHTML = '查看入会预审列表 / 查看成员列表 / 查看工单 / 提交工单';
        element2.innerHTML = ''
    } else if (permission == "3"){ // 精英
        element1.innerHTML = '查看入会预审列表 / 查看成员列表 / 查看工单 / 提交工单';
        element2.innerHTML = ''
    } else if (permission == "4"){ // UNIT 副会长
        element1.innerHTML = '查看入会预审列表 / 批准/拒绝入会预审 / 查看成员列表'
        element2.innerHTML = '修改成员权限等级 / 查看工单 / 提交工单 / 批准 or 拒绝工单';
    } else if (permission == "5"){ // UNIT会长
        element1.innerHTML = '查看入会预审列表 / 批准/拒绝入会预审 / 查看成员列表 / 修改成员权限等级'
        element2.innerHTML = '查看工单 / 提交工单 / 批准/拒绝工单 / 以及其他没想到的全部可用项目'
    }
}

function elementsText(){
    document.querySelector('#page-container .page:nth-child(1) h1#title').innerHTML = getTimeText()
    editYouCanDoText(
        document.querySelector('#page-container .page:nth-child(1) h2#you-can-do span#line1'),
        document.querySelector('#page-container .page:nth-child(1) h2#you-can-do span#line2')
    )
}

elementsText()
setInterval(() => {
    elementsText()
}, 100);
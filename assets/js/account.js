// 显示部分
function changeAccountPageVisibility(){
    const panel = document.getElementById('panel')
    const accountPage = document.getElementById('account-page')
    if(localStorage.getItem('accountPageVisibility') === 'false'){
        panel.style.marginLeft = 0;
        setTimeout(() => {
            panel.style.borderRadius = '12px 0px 12px 12px';
            accountPage.style.opacity = 1;
        }, 50);
        localStorage.setItem('accountPageVisibility', 'true')
    } else {
        accountPage.style.opacity = 0;
        setTimeout(() => {
            panel.style.marginLeft = '270px';
            panel.style.borderRadius = '12px';
        }, 100);
        localStorage.setItem('accountPageVisibility', 'false')
    }
}



// Onload 初始化
localStorage.setItem('accountPageVisibility', 'false')
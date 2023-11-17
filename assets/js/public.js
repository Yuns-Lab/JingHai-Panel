// 集中设置服务器地址
var ServerHost = 'http://localhost:3927'; 

// HTTP GET 异步请求函数
function sendGetRequest(url) {
    return new Promise(function(resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve([xhr.status, xhr.responseText]);
            }
        };
        xhr.send();
    });
}
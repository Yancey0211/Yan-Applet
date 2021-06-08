
let rootUrl = "";//具体接口域名根据你的实际情况填写

var lock = require('./lock')
function post(url,data,cb){
    lock.showLoading("数据请求中...");
    wx.request({
        url : rootUrl + url,
        data: data,
        method: 'post',
        header: {
          // "Content-Type": "json",   //get请求时候
        //   "Content-Type": "application/json; charset=utf-8", //POST请求的时候这样写
          "Authorization" :wx.getStorageSync('token')
        },  
        success: function(res){  
            lock.hideLoading();
            if (res.data.code == 401) {
                wx.reLaunch({
                  url: '/pages/login/index',
                })
            }
            return typeof cb == "function" && cb(res.data)  
        },  
        fail: function(){  
            lock.hideLoading();
            return typeof cb == "function" && cb(false)  
        }  
    })
}
function get(url,cb){
    console.log(url);
    lock.showLoading("数据请求中...");
    wx.request({
        url : rootUrl + url,
        method: 'get',
        header: {
          "Content-Type": "json",   //get请求时候
        //   "Content-Type": "application/json; charset=utf-8", //POST请求的时候这样写
          "Authorization" :wx.getStorageSync('token')

        },  
        success: function(res){  
            lock.hideLoading();
            if (res.data.code == 401) {
                wx.reLaunch({
                  url: '/pages/login/index',
                })
            }

            return typeof cb == "function" && cb(res.data)  
        },  
        fail: function(){  
            lock.hideLoading();
            return typeof cb == "function" && cb(false)  
        }  
    })
}
module.exports = {
    post : post, //暴露一个方法
    get : get //暴露一个方法
}
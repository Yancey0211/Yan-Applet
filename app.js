//app.js
var http = require('utils/http.js') //引入创建的http.js
App({
  onLaunch: function () {
    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate,'0000')
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }else{
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
    // 获取设备信息
    this.getSystemInfo()
    //隐藏系统tabbar
    wx.hideTabBar();
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();

  },
  /**
  * 获取设置信息
  */
  getSystemInfo: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('获取系统信息', res);
        // let models = res.model;
        if (res.model.indexOf("iPhone") >= 0 && (res.statusBarHeight > 20)) {
          that.globalData.isIPhoneX = true
          // console.log(that.globalData.isIPhoneX, 'isIPhoneXisIPhoneXisIPhoneXisIPhoneXisIPhoneXisIPhoneXisIPhoneX');

        }
      }
    });
  },
  //全局点击事件
  editTabbar: function () {
    var tabbar = this.globalData.tabBar;
    var currentPages = getCurrentPages();
    var that = currentPages[currentPages.length - 1];
    var pagePath = that.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    that.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null,//客户端设备信息
    isIPhoneX: false, //当前设备是否为 iPhone X
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#929294",
      "selectedColor": "#162240",
      "list": [
        {
          "selectedIconPath": "images/tabBar/home_on.png",
          "iconPath": "images/tabBar/home_no.png",
          "pagePath": "/pages/home/index",
          "text": "首页"
        },
        {
          "selectedIconPath": "images/tabBar/classify_on.png",
          "iconPath": "images/tabBar/classify_no.png",
          "pagePath": "/pages/classify/index",
          "text": "分类"
        },
        {
          "selectedIconPath": "images/tabBar/inquiry_on.png",
          "iconPath": "images/tabBar/inquiry_no.png",
          "isSpecial": true,
          "pagePath": "/pages/inquiry/index",
          "text": "询单"
        },
        {
          "selectedIconPath": "images/tabBar/purchase_on.png",
          "iconPath": "images/tabBar/purchase_no.png",
          "pagePath": "/pages/purchase/index",
          "text": "采购单"
        },
        {
          "selectedIconPath": "images/tabBar/my_on.png",
          "iconPath": "images/tabBar/my_no.png",
          "pagePath": "/pages/user/index",
          "text": "我的"
        }
      ]
    }
  },
  func: {
    get: http.get, //这里配置我们需要的方法
    post: http.post //这里配置我们需要的方法
  }
})
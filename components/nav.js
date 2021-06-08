// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#929294",
        "selectedColor": "#162240",
        "list": [
          {
            "selectedIconPath": "/images/tabBar/home_on.png",
            "iconPath": "/images/tabBar/home_no.png",
            "pagePath": "/pages/home/index",
            "text": "首页",
          },
          {
            "selectedIconPath": "/images/tabBar/classify_on.png",
            "iconPath": "/images/tabBar/classify_no.png",
            "pagePath": "/pages/classify/index",
            "text": "分类",
          },
          {
            "selectedIconPath": "/images/tabBar/inquiry_on.png",
            "iconPath": "/images/tabBar/inquiry_no.png",
            "isSpecial": true,
            "pagePath": "/pages/inquiry/index",
            "text": "询单",
          },
          {
            "selectedIconPath": "/images/tabBar/purchase_on.png",
            "iconPath": "/images/tabBar/purchase_no.png",
            "pagePath": "/pages/purchase/index",
            "text": "采购单",
          },
          {
            "selectedIconPath": "/images/tabBar/my_on.png",
            "iconPath": "/images/tabBar/my_no.png",
            "pagePath": "/pages/user/index",
            "text": "我的",
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartNumber:0,
    isIphoneX: app.globalData.isIPhoneX//app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  
  /**
   * 组件的方法列表
   */
  methods: {
    openTab(e){
      this.setData({
        cartNumber: wx.getStorageSync('cartNumber')
      })
      console.log(e.currentTarget.dataset.url)
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    }
  }
})

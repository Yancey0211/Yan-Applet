# 微信小程序 原生框架(Author:Yancey)

## 说明

### 代码规范

* 采用Less转译css格式规范
* 要求代码层级分明
* 变量：采用驼峰命名法 例:classDetail
* 变量：采用驼峰命名法 例:classDetail.wxml
<!-- * 文件：命名使用下划线分隔 例:class_detail.wxml -->
* 项目布局始终保持以下目录规范（n个导航栏 pages就是n个文件夹+协议+login）

### 自定义TabBar or 原生TabBar
* TabBar代码存在于/components/nav
* TabBar-Icon存在于/components/images/tabBar
* 如需修改自定义tabBar的内容  请移步 app.js中的globalData修改

* 自定义TabBar 使用方法如下：
* * 1. app.js中执行
```
  onLaunch: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
    
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  
  //全局点击事件（自定义方法）
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
  //添加tabBar所需参数
  globalData: {
    systemInfo: null,//客户端设备信息
    isIPhoneX: false, //当前设备是否为 iPhone X
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
          "text": "my"
        },
        {
          "selectedIconPath": "images/tabBar/purchase_on.png",
          "iconPath": "images/tabBar/purchase_no.png",
          "pagePath": "/pages/purchase/index",
          "text": "set"
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
```

* * 2. 在tabBar所属主页面执行
* * * 2.1 页面.json文件添加
```
    "tabbar": "/components/nav"
```
* * * 2.2 页面.js文件添加
```
const app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabbar: {},
	},
	//对wx.hideTabBar的一个封装
	hidetabbar() {
		wx.hideTabBar({
			fail: function () {
				setTimeout(function () { // 做了个延时重试一次，作为保底。
					wx.hideTabBar()
				}, 500)
			}
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		app.editTabbar();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.hidetabbar()
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.hidetabbar();
		app.editTabbar();
	},

})
```

* * 3. 页面.wxml文件 底部添加
```
  <!-- 底部导航栏 -->
  <tabbar tabbar="{{tabbar}}"></tabbar>
```

* 原生TabBar 使用方法如下：
* * 1. 如果不需要自定义tabBar,可参照以上自定义tabBar方法删除文件即可
* * 2. 如只是想暂时隐藏自定义TabBar,展露出原生TabBar。删除自定义tabBar使用方法中的第2点（2.1 and 2.2）即可
* * 3. 注意：如需使用原生tabBar!无论删除或未删除自定义tabBar代码,都需到app.json中修改tabBar对象才能修改原生TabBar内容

### 接口请求
```
  *1.utils/http.js配置域名、项目配置域名
  *2.子文件JS执行:
     var app = getApp(); //最顶部
  //接口请求事件
  userLogin: function () {
    let postdata = {//入参根据情况而定
      data:{
        password: "123qwe",
        phoneNumber: "17608474984"
      }
    }
    //.post API
    app.func.post('intern/user/cerUserLoginByPassword', postdata, (res) => {
      //接口请求成功执行事件
      console.log(res)
    })
    //.get API 
    app.func.get('intern/user/cerUserLoginByPassword', (res) => {
      //接口请求成功执行事件
      console.log(res)
    })
  },
```

### 页面传参
**** 数组传参
  * A页面
```
  let item = JSON.stringify(json)
  wx.navigateTo({
      url: '/xxx?item=' + encodeURIComponent(item)
  })
```
  * B页面
```
  //子页面
  onLoad: function(options){
      let item = JSON.parse(decodeURIComponent(options.item))
  }
```
注：使用encodeURIComponent编码是因为参数中有不识别的字符，可以根据自身情况是否使用

### 项目结构
```
┌─ images               公共图片
├─   ├─ home                首页 图片
├─   ├─ tabbar              底部tabbar 图片
├─   └─ user                我的 图片
├─ lib                  公共文件（UI框架、工具）
├─   ├─ @vant               vant-weapp UI框架
├─   └─ iview               iview-weapp UI框架
├─ components           自定义tabBar
│    └─ images              tabBar所需图片
├─ pages                页面
│    ├─ contract            协议
│    ├─ home                首页
│    ├─    ├─ index                 首页
│    ├─    ├─ specificationDetail   规格详情
│    ├─    ├─ goodsList             商品列表
│    ├─    ├─ goodsDetail           商品详情
│    ├─    ├─ searchs               搜索商品
│    ├─    └─ classifiDetail        分类详情
│    ├─ classify            分类
│    ├─    ├─ index                 分类
│    ├─ inquiry	            询单
│    ├─    ├─ index                 询单
│    ├─ purchase            采购单
│    ├─    ├─ index                 采购单
│    ├─ user                我的
│    ├─    ├─ index                 个人中心
│    ├─    ├─ addressManage         地址管理
│    ├─    ├─ addressEditor         编辑地址
│    ├─    ├─ addressNew            新增地址
│    ├─    ├─ myFootprint           我的足迹
│    ├─    ├─ myCollection          我的收藏
│    ├─    ├─ accountBinding        账号绑定
│    ├─    ├─ personalInformation   个人信息
│    ├─    ├─ about                 关于我们
│    ├─    ├─ emailBinding          邮箱绑定
│    ├─    ├─ myInformation         我的信息
│    ├─    ├─ myInvoice             我的发票
│    ├─    ├─ titleManage           抬头管理
│    ├─    ├─ addInvoice            新增普发抬头
│    ├─    ├─ addValueInvoice       新增增值税抬头
│    ├─    ├─ invoiceDetail         发票详情
│    ├─    ├─ createSalesList       创建销售单
│    ├─    ├─ installServe          安装服务
│    ├─    ├─ installServeDetail    安装服务详情
│    ├─    └─ shareCode             分享码
│    ├─ area                地址搜索页
│    └─ login               登录、注册
├─ utils                工具类
│    ├─ util	              自带时间处理工具
│    ├─ filter.wxs          文章、论坛类时间处理工具
│    └─ http                http接口请求
└─README.md             项目开发说明文档  
```

### 开发环境：
* `node v12.10.0` [安装](http://nodejs.cn/)
* 设置npm源 `npm config set registry https://registry.npm.taobao.org` 
* 拉取项目仓库代码后, 执行 `npm i` or `yarn`


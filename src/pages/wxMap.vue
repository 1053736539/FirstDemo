// pages/otherModule/releaseItems/releaseItems.js
let app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../utils/api.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
//在腾讯地图开放平台申请密钥 http://lbs.qq.com/mykey.html
key: 'EJTBZ-D3XWW-W7GR3-OLU4I-FP375-LOFBQ'
});
var qqmapsdk;
Page({

/**
* 页面的初始数据
*/
data: {
showArea: false,
showAreaword:false,
// 地图
borderRadius: 5,
latitude: 0,
longitude: 0,
markers: [],
mobileLocation: { //移动选择位置数据
longitude: 0,
latitude: 0,
address: '',
},
data: 9,
min: 0, //最少字数
max: 126, //最多字数
serviceList: {},
severtypeIndex: 0,
typeTitleList: {}, // 类型列表
typeIdList: {}, // 类型id列表

imgBaseUrl: app.uploadUrl,
pictureList: [],

requirementsIndex: -1,
experienceIndex: -1,
array: [{
name: '上门',
value: 0,
isChecked: true
}, {
name: '到店',
value: 1,
isChecked: false
}, {
name: '远程',
value: 2,
isChecked: false
}],
index: 0,
},

add() {
let _this = this;
if (!_this.data.serviceList.title) {
wx.showToast({
title: '请输入标题',
icon: 'none'
})
return;
} else if (!_this.data.serviceList.price) {
wx.showToast({
title: '请输入服务价格',
icon: 'none'
})
return;
} else if (!_this.data.serviceList.address) {
wx.showToast({
title: '请选择位置信息',
icon: 'none'
})
return;
}

_this.data.serviceList.servicemode = _this.data.index
// if (_this.data.pictureList && _this.data.pictureList.length > 0){
_this.data.serviceList.pictureList = _this.data.pictureList
_this.data.serviceList.pictureList = _this.data.pictureList
_this.data.serviceList.picture ='';
// console.log(_this.data.serviceList.pictureList)
// console.error(this.data.serviceList)
util.requestApi(
api.serviceApi.addService, _this.data.serviceList,
function (data) {
if (data.data.success) {
wx.navigateBack({
url: '/pages/otherModule/provideServices/provideServices',
})
wx.showToast({
title: data.data.message,
icon: 'none'
})
} else {
wx.showToast({
title: data.data.message,
icon: 'none',
showCancel: false
})
}
}
)
},

// 取页面值
// 标题
titleBind: function (e) {
this.data.serviceList.title = e.detail.value
},
bindkeyword: function (e) {
this.data.serviceList.keyword = e.detail.value
},
// 类型
// bindPickerChange: function (e) {
//   this.setData({
//     severtypeIndex: e.detail.value
//   })
// },
bindAddress: function (e) {
this.data.mobileLocation = e.detail.value
//  console.log(this.data.mobileLocation.address)
},
// 方式
choiseType(e) {
this.setData({
index: e.currentTarget.dataset.index
})
this.typeStyle()
},

typeStyle() {
var s = "array[" + this.data.index + "].isChecked";
for (var i in this.data.array) {
var indexo = "array[" + i + "].isChecked"
this.setData({
[indexo]: false
})
}
this.setData({
[s]: !this.data.array[this.data.index].isChecked,
})
this.data.serviceList.servicemode = this.data.index
// console.log(this.data.pictureList)
},
// 重新获取地理位置
refreshAddress: function () {
let _this = this;

wx.openSetting({
success: (res) => {
_this.getAddress();
}
})


},
// 重新获取地理位置
refreshAddress: function () {
let _this = this;
app.info(app.globalData.latitude)
if (app.globalData.latitude != null && app.globalData.latitude !=''){
this.getAddress()
}else{
wx.openSetting({
success: (res) => {
_this.getAddress();
}
})
}
},

getAddress() {
var addressText='';
//  跳地图
var that = this;
wx.chooseLocation({
success: function (res) {
qqmap.reverseGeocoder({
location: {
latitude: res.latitude,
longitude: res.longitude
},
success: function (data) {
console.log(data)
app.globalData.currentCity = data.result.address_component.city;
app.globalData.latitude = data.result.location.lat;
app.globalData.longitude = data.result.location.lng;

if (res.address.indexOf(data.result.address_component.city)==-1){
addressText = data.result.address_component.city;
}

if (res.address.indexOf(data.result.address_component.district) == -1) {
addressText += data.result.address_component.district;
}

addressText += res.address

let mobileLocation = {
longitude: res.longitude,
latitude: res.latitude,
address: addressText,
};

that.setData({
mobileLocation: mobileLocation,
});
that.data.serviceList.longitude = res.longitude;
that.data.serviceList.latitude = res.latitude;
that.data.serviceList.address = addressText;
},
})


console.log(res)


},
fail: function (err) {
console.log(err);
}
});
},

// // 地址、经纬度
getLocationState(e) {

// 地图组件
qqmapsdk = new QQMapWX({
key: 'EJTBZ-D3XWW-W7GR3-OLU4I-FP375-LOFBQ'
});
var that = this;
//获取位置
wx.getLocation({
type: 'gcj02', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
success: function (res) {
// console.log(res);
var marker = [{
id: 0,
latitude: res.latitude,
longitude: res.longitude,
}];
var mobileLocation = {
latitude: res.latitude,
longitude: res.longitude,
};
that.setData({
latitude: res.latitude,
longitude: res.longitude,
markers: marker,
});
//根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
qqmapsdk.reverseGeocoder({
location: {
latitude: res.latitude,
longitude: res.longitude
},
success: function (addressRes) {
var address = addressRes.result.formatted_addresses.recommend;
mobileLocation.address = address;
// console.log(address)
//当前位置信息
that.setData({
mobileLocation: mobileLocation,
});
}
});
}
});
this.mapCtx = wx.createMapContext('qqMap');
},
// 服务时段
bindpickerwChengeed: function (e) {
this.data.serviceList.serviceinterval = e.detail.value;
},
// 价格
bindpickertChengeed: function (e) {
this.data.serviceList.price = e.detail.value;
},
bindRemarks: function (e) {
this.data.serviceList.remarks = e.detail.value;
// 获取输入框的内容
var value = e.detail.value;
// 获取输入框内容的长度
var len = parseInt(value.length);

//最多字数限制
if (len > this.data.max) return;
// 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
var s = "serviceList.remarks"
this.setData({
[s]: e.detail.value,
});
},


// 图片上传
setCardPic: function (e) {
var arr = this.data.pictureList;
var self = this;
var i = e.currentTarget.dataset.index;
if (arr.length >= 9) {
wx.showToast({
title: '最多只能上传9张图片',
icon: 'none',
duration: 3500
})
} else {
wx.chooseImage({
count: 9 - (this.data.pictureList.length),
sizeType: ['original'],
success: function (res) {
if (res && res.tempFilePaths && res.tempFilePaths.length > 0) {
for (var i = 0; i < res.tempFilePaths.length; i++) {
util.upload('define ', res.tempFilePaths[i], {}, function (res) {
app.info(res)
if (res && res.success) {
arr.push({
title: res.fileName,
filepath: res.filePath
});

if (i == 0) {
wx.setStorageSync('cardpic', res.filePath);
self.setData({
cardpic: res.filePath,
storagecardpic: wx.getStorageSync('cardpic'),
pictureList: arr
});
} else {
wx.setStorageSync('cardpicback', res.filePath);
self.setData({
cardpicback: res.filePath,
storagecardpicback: wx.getStorageSync('cardpicback'),
pictureList: arr
});
}

} else {
wx.showToast({
title: '第' + i + '张图片' + res.message,
icon: 'none',
duration: 3500
})
}
wx.showToast({
title: res.message
})
});
}
}
// console.log(self.data.pictureList)
}
})
}

},

/**
* 删除图片
*/
delImg: function (e) {
var index = e.currentTarget.dataset.index;
var imgs = this.data.pictureList;
var list = [];
for (var i = 0; i < imgs.length; i++) {
if (i != index) {
list.push(imgs[i]);
}
}
this.setData({
pictureList: list
})
// console.log(this.data.pictureList)
},

getDetail(options) {
var _this = this;
util.requestApi(
api.serviceApi.serviceDetail, {
id: this.options.id
},
function (data) {
// console.error(data)
var list = [];
if (data && data.data.result.pictureList != null && data.data.result.pictureList.length > 0) {
data.data.result.pictureList.forEach((item, idx) => {
list.push({
id: item.id,
title: item.title,
filepath: item.filepath

});
})
}
_this.setData({
serviceList: data.data.result,
index: data.data.result.servicemode,
pictureList: list,
})
// console.log(_this.data.pictureList)
_this.typeStyle();
_this.getServiceType();
}
)
},

getServiceType() {
var _this = this;
var typeArr = [];
var titleArr = [];

let serviceType = wx.getStorageSync('serviceType');
if (serviceType) {

let d = serviceType
for (var i in d) {
typeArr.push(d[i].id)
titleArr.push(d[i].title)
}
_this.setData({
typeTitleList: titleArr,
typeIdList: typeArr,
});
if (_this.data.serviceList.servicetype > 0) {
for (var i = 0; i < typeArr.length; i++) {
if (_this.data.serviceList.servicetype == typeArr[i]) {
_this.setData({
severtypeIndex: i
});
}
}
}

} else {
util.requestApi(
api.serviceApi.serviceType, {},
function (data) {
if (data && data.data) {
let d = data.data
for (var i in d) {
typeArr.push(d[i].id)
titleArr.push(d[i].title)
}
_this.setData({
typeTitleList: titleArr,
typeIdList: typeArr,
});
if (_this.data.serviceList.servicetype > 0) {
for (var i = 0; i < typeArr.length; i++) {
if (_this.data.serviceList.servicetype == typeArr[i]) {
_this.setData({
severtypeIndex: i
});
}
}
}
}
wx.setStorageSync('serviceType', data.data);
}

)

}
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
var typeArr = [];
var titleArr = [];

if (options.id != null) {
this.getDetail(options)
this.setData({
id: options.id
});
}
this.getServiceType();

},

/**
* 生命周期函数--监听页面初次渲染完成
*/
onReady: function () {

},

/**
* 生命周期函数--监听页面显示
*/
onShow: function () {

},

/**
* 生命周期函数--监听页面隐藏
*/
onHide: function () {

},

/**
* 生命周期函数--监听页面卸载
*/
onUnload: function () {

},

/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh: function () {

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom: function () {

},

/**
* 用户点击右上角分享
*/
onShareAppMessage: function () {

}
})

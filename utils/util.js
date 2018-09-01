const formatTime = date => {
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()
return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getStorage = (key) => {
  try {
    var v = wx.getStorageSync(key);
    return v;
  } catch (e) {
    return [];
  }
}
const setStorage = (key, cont) => {
  wx.setStorage({
    key: key,
    data: cont
  })
}
module.exports = {
  formatTime: formatTime,
  getStorage: getStorage,
  setStorage: setStorage
}


// util.js   封装常用公共方法

// js解析html标签
function coder(str) {
  var s = "";
  if (str.length == 0) return "";
  for (var i = 0; i < str.length; i++) {
    switch (str.substr(i, 1)) {
      case "<": s += "&lt;"; break;
      case ">": s += "&gt;"; break;
      case "&": s += "&amp;"; break;
      case " ": s += "&nbsp;"; break;
      case "\"": s += "&quot;"; break;
      default: s += str.substr(i, 1); break;
    }
  }
  return s;
}

//输出coder方法  在其他地方可以调用该方法
module.exports = { coder }
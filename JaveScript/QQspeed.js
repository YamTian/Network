/*
Regex: ^https:\/\/mwegame\.qq\.com\/ams\/sign\/doSign\/month
Host: mwegame.qq.com
chavyleung github: https://raw.githubusercontent.com/chavyleung/scripts/master/zsfc/zsfc.js
RAW: https://raw.githubusercontent.com/chiupam/Proxy/individual/Scripts/QQspeed.js
*/
var appName = ''
var speed = init()
var URL = speed.getdata("UrlFC")
var KEY = speed.getdata("CookieFC")

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
   getcookie()
} else {
   sign()
}

function getcookie() {
  var url = $request.url;
  if (url) {
     var UrlKeyFC = "UrlFC";
     var UrlValueFC = url;
     if (speed.getdata(UrlKeyFC) != (undefined || null)) {
        if (speed.getdata(UrlKeyFC) != UrlValueFC) {
           var url = speed.setdata(UrlValueFC, UrlKeyFC);
           if (!url) {
              speed.msg("更新" + appName + "Url失败‼️", "", "");
              } else {
              speed.msg("更新" + appName + "Url成功🎉", "", "");
              }
           } else {
           speed.msg(appName + "Url未变化❗️", "", "");
           }
        } else {
        var url = speed.setdata(UrlValueFC, UrlKeyFC);
        if (!url) {
           speed.msg("首次写入" + appName + "Url失败‼️", "", "");
           } else {
           speed.msg("首次写入" + appName + "Url成功🎉", "", "");
           }
        }
     } else {
     speed.msg("写入" + appName + "Url失败‼️", "", "配置错误, 无法读取URL, ");
     }
  if ($request.headers) {
     var CookieKeyFC = "CookieFC";
     var CookieValueFC = JSON.stringify($request.headers);
     if (speed.getdata(CookieKeyFC) != (undefined || null)) {
        if (speed.getdata(CookieKeyFC) != CookieValueFC) {
           var cookie = speed.setdata(CookieValueFC, CookieKeyFC);
           if (!cookie) {
              speed.msg("更新" + appName + "Cookie失败‼️", "", "");
              } else {
              speed.msg("更新" + appName + "Cookie成功🎉", "", "");
              }
           } else {
           speed.msg(appName + "Cookie未变化❗️", "", "");
           }
        } else {
        var cookie = speed.setdata(CookieValueFC, CookieKeyFC);
        if (!cookie) {
           speed.msg("首次写入" + appName + "Cookie失败‼️", "", "");
           } else {
           speed.msg("首次写入" + appName + "Cookie成功🎉", "", "");
           }
        }
     } else {
     speed.msg("写入" + appName + "Cookie失败‼️", "", "配置错误, 无法读取请求头, ");
     }
  speed.done()
}
   
function sign() {
  const url = { url: URL, headers: JSON.parse(KEY) }
  speed.get(url, (_error, _response, data) => {
    speed.log(`${appName}, data: ${data}`)
    const title = `${appName}`
    let subTitle = ''
    let detail = ''
    const obj = JSON.parse(data)
    if (obj.status == 1 && obj.data == 1) {
      subTitle = ``
    } else if (obj.status == 11 && obj.data == false) {
      subTitle = `掌上飞车`
      detail = `签到结果: ${obj.message}`
    } else {
      subTitle = `掌上飞车`
      detail = `签到结果： ${obj.message}`
    }
    speed.msg(title, subTitle, detail)
    speed.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  put = (url, cb) => {
    if (isSurge()) {
      $httpClient.put(url, cb)
    }
    if (isQuanX()) {
      url.method = 'PUT'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, put, done }
}
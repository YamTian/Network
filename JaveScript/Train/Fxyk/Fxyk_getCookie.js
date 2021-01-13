/*
Type: http-request
Host: w37fhy.cn
Regex: https:\/\/w37fhy\.cn\/mission\/today
Regex: https:\/\/w37fhy\.cn\/wp\-json\/b2\/v1\/getUserInfo

====== Surge ======
飞享一刻获取Cookie = type=http-request, pattern=https:\/\/w37fhy\.cn\/wp\-json\/b2\/v1\/getUserInfo, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Train/Fxyk/Fxyk_getCookie.js
飞享一刻 = type=cron,cronexp="0 0 8 * * *", wake-system=1, timeout=180, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Train/Fxyk/Fxyk.js
*/

const $ = Env();
GetCookie_Fxyk();
$done();

function GetCookie_Fxyk() {
  const oldCookieValue = $.read("Fxyk_Cookie");
  const oldAuthorizationValue = $.read("Fxyk_Authorization");
  const newCookieValue = $request.headers["Cookie"];
  const newAuthorizationValue = $request.headers["Authorization"];
  if (newAuthorizationValue != oldAuthorizationValue && newCookieValue != oldCookieValue) {
    $.write(newAuthorizationValue,"Fxyk_Authorization");
    $.write(newCookieValue,"Fxyk_Cookie");
    $.notify("飞享一刻","","更新Cookie成功")
  }
  if (newAuthorizationValue.length && newAuthorizationValue.length < 1) {
    $.write(newAuthorizationValue,"Fxyk_Authorization");
    $.write(newCookieValue,"Fxyk_Cookie");
    $.notify("飞享一刻","","首次写入Cookie成功")
  }
}

function Env() {
  const isRequest = typeof $request != "undefined"
  const isSurge = typeof $httpClient != "undefined"
  const isQuanX = typeof $task != "undefined"
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message)
    if (isSurge) $notification.post(title, subtitle, message)
  }
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key)
    if (isSurge) return $persistentStore.write(value, key)
  }
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key)
    if (isSurge) return $persistentStore.read(key)
  }
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status
      } else if (response.statusCode) {
        response["status"] = response.statusCode
      }
    }
    return response
  }
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {
        url: options
      }
      options["method"] = "GET"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) $httpClient.get(options, (error, response, body) => {
      callback(error, adapterStatus(response), body)
    })
  }
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = {
        url: options
      }
      options["method"] = "POST"
      $task.fetch(options).then(response => {
        callback(null, adapterStatus(response), response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge) {
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
  }
  const done = (value = {}) => {
    if (isQuanX) return $done(value)
    if (isSurge) isRequest ? $done(value) : $done()
  }
  return {
    isRequest,
    notify,
    write,
    read,
    get,
    post,
    done
  }
};

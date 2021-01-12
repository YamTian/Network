/*
Type: http-request
Host: w37fhy.cn
Regex: https:\/\/w37fhy\.cn\/mission\/today

====== Surge ======
飞享一刻获取Cookie = type=http-request, pattern=https:\/\/w37fhy\.cn\/mission, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Train/Fxyk/Fxyk_getCookie.js
飞享一刻 = type=cron,cronexp="0 0 8 * * *", wake-system=1, timeout=180, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Train/Fxyk/Fxyk.js
*/

const $ = Env();
GetCookie_Fxyk();
$done();

function GetCookie_Fxyk() {
  var CookieKey = "Fxyk_Cookie";
  var AuthorizationKey = "Fxyk_Authorization";
  const CookieVal = $request.headers["Cookie"];
  const AuthorizationVal = $request.headers["Authorization"];
  $.write(CookieVal,CookieKey);
  $.write(AuthorizationVal,AuthorizationKey);
  $.notify("飞享一刻","","写入Cookie成功");
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

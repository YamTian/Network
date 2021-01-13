/*
Type: http-request
Host: w37fhy.cn
// 签到页面
Regex: https:\/\/w37fhy\.cn\/mission\/today
// 签到链接
Regex: https:\/\/w37fhy\.cn\/wp\-json\/b2\/v1\/getUserInfo

====== Surge ======
飞享一刻获取Cookie = type=http-request, pattern=https:\/\/w37fhy\.cn\/wp\-json\/b2\/v1\/getUserInfo, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Train/Fxyk/Fxyk_getCookie.js
飞享一刻 = type=cron,cronexp="0 0 8 * * *", wake-system=1, timeout=180, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Train/Fxyk/Fxyk.js
*/

const BlogName = "飞享一刻";
const $ = Env();
!(async () => {
  if ($.isRequest) {
    GetCookie_Fxyk()
  } else {
      await SignIn_Fxyk()
  }
})().finally(() => $.done())

/*
function GetCookie_Fxyk() {
  const oldCookieValue = $.read("Fxyk_Cookie");
  const oldAuthorizationValue = $.read("Fxyk_Authorization");
  const newCookieValue = $request.headers["Cookie"];
  const newAuthorizationValue = $request.headers["Authorization"];
  if (newAuthorizationValue != oldAuthorizationValue || newCookieValue != oldCookieValue) {
    $.write(newAuthorizationValue,"Fxyk_Authorization");
    $.write(newCookieValue,"Fxyk_Cookie");
    $.notify("飞享一刻","","更新Cookie成功")
  } else if (oldAuthorizationValue.length || oldAuthorizationValue.length < 1) {
    $.write(newAuthorizationValue,"Fxyk_Authorization");
    $.write(newCookieValue,"Fxyk_Cookie");
    $.notify("飞享一刻","","首次写入Cookie成功")
  }
}
*/

function GetCookie_Fxyk() {
  var newAuthorizationValue = $request.headers['Authorization'];
  var oldAuthorizationValue = $.read("Fxyk_Authorization")
  if (oldAuthorizationValue != (undefined || null)) {
      if (oldAuthorizationValue != newAuthorizationValue) {
        $.write(newAuthorizationValue, "Fxyk_Authorization")
        $.notify("更新" + BlogName + " Cookie 成功!!", "", "")
      } else if (oldAuthorizationValue == newAuthorizationValue) {
          $.notify("飞享一刻","","Cookie 没有发生变化!!" )
      }
  } else {
    $.write(AuthorizationValue, "Fxyk_Authorization");
    $.notify("首次写入" + BlogName + " Cookie 成功!!", "", "")
  }
}
 //else {
      //$.notify("写入" + BlogName + "Cookie 失败!!", "", "配置错误, 无法读取请求头, ")
  //}


function SignIn_Fxyk() {
  return new Promise((resolve, reject) => {
  const Fxyk_SignIn = {
      url: "https://w37fhy.cn/wp-json/b2/v1/getUserInfo",
      headers: {
          "Cookie": $.read("Fxyk_Cookie"),
          "Authorization": $.read("Fxyk_Authorization")
      },
      //body: '{"appid":"' + appid + '"}'
  };
  $.post(Fxyk_SignIn, function(_error, _response, _data) {
      const result = JSON.parse(data)
      if (!error) {
          if (result.code == 150200) {
              $.notify(BlogName, "", "签到成功！🎉")
          } else if (result.code == 150201) {
              $.notify(BlogName, "",  "重复签到！😊")
          } else if (result.code == 9001 || result.code ==58000) {
              $.notify(BlogName, "", "Token 失效❗ 请重新获取。️")
          } else {
              console.log("Naixue failed response : \n" + data)
              $.notify(BlogName, "签到失败!! 详情请见日志。", data)
          }
      } else {
          $.notify(BlogName,  "签到接口请求失败，详情请见日志。", error)
      }
      resolve()
  })
})
}

function Env(){const e="undefined"!=typeof $request,t="undefined"!=typeof $httpClient,r="undefined"!=typeof $task,n="undefined"!=typeof $app&&"undefined"!=typeof $http,o="function"==typeof require&&!n,s=(()=>{if(o){const e=require("request");return{request:e}}return null})(),i=(e,s,i)=>{r&&$notify(e,s,i),t&&$notification.post(e,s,i),o&&a(e+s+i),n&&$push.schedule({title:e,body:s?s+"\n"+i:i})},u=(e,n)=>r?$prefs.setValueForKey(e,n):t?$persistentStore.write(e,n):void 0,d=e=>r?$prefs.valueForKey(e):t?$persistentStore.read(e):void 0,l=e=>(e&&(e.status?e.statusCode=e.status:e.statusCode&&(e.status=e.statusCode)),e),f=(e,i)=>{r&&("string"==typeof e&&(e={url:e}),e.method="GET",$task.fetch(e).then(e=>{i(null,l(e),e.body)},e=>i(e.error,null,null))),t&&$httpClient.get(e,(e,t,r)=>{i(e,l(t),r)}),o&&s.request(e,(e,t,r)=>{i(e,l(t),r)}),n&&("string"==typeof e&&(e={url:e}),e.header=e.headers,e.handler=function(e){let t=e.error;t&&(t=JSON.stringify(e.error));let r=e.data;"object"==typeof r&&(r=JSON.stringify(e.data)),i(t,l(e.response),r)},$http.get(e))},p=(e,i)=>{r&&("string"==typeof e&&(e={url:e}),e.method="POST",$task.fetch(e).then(e=>{i(null,l(e),e.body)},e=>i(e.error,null,null))),t&&$httpClient.post(e,(e,t,r)=>{i(e,l(t),r)}),o&&s.request.post(e,(e,t,r)=>{i(e,l(t),r)}),n&&("string"==typeof e&&(e={url:e}),e.header=e.headers,e.handler=function(e){let t=e.error;t&&(t=JSON.stringify(e.error));let r=e.data;"object"==typeof r&&(r=JSON.stringify(e.data)),i(t,l(e.response),r)},$http.post(e))},a=e=>console.log(e),y=(t={})=>{e?$done(t):$done()};return{isQuanX:r,isSurge:t,isJSBox:n,isRequest:e,notify:i,write:u,read:d,get:f,post:p,log:a,done:y}}
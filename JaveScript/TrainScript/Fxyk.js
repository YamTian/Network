/*
Type: http-request
Host: w37fhy.cn
Regex: https:\/\/w37fhy\.cn\/mission\/today // 获取 Cookie 的链接正则表达式

====== Surge ======
飞享一刻获取Cookie = type=http-request, pattern=https:\/\/w37fhy\.cn\/mission, requires-body=1, max-size=-1, script-path=Fxyk.js
飞享一刻 = type=cron,cronexp="0 0 8 * * *", wake-system=1, timeout=180, script-path=Fxyk.js
*/

const blogNmae = "飞享一刻";
const $ = Env(); // 环境
GetCookie_Fxyk(); 
SignIn_Fxyk();
$done();

// 已完成 GetCookie_Fxyk() 函数的编写
function GetCookie_Fxyk() {
    var GetCookieStr = $request.headers["Cookie"]; // 获取当前请求头里面的 Cookie 的值
    var GetAuthorizationStr = $request.headers["Authorization"]; // 获取当前请求头里面的 Authorization 的值
    if (GetCookieStr) { // 开始对 GetCookieStr 的值判断
        if ($.read("Fxyk_Cookie") != undefined) { // 判断 Fxyk_Cookie 有没有值
            if ($.read("Fxyk_Cookie") != GetCookieStr) { // 判断到内存中的 Fxyk_Cookie 的值与当前请求头里面的 Cookie 的值不相等时
                var cookie = $.write(GetCookieStr, "Fxyk_Cookie"); // 将 cookie 定义为 GetCookieStr 的值，命名为 Fxyk_Cookie 的键
                $.write(GetAuthorizationStr, "Fxyk_Authorization") // 写入内存 GetAuthorizationStr 的值，命名为 Fxyk_Authorization 的键
                if (!cookie) {
                    $.notify(blogNmae,"","更新Cookie失败!!!");
                } else {
                    $.notify(blogNmae,"","更新Cookie成功!!!");
                }
            }
        } else {
            if (GetCookieStr != -1) {
                var cookie = $.write(GetCookieStr,"Fxyk_Cookie"); // 将 cookie 定义为 GetCookieStr 的值，命名为 Fxyk_Cookie 的键
                $.write(GetAuthorizationStr, "Fxyk_Authorization") // 写入内存 GetAuthorizationStr 的值，命名为 Fxyk_Authorization 的键
                if (!cookie) {
                    $.notify(blogNmae,"","首次写入Cookie失败!!!");
                } else {
                    $.notify(blogNmae,"","首次写入Cookie成功!!!");
                }
            }
        }
    }
}


// 未完成 SignIn_Fxyk() 函数的编写
function SignIn_Fxyk() { // 定义发起签到请求的函数
    const SignInUrl = "https://w37fhy.cn/wp-json/b2/v1/userMission"; // 签到链接
    const Cookies = $.read("Fxyk_Cookie"); // 从内存读取 Fxyk_Cookie 的值
    // const Authorizations = $.read("Fxyk_Authorization") // 从内存读取 Fxyk_Authorization 的值
    const Headers = {
        Cookie:Cookies, // 请求头包含 Fxyk_Cookie 的值
        // Authorization:Authorizations // 请求头包含 Fxyk_Authorization 的值
    };
    const PostParam = {
        url:SignInUrl, // 发起签到请求
        headers:Headers // 替换请求头
    };
    $.get(PostParam, function (_err, _res, data) {
        // let SucessCode,FailedCode,ExpireCode,ReturnJsonData,StatusCode;
        let FailedCode,ReturnJsonData,StatusCode;
        // SucessCode = "0000"; // 成功状态码 (未知)
        FailedCode = "200"; // 失败状态码(已签到)
        // ExpireCode = "0001"; // Cookie失效状态码 (未知)

        ReturnJsonData = JSON.parse(data); // 获取前端 JSON 数据
        StatusCode  = ReturnJsonData.status; // 获取状态码

        switch(StatusCode) {
            /*
            case SucessCode:
                var SuccessData = ReturnJsonData.data;
                var my_credit = SuccessData.my_credit;
                $notify("飞享一刻——成功","签到成功",`获得积分${my_credit}个`);
                break;
            */
            case FailedCode: // 状态码200
                $notify("飞享一刻","签到失败","您今天已经签到过啦"); // 输出弹窗
                break; // 跳出判断情况
            /*
            case ExpireCode:
                $notify("飞享一刻","","您的Cookies已过期,请重新更新Cookie");
                break;
            */
            default:
                $notify("飞享一刻","","请打开控制台,查看log日志"); // 输出未知错误弹窗
                console.log(data); // 收集错误信息的 dat e数据
        }

        /*
        switch(StatusCode) {
            case SucessCode:
                var SuccessData = ReturnJsonData.data;
                var my_credit = SuccessData.my_credit;
                $notify("飞享一刻——成功","签到成功",`获得积分${my_credit}个`);
                break;
            case FailedCode:
                $notify("飞享一刻——重复","签到失败","您今天已经签到过啦");
                break;
            case ExpireCode:
                $notify("飞享一刻——Cookies过期","","您的Cookies已过期,请重新更新Cookie");
                break;
            default:
                $notify("飞享一刻——未知错误","","请打开控制台,查看log日志");
                console.log(data);
        }
        */
       
    })
}

function Env() {
    const isRequest = typeof $persistentStorerequest != "undefined"
    const isSurge = typeof $persistentStorehttpClient != "undefined"
    const isQuanX = typeof $persistentStoretask != "undefined"
    const notify = (title, subtitle, message) => {
      if (isQuanX) $persistentStorenotify(title, subtitle, message)
      if (isSurge) $persistentStorenotify(title, subtitle, message)
    }
    const write = (value, key) => {
      if (isQuanX) return $persistentStoreprefs.setValueForKey(value, key)
      if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
      if (isQuanX) return $persistentStoreprefs.valueForKey(key)
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
        $persistentStoretask.fetch(options).then(response => {
          callback(null, adapterStatus(response), response.body)
        }, reason => callback(reason.error, null, null))
      }
      if (isSurge) $persistentStorehttpClient.get(options, (error, response, body) => {
        callback(error, adapterStatus(response), body)
      })
    }
    const post = (options, callback) => {
      if (isQuanX) {
        if (typeof options == "string") options = {
          url: options
        }
        options["method"] = "POST"
        $persistentStoretask.fetch(options).then(response => {
          callback(null, adapterStatus(response), response.body)
        }, reason => callback(reason.error, null, null))
      }
      if (isSurge) {
        $persistentStorehttpClient.post(options, (error, response, body) => {
          callback(error, adapterStatus(response), body)
        })
      }
    }
    const done = (value = {}) => {
      if (isQuanX) return $persistentStoredone(value)
      if (isSurge) isRequest ? $persistentStoredone(value) : $persistentStoredone()
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
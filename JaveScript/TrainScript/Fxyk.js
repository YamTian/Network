/*
Type: http-request
Host: w37fhy.cn
Regex: ?????? // 获取 Cookie 的链接正则表达式
*/

if (GetCookieStr == undefined) { // 判断到 GetCookieStr 没有值
  GetCookie_Fxyk(); // 执行 GetCookie_Fxyk() 函数
  ("飞享一刻——错误","","请先获取Cookies之后再试"); // 输出弹窗
} else { // 判断到 GetCookieStr 有值
  SignIn_Fxyk(); // 执行 SignIn_Fxyk() 函数
}
$done();

function GetCookie_Fxyk() { // 定义获取 Cookie 和 Authorization 的函数
  const Headers = $request.headers; // 收集请求头内容
  const GetCookieStr = Headers["Cookie"]; // 收集请求头种 Cookie 的值
  // const GetAuthorizationStr = Headers["Authorization"]; // 收集请求头 Authorization 的值
  $persistentStore.write(GetCookieStr,"Fxyk_Cookie"); // 写入Cookie
  // $persistentStore.write(GetAuthorizationStr,"Fxyk_Authorization") // Authorization(虽然不知道是什么)
  console.log(`写入飞享一刻Cookie成功:$persistentStore{GetCookieStr}`); // 输出日志
  $notification.post("飞享一刻","—写入Cookie成功","查看日志可见详情"); // 输出弹窗
}

function SignIn_Fxyk() { // 定义发起签到请求的函数
  const SignInUrl = "https://w37fhy.cn/wp-json/b2/v1/userMission"; // 签到链接
  const Cookies = $persistentStore.read("Fxyk_Cookie"); // 从内存读取 Fxyk_Cookie 的值
  // const Authorizations = $persistentStore.read("Fxyk_Authorization") // 从内存读取 Fxyk_Authorization 的值
  const Headers = {
      Cookie:Cookies, // 请求头包含 Fxyk_Cookie 的值
      // Authorization:Authorizations // 请求头包含 Fxyk_Authorization 的值
  };
  const PostParam = {
      url:SignInUrl, // 发起签到请求
      headers:Headers // 替换请求头
  };
  $httpClient.post(PostParam, function (_err, _res, data) {
      // let SucessCode,FailedCode,ExpireCode,ReturnJsonData,StatusCode;
      let FailedCode,ReturnJsonData,StatusCode;
      // SucessCode = "0000";
      // SucessCode = "0000"; // 成功状态码 (未知)
      // FailedCode = "0002";
      FailedCode = "200"; // 失败状态码(已签到)
      // ExpireCode = "0001";
      // ExpireCode = "0001"; // Cookie失效状态码 (未知)

      ReturnJsonData = JSON.parse(data); // 获取前端数据
      StatusCode  = ReturnJsonData.status; // 获取状态码

      switch(StatusCode) {
          /*
          case SucessCode:
              var SuccessData = ReturnJsonData.data;
              var my_credit = SuccessData.my_credit;
              $persistentStorenotify("飞享一刻——成功","签到成功",`获得积分$persistentStore{my_credit}个`);
              break;
          */
          case FailedCode: // 状态码200
              $persistentStorenotify("飞享一刻——重复","签到失败","您今天已经签到过啦"); // 输出弹窗
              break; // 跳出判断情况
          /*
          case ExpireCode:
              $persistentStorenotify("飞享一刻——Cookies过期","","您的Cookies已过期,请重新更新Cookie");
              break;
          */
          default:
              $persistentStorenotify("飞享一刻——未知错误","","请打开控制台,查看log日志"); // 输出未知错误弹窗
              console.log(data); // 收集错误信息的 dat e数据
      }

      /*
      switch(StatusCode) {
          case SucessCode:
              var SuccessData = ReturnJsonData.data;
              var my_credit = SuccessData.my_credit;
              $persistentStorenotify("飞享一刻——成功","签到成功",`获得积分$persistentStore{my_credit}个`);
              break;
          case FailedCode:
              $persistentStorenotify("飞享一刻——重复","签到失败","您今天已经签到过啦");
              break;
          case ExpireCode:
              $persistentStorenotify("飞享一刻——Cookies过期","","您的Cookies已过期,请重新更新Cookie");
              break;
          default:
              $persistentStorenotify("飞享一刻——未知错误","","请打开控制台,查看log日志");
              console.log(data);
      }
      */
     
  })
}

/*
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
*/
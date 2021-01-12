/*
调用的时候就用 $.****
    例如： 
        通知 $.notify("标题","副标题","弹窗内容")
        
        写入 $.write(值,"关键字") && $.write(value,”key”)
        读取 $.read("关键字") && $.read(“key”)
            
            Example: 通过某些代码运行获取到的date为 {“fruitShareCode”:”YamTian”}  则fruitShareCode为关键字 值是YamTian (前key后value) 使用$.write(fruitShareCode,”fruitCode”)写入到内存中  前面的fruitShareCode是值 后面的fruitCode是关键字(双引号不能忘) 存入内存就是fruitCode = fruitShareCode = YamTian最后用$.read("fruitCode") 读出值为YamTian
        
        发送请求 $.get (GET请求)
        端口 $.post (POST请求)
        
        结束进程 $.done
*/

const $ = Env();

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

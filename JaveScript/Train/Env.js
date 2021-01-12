const $ = Env();

/*
调用的时候就用 $.****
    例如： 
        通知 $.notify("标题","副标题","弹窗内容")
        写入 $.write
        读取 $.read
        发送请求 $.get
        端口 $.post ???(暂时还不会)
        结束进程 $.done
*/

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
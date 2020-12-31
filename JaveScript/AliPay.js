const $ = new Env()
const sl = "alipay://platformapi/startapp?appId=60000002"
const zy = "alipays://platformapi/startapp?appId=66666674"

$.notify("蚂蚁森林", "", "", sl)
sleep(6000) // 1000=1S
$.notify("蚂蚁庄园", "", "", zy)
$done()

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds) {
    }
}

function Env() {
    _isQuanX = typeof $task != "undefined"
    _isLoon = typeof $loon != "undefined"
    _isSurge = typeof $httpClient != "undefined" && !_isLoon
    this.read = (key) => {
        if (_isQuanX) return $prefs.valueForKey(key)
        if (_isLoon) return $persistentStore.read(key)
    }
    this.notify = (title, subtitle, message, url) => {
        if (_isLoon) $notification.post(title, subtitle, message, url)
        if (_isQuanX) $notify(title, subtitle, message, { "open-url": url })
        if (_isSurge) $notification.post(title, subtitle, message, { url: url })
    }
}
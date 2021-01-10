/*
[Script]
上传京东互助码(双账号版) = type=cron,cronexp="0 0 6 1,10,20 * *", wake-system=1, timeout=180, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Upload_ShareCode2.js

*/

const $ = Env('互助码提交')

const BeanCode1 = $.getdata('BeanCode1');
const FruitCode1 = $.getdata('FruitCode1');
const PetCode1 = $.getdata('PetCode1');
const ZuanCode1 = $.getdata('ZuanCode1');
const CarzyJoy1 = $.getdata('CarzyJoy1');

const BeanCode2 = $.getdata('BeanCode2');
const FruitCode2 = $.getdata('FruitCode2');
const PetCode2 = $.getdata('PetCode2');
const ZuanCode2 = $.getdata('ZuanCode2');
const CarzyJoy2 = $.getdata('CarzyJoy2');

let BeanCodeVal = "";
let FruitCodeVal = "";
let PetCodeVal = "";
let ZuanCodeVal = "";
let JoyCodeVal = "";

const BeanCodeArr = [];
const FruitCodeArr = [];
const PetCodeArr = [];
const ZuanCodeArr = [];
const JoyCodeArr = [];

let K = 0;
let Notice ='';
let Amount;
const Delay = 1 // 单次任务延迟,默认1秒

for (let index = 1; index <= 2; index++) {
    if ($.getdata('BeanCode' + index) === undefined || $.getdata('BeanCode' + index) === '') {
        break
    }
    BeanCodeArr.push($.getdata("BeanCode" + index));    
    FruitCodeArr.push($.getdata("FruitCode" + index));
    PetCodeArr.push($.getdata("PetCode" + index));
    ZuanCodeArr.push($.getdata("ZuanCode" + index));
    JoyCodeArr.push($.getdata("JoyCode" + index));
}
    if 
	(BeanCodeArr.length && FruitCodeArr.length && PetCodeArr.length && ZuanCodeArr.length && JoyCodeArr.length >=1) {
	 Amount = BeanCodeArr.length && FruitCodeArr.length && PetCodeArr.length && ZuanCodeArr.length && JoyCodeArr.length
	}

console.log(`============ 共${Amount}个京东账号  =============\n`)

all();

function all() {
    BeanCodeVal = BeanCodeArr[K];
    FruitCodeVal = FruitCodeArr[K];
    PetCodeVal = PetCodeArr[K];
    ZuanCodeVal = ZuanCodeArr[K];
    JoyCodeVal = JoyCodeArr[K];
    for (let i = 0; i < 9; i++) {
        (function (i) {
        setTimeout(
            function () {
            if (i == 0) {
            console.log(`\n========== 【第${K+1}个账号】 ==========\n`); 
            info();}               
            if (i == 1 )
            UploadBeanCode(); // 种豆得豆            
            if (i == 2 )
            UploadFruitCode(); // 京东农场
            if (i == 3 )
            UploadPetCode(); // 京东萌宠
            if (i == 4)
            UploadZuanCode(); // 京东赚赚
	        if (i == 5 )
            UploadJoyCode(); // 疯狂的JOY
            else  if (i == 6 ) {
                console.log('\r\n种豆得豆:');
                console.log($.BeanCodeBody);
                console.log('\r\n东东农场:');
                console.log($.FruitCodeBody);
                console.log('\r\n东东萌宠:');
                console.log($.PetCodeBody);
                console.log('\r\n京东赚赚:');
                console.log($.ZuanCodeBody);
                console.log('\r\n疯狂的JOY:');
                console.log($.JoyCodeBody);
            }else if (i == 7){  
                if ( K < BeanCodeArr.length - 1) {
                    K += 1;
                    all();
                } else if (K == BeanCodeArr.length - 1) {
                    showmsg(); // 通知
                    $.done();
                }
            }
        },
        (i + 1) * Delay * 1000
    );
    })(i);
  }
}

// 用户名
function info() {
    Notice +=`\n【第${K+1}个账号】\n`
}

// 上传种豆得豆互助码
function UploadBeanCode() {
    return new Promise((resolve) => {
        const url = { 
            url: 'http://api.turinglabs.net/api/v1/jd/bean/create/' + BeanCodeVal + '/',
            headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1'},
	    }
        $.get(url,(_err, resp, data)=> {  
            try {
                const obj = JSON.parse(data)
                $.BeanCodeBody = data // 修改
                if (obj.code == 200) {
                    Information = '添加成功'
                } else if (obj.code == 400) {
                    Information = '已存在'
                } else {
                    Information = '未知错误'
                }
                Notice += `种豆得豆：` + Information + `\n`
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

// 上传东东农场互助码
function UploadFruitCode() { // 修改
    return new Promise((resolve) => {
        const url = { 
            url: 'http://api.turinglabs.net/api/v1/jd/farm/create/' + FruitCodeVal + '/', // 修改
            headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1'},
	    }
        $.get(url,(_err, resp, data)=> {  
            try {
                const obj = JSON.parse(data)
                $.FruitCodeBody = data // 修改
                if (obj.code == 200) {
                    Information = '添加成功'
                } else if (obj.code == 400) {
                    Information = '已存在'
                } else {
                    Information = '未知错误'
                }
                Notice += `东东农场：` + Information + `\n` // 修改
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

// 上传东东萌宠互助码
function UploadPetCode() { // 修改
    return new Promise((resolve) => {
        const url = { 
            url: 'http://api.turinglabs.net/api/v1/jd/farm/create/' + PetCodeVal + '/', // 修改
            headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1'},
	    }
        $.get(url,(_err, resp, data)=> {  
            try {
                const obj = JSON.parse(data)
                $.PetCodeBody = data // 修改
                if (obj.code == 200) {
                    Information = '添加成功'
                } else if (obj.code == 400) {
                    Information = '已存在'
                } else {
                    Information = '未知错误'
                }
                Notice += `东东萌宠：` + Information + `\n` // 修改
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

// 上传京东赚赚互助码
function UploadZuanCode() { // 修改
    return new Promise((resolve) => {
        const url = { 
            url: 'https://code.chiang.fun/api/v1/jd/jdzz/create/' + ZuanCodeVal + '/', // 修改
            headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1'},
	    }
        $.get(url,(_err, resp, data)=> {  
            try {
                const obj = JSON.parse(data)
                $.ZuanCodeBody = data // 修改
                if (obj.code == 200) {
                    Information = '添加成功'
                } else if (obj.code == 400) {
                    Information = '已存在'
                } else {
                    Information = '未知错误'
                }
                Notice += `京东赚赚：` + Information + `\n` // 修改
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

// 上传疯狂的JOY互助码
function UploadJoyCode() { // 修改
    return new Promise((resolve) => {
        const url = { 
            url: 'https://code.chiang.fun/api/v1/jd/jdcrazyjoy/create/' + JoyCodeVal + '/', // 修改
            headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1'},
	    }
        $.get(url,(_err, resp, data)=> {  
            try {
                const obj = JSON.parse(data)
                $.JoyCodeBody = data // 修改
                if (obj.code == 200) {
                    Information = '添加成功'
                } else if (obj.code == 400) {
                    Information = '已存在'
                } else {
                    Information = '未知错误'
                }
                Notice += `疯狂的JOY：` + Information + `\n` // 修改
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

function showmsg() {
  return new Promise((resolve) => {
    $.msg('提交互助码', "", Notice); 
    resolve()
  })
}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

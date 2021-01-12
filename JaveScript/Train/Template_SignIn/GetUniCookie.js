//MITM:m.client.10010.com
//Regex:https:\/\/m\.client\.10010\.com\/mobileservice.+?\/.+?\?
//http-request
//Uni_Cookie

GetUniCookie();
// done(); // QX & Surge 必须调用 done();

function GetUniCookie()
{
    const Headers = $request.headers;
    const GetCookieStr = Headers["Cookie"];
    $persistentStore.write(GetCookieStr,"Uni_Cookie");
    console.log(`写入联通Cookie成功:${GetCookieStr}`);
    $notification.post("联通签到-写入Cookie成功","","请禁用脚本,也可查看LOG日志进行复制");
}

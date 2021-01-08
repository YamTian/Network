/*
[Script]
幕布 SVIP = type=http-response, pattern=^https?:\/\/api2\.mubu\.com\/v3\/api\/user\/current_user, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Mubu_SVIP.js

[MITM]
hostname = mubu.com
*/

var obj = JSON.parse($response.body);
 obj={
 "code": 0,
 "msg": null,
 "data": {
    "facebookId": "",
    "facebookName": "",
    "province": "",
    "encryptPassword": null,
    "passSecure": false,
    "qqId": "",
    "updateTime": 1602941084029,
    "sort": "time",
    "googleName": "",
    "vipEndDate": "20330912",
    "city": "",
    "year": "",
    "agreeTermService": false,
    "name": "嘤嘤嘤",
    "appleName": "",
    "id": 4960640,
    "gender": "",
    "level": 2,
    "email": "",
    "wxId": "",
    "wxName": "",
    "phone": null,
    "toutiaoId": "",
    "appleId": "",
    "qqName": "",
    "view": "grid",
    "larkId": "",
    "googleId": "",
    "photo": "",
    "remark": "",
    "createTime": 1592534977160,
    "anonymUserFlag": 0
 }
};
$done({body: JSON.stringify(obj)});
//

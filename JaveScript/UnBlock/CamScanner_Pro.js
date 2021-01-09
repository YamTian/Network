/*
[Script]
全能扫描王 Pro = type=http-response, pattern=^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\?, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/UnBlock/CamScanner_Pro.js

[Mitm]
hostname = ap*.intsig.net
*/

let obj = JSON.parse($response.body);
obj = {"data":{"psnl_vip_property":{"expiry":"1643731200"}}};
$done({body: JSON.stringify(obj)});

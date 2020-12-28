/*
全能扫描王 Pro = type=http-response, pattern=^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\?, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/CamScanner_Pro.js
*/

let obj = JSON.parse($response.body);
obj = {"data":{"psnl_vip_property":{"expiry":"1675267200"}}};
$done({body: JSON.stringify(obj)});

/*
[Script]
美易 Pro = type=http-response, pattern=https:\/\/api\.(picsart|meiease)\.c(n|om)\/users\/show\/me\.json, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/UnBlock/PicsArt_Pro.js

[Mitm]
hostname = api.picsart.c*, api.meiease.c*
*/

var obj = JSON.parse($response.body);
obj.subscription.granted = "true";
$done({body: JSON.stringify(obj)});

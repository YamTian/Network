/*
[Script]
X-Mind SVIP = type=http-response, pattern=https:\/\/www\.xmind\.cn\/_res\/devices, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/X-Mind_SVIP.js

[MITM]
hostname = www.xmind.cn
*/

var obj = JSON.parse($response.body);
obj = {"raw_data": "S0MY6Wu5wpkW52RE5XmMkSMfTBvnytTwIJODrtVDjnA0axrORbnv9gh1RC4W3/ejTfQhNBb7CVxxpbYnBBk2tHc4gAODhsuGpHkltYNL/P5dfORSpdbiNkAZr5aBBbHS/dNlaYjLYyBkq9Ohfe0QS9PeXOWLbDdNA6kqidLJysw=", "license":{"status":"sub","expireTime":9999999999999}, "_code": 200}
$done({body: JSON.stringify(obj)});
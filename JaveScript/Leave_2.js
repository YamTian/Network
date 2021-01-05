/*
[Script]
修改假条 2 = type=http-response,pattern=^http?:\/\/xg\.kmmu\.edu.cn\/KmmcXG\/webapi\/api\/Leave\/AllLeaveManage\_Edit\?LoginStatus\=,requires-body=1,max-size=-1,script-path=Leave_2.js

[Mitm]
hostname = %APPEND% xg.kmmu.edu.cn
*/

var obj = JSON.parse($response.body);
 obj= {
    // 以下为需要修改的假条信息
    // 请假内容(必填)
    "LeaveType": "事假", // 请假类型
    "LeaveThing": "", // 请假事由
    "OutAddress": "", // 外出地点
    // 外出联系人信息(可不填)
    "OutName": "", // 姓名
    "OutMoveTel": "", // 移动电话
    "OutTel": "", // 固定电话
    "Relation": "", // 与本人关系
    // 本人信息(必填)
    "StuMoveTel": "", // 联系电话
    "StuOtherTel": "", // 其他联系方式
    // 家长信息(必填)
    "ParentContacts": "", // 家长联系人
    "ParentTel": "", // 家长联系方式
    // 往返交通工具(必须修改)
    "LeaveBeginDate": "2021-01-11", // 去-日期
    "Inputdate": "2021-01-11", // 去-日期
    "GoDate": "2021-01-11", // 去-日期
    "LeaveEndDate": "2021-01-11", // 返-日期
    "BackDate": "2021-01-11", // 返-日期
    
    // 以下数据不要随意修改
    "DisLeaveDate": null,
    "WithNumNo": 0,
    "FDYStatus": "2",
    "LeaveNumNo": 1.00,
    "GoOut": "1",
    "FDYThing": "同意",
    "SpStatus": null,
    "Status": "5",
    "GoOutConfirm": null,
    "StuName": null,
    "studentId": "202020020",
    "XYThing": null,
    "OverStatus": 1,
    "ID": 0001,
    "DisLeaveMen": null,

    // 以下数据可按个人需求修改
    "LeaveBeginTime": "10", // 去-整时
    "GoTime": "10", // 去-整时
    "LeaveEndTime": "22", // 返-整时
    "BackTime": "22", // 返-整时
    "GoVehicle": "汽车", // 去-交通工具
    "BackVehicle": "汽车", // 返-交通工具


  };
$done({body: JSON.stringify(obj)});
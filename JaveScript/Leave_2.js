/*
[Script]
修改假条 2 = type=http-response,pattern=^http?:\/\/xg\.kmmu\.edu.cn\/KmmcXG\/webapi\/api\/Leave\/AllLeaveManage\_Edit\?LoginStatus\=,requires-body=1,max-size=-1,script-path=Leave_2.js

[Mitm]
hostname = %APPEND% xg.kmmu.edu.cn
*/

var obj = JSON.parse($response.body);
 obj= {
     // 以下为需要修改的假条信息
    "LeaveType": "事假", // 请假类型
    "LeaveThing": "修手机", // 请假事由
    "OutAddress": "云南省昆明市呈贡区七彩云南第一城", // 外出地点

    "OutName": "", // 外出联系人信息-姓名
    "OutMoveTel": "", // 外出联系人信息-移动电话
    "OutTel": null, // 外出联系人信息-固定电话
    "Relation": "", // 外出联系人信息-与本人关系

    "StuMoveTel": "19969266266", // 本人信息-联系电话
    "StuOtherTel": "", // 本人信息-其他联系方式

    "ParentContacts": "", // 家长信息-家长联系人
    "ParentTel": "", // 家长信息-家长联系方式

    "LeaveBeginDate": "2021-01-11", // 往返交通工具-去-日期(三者需要相同)
    "Inputdate": "2021-01-11", // 往返交通工具-去-日期(三者需要相同)
    "GoDate": "2021-01-11", // 往返交通工具-去-日期(三者需要相同)

    "LeaveBeginTime": "15",// 往返交通工具-去-整时(二者需要相同)
    "GoTime": "15", // 往返交通工具-去-整时(二者需要相同)

    "GoVehicle": "汽车", // 往返交通工具-去-交通工具(二者需要相同)

    "LeaveEndDate": "2021-01-11", // 往返交通工具-返-日期(二者需要相同)
    "BackDate": "2021-01-11", // 往返交通工具-返-日期(二者需要相同)

    "LeaveEndTime": "20", // 往返交通工具-返-整时(二者需要相同)
    "BackTime": "20", // 往返交通工具-返-整时(二者需要相同)

    "BackVehicle": "汽车", // 往返交通工具-返-交通工具

    // 以下数据不需要修改
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
    "studentId": "201805001",
    "XYThing": null,
    "OverStatus": 1,
    "ID": 0001,
    "DisLeaveMen": null,

  };
$done({body: JSON.stringify(obj)});
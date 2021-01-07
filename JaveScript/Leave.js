/*
[Script]
易班假条 = type=http-response,pattern=^http?:\/\/xg\.kmmu\.edu.cn\/KmmcXG\/webapi\/api\/Leave,requires-body=1,max-size=-1,script-path=Leave.js

[Mitm]
hostname = %APPEND% xg.kmmu.edu.cn
*/

// 请修改以下数据
var Month = "01"; // 月
var Day = "11"; // 日
var OutAddress = "北京市朝阳区"; // 外出地点
var LeaveThing = "外出"; // 请假事由
var StudentTel = "13813800580"; // 学生手机
var ParentName = "李四"; // 家长姓名
var ParentTel = "13813800590"; // 家长手机

// 以下数据不可修改
var Year = "2021";
var Today = Year + "-" + Month + "-" + Day;
var Url = $request.url;
var Body = JSON.parse($response.body);

if (Url.indexOf('Edit') == -1) {
  Body= {
    "AllLeaveManages": [
      {
        "LeaveType": "事假", // 请假类型
        "WithNumNo": "0", // 同行人数
        "OutAddress": OutAddress,  // 外出地点
        "FDYThing": "同意", // 同意请假
        "Status": "假期中", // 假期中、审批中
        "ID": 1, // 随便4位数以获取别人的请假信息
        "LeaveBeginDate": Today, // 起始日期
        "LeaveBeginTime": "10", // 起始时间(小时)
        "LeaveEndDate": Today, // 结束日期
        "LeaveEndTime": "22", // 结束时间(小时)
        "LeaveNumNo": 0.50, // 用请假时长/24的值
      }
    ],
    "IsLeave": 1 // 是否在请假状态
  };
}
else {
  Body= {
    // 请假内容(必填)
    "LeaveType": "事假", // 请假类型
    "LeaveThing": LeaveThing, // 请假事由
    "OutAddress": OutAddress, // 外出地点
    // 外出联系人信息(可不填)
    "OutName": "", // 姓名
    "OutMoveTel": "", // 移动电话
    "OutTel": "", // 固定电话
    "Relation": "", // 与本人关系
    // 本人信息(必填)
    "StuMoveTel": StudentTel, // 联系电话
    "StuOtherTel": "", // 其他联系方式
    // 家长信息(必填)
    "ParentContacts": ParentName, // 家长联系人
    "ParentTel": ParentTel, // 家长联系方式
    // 往返交通工具(必须修改)
    "LeaveBeginDate": Today, // 去-日期
    "Inputdate": Today, // 去-日期
    "GoDate": Today, // 去-日期
    "LeaveEndDate": Today, // 返-日期
    "BackDate": Today, // 返-日期
      
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
    "ID": 1,
    "DisLeaveMen": null,

    // 以下数据可按个人需求修改
    "LeaveBeginTime": "10", // 去-整时
    "GoTime": "10", // 去-整时
    "LeaveEndTime": "22", // 返-整时
    "BackTime": "22", // 返-整时
    "GoVehicle": "汽车", // 去-交通工具
    "BackVehicle": "汽车", // 返-交通工具
  };
}
$done({body: JSON.stringify(Body)});
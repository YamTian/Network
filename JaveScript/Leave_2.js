var Month = "01"; // 月
var Day = "11"; // 日
var OutAddress = "北京市朝阳区"; // 外出地点
var LeaveThing = "外出"; // 请假事由
var StudentTel = "13813800580"; // 学生联系电话
var ParentName = "张三"; // 家长联系人姓名
var ParentTel = "13813800590"; // 家长联系方式

var Year = "2021";
var Today = Year + "-" + Month + "-" + Day;

var obj = JSON.parse($response.body);
 obj= {
    // 请假内容
    "LeaveType": "事假", // 请假类型
    "LeaveThing": LeaveThing, // 请假事由
    "OutAddress": OutAddress, // 外出地点
    // 外出联系人信息
    "OutName": "", // 姓名
    "OutMoveTel": "", // 移动电话
    "OutTel": "", // 固定电话
    "Relation": "", // 与本人关系
    // 本人信息
    "StuMoveTel": StudentTel, // 学生联系电话
    "StuOtherTel": "", // 学生其他联系方式
    // 家长信息
    "ParentContacts": ParentName, // 家长联系人
    "ParentTel": ParentTel, // 家长联系方式
    // 往返交通工具
    "LeaveBeginDate": Today, // 去-日期
    "Inputdate": Today, // 去-日期
    "GoDate": Today, // 去-日期
    "LeaveEndDate": Today, // 返-日期
    "BackDate": Today, // 返-日期
    
    // 以下数据不可修改
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

    // 以下数据不必修改
    "LeaveBeginTime": "10", // 去-整时
    "GoTime": "10", // 去-整时
    "LeaveEndTime": "22", // 返-整时
    "BackTime": "22", // 返-整时
    "GoVehicle": "汽车", // 去-交通工具
    "BackVehicle": "汽车", // 返-交通工具


  };
$done({body: JSON.stringify(obj)});
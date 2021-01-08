const month = $persistentStore.read('Month') || ''; 
const day = $persistentStore.read('Day') || ''; 
const leaveType = $persistentStore.read('LeaveType') || '事假'; 
const leaveThing = $persistentStore.read('LeaveThing') || ''; 
const outAddress = $persistentStore.read('OutAddress') || ''; 
const studentTel = $persistentStore.read('StudentTel') || ''; 
const parentName = $persistentStore.read('ParentName') || ''; 
const relation = $persistentStore.read('Relation') || ''; 
const parentTel = $persistentStore.read('ParentTel') || ''; 
const withNumNo = $persistentStore.read('WithNumNo') || '0'; 
const vehicle = $persistentStore.read('Vehicle') || '汽车'; 

var Year = "2021";
var Today = Year + "-" + month + "-" + day;
var Url = $request.url;
var Body = JSON.parse($response.body);

if (Url.indexOf('Edit') == -1) {
  Body= {
    "AllLeaveManages": [
      {
        "LeaveType": leaveType, // 请假类型
        "WithNumNo": withNumNo, // 同行人数
        "OutAddress": outAddress,  // 外出地点
        "FDYThing": "同意", // 同意请假
        "Status": "假期中", // 假期中、审批中
        "ID": 1, // 随便4位数以获取别人的请假信息
        "LeaveBeginDate": Today, // 去-日期
        "LeaveBeginTime": "10", // 去-整时
        "LeaveEndDate": Today, // 返-日期
        "LeaveEndTime": "22", // 返-整时
        "LeaveNumNo": 0.50, // 用请假时长/24的值(手动填写)
      }
    ],
    "IsLeave": 1 // 是否在请假状态
  };
}
else {
  Body= {
    // 请假内容
    "LeaveType": leaveType, // 请假类型
    "LeaveThing": leaveThing, // 请假事由
    "OutAddress": outAddress, // 外出地点
    // 外出联系人信息(可不填)
    "OutName": parentName, // 姓名
    "OutMoveTel": parentTel, // 移动电话
    "OutTel": "", // 固定电话
    "Relation": relation, // 与本人关系
    // 本人信息
    "StuMoveTel": studentTel, // 联系电话
    "StuOtherTel": "", // 其他联系方式
    // 家长信息
    "ParentContacts": parentName, // 家长联系人
    "ParentTel": parentTel, // 家长联系方式
    // 往返时间
    "LeaveBeginDate": Today, // 去-日期
    "Inputdate": Today, // 去-日期
    "GoDate": Today, // 去-日期
    "LeaveEndDate": Today, // 返-日期
    "BackDate": Today, // 返-日期
      
    // 以下数据不可修改
    "DisLeaveDate": null,
    "WithNumNo": withNumNo, // 同行人数
    "FDYStatus": "2",
    "LeaveNumNo": 1.00, // 用请假时长/24的值(自动生成)
    "GoOut": "1", // 是否外出离校
    "FDYThing": "同意",
    "SpStatus": null,
    "Status": "5",
    "GoOutConfirm": null,
    "StuName": null, // 学生姓名
    "studentId": "202020020", // 学生学号
    "XYThing": null,
    "OverStatus": 1,
    "ID": 1, // 随便4位数以获取别人的请假信息
    "DisLeaveMen": null,

    // 以下数据不必修改
    "LeaveBeginTime": "10", // 去-整时
    "GoTime": "10", // 去-整时
    "LeaveEndTime": "22", // 返-整时
    "BackTime": "22", // 返-整时
    "GoVehicle": vehicle, // 去-交通工具
    "BackVehicle": vehicle, // 返-交通工具
  };
}
$done({body: JSON.stringify(Body)});

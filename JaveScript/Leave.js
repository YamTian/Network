const OS = $persistentStore.read('OutAddress') || '北京市朝阳区'; 
const LT = $persistentStore.read('LeaveThing') || '外出购物'; 
const ST = $persistentStore.read('StudentTel') || '13813800580'; 
const PN = $persistentStore.read('ParentName') || '李四'; 
const PT = $persistentStore.read('ParentTel') || '13813800590'; 
const WNN = $persistentStore.read('WithNumNo') || '0'; 
const month = $persistentStore.read('Month') || '01'; 
const day = $persistentStore.read('Day') || '01'; 

var Year = "2021";
var Today = Year + "-" + month + "-" + day;
var Url = $request.url;
var Body = JSON.parse($response.body);

if (Url.indexOf('Edit') == -1) {
  Body= {
    "AllLeaveManages": [
      {
        "LeaveType": "事假", // 请假类型
        "WithNumNo": WNN, // 同行人数
        "OutAddress": OA,  // 外出地点
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
    "LeaveThing": LT, // 请假事由
    "OutAddress": OA, // 外出地点
    // 外出联系人信息(可不填)
    "OutName": "", // 姓名
    "OutMoveTel": "", // 移动电话
    "OutTel": "", // 固定电话
    "Relation": "", // 与本人关系
    // 本人信息(必填)
    "StuMoveTel": ST, // 联系电话
    "StuOtherTel": "", // 其他联系方式
    // 家长信息(必填)
    "ParentContacts": PN, // 家长联系人
    "ParentTel": PT, // 家长联系方式
    // 往返交通工具(必须修改)
    "LeaveBeginDate": Today, // 去-日期
    "Inputdate": Today, // 去-日期
    "GoDate": Today, // 去-日期
    "LeaveEndDate": Today, // 返-日期
    "BackDate": Today, // 返-日期
      
    // 以下数据不要随意修改
    "DisLeaveDate": null,
    "WithNumNo": WNN,
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

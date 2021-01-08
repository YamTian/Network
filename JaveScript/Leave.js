const beginDay = $persistentStore.read('BeginDay') || ''; // 从 BoxJs 里面获取请假起始日期
const endDay = $persistentStore.read('EndDay') || ''; // 从 BoxJs 里面获取请假结束日期
var newDate = new Date(); // 获取当前日期
var Month = newDate.getMonth() + 1; // 用myDate.getMonth()获取的1月份输出是0
var newMonth = ('0' + Month).slice(-2); // 月份补零
var newbeginDay = ('0' + beginDay).slice(-2); // 请假起始日期补零
var newendDay = ('0' + endDay).slice(-2); // 请假结束日期补零
var Year = "2021"; // 当前年份:2021年
var BeginDate = Year + "-" + newMonth + "-" + newbeginDay; // 组合请假起始日期成为新的请假起始日期
var EndDate = Year + "-" + newMonth + "-" + newendDay; // 组合请假结束日期成为新的请假结束日期
var LeaveNumNo = (endDay-beginDay+0.50).toFixed(2); // 计算请假时长并保留两位小数

var Url = $request.url; // 定义响应体 Url
var Body = JSON.parse($response.body);

if (Url.indexOf('Edit') == -1) { // 响应体 Url 不包含 Edit
  Body= {
    "AllLeaveManages": [
      {
        "LeaveType": $persistentStore.read('LeaveType') || '事假', // 请假类型
        "WithNumNo": $persistentStore.read('WithNumNo') || '0', // 同行人数
        "OutAddress": $persistentStore.read('OutAddress') || '',  // 外出地点
        "FDYThing": "同意", // 同意请假
        "Status": "假期中", // 假期中、审批中
        "ID": 1, // 随便4位数以获取别人的请假信息
        "LeaveBeginDate": BeginDate, // 去-日期
        "LeaveBeginTime": "10", // 去-整时
        "LeaveEndDate": EndDate, // 返-日期
        "LeaveEndTime": "22", // 返-整时
        "LeaveNumNo": LeaveNumNo,
      }
    ],
    "IsLeave": 1 // 是否在请假状态
  };
}
else { // 响应体 Url 包含 Edit
  Body= {
    // 请假内容
    "LeaveType": $persistentStore.read('LeaveType') || '事假', // 请假类型
    "LeaveThing": $persistentStore.read('LeaveThing') || '', // 请假事由
    "OutAddress": $persistentStore.read('OutAddress') || '', // 外出地点
    // 外出联系人信息
    "OutName": $persistentStore.read('ParentName') || '', // 姓名
    "OutMoveTel": $persistentStore.read('ParentTel') || '', // 移动电话
    "OutTel": "", // 固定电话
    "Relation": $persistentStore.read('Relation') || '', // 与本人关系
    // 本人信息
    "StuMoveTel": $persistentStore.read('StudentTel') || '', // 联系电话
    "StuOtherTel": "", // 其他联系方式
    // 家长信息
    "ParentContacts": $persistentStore.read('ParentName') || '', // 家长联系人
    "ParentTel": $persistentStore.read('ParentTel') || '', // 家长联系方式
    // 往返时间
    "LeaveBeginDate": BeginDate, // 去-日期
    "Inputdate": BeginDate, // 去-日期
    "GoDate": BeginDate, // 去-日期
    "LeaveEndDate": EndDate, // 返-日期
    "BackDate": EndDate, // 返-日期
    // 往返交通工具
    "GoVehicle": $persistentStore.read('Vehicle') || '汽车', // 去-交通工具
    "BackVehicle": $persistentStore.read('Vehicle') || '汽车', // 返-交通工具
      
    // 以下数据不可修改
    "DisLeaveDate": null,
    "WithNumNo": $persistentStore.read('WithNumNo') || '0', // 同行人数
    "FDYStatus": "2",
    "LeaveNumNo": LeaveNumNo,
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
  };
}
$done({body: JSON.stringify(Body)});

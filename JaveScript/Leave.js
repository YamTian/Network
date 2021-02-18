// 获取当前年月日
var newDate = new Date(); // 定义 newDate 
var Year = newDate.getFullYear(); // 获取当前年份
var Month = newDate.getMonth() + 1; // 获取当前月份
var Day = newDate.getDate(); // 获取当前日期
var Hours = newDate.getHours() + 1; // 获取当前小时数+1的值

// 为月日小时数补零
var current_month = ('0' + Month).slice(-2); // 月份补零
var current_date = ('0' + Day).slice(-2); // 日期补零
var current_hours =  ('0' + Hours).slice(-2); // 小时数补零

// 从 BoxJs 内获取数据
const begin_date = $persistentStore.read('begin_date') || current_date; // 从 BoxJs 里面获取请假起始日期
const end_date = $persistentStore.read('end_date') || current_date; // 从 BoxJs 里面获取请假结束日期
const begin_hours = $persistentStore.read('begin_hours') || '08'; // 从 BoxJs 里面获取请假开始小时数

// 为月日小时数补零
var BeginDate = ('0' + begin_date).slice(-2); // 请假起始日期补零
var EndDate = ('0' + end_date).slice(-2); // 请假结束日期补零
var BeginTime = ('0' + begin_hours).slice(-2); // 请假开始小时数补零

// 组合请假时间
var LeaveBeginDate = Year + "-" + current_month + "-" + BeginDate; // 请假起始日期
var LeaveEndDate = Year + "-" + current_month + "-" + EndDate; // 请假结束日期
var LeaveNumNo = (EndDate-BeginDate+current_hours/24-BeginTime/24).toFixed(2); // 计算请假总时长并保留两位小数

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
        "LeaveBeginDate": LeaveBeginDate, // 去-日期
        "LeaveBeginTime": BeginTime, // 去-整时
        "LeaveEndDate": LeaveEndDate, // 返-日期
        "LeaveEndTime": current_hours, // 返-整时
        "LeaveNumNo": LeaveNumNo, // 离校总时长
      }
    ],
    "IsLeave": 1 // 是否在请假状态
  };
}
else { // 响应体 Url 包含 Edit
  Body= {
    // 请假内容
    "LeaveType": $persistentStore.read('LeaveType') || '事假', // 请假类型
    "LeaveThing": $persistentStore.read('LeaveThing') || '有事外出', // 请假事由
    "OutAddress": $persistentStore.read('OutAddress') || '', // 外出地点
    // 外出联系人信息(实际为本人信息)
    "OutName": $persistentStore.read('StudentName') || '', // 姓名
    "OutMoveTel": $persistentStore.read('StudentTel') || '', // 移动电话
    "OutTel": "", // 固定电话
    "Relation": "本人", // 与本人关系
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
    // 往返时间
    "LeaveBeginTime": BeginTime, // 去-整时
    "GoTime": BeginTime, // 去-整时
    "LeaveEndTime": current_hours, // 返-整时
    "BackTime": current_hours, // 返-整时
    // 往返交通工具
    "GoVehicle": $persistentStore.read('Vehicle') || '汽车', // 去-交通工具
    "BackVehicle": $persistentStore.read('Vehicle') || '汽车', // 返-交通工具
    // 以下数据不可修改
    "StuName": $persistentStore.read('StudentName') || '', // 学生姓名
    "WithNumNo": $persistentStore.read('WithNumNo') || '0', // 同行人数
    "LeaveNumNo": LeaveNumNo, // 离校总时长
    "GoOut": "1", // 是否外出离校
    "studentId": "202020020", // 学生学号
    "ID": 1, // 随便4位数以获取别人的请假信息
    "DisLeaveDate": null,
    "FDYStatus": "2",
    "FDYThing": "同意",
    "SpStatus": null,
    "Status": "5",
    "GoOutConfirm": null,
    "XYThing": null,
    "OverStatus": 1,
    "DisLeaveMen": null,
  };
}

$done({body: JSON.stringify(Body)});

/*
git:https://github.com/YamTian/Network/blob/master/JaveScript/Leave.js
raw:https://raw.githubusercontent.com/YamTian/Network/master/JaveScript/Leave.js
plugin:https://raw.githubusercontent.com/YamTian/Network/master/Loon/As_For_Leave.plugin
sgmoudule:https://raw.githubusercontent.com/YamTian/Network/master/Surge/Ask_For_Leave.sgmodule
*/

// 获取当前年月日
var newDate = new Date(); // 定义 newDate 
var Year = newDate.getFullYear(); // 获取当前年份
var Month = newDate.getMonth() + 1; // 获取当前月份
var Day = newDate.getDate(); // 获取当前日期
var Hour = newDate.getHours(); // 获取当前小时数的值

Hours = Hour + 1; // 定义 Hours 为当前小时数+1的值

// 判断当前时间是否为凌晨时段
if (Hours < 10) { // 是
  Hours = 8;
  end_date_q = Day + 1
} else { // 否
  if (Hours >= 11) {
    auto_begin_hours = Hour - 3; // 自动计算请假起始小时数
    var auto_begin_hours = ('0' + auto_begin_hours).slice(-2); // 自动请假起始小时数补零
  };
  end_date_q = Day
};

var preset_begin_date = ('0' + Day).slice(-2); // 起始日期补零
var preset_end_date = ('0' + end_date_q).slice(-2); // 结束日期补零
var current_hours =  ('0' + Hours).slice(-2); // 小时数补零

// 从 BoxJs 内获取各个数据
const isLeave = $persistentStore.read('isLeave') || 'true'; // 是否开启请假模式
const begin_date = $persistentStore.read('begin_date') || preset_begin_date; // 请假起始日期
const end_date = $persistentStore.read('end_date') || preset_end_date; // 请假结束日期
const begin_hours = $persistentStore.read('begin_hours') || auto_begin_hours || '08'; // 请假起始小时数
const end_hours = $persistentStore.read('end_hours') || current_hours; // 请假结束小时数
const LeaveType = $persistentStore.read('LeaveType') || '事假'; // 请假类型
const LeaveThing = $persistentStore.read('LeaveThing') || '有事外出'; // 请假事由
const WithNumNo = $persistentStore.read('WithNumNo') || '0'; // 同行人数
const OutAddress = $persistentStore.read('OutAddress') || ''; // 外出地点
const StudentName = $persistentStore.read('StudentName') || ''; // 姓名
const StudentTel = $persistentStore.read('StudentTel') || ''; // 移动电话
const ParentName = $persistentStore.read('ParentName') || ''; // 家长联系人
const ParentTel = $persistentStore.read('ParentTel') || ''; // 家长联系方式
const Vehicle = $persistentStore.read('Vehicle') || '汽车'; // 交通工具

// 判断起始日期是否大于结束日期
if (begin_date <= end_date) { // 否
  begin_month = Month;
  end_month = Month
} else { // 是
  begin_month = Month;
  end_month = Month + 1
};

// 判断起始日期和结束日期是否跨月份
if (begin_date <= end_date) { // 否
  var LeaveNumNo = (end_date - begin_date + end_hours/24 - begin_hours/24).toFixed(2); // 计算请假总时长并保留两位小数
} else { // 是
  var D = new Date(Year, Month, 0);
  var month_total_days = D.getDate(); // 获取当前月份总天数
  var LeaveNumNo = (end_date - begin_date + month_total_days + end_hours/24 - begin_hours/24).toFixed(2); // 计算请假总时长并保留两位小数
};

// 确定销假日期
// var Leave_off_date = end_date + 1;
// var LeaveOffDate = ('0' + Leave_off_date).slice(-2); // 销假日期补零
// var DisLeaveDate = Year + "-" + EndMonth + "-" + LeaveOffDate; // 销假日期

var BeginMonth = ('0' + begin_month).slice(-2); // 起始月份补零
var EndMonth = ('0' + end_month).slice(-2); // 结束月份补零
var BeginDate = ('0' + begin_date).slice(-2); // 起始日期补零
var EndDate = ('0' + end_date).slice(-2); // 结束日期补零
var LeaveBeginTime = ('0' + begin_hours).slice(-2); // 起始小时数补零
var LeaveEndTime = ('0' + end_hours).slice(-2); // 结束小时数补零

// 组合请假时间
var LeaveBeginDate = Year + "-" + BeginMonth + "-" + BeginDate; // 请假起始日期
var LeaveEndDate = Year + "-" + EndMonth + "-" + EndDate; // 请假结束日期

// 开始修改假条页面
var Url = $request.url; // 定义响应体 Url
var Body = JSON.parse($response.body);

// 个人设置
var OverStatus = 1; // 设置假条数量
var ID = 20000; // 随便4位数以获取别人的请假信息

if (Url.indexOf('Edit') == -1) { // 响应体 Url 不包含 Edit
  Body= {
    "AllLeaveManages": [
      {
        "LeaveType": LeaveType, // 请假类型
        "WithNumNo": WithNumNo, // 同行人数
        "OutAddress": OutAddress,  // 外出地点
        "FDYThing": "同意", // 同意请假
        "Status": "假期中", // 假期中、审批中
        "StatusName": "辅导员审核通过", // 辅导员审核通过
        "ID": ID, // 随便4位数以获取别人的请假信息
        "LeaveBeginDate": LeaveBeginDate, // 请假起始日期
        "LeaveBeginTime": LeaveBeginTime, // 请假起始小时数
        "LeaveEndDate": LeaveEndDate, // 请假结束日期
        "LeaveEndTime": LeaveEndTime, // 请假结束小时数
        "LeaveNumNo": LeaveNumNo, // 离校总时长
      }
    ],
    "IsLeave": 1 // 是否在请假状态
  };
}
else { // 响应体 Url 包含 Edit
  Body= {
    // 请假内容
    "LeaveType": LeaveType, // 请假类型
    "LeaveThing": LeaveThing, // 请假事由
    "OutAddress": OutAddress, // 外出地点
    // 外出联系人信息(实际为本人信息)
    "OutName": StudentName, // 姓名
    "OutMoveTel": StudentTel, // 移动电话
    "OutTel": "", // 固定电话
    "Relation": "本人", // 与本人关系
    // 本人信息
    "StuMoveTel": StudentTel, // 联系电话
    "StuOtherTel": "", // 其他联系方式
    // 家长信息
    "ParentContacts": ParentName, // 家长联系人
    "ParentTel": ParentTel, // 家长联系方式
    // 往返时间
    "LeaveBeginDate": LeaveBeginDate, // 请假起始日期
    "Inputdate": LeaveBeginDate, // 请假起始日期
    "GoDate": LeaveBeginDate, // 请假起始日期
    "LeaveEndDate": LeaveEndDate, // 请假结束日期
    "BackDate": LeaveEndDate, // 请假结束日期
    // 往返时间
    "LeaveBeginTime": LeaveBeginTime, // 请假起始小时数
    "GoTime": LeaveBeginTime, // 请假起始小时数
    "LeaveEndTime": LeaveEndTime, // 请假结束小时数
    "BackTime": LeaveEndTime, // 请假结束小时数
    // 往返交通工具
    "GoVehicle": Vehicle, // 去-交通工具
    "BackVehicle": Vehicle, // 返-交通工具
    // 其他设置
    "StuName": StudentName, // 学生姓名
    "WithNumNo": WithNumNo, // 同行人数
    // 以下数据不可修改
    "LeaveNumNo": LeaveNumNo, // 离校总时长
    "GoOut": "1", // 是否外出离校
    "studentId": "202020020", // 学生学号
    "ID": ID, // 随便4位数以获取别人的请假信息
    "DisLeaveDate": null, // 销假时间
    "SpStatus": null,
    "GoOutConfirm": null,
    "XYThing": null,
    "DisLeaveMen": null,
    "OverStatus": 1,
    "FDYStatus": "2",
    "Status": "假期中",
    "FDYThing": "同意",
  }
}

// 不修改假条页面
if (isLeave == 'false') {
  Body = {"AllLeaveManages": [],"IsLeave": 0}
}

// 执行程序
$done({body: JSON.stringify(Body)})
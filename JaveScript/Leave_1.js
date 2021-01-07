var Month = "01"; // 月
var Day = "11"; // 日
var OutAddress = "北京市朝阳区";  // 请假去向

var Year = "2021";
var Today = Year + "-" + Month + "-" + Day;

var obj = JSON.parse($response.body);
 obj= {
  "AllLeaveManages": [
    {
      "LeaveType": "事假", // 请假类型
      "WithNumNo": "0", // 同行人数
      "OutAddress": OutAddress,  // 请假去向
      "FDYThing": "同意", // 同意请假
      "Status": "假期中", // 假期中、审批中
      "ID": null, // 随便4位数以获取别人的请假信息
      "LeaveBeginDate": Today, // 起始日期
      "LeaveBeginTime": "10", // 起始时间(小时)
      "LeaveEndDate": Today, // 结束日期
      "LeaveEndTime": "22", // 结束时间(小时)
      "LeaveNumNo": 0.50, // 用请假时长/24的值
    }
  ],
  "IsLeave": 1 // 是否在请假状态
};
$done({body: JSON.stringify(obj)});
var obj = JSON.parse($response.body);
 obj= {
  "AllLeaveManages": [
    {
      "LeaveType": "事假", // 请假类型
      "WithNumNo": "0", // 同行人数
      "OutAddress": "",  // 请假去向
      "FDYThing": "同意", // 同意请假
      "Status": "假期中", // 假期中、审批中
      "ID": null, // 随便4位数以获取别人的请假信息
      "LeaveBeginDate": "2021-01-11", // 起始日期
      "LeaveBeginTime": "10", // 起始时间(小时)
      "LeaveEndDate": "2021-01-11", // 结束日期
      "LeaveEndTime": "22", // 结束时间(小时)
      "LeaveNumNo": 0.50, // 用请假时长/24的值
    }
  ],
  "IsLeave": 1 // 是否在请假状态
};
$done({body: JSON.stringify(obj)});
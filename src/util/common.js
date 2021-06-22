export const getStatus = status => {
  let data = "";
  switch (status){
    case "Y":
      data = "有效";
      break;
    case "N":
      data = "失效";
      break;
    case "S":
      data = "停用";
      break;
    case "C":
      data = "注销";
      break;
    case "W":
      data = "待生成";
      break;
    case "Z":
      data = "待写配置";
      break;
    default:
      data = "";
  }
  return data;
}

export const getApproveStatus = approveStatus => {
  let data = "";
  switch (approveStatus){
    case "0":
      data = "待审核";
      break;
    case "1":
      data = "审核通过";
      break;
    case "2":
      data = "审核未通过";
      break;
    case "3":
      data = "申请中";
      break;
    default:
      data = "";
  }
  return data;
}

export const getOnlineStatus = onlineStatus => {
  let data = "";
  switch (onlineStatus){
    case "0":
      data = "未上线";
      break;
    case "1":
      data = "上线中";
      break;
    case "2":
      data = "已上线";
      break;
    default:
      data = "";
  }
  return data;
}
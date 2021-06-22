import moment from "moment";
import { querySgModuleCommonConfigList, querySgSubmoduleCommonConfigList} from "../../manager/request/service";

export const PROTOCOL = {
  http: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "json"
  },
  https: {
    protocolTemplete: "https://${ip:port}/",
    contextType: "json"
  },
  socket: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "other"
  },
  webservice: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "webservice"
  },
  fix: {
    protocolTemplete: "fix://${ip:port}/",
    contextType: "fix"
  },
  tcp: {
    protocolTemplete: "tcp://${ip:port}/",
    contextType: "json"
  },
  eusp: {
    protocolTemplete: "eusp://${ip:port}/",
    contextType: "eusp"
  },
  dubbo_dubbo: {
    protocolTemplete: "dubbo://${ip:port}/",
    contextType: "dubbo"
  },
  dubbo_http: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "dubbo"
  },
  dubbo_rest: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "dubbo"
  },
  dubbo_webservice: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "dubbo"
  },
  dubbo_json: {
    protocolTemplete: "http://${ip:port}/",
    contextType: "dubbo"
  }
};
export const SERVICEP_PROTOCOL = [
  "http",
  "https",
  "socket",
  "webservice",
  "fix",
  "tcp",
  "eusp",
  "dubbo-dubbo",
  "dubbo-http",
  "dubbo-rest",
  "dubbo-webservice",
  "dubbo-json"
];
export const CONTEXT_TYPE = [
  "webservice",
  "xml",
  "dubbo",
  "json",
  "fix",
  "eusp",
  "other"
];
export const getAnyTime = value => {
  let min = value || 0;
  return moment(new Date().getTime() - min * 60 * 1000).format(
    "YYYY-MM-DD HH:mm:ss"
  );
};
export const LOG_TYPE = [
  {
    value: "1",
    name: "启动信息"
  },
  {
    value: "2,3",
    name: "注册信息"
  },
  {
    value: "4,9",
    name: "服务订阅信息"
  },
  {
    value: "5",
    name: "服务血缘关系"
  },
  {
    value: "6",
    name: "错误信息"
  },
  {
    value: "7,8",
    name: "服务故障隔离"
  }
];

let LOG_TYPE_SHOW = [];
LOG_TYPE.forEach(item => {
  item.value.split(",").forEach(type => {
    LOG_TYPE_SHOW.push({
      value: type,
      name: item.name
    });
  });
});
export { LOG_TYPE_SHOW };

export const echartStyle = {
  width: "%100",
  height: 300,
  fontSize: 20,
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
// 查询所有模块和服务单元
export async function queryAllModuleAndSubmodule() {
  let moduleParam = {
    sgModuleCommonConfigVo: {
      page: {
        doPagination: false
      }
    }
  };
  let subModuleParam = {
    sgSubmoduleCommonConfigVo: {
      page: {
        doPagination: false
      }
    }
  };
  let moduleList = await querySgModuleCommonConfigList(
    moduleParam
  ).then(moduleRes => {
    if (moduleRes.reply.returnCode.type === "S") {
      return moduleRes.reply.result.configList.map(item => {
        return {
          moduleCode: item.moduleCode,
          key: item.moduleCode
        };
      });
    }
  });
  let subModuleList = await querySgSubmoduleCommonConfigList(
    subModuleParam
  ).then(subModuleRes => {
    if (subModuleRes.reply.returnCode.type === "S") {
      return subModuleRes.reply.result.list.map(item => {
        return {
          moduleCode: item.moduleCode,
          key: item.subModuleCode,
          subModuleCode: item.subModuleCode
        };
      });
    }
  });
  return [...moduleList, ...subModuleList];
}
// 返回熔断配置
export function getSentinelConfig (values) {
  let sentinelConfigType =  values.sentinelConfigType;
  let degradeRuleConfigs = [], flowRuleConfigs = [];
  
}



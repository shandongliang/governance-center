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
  },
}

export const SERVICEP_PROTOCOL = ["http","https","socket","webservice","fix","tcp","eusp","dubbo-dubbo","dubbo-http","dubbo-rest","dubbo-webservice","dubbo-json"];
export const CONTEXT_TYPE = ["webservice","xml","dubbo","json","fix","eusp","other"]
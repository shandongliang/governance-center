import { getSequenceGenerator } from "./service";

export async function getApproveCode (type, num=1){
  let data = {
    num,
    type
  };
  let result = await getSequenceGenerator(
    data
  ).then(res => {
    if (res.reply.returnCode.type === "S") {
      return res.reply.result
    }
  });
  return result[0]
}


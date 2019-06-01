import Room from "../model/room";
import axios from "axios";
import Result from "../model/result";
import { Message } from "element-ui";

export async function addRoom(room: Room) {
  let res: any = await axios.post("/api/company/addroom", room);
  let result: Result = res.data;
  if (!result.isSuccess) {
    Message.error("创建会议室失败:" + result.message);
  } else {
    Message.error("创建会议室成功");
  }
  return result.data;
}

import axios from "axios";
import Result from "../model/result";
import { Room } from "../model/room";

export async function vueApiTest(): Promise<any> {
  //TODO 调用自己的服务
  const res = await axios.get(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );
  return res.status && res.data;
}

export async function addRoom(room: Room) {
  //TODO 调用自己的服务
  const res: Result = await axios.post("/api/company/addRoom", room);
  console.log("vue-api-addroom", res);
  return res;
}

export async function query() {
  //TODO 调用自己的服务
  const res = await axios.get("/api/company/query");
}

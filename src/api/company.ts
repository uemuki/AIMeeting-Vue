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
  const res = await axios.post("/api/company/addRoom", room);
  return t(res);
}

export async function query() {
  //TODO 调用自己的服务
  const res = await axios.get("/api/company/query");
  return t(res);
}

function t(res: any) {
  if (res) {
    const resT: Result = res.data;
    return resT.isSuccess && resT.data;
  }
  return false;
}

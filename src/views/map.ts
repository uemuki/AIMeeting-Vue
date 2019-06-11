import { Room } from "../types";

export function draw(element: HTMLCanvasElement, data: Room[]) {
  if (!element) {
    return;
  }
  resizeCanvas(element);
  const ctx = element.getContext("2d");
  if (!ctx) {
    return;
  }

  data.map((room: Room) => drawRoom(ctx, room));
}

function drawRoom(ctx: CanvasRenderingContext2D, room: Room) {
  let width: number = room.end.x - room.start.x;
  let height: number = room.end.y - room.start.y;

  ctx.fillStyle = "#409EFF";
  ctx.fillRect(room.start.x, room.start.y, width, height);
  ctx.fillStyle = "#000";
  ctx.strokeRect(room.start.x, room.start.y, width, height);
  ctx.font = "24px serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(room.name, room.start.x + width / 2, room.start.y + height / 2);
}

function resizeCanvas(element: HTMLCanvasElement) {
  element.height = element.parentElement!.offsetHeight;
  element.width = element.parentElement!.offsetWidth;
}

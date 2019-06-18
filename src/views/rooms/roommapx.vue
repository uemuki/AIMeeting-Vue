<template>
  <div class="roomMap">
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Room, Point } from '../../model/room';

@Component
export default class RoomMap extends Vue {
  @Prop() tableData!: Room[];
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  mounted() {
    this.draw();
  }
  draw() {
    this.canvas = <HTMLCanvasElement>this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.tableData.map(p => this.drawRoom(p));
  }
  axios() {
    if (this.canvas && this.ctx) {
      this.ctx.strokeStyle = '#09f';
      // 横线
      for (let i = 0; i < this.canvas.clientHeight / 10; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0.5, i * 10 + 0.5);
        this.ctx.lineTo(this.canvas.clientWidth + 0.5, i * 10 + 0.5);
        this.ctx.stroke();
      }
      // 竖线
      for (let j = 0; j < this.canvas.clientWidth / 10; j++) {
        this.ctx.beginPath();
        this.ctx.moveTo(j * 10 + 0.5, 0.5);
        this.ctx.lineTo(j * 10 + 0.5, this.canvas.clientHeight + 0.5);
        this.ctx.stroke();
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.clientWidth - 0.5, 0);
      this.ctx.lineTo(
        this.canvas.clientWidth - 0.5,
        this.canvas.clientHeight - 0.5
      );
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, this.canvas.clientHeight - 0.5);
      this.ctx.lineTo(
        this.canvas.clientWidth - 0.5,
        this.canvas.clientHeight - 0.5
      );
      this.ctx.stroke();
    }
  }
  drawRoom(aroom: Room) {
    aroom.start.x = aroom.start.x * 3;
    aroom.start.y = aroom.start.y * 3;
    aroom.end.x = aroom.end.x * 3;
    aroom.end.y = aroom.end.y * 3;
    if (this.ctx) {
      const ctx = this.ctx;

      const center = {
        x: (aroom.start.x + aroom.end.x) / 2,
        y: (aroom.start.y + aroom.end.y) / 2
      };

      ctx.lineWidth = 1;
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.beginPath();
      ctx.moveTo(aroom.start.x, aroom.start.y);
      ctx.lineTo(aroom.end.x, aroom.start.y);
      ctx.lineTo(aroom.end.x, aroom.end.y);
      ctx.lineTo(aroom.start.x, aroom.end.y);
      // ctx.moveTo(aroom.start.x + 0.5, aroom.start.y + 0.5);
      // ctx.lineTo(aroom.end.x + 0.5, aroom.start.y + 0.5);
      // ctx.lineTo(aroom.end.x + 0.5, aroom.end.y + 0.5);
      // ctx.lineTo(aroom.start.x + 0.5, aroom.end.y + 0.5);
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(center.x, center.y, 2, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.fillText(aroom.name, center.x, center.y);
    }
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  border: 1px solid #09f;
  width: 600px;
}
</style>

<template>
  <div class="roomMap">
    <el-button
      class="refresh-btn"
       type="warning" plain
      @click="refresh"
      size="small"
    >reDraw</el-button>
    <el-button
      class="refresh-btn"
       type="warning" plain
      @click="draw"
      size="small"
    >draw</el-button>
    <el-button
      class="refresh-btn"
       type="warning" plain
      @click="axios"
      size="small"
    >draw axios</el-button>
    <el-button
      class="refresh-btn"
       type="warning" plain
      @click="clear"
      size="small"
    >clear</el-button>
    <br>
    <canvas
      ref="canvas"
      id="canvas"
      width="200"
      height="200"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Room, Point } from '../../model/room';

@Component
export default class RoomMap extends Vue {
  @Prop() tableData!: Room[];
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  mounted() {
    this.canvas = <HTMLCanvasElement>this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.axios();
  }
  @Watch('tableData')
  watchCount(newVal: Room[]) {
    this.refresh();
  }
  refresh() {
    this.clear();
    this.axios();
    this.draw();
  }
  clear() {
    if (this.canvas && this.ctx)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  draw() {
    console.log('draw', this.tableData.length);
    if (this.canvas && this.ctx) this.tableData.map(p => this.drawRoom(p));
  }
  axios() {
    if (this.canvas && this.ctx) {
      console.log('draw axios');
      const xAxiosTick: number = 10;
      const yAxiosTick: number = 10;
      this.ctx.strokeStyle = '#E6A23C';
      // 横线
      for (let i = 0; i < this.canvas.clientHeight / yAxiosTick; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(0.5, i * yAxiosTick + 0.5);
        this.ctx.lineTo(this.canvas.clientWidth + 0.5, i * yAxiosTick + 0.5);
        this.ctx.stroke();
      }
      // 竖线
      for (let j = 0; j < this.canvas.clientWidth / xAxiosTick; j++) {
        this.ctx.beginPath();
        this.ctx.moveTo(j * xAxiosTick + 0.5, 0.5);
        this.ctx.lineTo(j * xAxiosTick + 0.5, this.canvas.clientHeight + 0.5);
        this.ctx.stroke();
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.clientWidth - 0.5, 0);
      this.ctx.lineTo(this.canvas.clientWidth - 0.5, this.canvas.clientHeight);
      this.ctx.moveTo(0, this.canvas.clientHeight - 0.5);
      this.ctx.lineTo(this.canvas.clientWidth, this.canvas.clientHeight - 0.5);
      this.ctx.stroke();
    }
  }
  drawRoom(aroom: Room) {
    if (this.ctx) {
      console.log('draw a room');
      // aroom.start.x *= 10;
      // aroom.start.y *= 10;
      // aroom.end.x *= 10;
      // aroom.end.y *= 10;
      this.ctx.strokeStyle = 'black';

      const center = {
        x: (aroom.start.x + aroom.end.x) / 2,
        y: (aroom.start.y + aroom.end.y) / 2
      };

      this.ctx.lineWidth = 1;
      this.ctx.lineJoin = 'round';
      this.ctx.fillStyle = '#000';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      this.ctx.beginPath();
      this.ctx.moveTo(aroom.start.x + 0.5, aroom.start.y + 0.5);
      this.ctx.lineTo(aroom.end.x + 0.5, aroom.start.y + 0.5);
      this.ctx.lineTo(aroom.end.x + 0.5, aroom.end.y + 0.5);
      this.ctx.lineTo(aroom.start.x + 0.5, aroom.end.y + 0.5);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, 2, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.fillStyle = '#000';
      this.ctx.fillText(aroom.name, center.x, center.y);
    }
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  // border: 1px solid #E6A23C;
  // border: 1px solid #09f;
  box-shadow: 0 2px 8px 0 rgba(230,162,60,0.2);
  border-radius: 2px;
  width: 200px;
}
.refresh-btn {
  margin-bottom: 15px;
}
</style>

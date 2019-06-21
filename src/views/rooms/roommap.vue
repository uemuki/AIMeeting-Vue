<template>
  <div class="roomMap">
    <ul class="yAxios">
      <li
        v-for="i in company[1]"
        class="yAxios-item"
      >

        <ul class="xAxios">
          <li
            v-for="j in company[0]"
            class="xAxios-item"
            :class="{room: isInRoom({x: j, y: i})}"
          >
            <!-- {{j}}{{i}} -->
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Room, Point } from "../../model/room";

@Component
export default class RoomMap extends Vue {
  @Prop() tableData!: Room[];
  company: number[] = [50, 50];
  room: Room = {
    start: { x: 0, y: 0 },
    end: { x: 2, y: 3 },
    name: "room1",
    limit: 3
  };
  arr: number[][] = [[1], [2]];
  isInRoom(point: Point): boolean {
    let x: boolean = false;
    let y: boolean = false;
    for (let i = 0; i < this.tableData.length; i++) {
      const roomPosition: number[][] = [
        [this.tableData[i].start.x, this.tableData[i].end.x],
        [this.tableData[i].start.y, this.tableData[i].end.y]
      ];
      x = roomPosition[0][0] <= point.x && point.x <= roomPosition[0][1];
      y = roomPosition[1][0] <= point.y && point.y <= roomPosition[1][1];
      if (x && y) break;
    }
    return x && y;
  }
}
</script>

<style lang="scss" scoped>
.xAxios {
  width: fit-content;
  margin: 0 auto;
  display: flex;
  .xAxios-item {
    width: 5px;
    height: 5px;
    // margin: 1px;
    color: #fff;
    background-color: #e6a23c;
    border-top: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    &.room {
      border: none;
      background-color: #d5632e;
    }
  }
}
</style>


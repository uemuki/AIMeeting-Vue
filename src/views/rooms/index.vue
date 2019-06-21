<template>
  <div class="rooms">
    <el-tabs type="border-card">
      <el-tab-pane label="Mapx">
        <RoomMapX :table-data="tableData" />
      </el-tab-pane>
      <el-tab-pane label="list">
        <RoomTable :table-data="handle" />
      </el-tab-pane>
      <!-- <el-tab-pane label="Map">
        <RoomMap :table-data="tableData" />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { query } from '../../api/company';
import { Room, Point } from '../../model/room';
import Result from '../../model/result';
import DateUtil from '../../utils/date';
import RoomTable from './roomtable.vue';
import RoomMap from './roommap.vue';
import RoomMapX from './roommapx.vue';

@Component({
  components: {
    RoomTable,
    RoomMap,
    RoomMapX
  }
})
export default class Home extends Vue {
  tableData: Room[] = [];
  dateUtil = new DateUtil();
  async queryData() {
    const res = await query();
    // const data = (<Result>res).isSuccess ? res.data : [];
    // this.tableData = this.handle(data);
    this.tableData = (<Result>res).isSuccess ? res.data : [];
  }
  get handle() {
    const list: any[] = [];
    this.tableData.map(r => {
      const st = r.start_time ? this.dateUtil.formatToLocal(<string>r.start_time) : '-';
      const gt = r.gmt_created ? this.dateUtil.formatToLocal(<string>r.gmt_created) : '-';
      list.push({
        name: r.name,
        start_time: st,
        gmt_created: gt,
        start: `(${r.start.x}, ${r.start.y})`,
        end: `(${r.end.x}, ${r.end.y})`
      });
    });
    return list;
  }
  mounted() {
    this.queryData();
  }
}
</script>


<template>
  <div class="rooms">
    <el-tabs type="border-card">
      <el-tab-pane label="list">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="会议室名称"
          >
          </el-table-column>
          <el-table-column
            prop="gmt_created"
            label="创建时间"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="使用时间及时长"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="start"
            label="开始位置"
          >
          </el-table-column>
          <el-table-column
            prop="end"
            label="结束位置"
          >
            <!-- <template slot-scope="scope">
              {{ scope.row.end.x,scope.row.end.y }}
            </template> -->
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Map">Map</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { query } from '../api/company';
import { Room, Point } from '../model/room';
import Result from '../model/result';
import DateUtil from '../utils/date';

@Component
export default class Home extends Vue {
  tableData: Room[] = [];
  dateUtil = new DateUtil();
  async queryData() {
    const res = await query();
    const data = (<Result>res).isSuccess ? res.data : [];
    this.tableData = this.handle(data);
  }
  handle(rooms: Room[]) {
    const list: any[] = [];
    rooms.map(r => {
      const st = this.dateUtil.formatToLocal(<string>r.start_time) || '-';
      const gt = this.dateUtil.formatToLocal(<string>r.gmt_created) || '-';
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


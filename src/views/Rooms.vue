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
            <template slot-scope="scope">
              <span style="margin-left: 10px">会议室名称</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="end"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="end"
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
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Map">Map</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { query } from "../api/company";
import { Room, Point } from "../model/room";
// import Result from "../model/result";

@Component
export default class Home extends Vue {
  tableData: Room[] = [];
  async queryData() {
    this.tableData = await query();
  }
}
</script>


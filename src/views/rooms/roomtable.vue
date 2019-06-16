<template>
  <div class="roomTable">

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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Room, Point } from "../../model/room";

@Component
export default class RoomTable extends Vue {
  @Prop() tableData!: Room[];
}
</script>

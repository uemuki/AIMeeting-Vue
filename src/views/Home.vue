<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-form ref="room" :model="room" :rules="addRoomRules" label-width="80px">
              <el-form-item label="房间名称" prop="name">
                <el-input v-model="room.name"></el-input>
              </el-form-item>
              <el-form-item label="开始位置" prop="start">
                <el-col :span="11">
                  <el-input-number
                    :min="0"
                    :max="xmax"
                    placeholder="开始位置"
                    v-model="room.start.x"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input-number
                    :min="0"
                    :max="ymax"
                    placeholder="选择时间"
                    v-model="room.start.y"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
              </el-form-item>
              <el-form-item label="结束位置" prop="start">
                <el-col :span="11">
                  <el-input-number
                    :min="0"
                    :max="xmax"
                    placeholder="开始位置"
                    v-model="room.end.x"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input-number
                    :min="0"
                    :max="ymax"
                    placeholder="选择时间"
                    v-model="room.end.y"
                    style="width: 100%;"
                  ></el-input-number>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">立即创建</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Room from "../model/room";
import { addRoom } from "../api/company";

@Component
export default class Home extends Vue {
  xmax: number = 100;
  ymax: number = 100;
  zhoufan: string = "zhoufan";
  room: Room = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    name: "",
    limit: 0
  };
  addRoomRules = {
    name: [{ required: true, message: "房间名称必填的", trigger: "blur" }]
  };
  submitForm() {
    let el: any = this.$refs.room;
    el.validate((valid: boolean) => {
      if (valid) {
        if (
          this.room.end.x <= this.room.start.x ||
          this.room.end.y <= this.room.start.y
        ) {
          this.$message.error("结束位置必须大于开始位置");
          return;
        }
        addRoom(this.room);
        el.resetField();
      }
    });
  }
}
</script>

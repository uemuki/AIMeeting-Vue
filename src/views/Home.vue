<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <h2>{{title}}</h2>
            <!-- TOOD -->
            <el-form ref="room" label-width="80px">
              <el-form-item label="房间名称">
                <el-input></el-input>
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

@Component
export default class Home extends Vue {
  title: string = "创建会议室";
  submitForm() {
    let el: any = this.$refs.room;
    el.validate((valid: boolean) => {
      //TODO 调用接口
    });
  }
}
</script>

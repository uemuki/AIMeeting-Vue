<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="18"
        :offset="3"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <h2>{{title}}</h2>
            <!-- TOOD -->
            <el-form
              ref="room"
              label-width="80px"
              :model="ruleForm"
              :rules="rules"
            >
              <el-form-item
                label="房间名称"
                prop="name"
                class="name"
              >
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item
                label="开始位置"
                required
              >
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input v-model="ruleForm.start.x"></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  class="line"
                  :span="2"
                >-</el-col>
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input v-model="ruleForm.start.y"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item
                label="结束位置"
                required
              >
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input v-model="ruleForm.end.x"></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  class="line"
                  :span="2"
                >-</el-col>
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input v-model="ruleForm.end.y"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item
                label="开始时间"
                prop="start_time"
                class="name"
              >
                <el-date-picker
                  v-model="ruleForm.start_time"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
                <!-- <el-input v-model="ruleForm.duration"></el-input> -->
              </el-form-item>
              <el-form-item
                label="使用时长"
                prop="duration"
              >
                <div>{{ruleForm.limit}}</div>
              </el-form-item>
              <el-form-item label="限制人数">
                <div>{{ruleForm.limit}}</div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="warning"
                  @click="submitForm()"
                >立即创建</el-button>
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
import { addRoom, query } from "../api/company";
import { Room, Point } from "../model/room";
import Result from "../model/result";
import DateUtil from "../utils/date";

@Component
export default class Home extends Vue {
  title: string = "创建会议室";
  pickerOptions = {
    shortcuts: [
      {
        text: "今天",
        onClick(picker: any) {
          picker.$emit("pick", new Date());
        }
      },
      {
        text: "昨天",
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit("pick", date);
        }
      },
      {
        text: "一周前",
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", date);
        }
      }
    ]
  };
  ruleForm: Room = {
    name: "",
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    },
    limit: 0,
    start_time: "",
    duration: 0
  };
  rules: Object = {
    name: [
      { required: true, message: "请输入会议室名称", trigger: "blur" },
      { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
    ]
    // position: [
    //   {pattern:/^\d{1,3}$/,
    //     required: true,
    //     message: "请输入内容",
    //     trigger: "blur"
    //   }
    // ]
  };
  // @Prop() name!: string;
  submitForm() {
    let el: any = this.$refs.room;
    el.validate(async (valid: boolean) => {
      if (valid) {
        //TODO 调用接口
        const start = this.ruleForm.start;
        const end = this.ruleForm.end;
        // if (this.ruleForm.duration !== undefined)
        //   this.ruleForm.duration = this.ruleForm.duration.map((dt: string) => {
        //     return new DateUtil().formatToLocal(dt, "YYYY-MM-DD hh:mm");
        //   });
        // console.log(this.ruleForm.duration);

        if (start.x < end.x && start.y < end.y) {
          this.ruleForm.limit = (end.x - start.x) * (end.y - start.y);
          this.ruleForm.gmt_created = new Date().toJSON();

          // const res = await addRoom(this.ruleForm);
          // console.log(res);
        } else {
          this.$message.error("房间结束位置不能小于或等于开始位置");
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  // async aApi() {
  //   console.log('------1');
  //   const res = await vueApiTest();
  //   // console.log(res);

  //   console.log('------2');
  //   await addRoom();

  //   console.log('------3');
  //   query();
  // }
}
</script>

<style lang="scss" scoped>
.home {
  .name .el-input {
    box-sizing: border-box;
    padding: 0 10px;
  }
}
</style>


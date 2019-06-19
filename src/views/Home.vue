<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="18"
        :offset="3"
      >
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <h2 class="title">{{title}}</h2>
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
                    <el-input-number
                      v-model="ruleForm.start.x"
                      @change="handleChange"
                      :min="0"
                      :max="300"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col
                  class="line"
                  :span="2"
                >-</el-col>
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input-number
                      v-model="ruleForm.start.y"
                      @change="handleChange"
                      :min="0"
                      :max="150"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item
                label="结束位置"
                required
              >
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input-number
                      v-model="ruleForm.end.x"
                      @change="handleChange"
                      :min="0"
                      :max="300"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col
                  class="line"
                  :span="2"
                >-</el-col>
                <el-col :span="11">
                  <el-form-item prop="position">
                    <el-input-number
                      v-model="ruleForm.end.y"
                      @change="handleChange"
                      :min="0"
                      :max="150"
                      label="描述文字"
                    ></el-input-number>
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
              </el-form-item>
              <el-form-item
                label="使用时长"
                prop="duration"
                class="duration"
              >
                <el-input-number
                  v-model="ruleForm.duration"
                  @change="handleChange"
                  :min="1"
                  :max="180"
                  label="描述文字"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="容纳人数">
                <div class="limit">{{ruleForm.limit}}</div>
              </el-form-item>
              <!-- <el-form-item>
              </el-form-item> -->
            </el-form>
            <div class="hint">温馨提示：公司房间大小不能超过300 * 150</div>
            <el-button
              type="warning"
              @click="submitForm()"
            >立即创建</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { addRoom } from '../api/company';
import { Room, Point } from '../model/room';
import Result from '../model/result';
import DateUtil from '../utils/date';

@Component
export default class Home extends Vue {
  title: string = '创建会议室';
  pickerOptions = {
    shortcuts: [
      {
        text: '今天',
        onClick(picker: any) {
          picker.$emit('pick', new Date());
        }
      },
      {
        text: '昨天',
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      },
      {
        text: '一周前',
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        }
      }
    ]
  };
  ruleForm: Room = {
    name: '',
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    },
    limit: 0,
    start_time: '',
    duration: 0
  };
  rules: Object = {
    name: [
      { required: true, message: '请输入会议室名称', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
    ]
  };
  // @Prop() name!: string;
  handleChange() {}
  submitForm() {
    let el: any = this.$refs.room;
    el.validate(async (valid: boolean) => {
      if (valid) {
        //TODO 调用接口
        this.ruleForm.gmt_created = new Date().toJSON();
        const {
          start,
          end,
          start_time: startT,
          gmt_created: createT
        } = this.ruleForm;
        this.add(start, end, startT as string, createT as string);
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  async add(start: Point, end: Point, startT: string, createT: string) {
    if (start.x < end.x && start.y < end.y) {
      this.ruleForm.limit = (end.x - start.x) * (end.y - start.y);
      let res;
      if (startT) {
        if (new DateUtil().compare(startT, createT)) {
          res = await addRoom(this.ruleForm);
        } else {
          this.$message.error('使用时间不能先于创建时间');
        }
      } else {
        res = await addRoom(this.ruleForm);
      }
      (<Result>res).isSuccess
        ? this.$message('创建成功')
        : this.$message.error(res.message);
      console.log(res);
    } else {
      this.$message.error('房间结束位置不能小于或等于开始位置');
    }
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

  // const t = new DateUtil().formatToLocal(this.ruleForm.start_time as string, "YYYY-MM-DD hh:mm")
  // console.log(this.ruleForm);
  // console.log(t);
}
</script>

<style lang="scss" scoped>
.home {
  .box-card {
    .title {
      padding-bottom: 20px;
    }
    .limit {
      width: 100%;
      margin: 0 auto;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      background-color: #f5f7fa;
    }
    .hint {
      text-align: left;
      color: #909399;
      font-size: 12px;
      line-height: 1;
      padding-left: 12px;
      padding-bottom: 20px;
    }
  }
  .name .el-input {
    box-sizing: border-box;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-input__prefix {
    left: 12px;
  }
  .el-input-number {
    width: 100%;
  }
  .el-col.el-col-11 {
    padding: 0 !important;
  }
}
</style>


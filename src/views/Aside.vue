<template>
  <el-aside width="200px">
    <el-menu
      default-active="/"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      @select="handleSelect"
    >
        <el-menu-item
          index="1-1"
          :route="path.home"
        >创建会议室</el-menu-item>
      <el-menu-item-group>
        <el-menu-item
          index="1-2"
          :route="path.query"
        >房间查询</el-menu-item>
        <el-menu-item index="1-3">房间入住表单</el-menu-item>
        <el-menu-item index="1-4">入住进程</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Aside extends Vue {
  path: Object = {
    query: {
      path: "/query"
    },
    home: {
      path: "/"
    }
  };
  mounted() {
    console.log(window.location.href);
  }
  handleSelect(key: any, keyPath: any): void {
    // console.log(key, keyPath);
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>


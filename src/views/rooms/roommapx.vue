<template>
  <div class="roomMap">
    roomMap
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Room, Point } from "../../model/room";

@Component
export default class RoomMap extends Vue {
  @Prop() tableData!: Room[];
}
</script>

<style lang="scss" scoped>
</style>

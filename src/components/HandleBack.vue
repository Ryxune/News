<template>
  <div class="cell-wrap">
    <div class="cell">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <i>{{title}}</i>
      <span class="iconfont iconjiantou1 more"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data(){
    return {
      more:false
    }
  }
};
</script>

<style scoped lang="less">
.cell-wrap {
  padding: 10px;

  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: block;

    }

    i {
      font-weight: 600;
      color: #666;
      font-size: 18px;
      font-family: "华文行楷", serif;
    }

    .more {
      opacity: 0;
    }
  }
}
</style>
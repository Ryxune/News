<template>
  <div class="cell-wrap">
    <div class="cell">
      <span class="iconfont iconjiantou2" @click="$emit('click',$event)"></span>
      <i>{{title}}</i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped lang="less">
.cell-wrap {
  margin: 10px;
  padding: 10px;

  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      flex: 1;
    }

    i {
      // display: block;
      // text-align: center;
      flex: 2;
      font-weight: 600;
      color: #666;
      font-size: 18px;
      font-family: "华文行楷", serif;
    }
  }
}
</style>
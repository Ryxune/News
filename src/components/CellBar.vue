<template>
  <div class="cell-wrap" @click="$emit('handleClick',$event)">
    <div class="cell">
      <span>{{title}}</span>
      <i>{{type === "password"?"******": content}}</i>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "content","type"]
};
</script>

<style scoped lang="less">
.cell-wrap {
  padding-left: 10px;
  border-bottom: 1px solid #999;

  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    height: 48/360 * 100vw;
    border-bottom: 1px solid #eee;

    i {
      display: block;
      flex: 1;
      text-align: right;
      padding: 0 10px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
<template>
  <div class="wrap">
    <div class="othersComment">
      <Floor v-if="data.parent" :data="data.parent"></Floor>

      <div class="info">
        <span>
          {{data.user.nickname}}
          <i>2小时前</i>
        </span>
        <div class="replay">回复</div>
      </div>
      <div class="content">{{data.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props: ["data"]
};
</script>

<style scoped lang="less">
.othersComment {
  border: 1px #ccc solid;
  padding: 10px;
  margin-top: 0px;
  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    span {
      font-size: 14px;

      i {
        font-size: 12px;
        color: #ccc;
        margin-left: 10px;
      }
    }

    .replay {
      font-size: 14px;
      color: #888;
    }
  }

  .content {
    padding-top: 10px;
  }
}
</style>
<template>
  <div class="wrap">
    <div class="footer" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handleFocus" />
      <span class="comment">
        <em>1299</em>
        <i class="iconfont iconpinglun-"></i>
      </span>
      <i class="iconfont iconshoucang" :class="{collect:isCollect}" @click="handleCollect"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>

    <div class="footer-comment" v-show="isFocus">
      <textarea rows="3" ref="commentText" @blur="isFocus = false" :autofocus="isFocus"></textarea>
      <span>发送</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["has_star"],
  data() {
    return {
      isFocus: false,
      isCollect: this.has_star
    };
  },
  methods: {
    handleFocus() {
      this.isFocus = true;
    },
    handleCollect() {
      this.$axios({
        url: '/post_star/'+this.$route.params.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then( res => {
        this.$toast.success(res.data.message);
        if(res.data.message == "收藏成功") {
          this.isCollect = true;
        }else {
          this.isCollect = false;
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #eee;
  padding: 0 10px;
  box-sizing: border-box;

  .footer {
    height: 60/360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    input {
      width: 40%;
      height: 36/360 * 100vw;
      background: #ddd;
      border: none;
      font-size: 12px;
      padding: 0 15px;
      border-radius: 50px;
    }

    .comment {
      display: block;
      position: relative;

      em {
        position: absolute;
        display: block;
        background: #f00;
        border-radius: 50px;
        color: #fff;
        padding: 0 5px;
        font-size: 10px;
        height: 14px;
        line-height: 14px;
        left: 5px;
        top: -5px;
      }
    }
  }

  .footer-comment {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    textarea {
      width: 260/360 * 100vw;
      background: #ddd;
      padding: 10px;
      box-sizing: border-box;
      border: none;
      border-radius: 8px;
      resize: none;
    }

    span {
      font-size: 12px;
      background: #f00;
      width: 60/360*100vw;
      height: 26/360*100vw;
      line-height: 26/360*100vw;
      color: #fff;
      text-align: center;
      border-radius: 50px;

    }
  }

  .iconfont {
    font-size: 24px;
  }

  .collect {
    color: #f00;
  }
}
</style>
<template>
  <div class="wrap">
    <div class="detail" v-if="detail.type == 1">
      <div class="back-nav">
        <div class="back">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <div class="focus" @click="focus" v-if="!detail.has_follow">关注</div>
        <div class="focus focus-active" @click="unfocus" v-else>已关注</div>
      </div>

      <div class="title">
        <h3>{{detail.title}}</h3>
        <p>{{detail.user.nickname}} 2019-9-28</p>
      </div>
      <p class="content" v-html="detail.content"></p>
    </div>
    <div class="video" v-if="detail.type == 2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20190927/cont-1607446-14434032_adpkg-ad_hd.mp4"
        class="video"
        controls
        :poster="detail.cover[0].url"
      ></video>
      <div class="info">
        <div class="user">
          <img :src="$axios.defaults.baseURL+detail.user.head_img" alt />
          <span>{{detail.user.nickname}}</span>
        </div>
        <div class="focus" @click="focus" v-if="!detail.has_follow">关注</div>
        <div class="focus focus-active" @click="unfocus" v-else>已关注</div>
      </div>
      <div class="title">{{detail.title}}</div>
    </div>

    <div class="other">
      <div class="like">
        <span class="iconfont icondianzan" :class="{isLike:has_like}" @click="handleLike"></span>
        {{likeNum}}
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1">微信</a>
      </div>
    </div>

    <div class="footer">
      <DetailFooter :has_like="detail.has_like" :commentLength="detail.comment_length" :post="detail"></DetailFooter>
    </div>
  </div>
</template>

<script>
import DetailFooter from "@/components/DetailFooter";
export default {
  mounted() {
    let { id } = this.$route.params;
    let token = localStorage.getItem("token");
    let config = {
      url: "/post/" + id,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    this.$axios(config).then(res => {
      let { data } = res.data;
      this.detail = data;
      this.likeNum = this.detail.like_length;
      this.has_like = this.detail.has_like;
      console.log(data);
    });
  },
  components: {
    DetailFooter
  },
  data() {
    return {
      detail: {
        user: ""
      },
      likeNum: 0,
      has_like: false,
    };
  },
  methods: {
    focus() {
      this.$axios({
        url: "/user_follows/" + this.detail.user.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.mesage == "关注成功" || res.data.message == "已关注") {
          this.detail.has_follow = true;
          this.$toast.success(res.data.message);
        }
      });
    },
    unfocus() {
      this.$axios({
        url: "/user_unfollow/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        let { message } = res.data;
        console.log(message);
        if (message == "取消关注成功" || message == "未关注该用户") {
          this.detail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        this.has_like = !this.has_like;
        if (res.data.message == "取消成功") {
          this.likeNum--;
        } else {
          this.likeNum++;
        }
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>


<style scoped lang="less">
.wrap {
  background: #f2f2f2;

  .detail {
    padding: 10px;

    .back-nav {
      // background: rgb(201, 20, 20);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .back {
        .iconjiantou2 {
          vertical-align: middle;
        }

        .iconnew {
          vertical-align: middle;
          font-size: 50px;
        }
      }

      .focus {
        border: 1px solid #ddd;
        padding: 5px 10px;
        border-radius: 50px;
        font-size: 12px;
        background: #f00;
        color: #fff;
      }
      .focus-active {
        background: #aaa;
        color: #333;
      }
    }

    .title {
      p {
        color: #aaa;
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .content {
      line-height: 26px;
      font-size: 14px;
      margin: 10px 0;

      /deep/ img {
        max-width: 100%;
      }
    }
  }
}

.video {
  width: 100%;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    .user {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50px;
        vertical-align: middle;
      }
      span {
        color: #ccc;
        font-size: 14px;
      }
    }
    .focus {
      border: 1px solid #ddd;
      padding: 5px 10px;
      border-radius: 50px;
      font-size: 12px;
      background: #f00;
      color: #fff;
    }
    .focus-active {
      background: #aaa;
      color: #333;
    }
  }

  .title {
    margin: 10px;
    font-size: 14px;
  }
}

.other {
  display: flex;
  justify-content: space-around;
  border-bottom: 5px solid #e4e4e4;
  padding: 20px 0;

  .like {
    font-size: 12px;
    border: 1px solid #666;
    border-radius: 50px;
    padding: 5px 15px;

    span {
      font-size: 16px;
      padding-right: 5px;
    }
    .isLike {
      color: #f00;
    }
  }

  .share {
    font-size: 12px;
    border: 1px solid #666;
    border-radius: 50px;
    padding: 5px 15px;

    span {
      color: #00c800;
      padding-right: 5px;
      font-size: 18px;
    }
  }
}
</style>
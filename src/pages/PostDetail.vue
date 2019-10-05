<template>
  <div class="wrap">
    <div class="detail">
      <div class="back-nav">
        <div class="back">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <div class="focus focus-active" @click="focus" v-if="!detail.has_follow">关注</div>
        <div class="focus focus-active" @click="focus" v-else>关注</div>
      </div>

      <div class="title">
        <h3>{{detail.title}}</h3>
        <p>{{detail.user.nickname}} 2019-9-28</p>
      </div>
      <p class="content" v-html="detail.content"></p>

      <div class="other">
        <div class="like">
          <span class="iconfont icondianzan"></span>
          112
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          微信
        </div>
      </div>

      <div class="footer">
        <DetailFooter></DetailFooter>
      </div>
    </div>
  </div>
</template>

<script>
import DetailFooter from "@/components/DetailFooter"
export default {
  mounted() {
    let { id } = this.$route.params;
    let token = localStorage.getItem("token");
    let config = {
      url: "/post/" + id
    };
    this.$axios(config).then(res => {
      let { data } = res.data;
      this.detail = data;

      console.log(data);
    });
  },
  components:{
    DetailFooter,
  },
  data() {
    return {
      detail: {
        user:""
      },
    };
  },
  methods: {
    focus() {
      this.$axios({
        url: "/user_follows/",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
    }
  }
};
</script>


<style scoped lang="less">
.wrap {
  background: #f2f2f2;

  .detail {
    border-bottom: 5px solid #e4e4e4;
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
      }
      .focus-active {
        background: #f00;
        color: #fff;
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

    .other {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;

      .like {
        font-size: 12px;
        border: 1px solid #666;
        border-radius: 50px;
        padding: 5px 15px;

        span {
          font-size: 16px;
          padding-right: 5px;
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
  }
}
</style>
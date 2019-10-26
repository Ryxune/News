<template>
  <div class="wrap">
    <div class="head">
      <div class="logo iconfont iconnew"></div>
      <div class="search-head">
        <router-link to="#" class="iconfont iconsearch">搜索新闻</router-link>
      </div>
      <div class="my iconfont iconwode" @click="personal"></div>
    </div>

    <div class="tabbar">
      <van-tabs v-model="active" sticky>
        <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <PostCard v-for="(item,index) in posts" :key="index" :post="item" v-if="item.open === 1"/>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";

export default {
  components: {
    PostCard
  },
  mounted() {
    let config = {
      url: "/category"
    };
    let token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      let { data } = res.data;
      // console.log(data);
      this.categories = data;

      this.$axios({
        url: `/post?pageIndex=1&pageSize=${this.pageSize}&category=999`
      }).then(res => {
        let { data } = res.data;
        this.posts = data;
        this.pageIndex++;

        // console.log(this.posts);
      });
    });
  },
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],
      posts: [],
      pageSize: 5,
      loading: false,
      finished: false,
      cid: 999,
      pageIndex: 1
    };
  },
  watch: {
    active() {
      this.cid = this.categories[this.active].id;
      // console.log(this.cid);
      this.pageIndex = 1;
      this.posts = [];
      this.onLoad();
    }
  },
  methods: {
    personal() {
      if (localStorage.getItem("token")) {
        this.$router.push("/personal");
      } else {
        this.$Dialog
          .confirm({
            title: "登录",
            message: "还未登录,现在登录?"
          })
          .then(() => {
            // on confirm
            this.$router.push("/login");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // console.log(`/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`);

        //重新发起文章数据请求
        this.$axios({
          url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
        }).then(res => {
          // console.log(res);
          let { message } = res.data;
          if (message === "文章列表获取失败") {
            this.$toast.fail(message);
            return;
          }
          let { data } = res.data;
          this.posts = [...this.posts, ...data];
          // console.log(this.posts);
          //页数+1

          // 数据全部加载完成
          if (data.length < this.pageSize) {
            this.loading = false;
            this.finished = true;
          }
          // console.log(this.posts);
        });
        // 加载状态结束
        this.loading = false;
        this.pageIndex++;

      }, 200);
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  color: #fff;

  .head {
    padding: 0px 15px;
    background: #f00;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      font-size: 45px;
    }
    .search-head {
      background: #ffffff77;
      flex: 1;
      margin: 0 20px;
      text-align: center;
      padding: 5px;
      border-radius: 50px;
    }
    .my {
      font-size: 20px;
    }
  }

  .tabbar {
    /deep/ .van-tabs__nav {
      background: #e4e4e4;
    }
  }
}
</style>
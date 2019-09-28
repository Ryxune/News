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
            <PostCard 
              v-for="(item,index) in posts" :key="index"
              :post="item"

            />
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
        console.log(this.posts);
      });
    });
  },
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0,
      categories: [],
      posts: [],
      pageSize: 5,
    };
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
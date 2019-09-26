<template>
  <div>
    <router-link to="/editinfo">
      <div class="profile">
        <img :src="head" alt />

        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienv"></span>
            {{info.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <CellBar title="我的关注" content="关注的用户" @handleClick="$router.push('/userfollow')"/>
    <CellBar title="我的跟帖" content="跟帖/回复" @handleClick="$router.push('/comment')"/>
    <CellBar title="我的收藏" content="文章/视频" />
    <CellBar title="退出登录" @handleClick="logout"/>
  </div>
</template>

<script>
import CellBar from "@/components/CellBar";

export default {
  components: {
    CellBar
  },

  data() {
    return {
      info: {},
      head: ""
    };
  },

  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res);
      // this.info.head_img = res.data.data.head_img;
      // this.info.nickname = res.data.data.nickname;
      const { data } = res.data;
      this.info = data;

      if (this.info.head_img) {
        this.head = this.$axios.defaults.baseURL + this.info.head_img;
      } else {
        this.head = "./static/peng.jpg";
      }
    });
  },
  methods: {

    logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped lang="less">
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #eee;

  img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    color: #8ec460;
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #eee;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
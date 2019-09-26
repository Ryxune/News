<template>
  <div class="wrap">
    <HandleBack title="我的关注" />

    <div class="content" v-for="(item,index) in data" :key="index">
      <div class="img">
        <img :src="$axios.defaults.baseURL + item.head_img" alt />
      </div>
      <div class="title">
        <p>{{item.nickname}}</p>
        <i>2019-9-26</i>
      </div>
      <span class="cancel-follow" @click="cancelfollow(index)">取消关注</span>
    </div>
  </div>
</template>

<script>
import HandleBack from "@/components/HandleBack";

export default {
  components: {
    HandleBack
  },
  mounted() {
    //进入关注用户页面加载数据
    this.$axios({
      url: "/user_follows",
      // method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      let { data } = res.data;
      this.data = data;
    });
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    cancelfollow(index) {
      let id = this.data[index].id;
      this.data.splice(index, 1);

      //取消关注用户
      this.$axios({
        url: "/user_unfollow/"+id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        if(res.data.message == "取消关注成功"){
          this.$toast.success(res.data.message);
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  .content {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .img {
      img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        border-radius: 50%;
      }
    }

    .title {
      flex: 1;
      margin-left: 10px;

      i {
        color: #666;
        font-size: 12px;
      }
    }

    .cancel-follow {
      background: #ccc;
      color: #333;
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 16px;
    }
  }
}
</style>
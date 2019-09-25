<template>
  <div class="wrap">
    <div class="head">
      <HandleBack title="编辑资料" />
    </div>
    <div class="img">
      <img :src="head" alt />
    </div>
    <CellBar title="昵称" :content="info.nickname" @handleClick="editnickname" />
    <CellBar title="密码" :content="info.password" type="password" />
    <CellBar title="性别" :content="info.gender==1?'男':'女'" />
  </div>
</template>

<script>
import HandleBack from "@/components/HandleBack";
import CellBar from "@/components/CellBar";
export default {
  components: {
    HandleBack,
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
    editnickname() {
      console.log(123);
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  background: #eee;
  margin: 10px;
  padding: 10px;

  .img {
    text-align: center;

    img {
      width: 80/360 * 100vw;
      height: 80/360 * 100vw;
      border-radius: 50%;
    }
  }
}
</style>
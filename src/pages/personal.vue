<template>
  <div>
    <div class="profile">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />

      <div class="profile-center">
        <div class="name">
          <span class="iconfont iconxingbienv"></span>
          {{info.nickname}}
        </div>
        <div class="time">2019-9-24</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {

    components: {

    },

    data(){
        return {
            info:{}

        }
    },

    mounted() {
        this.$axios({
            url:"/user/"+localStorage.getItem("user_id"),
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then(res => {
            console.log(res);
            // this.info.head_img = res.data.data.head_img;
            // this.info.nickname = res.data.data.nickname;
            const {data} = res.data;
            this.info = data;
        })
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
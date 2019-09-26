<template>
  <div class="wrap">
    <div class="head">
      <HandleBack title="编辑资料" />
    </div>
    <div class="img">
      <img :src="info.head_img" alt />
      <van-uploader :after-read="afterRead" class="imgfile" />
    </div>
    <CellBar
      title="昵称"
      :content="info.nickname"
      @handleClick="showEditNickName = !showEditNickName"
    />
    <van-dialog v-model="showEditNickName" title="编辑昵称" show-cancel-button @confirm="editnickname">
      <van-field :value="info.nickname" placeholder="请输入用户名" ref="nickname" />
    </van-dialog>

    <CellBar
      title="密码"
      :content="info.password"
      type="password"
      @handleClick="showEditPassword = !showEditPassword"
    />
    <van-dialog v-model="showEditPassword" title="编辑密码" show-cancel-button @confirm="editpassword">
      <van-field :value="info.password" placeholder="请输入密码" ref="password" />
    </van-dialog>

    <CellBar
      title="性别"
      :content="info.gender==1?'男':'女'"
      @handleClick="showEditGender = !showEditGender"
    />
    <van-dialog v-model="showEditGender" title="编辑性别" show-cancel-button @confirm="editgender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = '0'">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
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
      showEditNickName: false,
      showEditPassword: false,
      showEditGender: false,
      gender:"1"
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
      this.gender = ""+this.info.gender;

      if (this.info.head_img) {
        this.info.head_img = this.$axios.defaults.baseURL + this.info.head_img;
      } else {
        this.info.head_img = "./static/peng.jpg";
      }
    });
  },

  methods: {
    editnickname() {
      let nickname = this.$refs.nickname.$refs.input.value;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          nickname
        }
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        if (message === "修改成功") {
          this.info.nickname = nickname;
          this.$toast.success(message);
        }
      });
    },

    editgender() {
      let gender = this.gender;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          gender
        }
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        if (message === "修改成功") {
          this.info.gender = gender;
          this.$toast.success(message);
        }
      });
    },

    editpassword() {
      let password = this.$refs.password.$refs.input.value;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          password
        }
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        if (message === "修改成功") {
          this.info.password = password;
          this.$toast.success(message);
        }
      });
    },


    afterRead(file) {
      // 此时可以自行将文件上传至服务器

      let imgFile = new FormData();
      imgFile.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "POST",
        data: imgFile,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.info.head_img = this.$axios.defaults.baseURL + data.url;

        this.$axios({
          url: "/user_update/" + localStorage.getItem("user_id"),
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token")
          },
          data: {
            head_img: data.url
          }
        }).then(res => {
          // console.log(res);
          const { message } = res.data;
          if (message === "修改成功") {
            this.$toast.success(message);
          }
        });
      });
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
    position: relative;
    text-align: center;

    img {
      width: 80/360 * 100vw;
      height: 80/360 * 100vw;
      border-radius: 50%;
    }

    /deep/ .van-uploader__upload {
      width: 80/360 * 100vw;
      height: 80/360 * 100vw;
    }

    .imgfile {
      position: absolute;
      left: 50%;
      // margin-left: -80/360 * 100vw/2;
      transform: translateX(-80/360 * 100vw/2);
      opacity: 0;
    }
  }
}
</style>
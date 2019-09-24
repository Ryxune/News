<template>
  <div class="container">
    <div class="close">
      <span class="iconfont iconicon-text"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div>
      <AuthInput
        placeholder="手机号码"
        :value="form.username"
        @input="handleUsername"
        type="text"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
      ></AuthInput>
      <AuthInput
        placeholder="昵称"
        :value="form.nickname"
        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
        err_message="请输入2-6位的昵称"
        type="text"
      ></AuthInput>
      <AuthInput
        placeholder="密码"
        :value="form.password"
        @input="handlePassword"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="请输入3-12位的密码"
        type="password"
      ></AuthInput>
    </div>
    <p class="tips">
      已有账号? 
      <router-link to="/login">去登录</router-link>
    </p>
    <AuthButton @click="handleSubmit" text="注册"></AuthButton>
  </div>
</template>

<script>
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname:""
      }
    };
  },

  components: {
    AuthInput,
    AuthButton
  },
  methods: {
    handleUsername(value) {
      this.form.username = value;
    },

    handleSubmit() {
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        if (message === "注册成功") {
          this.$toast.success(message);
          this.$router.push("/login");
        } else {
          this.$toast.fail(message+",请重新填写");
        }
      });
    },

    handlePassword(value) {
      this.form.password = value;
    }
  }
};
</script>

<style scoped lang="less">
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
.container {
  padding: 20px;

  .tips {
    text-align: right;
    margin: 10px;

    a {
      color: #007acc;
    }
  }
}
.close {
  padding: 20px;
  span {
    font-size: 27/360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126/360 * 100vw;
    color: #d81e06;
  }
}
</style>
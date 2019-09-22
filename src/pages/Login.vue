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
        placeholder="Phone number电话号码"
        :value="form.username"
        @input="handleUsername"
        type="text"
      ></AuthInput>
      <AuthInput
        placeholder="password 密码"
        :value="form.password"
        @input="handlePassword"
        type="password"
      ></AuthInput>
    </div>
    <AuthButton @click="handleSubmit" text="登录"></AuthButton>
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
        password: ""
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
      console.log(this.form);
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
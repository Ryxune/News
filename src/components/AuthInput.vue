<template>
  <input 
    class="input" 
    :class="{
      success:status === 'success',
      error:status === 'error'
    }" 
    :placeholder="placeholder" 
    :value="value" 
    @input="handleInput"
    @change="handleChange" 
    :type="type" />
</template>

<script>
export default {
  props: ["placeholder", "value", "name", "rule","err_message","type"],

  data(){
      return {
          status:"",
      }
  },

  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);

      const {value} = event.target;
      this.$emit("input",value);

      if(this.rule){
          if(this.rule.test(value)){
              this.status = 'success';
          }else{
              this.status = 'error';
          }
      }
    },
    handleChange(){
        if(this.err_message && this.status === 'error'){
            this.$toast.fail(this.err_message);
        }
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38 / 360 * 100vw;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 1px #666 solid;
  outline: none;
  font-size: 18px;
}
.success {
    border-color: #96d1a5;
}

.error {
    border-color: red;
}
</style>
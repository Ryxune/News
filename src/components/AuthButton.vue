<template>
  <div class="btn" @click="handleClick">
      {{text}}
  </div>
</template>

<script>
export default {
    props:["text"],
    methods:{
        handleClick(event){
            this.$emit("click",event)
        }
    }
};
</script>

<style scoped lang="less">

    .btn {
        width:100%;
        height:48/360*100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #D81e06;
        color:#fff;
        border-radius: 50px;
        font-style: 20px;
        margin-top: 20px;
    }
</style>
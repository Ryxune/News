<template>
  <div class="wrap">
    <HandleBack title="我的跟帖" />
    <div class="content" v-for="(item,index) in comments" :key="index">
      <div class="time">2019-9-26 20:53</div>
      <div class="origin" v-if="item.parent">
        <p>
          回复:
          <i>{{item.parent.user.nickname}}</i>
        </p>
        <p>{{item.parent.content}}</p>
      </div>
      <div class="comment">{{item.content}}</div>
      <div class="article">
        <p>
          原文:
          <i>{{item.post.title}}</i>
        </p>
        <em class="iconfont iconjiantou1"></em>
      </div>
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
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      let {data} = res.data;
      this.comments = data;
      console.log(data);

    });
  },
  data(){
    return {
      comments:'',
    }
  }
};
</script>

<style scoped lang="less">
.content {
  margin: 20px 0;
  padding: 0 20px;
  border-bottom: 2px solid #ccc;

  .time {
    color: #aaa;
    padding-bottom: 15px;
    font-size: 14px;
  }

  .origin {
    background: #e4e4e4;
    padding: 10px;
    color: #aaa;

    p {
      margin-bottom: 10px;
    }
  }
  .comment {
    margin: 10px 0;
  }

  .article {
    display: flex;
    justify-content: space-between;

    color: #999;
    margin-bottom: 10px;
    font-size: 14px;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    em {
      padding-left: 30px;
    }
  }
}
</style>
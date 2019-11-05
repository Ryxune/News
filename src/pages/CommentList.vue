<template>
  <div class="wrap">
    <HandleBack title="精彩跟帖" />
    <div class="comment" v-for="(item,index) in commentList" :key="index">
      <div class="info">
        <div class="pic">
          <img src="/images/xin.jpg" alt />
          <div class="name">
            <p>{{item.user.nickname}}</p>
            <span class="time">2小时前</span>
          </div>
        </div>
        <div class="replay" @click="replay()">回复</div>
      </div>

      <!-- 评论楼层 -->
      <CommentFloor v-if="item.parent" :data="item.parent" />

      <div class="myContent">{{item.content}}</div>
    </div>

    <div class="end">到底了哦</div>

    <div class="footer">
      <DetailFooter
        :has_like="detail.has_like"
        :commentLength="detail.comment_length"
        :post="detail"
        @getComments="getComments"
      ></DetailFooter>
    </div>
  </div>
</template>

<script>
import HandleBack from "@/components/HandleBack";
import CommentFloor from "@/components/CommentFloor";
import DetailFooter from "@/components/DetailFooter";
export default {
  components: {
    HandleBack,
    CommentFloor,
    DetailFooter
  },
  data() {
    return {
      commentList: [],
      detail: {}
    };
  },
  mounted() {
    //获取文章详情
    this.$axios({
      url: "/post/" + this.$route.params.id,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      this.detail = res.data.data;
    });
    //获取评论列表
    this.$axios({
      url: "/post_comment/" + this.$route.params.id
    }).then(res => {
      this.commentList = res.data.data;
    });
  },
  methods: {
    getComments(id) {
      this.$axios({
        url: "/post_comment/" + id
      }).then(res => {
        this.commentList = res.data.data;
      });
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  .comment {
    padding: 10px;
    border-bottom: 1px dashed #ddd;

    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .pic {
        display: flex;
        align-items: center;

        img {
          width: 40/360 * 100vw;
          height: 40/360 * 100vw;
          border-radius: 50px;
          object-fit: cover;
          margin-right: 10px;
        }

        .name {
          font-size: 14px;

          .time {
            font-size: 12px;
            color: #ccc;
          }
        }
      }

      .replay {
        font-size: 14px;
        color: #888;
      }
    }

    .myContent {
      margin-top: 10px;
    }
  }
  .end {
    text-align: center;
    color: #ccc;
    font-size: 12px;
    margin: 10px 10px 60px;
  }
}

/deep/.wrap .footer-comment {
  background: #f2f2f2;
  margin-top: 60px;
}
/deep/.wrap .footer {
  background: #f2f2f2;
}
</style>
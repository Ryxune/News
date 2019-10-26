<template>
  <div>
    <div class="picture" v-if="post.type == 1 && (post.cover.length>0 && post.cover.length<3)">
      <div class="main">
        <router-link :to="`/post_detail/${post.id}`">
          <div class="title">{{post.title}}</div>
        </router-link>
        <div class="info">
          <span class="author">{{post.author}}</span>
          <span class="follow">
            <i>{{post.follow}}</i>??
          </span>
        </div>
      </div>
      <router-link :to="`/post_detail/${post.id}`">
        <div class="img">
          <img :src="post.cover[0].url" alt />
        </div>
      </router-link>
    </div>

    <div class="pictures" v-if="post.type == 1 && (post.cover.length>=3)">
      <router-link :to="`/post_detail/${post.id}`">
        <div class="title">{{post.title}}</div>
      </router-link>
      <router-link :to="`/post_detail/${post.id}`">
        <div class="imgs">
          <img :src="item.url" alt v-for="(item,index) in post.cover" :key="index" />
        </div>
      </router-link>
      <div class="info">
        <span class="author">{{post.author}}</span>
        <span class="follow">
          <i>{{post.follow}}</i>??
        </span>
      </div>
    </div>

    <div class="video" v-if="post.type == 2">
      <router-link :to="`/post_detail/${post.id}`">
        <div class="title">{{post.title}}</div>
      </router-link>
      <router-link :to="`/post_detail/${post.id}`">
        <div class="video-img">
          <img :src="post.cover[0].url" alt />
          <i class="iconfont iconshipin"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  mounted() {
    this.post.cover.forEach((item,index) => {
      if(item.url.indexOf('http') === -1) {
        item.url = this.$axios.defaults.baseURL + item.url;
      }
    });
  }
};
</script>

<style scoped lang="less">
.picture {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  border-bottom: 1px solid #ccc;

  .main {
    color: #333;
    flex: 1;
    margin: 10px 8px;

    .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      font-size: 14px;
      margin-bottom: 5px;
    }

    .info {
      color: #aaa;
      font-size: 12px;
    }
  }

  .img {
    img {
      display: block;
      width: 120 / 360 * 100vw;
      height: 80 / 360 * 100vw;
      object-fit: cover;
    }
  }
}

.pictures {
  margin: 10px;
  border-bottom: 1px solid #ccc;

  .title {
    color: #333;
    margin: 5px;
    font-size: 14px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .imgs {
    display: flex;

    img {
      display: block;
      width: 120 / 360 * 100vw;
      height: 80 / 360 * 100vw;
      object-fit: cover;
    }
    img + img {
      margin-left: 2px;
    }
  }

  .info {
    color: #aaa;
    font-size: 12px;
    margin: 5px;
  }
}

.video {
  margin: 10px;

  .title {
    color: #333;
    margin: 5px;
    font-size: 14px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .video-img {
    position: relative;
    img {
      display: block;
      width: 340 / 360 * 100vw;
      height: 170 / 360 * 100vw;
      object-fit: cover;
    }

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      padding: 6px 8px;
      background: #9696963d;
      border-radius: 50%;
    }
  }
}
</style>
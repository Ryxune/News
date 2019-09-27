<template>
  <div>
    <div class="picture" v-if="type == 1 && (cover.length>0 && cover.length<3)">
      <div class="main">
        <div class="title">{{title}}</div>
        <div class="info">
          <span class="author">{{author}}</span>
          <span class="follow">
            <i>{{follow}}</i>跟帖
          </span>
        </div>
      </div>
      <div class="img">
        <img :src="img" alt />
      </div>
    </div>

    <div class="pictures" v-if="type == 1 && (cover.length>=3)">
      <div class="title">{{title}}</div>
      <div class="imgs" >
        <img :src="img" alt  v-for="(item,index) in imgs" :key="index"/>
      </div>
      <div class="info">
        <span class="author">{{author}}</span>
        <span class="follow">
          <i>{{follow}}</i>跟帖
        </span>
      </div>
    </div>

    <div class="video" v-if="type == 2">
      <div class="title">{{title}}</div>
      <div class="video-img">
        <img :src="img" alt />
        <i class="iconfont iconshipin"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "author", "img","follow","type","cover","imgs"]
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
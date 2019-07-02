<template>
  <div class="page-home-films">
    <Banner navigation scrollbar pagination loop aotoplay class="banner" :list="bannerList"></Banner>
    <div class="city-fixed" @click="handleGoCity">
      <span>深圳</span>
      <i class="iconfont icon-xiala"></i>
    </div>
    <van-tabs v-model="active">
      <van-tab title="正在热映">内容 1</van-tab>
      <van-tab title="即将上映">内容 2</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Banner from "@/components/Banner";
import { mapState, mapActions } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "films",
  data() {
    return {
      active: 0
    };
  },
  components: {
    Banner
  },
  computed: {
    ...mapState("film", ["bannerList"])
  },
  methods: {
    //派发action动作
    ...mapActions("film", ["getBannerList"]),
     handleGoCity() {
      this.$router.push("/city");
    }
  },
  created() {
    //发送ajax请求
    this.getBannerList();
    setTimeout(() => {
      this.$store.commit("film/setBannerList", {
        list: [
          {
            BannerId: 1,
            imgUrl:
              "https://static.maizuo.com/v5/upload/6ba971c960b2e060b3213549a5a78db7.jpg?x-oss-process=image/quality,Q_70"
          },
          {
            BannerId: 2,
            imgUrl:
              "https://static.maizuo.com/v5/upload/11383fd13de7b161c70b20c9c8cea9fd.jpg?x-oss-process=image/quality,Q_70"
          },
          {
            BannerId: 3,
            imgUrl:
              "https://static.maizuo.com/v5/upload/2ca6f424a5d43e2928847ad65a807666.jpg?x-oss-process=image/quality,Q_70"
          }
        ]
      });
    }, 2000);
  }
};
</script>
<style lang="scss">
@import "~@/assets/styles/common/px2rem.scss";
.page-home-films{
    .banner{
        img{
            width: 100%;
        }
    }
}
.city-fixed{
     position: absolute;
    top: px2rem(18);
    left: px2rem(7);
    color: #fff;
    z-index: 10;
    font-size: px2rem(13);
    background: rgba(0, 0, 0, 0.2);
    height: px2rem(30);
    line-height: px2rem(30);
    border-radius: px2rem(15);
    text-align: center;
    padding: 0 px2rem(5);
}
i{
    font-size: px2rem(10);
}
</style>


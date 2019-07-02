<template>
  <div class="mz-banner swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.bannerId">
        <img :src="item.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="pagination"></div>
    <template v-if="navigation">
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </template>
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar" v-if="scrollbar"></div>
  </div>
</template>
    
<script>
import Swiper from "swiper";
export default {
  name: "Banner",
  props: {
    list: {
      //轮播项
      type: Array,
      define() {
        return [];
      }
    },autoplay:{
      //是否需要自动轮播
      type:Boolean,
      default:false
    },
    //是否需要上下箭头
    navigation: {
      type: Boolean,
      define: false
    }, //是否需要滚动条
    scrollbar: {
      type: Boolean,
      define: false
    },
    pagination: {
      //是否需要分页器
      type: Boolean,
      define: false
    },
    loop: {
      type: Boolean,
      define: false
    }
  },
  methods: {
    //初始化swiper
    initSwiper() {
      this.mySwiper = new Swiper(".swiper-container", {
        //判断是否需要分页器
        pagination: this.pagination ? { el: ".swiper-pagination" } : {},
        //是否需要自动轮播
        autoplay:this.autoplay?{el:'.swiper-container'}:{},
        navigation: this.navigation
          ? {
              //判断是否需要左右箭头
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          : "",
        scrollbar: this.scrollbar ? ".swiper-scrollbar" : "",
        //是否需要无缝轮播
        loop: this.loop
      });
    }
  },
  updated() {
    //判断list是否有变化，如果是就初始化swiper,并且还需要判断swiper是否已经初始化过
    // console.log();
    if (this.list.length && !this.mySwiper) {
      console.log("bannerlist发生了改变");
      this.initSwiper();//要拿到数据之后才进行swiper更新
    }
    if(this.list.length){
      this.mySwiper.updateSlides(true);
    }
  }
  // mounted() {
  //   this.initSwiper();
  // }
};
</script>
<style lang="scss">
@import "~swiper/dist/css/swiper.css";
@import "~@/assets/styles/common/px2rem.scss";
.mz-banner {
  height: px2rem(210);
  img {
    width: 100%;
  }
}
</style>


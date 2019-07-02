<template>
<!-- tabbar组件 -->
  <div class="mz-tabbar">
    <ul class="mz-tabbar__ul">
      <li class="mz-tabbar__li" v-for="(tab,index) in tabs" :key="index">
        <router-link :to="tab.to" active-class="active">
          <i class="iconfont" :class="tab.icon"></i>
          <span>{{tab.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Tabbar",
  props: {
    //[{name:'电影',icon:'icon-films',to:'/films'}]
    tabs: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/styles/common/px2rem.scss";
@import "../../assets/styles/common/mixins.scss";
.mz-tabbar {
  @include border-top;
  @include border-bottom;
  height: px2rem(50);
  background: #ffffff;
  &__ul {
    display: flex;
    height: 100%;
  }
  &__li {
    flex: 1;
    a {
      display: flex;
      justify-content: center;
      height: 100%;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      font-size: px2rem(10);
      color: #797d82;
      .iconfont {
        font-size: px2rem(24);
        margin-bottom: 2px;
      }
      &.active {
        color: #ff5f16;
      }
    }
  }
}
</style>



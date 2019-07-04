<template>
  <keep-alive :include="['home']">
    <router-view></router-view>
  </keep-alive>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "APP",
  methods: {
    ...mapActions("city", ["getCities"])
  },
  created() {
    //激活
    /* 
        判断本地是否又cities的数据，如果有，就不发送请求
        let cities=window.localStorage.getItem('cities');
        if(!cities){
            this.getCities();
        }
         */
    this.getCities();
  }
};
</script>


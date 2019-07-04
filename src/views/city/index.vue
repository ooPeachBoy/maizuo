<template>
  <div class="page-city">
    <van-search placeholder="请输入搜索关键词" v-model="searchVal" />
    <!-- 拼音检索 -->
    <div class="lv-indexlist" v-show="!searchVal">
      <ul class="lv-indexlist__content" ref="lv-indexlist__content">
        <div class="recommend-city">
          <div class="gprs-city">
            <div class="city-index-title">GPS定位你所在城市</div>
            <ul class="city-index-detail">
              <li class="city-item-detail city-item-detail-gprs">
                <div class="city-item-text">定位失败</div>
              </li>
            </ul>
          </div>
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail">
              <li
                class="city-item-detail"
                v-for="item in hotCity"
                :Key="item.cityId"
                @click="handleChgCity(item)"
              >
                <div class="city-item-text">{{ item.name }}</div>
              </li>
            </ul>
          </div>
        </div>
        <li :ref="'box_' + item.py" class="lv-indexsection" v-for="item in cityList" :Key="item.py">
          <p class="lv-indexsection__index">{{ item.py }}</p>
          <ul>
            <li
              v-for="city in item.list"
              :Key="city.cityId"
              @click="handleChgCity(city)"
            >{{ city.name }}</li>
          </ul>
        </li>
      </ul>
      <div class="lv-indexlist__nav">
        <ul>
          <li v-for="item in indexlist" :key="item" @click="goTop(item)">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="lv-indexlist" v-show="searchVal">
      <ul class="search_box" v-show="searchList.length > 0">
        <li
          v-for="city in searchList"
          :key="city.cityId"
          @click="handleChgCity(city)"
        >{{ city.name }}</li>
      </ul>

      <div class="empty-result" v-show="!searchList.length">
        <img src="../../assets/images/empty.png" alt />
        <p>没有找到匹配的城市</p>
      </div>
    </div>
    <!-- 搜索结果 -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "city",
  computed: {
    ...mapGetters("city", ["cityList", "hotCity", "indexlist", "searchList"]),
    searchVal: {
      get() {
        return this.$store.state.city.searchVal;
      },
      set(value) {
        this.$store.commit({
          type: "city/setSearchVal",
          value
        });
      }
    }
  },
  methods: {
    //将城市列表的代码放在app.vue当中。原因因为城市列表是所有组件都要进行缓存的，放在app.vue可以实现所有组件缓存城市列表的的缓存
    goTop(py) {
      /* 
      点击当前拼音，使当前拼音回退到顶部
      寻找左侧对应的字母元素
      */
      let el = this.$refs["box_" + py][0];
      let box = this.$refs["lv-indexlist__content"];
      /* 得到el距离顶部的距离 */
      let offsetTop = el.offsetTop;
      box.scrollTop = offsetTop;
    },
    /* 
    修改当前城市
     1. 获取当前点击的城市id
     2. 将仓库中的相关数据进行修改
     3. 编程式导航，回到上一页
     4. 将城市id给本地存储起来，再次刷新，城市将不会改变
    */
    handleChgCity(city) {
      let cityId = city.cityId;
      this.$store.commit({
        type: "city/setCurCityId",
        cityId
      });
      this.$router.back();
      window.localStorage.setItem("curCityId", cityId);
    }
  }
};
</script>
<style lang="scss">
@import "./index.scss";
</style>




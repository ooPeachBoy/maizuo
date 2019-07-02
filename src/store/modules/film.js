import axios from "axios";
//影片相关的信息
const state = {
  //轮播图的详情是通过ajax请求得到的，默认是空数组
  bannerList: []
};
const getters = {};
const mutations = {
  //修改bannerList里面的数据
  setBannerList(state, payload) {
    state.bannerList = payload.list;
  }
};
const actions = {
  getBannerList({ commit }) {
    //得到一个context，从中得到一个commit
    axios
      .get("https://m.maizuo.com/gateway?type=2&cityId=110100&k=695801", {
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15611214189161165243262"}',
'X-Host': 'mall.cfg.common-banner'
        }
      })
      .then(response => {
        console.log(response.data);
          let res = response.data;
        if (res.status === 0) {
          //请求成功  将bannerList修改
          //请求成功后，触发commit修改数据
          commit({
            type: 'setBannerList',
            list: res.data
          });
        } else {
          //失败 TODO
          alert(res.status.msg);
        }
      });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

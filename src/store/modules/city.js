import axios from "axios";
// import { Toast } from "vant";
const state = {
  cities: window.localStorage.getItem("cities")
    ? JSON.parse(window.localStorage.getItem("cities"))
    : [], //城市列表数据
  searchVal: "", //搜索关键字
  curCityId: window.localStorage.getItem("curCityId")
    ? window.localStorage.getItem("curCityId") - 0
    : 440300 //当前城市的id
};
const getters = {
  curCityInfo(state) {
    //当前城市的城市信息
    return state.cities.find(item => item.cityId === state.curCityId);
  },
  cityList(state) {
    //城市列表信息
    //创建cityList数组格式[{py:beijing,name:'北京'},{×××}]
    let result = [];
    state.cities.forEach(city => {
      let py = city.pinyin.charAt(0).toUpperCase();
      let index = result.findIndex(item => item.py === py);
      if (index > -1) {
        result[index].list.push(city); //如果拼音首字母相同，则为同一类，push进同一list数组当中
      } else {
        let obj = {
          py,
          list: [city] //如果首字母不相同，则开辟一个新的对象
        };
        result.push(obj); //将最终的obj对象push进result当中
      }
    });
    result = result.sort((a, b) => {
      return a.py.charCodeAt() - b.py.charCodeAt();
    });
    return result; //用数组方法利用ASCII码值对首字母进行排序
  },
  hotCity(state) {
    return state.cities.filter(item => item.isHot);
    //根据isHot的值筛选热门城市
  },
  indexlist(state, getters) {
    //因为cityList中已经将首字母排序，所以我们只需将cityList中的拼音过滤出组成一个新的数组即可
    return getters.cityList.map(item => item.py);
  },
  searchList(state) {
    //根据搜索框 searchVal来过滤cities
    let tmp = []; //默认为空数组
    if (state.searchVal) {
      tmp = state.cities.filter(item => {
        return item.name.indexOf(state.searchVal) > -1; //说明存在，并将其存放在tmp数组当中
      });
    }
    return tmp; //将数组返回
  }
};
const mutations = {
  setSearchVal(state, payload) {
    state.searchVal = payload.value;
  },
  setCities(state, payload) {
    state.citys = payload.list;
  },
  setCurCityId(state, payload) {
    state.curCityId = payload.cityId;
  }
};
//action中发送ajax请求 得到数据
const actions = {
  getCities({ commit, state }) {
    //如果仓库中数据已经请求到，就不需要发送请求了
    if (state.cities.length) {
      return;
    }
    axios
      .get("https://m.maizuo.com/gateway?k=524880", {
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15611214189161165243262"}',
          "X-Host": "mall.film-ticket.city.list"
        }
      })
      .then(response => {
        let res = response.data;
        console.log(res);
        //数据请求成功，经城市数据信心存储到仓库当中
        if (res.status === 0) {
          commit({
            type: "setCities",
            list: res.data.cities
          });
          /* 将城市数据存储起来 */
          window.localStorage.setItem(
            "cities",
            JSON.stringify(res.data.cities)
          );
        } else {
          console.log(res.msg);
        }
      });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

import Vue from "vue";
import { router } from "../../router";

const state = {
  products: []
};

const getters = {
  getProducts(state) {
    return state.products;
  },
  getProduct(state) {}
};

const mutations = {
  updateProductList(state, product) {
    state.products.push(product);
  }
};

const actions = {
  initApp({ commit }) {
    //Vue Resource İşlemleri..
  },
  saveProduct({ dispatch, commit }, product) {
    //Vue Resource İşlemleri..
    Vue.http
      .post(
        "https://prod-working-default-rtdb.firebaseio.com/products.json",
        product
      )
      .then(response => {
        /******* Product List Update *************/
        product.key = response.body.name;
        commit("updateProductList", product);
        /******* Updating Purchase, Sales and Balance Data *************/
        let tradeResult = {
          purchase: product.price,
          sale: 0,
          count: product.count
        };
        dispatch("setTradeResult", tradeResult);
        router.replace("/");
      });
  },
  sellProduct({ commit }, payload) {
    //Vue Resource İşlemleri..
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

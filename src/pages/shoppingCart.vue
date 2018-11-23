<template>
  <!--购物车编辑操作-->
  <div class="">
    <common-header :params="{title:'购物车',backgroundColor:'#07975a',color:'#fff'}"></common-header>
    <lg-scroll-view style="top: 1rem;">
      <div slot="swiper-list">
        <div class="pad_t20">
          <ul>
            <li class="flex_c_l bottom_20 whitebg pad_t20 pad_b20 pad_r20 pad_l20" v-for="(item,index) in List"
                :key="index">
              <div class="">
                <div class="" v-show="item.show" @click="choose(index)">
                  <img class="w_38 h_38 block" src="../assets/images/check_out_ico.png" alt="">
                </div>
                <div v-show="!item.show" @click="choose(index)">
                  <img class="w_38 h_38 block" src="../assets/images/check_ico.png" alt="">
                </div>
              </div>
              <div class="flex_1 pad_l20 flex_t_l">
                <div class="w_210">
                  <img class="w_210 h_160 block" v-bind:src="item.images" alt="">
                </div>
                <div class="flex_1 pad_l20 h_160 flex_c_c_col_s">
                  <div class="w_c100">
                    <div class=" clamp_2 font_26 color_0 ">{{item.title}}</div>
                  </div>
                  <div class="w_c100">
                    <div class="flex_c_bet">
                      <div>{{item.price}}</div>
                      <div class="flex_c_l">
                        <div @click="cut(index)" :disabled="item.num === 1" style="margin-right:5px;"
                             class="w_65 font_52 bg_f5 h_55 color_cc flex_c_c">-
                        </div>
                        <input class="w_85 center nobor_out h_55 bg_f5" @click="saveIndex(index)" v-model="item.num">
                        <div @click="add(index)" style="margin-left:5px;"
                             class="w_65 font_52 bg_f5 h_55 color_cc flex_c_c">+
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </lg-scroll-view>
    <div style="width: 7.3rem" class="po_ab_bottom whitebg   pad_l20 h_110 flex_c_l">
      <div >
        <div class="w_38" v-show="allShow" @click="allChoose()">
          <img class="w_38 h_38 block" src="../assets/images/check_out_ico.png" alt="">
        </div>
        <div class="w_38" v-show="!allShow" @click="allChoose()">
          <img class="w_38 h_38 block" src="../assets/images/check_ico.png" alt="">
        </div>

      </div>
      <div class="flex_1 h_c100 flex_c_r">
        <div class="">{{accountNum.toFixed(1)}}</div>
        <div class="white left_20 h_c100 flex_c_c w_190 bg_f0">
          结算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonHeader from "../components/commonHeader";
  import LgScrollView from "../components/lgScrollView";

  export default {
    data() {
      return {
        List: [{
          title: '商品名称',
          price: '1200',
          images: 'https://img11.360buyimg.com/babel/s190x150_jfs/t26695/237/1889943714/54573/f21b6599/5bf21ef3N4eff9e98.jpg!q90!cc_190x150',
          num: '2',
          show: false
        }, {
          title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
          price: '1200',
          images: 'https://img11.360buyimg.com/babel/s190x150_jfs/t26695/237/1889943714/54573/f21b6599/5bf21ef3N4eff9e98.jpg!q90!cc_190x150',
          num: '6',
          show: false,
        }],
        allShow:false,
        accountNum: 0,
        listIndex: 0
      }
    },
    mounted() {
      this.account()
    },
    methods: {
      // 全选
      allChoose: function() {
        this.allShow = !this.allShow
        for (var i in this.List) {
          this.List[i].show = this.allShow
        }
        this.account()
      },
      saveIndex: function (index) {
        this.listIndex = index
      },
      account: function () {
        this.accountNum = 0;
        var that = this
        this.List.forEach(function (item, index) {
          if (item.show == true) {
            that.accountNum += item.price * item.num
          }
        })
      },
      // 单选
      choose: function (i) {
        this.List[i].show = !this.List[i].show
        console.log(this.List.length);
        var choose = this.List.filter(function (i) {
          return i.show == true;
        });
        choose.length == this.List.length ? this.allShow = true : this.allShow = false
        this.account()
      },
      // 购物车减
      cut: function (i) {
        this.listIndex = i
        this.List[i].num--;
        this.account()
      },
      // 购物车加
      add: function (i) {
        this.listIndex = i
        this.List[i].num++;
        this.account()
      },
    },
    watch: {
      List: {
        handler: function (oldVal) {
          var oldVal = oldVal[this.listIndex].num
          const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/
          if (!regex.test(oldVal)) { //如果小于等于零
            this.List[this.listIndex].num = 1; //等于一
            // console.log(this.List[this.listIndex].num)
          }
          this.account()
        },
        deep: true
      }
    },
    components: {LgScrollView, CommonHeader}
  }
</script>

<style scoped>
  .po_ab_bottom {
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>

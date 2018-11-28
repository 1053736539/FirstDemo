<template>
  <div class="">
    <common-header
      @right-click="rightClick()"
      :params="{title:'详情',backgroundColor:'#07975a',color:'#fff',rightText:message,rightSize:'0.3rem'}">
    </common-header>
    <common-scroll-view style="top: 1rem;">
      <div slot="swiper-list" class="">
        <div class="cart-item-listBox">
          <ul class="cart-item-list">
            <li class="whitebg bottom_20 pad_t20 pad_b20 w_710 pad_r20 flex_c_l pad_l20"
                v-for="(item,index) in List" :key="index">
              <div class="w_38 h_38 bo radius_50" :class="{'check':item.checked}" @click="selectedProduct(item)"></div>
              <div class="pad_l20 flex_c_l flex_1">
                <div class="w_215">
                  <img class="w_215 h_160 block"
                       :src="item.images"
                       alt="">
                </div>
                <div class="flex_1 h_160 pad_l20 flex_c_c_col_s">
                  <div class="w_c100">
                    <div class=" clamp_2 font_26 color_0">{{item.title}}</div>
                  </div>
                  <div class="w_c100 flex_c_bet">
                    <div class="font_24 color_0">{{item.price}}</div>
                    <div class="flex_c_l">
                      <div style="margin-right:5px;"
                           @click="changeMoney(item,-1)"
                           class="w_65 font_52 bg_f5 h_55 color_cc flex_c_c">-
                      </div>
                      <input class="w_85 center nobor_out h_55 bg_f5" v-model="item.num">
                      <div style="margin-left:5px;"
                           @click="changeMoney(item,1)"
                           class="w_65 font_52 bg_f5 h_55 color_cc flex_c_c">+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </common-scroll-view>
    <div style="width: 7.3rem" class="whitebg pad_l20 h_110 flex_c_l po_ab_bottom">
      <div class="settlement">
        <div class="w_38 h_38 bo radius_50" :class="allSelect?'check':''" @click="checkAll(true)"></div>
      </div>
      <div class="flex_1 h_c100 flex_c_r" v-if="!fileshow">
        <div class="">{{accountNum}}</div>
        <div class="white left_20 h_c100 flex_c_c w_190 bg_f0">
          结算
        </div>
      </div>
      <div class="flex_1 h_c100 flex_c_r" v-if="fileshow">
        <div class="white left_20 h_c100 flex_c_c w_190 bg_f0" @click="deleteBtn()">
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonHeader from "../components/commonHeader";
  import CommonScrollView from "../components/commonScrollView";

  export default {
    data() {
      return {
        message: '编辑',
        fileshow: false,
        accountNum: 0,
        allSelect: false,
        List: [{
          title: '养元六个核桃易智优＋核桃乳植物蛋白饮料 240ml*20罐 整箱装',
          price: '600',
          images: 'https://img11.360buyimg.com/babel/s190x150_jfs/t26695/237/1889943714/54573/f21b6599/5bf21ef3N4eff9e98.jpg!q90!cc_190x150',
          num: '2'
        }, {
          title: '屈臣氏苏打汽水混合口味系列 饮料（苏打汽水20罐+香草味苏打汽水4罐）330ml*24 整箱装',
          price: '1200',
          images: 'https://img11.360buyimg.com/babel/s190x150_jfs/t28543/77/742582032/60350/2f9d2d12/5bfcf29aNcb2b2431.jpg!q90!cc_190x150',
          num: '6'
        },{
          title: '屈臣氏苏打汽水混合口味系列 饮料（苏打汽水20罐+香草味苏打汽水4罐）330ml*24 整箱装',
          price: '500',
          images: 'https://img11.360buyimg.com/babel/s190x150_jfs/t28543/77/742582032/60350/2f9d2d12/5bfcf29aNcb2b2431.jpg!q90!cc_190x150',
          num: '2'
        }],
      }
    },
    methods: {
      // 头部点击选择切换
      rightClick() {
        this.fileshow = !this.fileshow;
        if (this.fileshow) {
          this.message = '完成'
        } else {
          this.message = '编辑'
        }
      },
      //物品勾选
      selectedProduct(item) {
        if (typeof item.checked == "undefined") {
          this.$set(item, "checked", true)
        } else {
          item.checked = !item.checked;
        }
        // var choose = this.List.filter(function (item) {
        //   return item.checked == true;
        // });
        var choose = [];
        for(var i = 0; i< this.List.length; i++){
          if(this.List[i].checked){
            choose.push(this.List[i])
          }
        }
        choose.length == this.List.length ? this.allSelect = true : this.allSelect = false;
        this.account();
      },
      // 全选按钮
      checkAll() {
        this.allSelect = !this.allSelect;
        this.accountNum = 0;
        if (this.allSelect) {
          for (let i = 0; i < this.List.length; i++) {
            this.$set(this.List[i], 'checked', true);
            this.account();
          }
        } else {
          for (let i = 0; i < this.List.length; i++) {
            this.$set(this.List[i], 'checked', false);
          }
        }
      },
      // 物品加减
      changeMoney(product, num) {
        if (num > 0) {
          product.num++;
        } else {
          product.num--;
          if (product.num < 1) {
            product.num = 1
          }
        }
      },
      // 删除物品
      deleteBtn(){

      },
      // 计算总金额
      account() {
        this.accountNum = 0;
        var _this = this;
        this.List.forEach(function (item, index) {
          if (item.checked) {
            _this.accountNum += item.price * item.num
          }
        })
      }
    },
    components: {CommonScrollView, CommonHeader}
  }
</script>

<style scoped>

</style>

<template>
  <div class="">
    <common-header :params="{title:'详情',backgroundColor:'#07975a',color:'#fff'}"></common-header>
    <div class="top_100" >
      <div id="table">
        <div class="cart">
          <hr>
          <h1>购物车</h1>
        </div>
        <div class="title">
          <div class="information">商品信息</div>
          <div class="single">商品金额</div>
          <div class="num">商品数量</div>
          <div class="total">总金额</div>
          <div class="edit">编辑</div>
        </div>
        <div class="commodity" v-for="(i,index) in List">
          <ul>
            <li class="comInformation">
              <div class="choose">
                <transition name="fade">
                  <div class="gou" v-show="i.show" @click="choose(index)">√</div>
                </transition>
                <transition name="fade">
                  <div class="cha" v-show="!i.show" @click="choose(index)">×</div>
                </transition>
              </div>
              <div class="photo"> <img v-bind:src="i.images"></div>
              <div class="name">
                <div class="nametop">{{i.name}}</div>
                <div class="namebottom">
                  <div class="gift">赠送:</div>
                  <div class="giftname">{{i.gift[0]}} <br> {{i.gift[1]}} </div>
                </div>
              </div>
            </li>
            <li class="comSingle">￥{{i.single}}</li>
            <li class="comNum">
              <button class="cut" @click="cut(index)" :disabled="i.num === 1">-</button>
              <input v-model="i.num" @click="saveIndex(index)">
              <button class="add" @click="add(index)">+</button>
            </li>
            <li class="comTotal">￥{{(i.single * i.num).toFixed(1)}}</li>
            <li class="comEdit">
              <div class="" @click="list(index)">删除</div>
            </li>
          </ul>
        </div>
        <div class="footer">
          <div class="footer-left">
            <div class="manner">
              <div class="footer-gou" v-show="allShow" @click="allChoose()">√</div>
              <div class="footer-cha" v-show="!allShow" @click="allChoose()">×</div>
            </div>
            <div class="allchoose" @click="allChoose()">全选</div>
            <div class="all" @click="all()">删除</div>
          </div>
          <div class="footer-right">
            <div class="itemtotal">Item total:
              <div class="money">{{accountNum.toFixed(1)}}</div>
            </div>
            <div class="settlement">结账</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CommonHeader from "../components/commonHeader";

  export default {
    data(){
      return{
        List: [{
          name: '黄鹤楼香烟',
          images: "http://www.jq22.com/img/cs/500x500-1.png",
          gift: ['打火机', 'XXX'],
          single: 19.2,
          num: 1,
          show: true
        }, {
          name: '可乐',
          gift: ['吸管', 'XXX'],
          images: "http://www.jq22.com/img/cs/500x500-2.png",
          single: 6.1,
          num: 2,
          show: false
        }],
        allShow: false,
        accountNum: 0,
        listIndex: 0
      }
    },watch: {
      List: {
        handler: function(oldVal) {
          var oldVal = oldVal[this.listIndex].num
          const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/
          if (!regex.test(oldVal)) { //如果小于等于零
            this.List[this.listIndex].num = 1 //等于一
            console.log(this.List[this.listIndex].num)
          }
          this.account()
        },
        deep: true
      }
    },
    mounted() {
      this.account()
    },
    methods: {
      saveIndex: function(index) {
        this.listIndex = index
      },
      account: function() {
        this.accountNum = 0
        var that = this
        this.List.forEach(function(item, index) {
          if (item.show == true) {
            that.accountNum += item.single * item.num
          }
        })
      },
      list: function(i) {
        this.List.splice(i, 1);
        this.account()
      },
      add: function(i) {
        this.listIndex = i
        this.List[i].num++;
        this.account()
      },
      cut: function(i) {
        this.listIndex = i
        this.List[i].num--;
        this.account()
      },
      allChoose: function() {
        this.allShow = !this.allShow
        for (var i in this.List) {
          this.List[i].show = this.allShow
        }
        this.account()
      },
      choose: function(i) {
        this.List[i].show = !this.List[i].show
        console.log(this.List.length)
        var choose = this.List.filter(function(i) {
          return i.show == true;
        });
        choose.length == this.List.length ? this.allShow = true : this.allShow = false
        this.account()
      },
      all: function() {
        for (var i = this.List.length - 1; i >= 0; i--) {
          console.log(i);
          if (this.List[i].show == true) {
            this.List.splice(i, 1);
          }
        }
        this.account()
      }
    },
    components: {CommonHeader}
  }
</script>

<style scoped>
  h1 {
    position:relative;
    margin:0.2rem auto;
    background:white;
    width:2rem;
    letter-spacing:8px;
    text-align:center;
  }
  .title {
    margin-top:40px;
    height:53px;
    line-height:53px;
    background:#5d5d5d;
    color:white;
    display:flex;
    font-size:18px;
    font-weight:bolder;
  }
  .information {
    flex:1;
    text-align:center;
  }
  .single,.num,.total,.edit {
    flex:1;
    justify-content:center;
    align-items:center;
    display:flex;
  }
  .commodity {
    height:140px;
    padding-bottom:40px;
    display:flex;
  }
  .commodity ul {
    display:flex;
    width:100%;
    border-bottom:1px solid #aaaaaa;
    border-top:1px solid #aaaaaa;
  }
  .comInformation {
    flex:5;
  }
  .comSingle,.comNum,.comTotal,.comEdit {
    flex:1;
    justify-content:center;
    align-items:center;
    display:flex;
  }
  input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
    -webkit-appearance:none !important;
    margin:0;
  }
  .comNum input {
    width:37px;
    height:25px;
    text-align:center;
    margin-left:3px;
    margin-right:3px;
  }
  .add,.cut {
    font-weight:bolder;
  }
  .:hover {
    color:red;
    cursor:pointer;
  }
  .gou {
    background:#f07b19;
  }
  .cha {
    background:red;
  }
  .gou,.cha {
    width:14px;
    height:14px;
    border-radius:7px;
    font-size:7px;
    color:white;
    border:solid 1px #bcbcbc;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    position:absolute;
  }
  .comInformation {
    display:flex;
  }
  .photo {
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:20px;
  }
  .photo img {
    width:72px;
    height:72px;
  }
  .choose {
    width:15px;
    display:flex;
    height:100%;
    justify-content:center;
    align-items:center;
    margin-left:22px;
    margin-right:22px;
  }
  .name {
    display:flex;
    flex-direction:column;
    flex:1;
    font-size:14px;
  }
  .nametop {
    flex:1;
    display:flex;
    align-items:center;
  }
  .namebottom {
    flex:0.5;
    display:flex;
  }
  .giftname {
    margin-left:34px;
  }
  .footer {
    display:flex;
    justify-content:space-between;
    height:60px;
    line-height:60px;
  }
  .footer-left,.footer-right {
    display:flex;
  }
  .footer-gou,.footer-cha {
    width:14px;
    height:14px;
    border-radius:7px;
    font-size:7px;
    color:white;
    border:solid 1px #bcbcbc;
    margin-left:22px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
  }
  .footer-gou {
    background:#f07b19;
  }
  .footer-cha {
    background:red;
  }
  .allchoose {
    margin-left:24px;
    font-size:14px;
    color:#f07b19;
    line-height:60px;
    cursor:pointer;
  }
  .all {
    font-size:14px;
    line-height:60px;
    margin-left:14px;
    cursor:pointer;
  }
  .settlement {
    width:205px;
    height:51px;
    margin-left:30px;
    display:flex;
    justify-content:center;
    background:linear-gradient(to top,#fb3023,#f21305);
    color:white;
    font-size:14px;
    font-weight:bolder;
  }
  .manner {
    line-height:60px;
    height:60px;
    display:flex;
    align-items:center;
  }
  .money {
    color:red;
  }
  .itemtotal {
    display:flex;
  }
  button {
    width:15px;
    height:15px;
  }
  .fade-enter-active,.fade-leave-active {
    transition:opacity .5s;
  }
  .fade-enter,.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity:0;
  }

</style>

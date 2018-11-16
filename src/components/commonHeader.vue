<template>
  <common-view class="_header" prevent-default :style="'background: '+pa.bg+'; border-bottom: 1px solid '+pa.boB">
    <common-view class="head_left" v-if="!pa.isTabBar" @lg-tap="goBack">
      <i class="fa fa-angle-left" :style="'color:'+pa.color"></i>
    </common-view>
    <common-view class="_title" :style="'color:'+pa.color+';font-size:'+pa.fz">{{pa.title}}</common-view>

    <!-- 右边的是文字还是图片 -->
    <common-view class="head_right" @lg-tap="rightClick" :style="'color:'+pa.rColor+';width:'+pa.rW+';font-size:'+pa.rSize">
      <span class="right_text" v-if="pa.rText">{{pa.rText}}</span>
      <i v-if="pa.rIcon" :class="['right_icon','fa','fa-'+pa.rIcon]"></i>
    </common-view>
  </common-view>
</template>
<script>
  import commonView from './commonView';

  export default {
    /**
     * title 标题
     * rightText 右边的文字
     * backgroundColor 背景颜色 ('#fff')
     * isTabBar 是不是 底部的快捷导航页 Boolean（默认是false）
     * rightColor 右边的颜色
     * rightIcon 右边的图片的名字, (字体图标的名字 http://fontawesome.dashgame.com/ )
     *  1. npm install font-awesome --save
     *  2. import 'font-awesome/css/font-awesome.min.css'  (main.js)
     * backgroundDir 背景渐变的方向 (默认是'right' 从左到右)
     * borderBottomColor 下边框的颜色 默认是#e8e8e8,不要可以设置成 transparent
     * rightWidth 右边的宽度 (默认是1rem)
     * rightSize 右边的文字或者图标的大小 (默认是0.3rem)
     */

    props: ['params'],
    data(){
      return{
        pa:{
          title:this.params.title?this.params.title:'',
          color:this.params.color?this.params.color:'#333',
          fz:this.params.fontSize?this.params.fontSize:'0.34rem',
          bg:this.getBg(),
          rIcon:this.params.rightIcon?this.params.rightIcon:'',
          rText:this.params.rightText?this.params.rightText:'',
          rColor:this.params.rightColor?this.params.rightColor:(this.params.color?this.params.color:'#333'),
          isTabBar:this.params.isTabBar?this.params.isTabBar:false,
          boB:this.params.borderBottomColor?this.params.borderBottomColor:'#e8e8e8',
          rW:this.params.rightWidth?this.params.rightWidth:'1rem',
          rSize:this.params.rightSize?this.params.rightSize:'0.3rem'
        },
      }
    },
    components:{
      commonView
    },
    mounted(){

    },
    methods: {
      goBack(){
        if(this.$route.query && this.$route.query.url){
          let url = this.$route.query.url;
          let p1 = this.$route.query.p1;
          let p2 = this.$route.query.p2;
          let p3 = this.$route.query.p3;
          let p4 = this.$route.query.p4;
          this.$router.replace({name:url,query:{'p1':p1,'p2':p2,'p3':p3,'p4':p4}})
        }else{
          this.$router.go(-1)
        }
      },
      rightClick() {
        this.$emit('right-click')
      },

      /**
       * 背景颜色存在渐变的情况
       * ['#ffa14d','#ff445f']
       *
       * 否则就是 '#f00'
       */
      getBg(){
        if(typeof this.params.backgroundColor === "object"){
          let dir = this.params.backgroundDir?this.params.backgroundDir:'right';
          return 'linear-gradient(to '+dir+','+ this.params.backgroundColor[0]+','+this.params.backgroundColor[1]+')';
        }else{
          return this.params.backgroundColor?this.params.backgroundColor:'#fff'
        }
      }

    },
    watch:{
      params(val){
        this.pa.rText = this.params.rightText;
        this.pa.title = this.params.title
      }
    }
  }
</script>


<style lang="less">
  @h: 1rem;
  .lg_header {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 333;
    box-sizing: border-box;
    height: @h;
  }
  ._header .head_left{
    width: @h;
    left: 0;
    position: absolute;
    top: 0;
    height: @h;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
  }
  ._header ._title{
    width: 100%;
    display: block;
    text-align: center;
    font-weight: bold;
    line-height: @h;
  }
  ._header .head_right{
    position: absolute;
    right: 0;
    top: 0;
    width: @h;
    height: @h;
    display: flex;
    justify-content: flex-end;
  }
  ._header .right_text{
    line-height: @h;
    font-weight: bold;
    margin-right: 0.2rem;
    white-space: nowrap;
  }
  ._header .right_icon{
    height: @h;
    width: @h;
    display: flex;
    justify-content: center;
    align-items: center;
  }



</style>

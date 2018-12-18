<template>
  <div>
    <lg-header :params="{
      title:'消息中心',
      backgroundColor:'#46c254',
      color:'#fff',
      borderBottomColor:'transparent'
    }"></lg-header>
    <lg-scroll-view style="top: 1rem;bottom: 0;">
      <div slot="swiper-list">
        <div>
          <div class="container">
            <div class="avator" v-if="memberCount.face" :style="{ background: 'url('+img_url+memberCount.face+')no-repeat center center'}">
            </div>
          </div>
        </div>
      </div>
      <!--彩色头像阴影-->
    </lg-scroll-view>
  </div>
</template>

<script>
  import LgHeader from "../components/lg/lgHeader";
  import LgScrollView from "../components/lg/lgScrollView";
  import {Post,Get} from '../api/invoke';
  export default {
    data(){
      return{
        img_url:process.env.IMAGE_URL,
        memberCount:[]
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      // 请求方法
      async  getData () {
        Get('/member/getCount', {}).then(resp => {
          console.error(resp)
          if(resp.success){
            this.memberCount = resp.result
          }
        }).catch(err => {
          console.error(err)
        })
      },
    },
    components: {LgScrollView, LgHeader}
  }
</script>

<style scoped lang="less">
  .container {
    width: 200px;
    margin: 20px auto;
  }

  .avator {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-size: 100% 100%;

    &::after {
      content: "";
      position: absolute;
      top: 10%;
      left: 0%;
      width: 100%;
      height: 100%;
      background: inherit;
      background-size: 100% 100%;
      border-radius: 50%;
      transform: scale(.95);
      filter: blur(10px) brightness(80%) opacity(.8);
      z-index: -1;
    }
  }
</style>

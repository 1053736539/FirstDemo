<template>
  <lg-view class="lg_foot" :style="'background:'+tabBar.backgroundColor" prevent-default>
    <lg-view class="navItem" v-for="(item,index) in tabBar.list" :key="index" :lg-url="item.url" @lg-tap="tabBarTap">
      <img v-if="$route.path.indexOf(item.url) !== -1" :src="item.selectedIconPath"/>
      <img v-else :src="item.iconPath"/>
      <span v-if="$route.path.indexOf(item.url) !== -1" :style="'color:'+tabBar.selectedColor">{{item.title}}</span>
      <span v-else :style="'color:'+tabBar.color">{{item.title}}</span>
    </lg-view>
  </lg-view>
</template>

<script>
  import lgView from './lgView';
  export default {
    data() {
      return {
        tabBar: {
          color:'#999999',
          selectedColor:'#024580',
          backgroundColor:'#fff',
          borderTop:'1px solid #e8e8e8',
          list: [
            {
              title: '首页',
              iconPath: 'static/images/menu1.png',
              selectedIconPath: 'static/images/menu1_on.png',
              url:'home'
            },
            {
              title: '购房',
              iconPath: 'static/images/menu2.png',
              selectedIconPath: 'static/images/menu2_on.png',
              url:'buildingList'
            },
            {
              title: '关于我们',
              iconPath: 'static/images/menu4.png',
              selectedIconPath: 'static/images/menu4_on.png',
              url:'news'
            },
            {
              title: '商城',
              iconPath: 'static/images/menu3.png',
              selectedIconPath: 'static/images/menu3_on.png',
              url:'mall'
            },

            {
              title: '我的',
              iconPath: 'static/images/menu5.png',
              selectedIconPath: 'static/images/menu5_on.png',
              url:'member'
            }
          ]
        }
      }
    },
    methods:{
      tabBarTap(e){
        this.$router.replace({name:e.lgattr.url})
      }
    },
    components:{
      lgView
    }
  }
</script>

<style scoped>
  .lg_foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.1rem;
    z-index: 333;
    border-top: 1px solid #f2f2f2;
    display: flex;
    box-sizing: border-box;

  }
  .lg_foot .navItem {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.26rem;
    flex: 1;
  }
  .lg_foot .navItem img {
    width: 0.5rem;
    height: 0.5rem;
  }
</style>

<template>
  <div class="lg_tab" :style="'height:'+tabHeight+';background:'+bg+';border-bottom-color:'+wrapBoc">
    <div class="lg_tab_item" @click="tabFn(index)" :style="'height:'+tabHeight" v-for="(item,index) in tabParams" :key="index">
      <span :style="'font-size:'+fz+';'+seC+';font-weight:'+seB" v-if="curr===index">{{item.text || item}}</span>
      <span :style="'font-size:'+ fz+';color:'+dfC+';opacity:'+deO" v-else>{{item.text || item}}</span>
      <span class="badge_label" v-if="item.badge>0">{{item.badge>99?'99+':item.badge}}</span>
    </div>
    <div class="tabLine" :style="'height:'+boH+';width:'+(1/tabParams.length*100).toFixed(3)+'% ; left:'+lineLeft">
      <div class="_line" :style="'background:'+boC+';height:'+boH+';width:'+innerBoW"></div>
    </div>
  </div>
</template>

<script>

  /**
   * height          tab的高度
   * tabParams       tab参数是个数组，里面是对象{ title, badge }
   *                    title 是tab的文字，badge是徽标文字
   *
   * background      整个tab的背景
   * fontSize        tab的字体大小
   * defaultColor    默认字体颜色
   * selectedColor   选中的颜色
   * current         当前的索引
   * borderWidth     下边框的宽度
   * borderColor     下边框的颜色
   * borderHeight    下边框的高度
   * defaultOpacity  默认的透明度
   */
  export default {
    props:['height','tabParams','background','fontSize','defaultColor','selectedBold','selectedColor','current','borderWidth','borderColor','borderHeight','defaultOpacity','wrapBorderColor'],
    data(){
      return{
        tabHeight: this.height?this.height:'1rem',
        bg:this.background?this.background:'#fff',
        fz:this.fontSize?this.fontSize:'0.30rem',
        dfC:this.defaultColor?this.defaultColor:'#999',
        seC:this.selectedColor?'color:'+this.selectedColor:'color:#000',
        curr:this.current?this.current:0,
        boH:this.borderHeight?this.borderHeight:'3px',
        boW:this.borderWidth?this.borderWidth:((1/this.tabParams.length*100).toFixed(3)+'%'),
        innerBoW:this.borderWidth?this.borderWidth:'100%',
        boC:this.borderColor?this.borderColor:'#000',
        lineLeft:(this.current?this.current:0)/this.tabParams.length*100+'%',
        paramsLength:this.tabParams,
        seB:this.selectedBold?'bold':'100',
        deO:this.defaultOpacity?this.defaultOpacity:'1',
        wrapBoc:this.wrapBorderColor?this.wrapBorderColor:'#e8e8e8'
      }
    },
    methods:{
      // 切换
      tabFn(i){
        this.curr = i;
        this.$emit('lg-tab',this.curr);
        this.lineLeft=this.curr/this.paramsLength.length*100+'%'
      },
    },
    watch:{
      current(){
        this.curr = this.current;
        this.lineLeft=this.curr/this.paramsLength.length*100+'%'
      },
      tabParams(){
        this.boW = this.borderWidth?this.borderWidth:((1/this.tabParams.length*100).toFixed(3)+'%');
        this.paramsLength = this.tabParams;
      }
    }

  }
</script>

<style lang="less">
  .lg_tab{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 333;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
  }
  .lg_tab .lg_tab_item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .lg_tab.badge_label{
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    min-width: 0.1rem;
    height: 0.3rem;
    padding: 0 0.1rem;
    background: #f00;
    color:#fff;
    font-size: 0.24rem;
    line-height: 1;
    border-radius: 0.3rem;
    font-family: "Tahoma";
  }
  .lg_tab .tabLine{
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
  }

</style>

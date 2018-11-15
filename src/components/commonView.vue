<template>
  <div class="" ref="common_div">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * 点击事件： @lg-tap
   */
  export default {
    mounted(){
      let el = this.$refs.common_div;
      let startPoint = {};
      let _this = this;
      let clickAble = null;
      let lge = null;
      let startTime = 0;
      let attr = {};
      el.addEventListener('touchstart', function(e) {
        e.preventDefault(); // 阻止行为 （主要是阻止touch下面的click事件的穿透事件）
        clickAble = true;
        lge = e;
        // 触摸-开始的点
        let touch = e.changedTouches[0];
        startPoint = {
          x: touch.pageX,
          y: touch.pageY
        };
        startTime = new Date();

        /**
         *  遍历div上所有的属性
         *  去除vue自带的属性
         *  data-v-, length, item, getNamedItem, getNamedItemNS, setNamedItem, setNamedItemNS, removeNamedItem, removeNamedItemNS 这些都不是需要的属性
         *  有些是原生组件隐藏的属性
         */
        for(let i in el.attributes){
          if(i>=0){ // 只有真正的属性才有索引值
            if( el.attributes[i].nodeName.indexOf('lg-')!==-1){
              attr[el.attributes[i].nodeName.substr(3)] = el.attributes[i].nodeValue
            }

            /**
             * 检索到阻止默认事件 直接返回就行，并且不可以点击
             * 属性上加 preventDefault 或者 prevent-default
             * 同时阻止了多个view的时候穿透的尴尬（取不到自定义属性 -_-!!...）
             */
            if(el.attributes[i].nodeName.indexOf('preventDefault')!==-1 || el.attributes[i].nodeName.indexOf('prevent-default')!==-1){
              clickAble = false;
              return false;
            }
          }
        }
        lge.lgattr = attr;
      });
      el.addEventListener('touchend', function(e) {
        let touch = e.changedTouches[0];
        let nowTime = new Date();

        let nowPoint = {
          x: touch.pageX,
          y: touch.pageY
        };
        let dis = {
          x: Math.abs(nowPoint.x - startPoint.x),
          y: Math.abs(nowPoint.y - startPoint.y)
        };
        let disTime = nowTime - startTime;

        if(clickAble){
          if (dis.x < 5 && dis.y < 5) {
            if(disTime>400){ // 长按事件
              _this.$emit('lg-long-tap',lge);
            }else{ // 点击事件
              _this.$emit('lg-tap',lge)
            }
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="common-scroll-wrap-new" ref="commonScrollWrap">
    <div class="common-swiper-content">
      <div class="refreshWrap" v-if="onRefresh && typeof onRefresh ==='function'">
        <div class="chrysanthemum">
          <div class="line" v-for="(item,index) in 12" :key="index"></div>
        </div>
      </div>
      <slot name="clac-height"></slot>
      <slot name="sticky-head"></slot>
      <slot name="swiper-list"></slot>
      <div class="load-text" v-if="onLoadMore && typeof onLoadMore ==='function'">{{loadMoreText}}</div>
    </div>
  </div>

</template>

<script>

  /*
  * 下拉刷新，上拉加载
  *
  * 方法：
  *   :onLoadMore                     加载更多方法
  *   onLoadMoreFinish(noMoreData)   结束加载更多  noMoreData (true:没有更多数据；fasle：有更多数据）
  *   :onRefresh                      下拉刷新方法
  *   onRefreshFinish                结束下拉刷新
  *
  *   其他方法
  *   @translateDis                  输出拖动的距离
  *
  *   backOut                       回弹动画（'none','out'）默认是out
  *
  * 默认插槽(需要滚动的部分)：<div slot="swiper-list"></div>
  *
  * 存在滚动吸顶的情况：
  *   吸顶插槽：<div slot="sticky-head" class="sticky-head"></div>
  *
  *   滚动吸顶前面存在一定的高度： <div slot="clac-height" class="clac-height"></div>
  *
  * */
  export default {
    props: ['onLoadMore', 'onRefresh','backOut','translateDis'],
    data() {
      return {
        loadMoreText: '加载更多',

        wrap:null,
        content:null,
        refreshWrap:null,
        sticky:null,
        clacHeight:null,
        loadText:null,
        contentHeight:0, // 当前滚动的距离
        loadMoreTimer:null, //上拉加载的回弹

        isLoading:false, // 正在加载更多 （当touchstart的时候就成true）
        newScroll:false, // 一次完整的滚动 （当touchstart的时候就成true）
      }
    },
    methods: {
      /* 结束上拉加载更多 */
      onLoadMoreFinish(noMoreData) {
        let This=this;
        if (this.isLoading && !this.newScroll) {
          if (noMoreData) {
            this.loadMoreText = '已经到底了，再拉也没有了'
          } else {
            this.loadMoreText = '加载更多'
          }
          this.loadMoreTimer = setTimeout(()=> {
            startMove({
              el: This.content,
              type: "easeOutStrong",
              time: 300,
              target: {
                translateY: This.wrap.clientHeight - This.contentHeight
              },
              callIn: function(){
                This.stickyFn()
              },
              callBack:function () {
                This.loadMoreText = '加载更多'
              }
            });
            this.isLoading=false;
          }, noMoreData ? 1000 : 0);
        }
      },

      /* 结束下拉刷新 */
      onRefreshFinish(){
        if (this.newScroll && !this.isLoading){
          startMove({
            el: this.content,
            type: "easeOutStrong",
            time: 200,
            target: {
              translateY: 0
            }
          });
          this.isLoading = false;
          this.newScroll = false
        }
      },

      /* 滚动吸附顶部 */
      stickyFn(){
        if(this.sticky && this.clacHeight){
          // 吸顶的元素存在 并且 计算高度也存在
          let scrollerY = css(this.content, 'translateY');
          //css(this.sticky,'translateZ',0.01);
          if(-scrollerY>this.clacHeight.clientHeight){

            css(this.sticky,'translateY',-scrollerY-this.clacHeight.clientHeight);
          }else{
            css(this.sticky,'translateY',0);
          }
        }
      },

      /* 滚动到某个位置 */
      scrollTo(init){
        let time=init.time?init.time:'300';
        let dis=init.distance;
        let stickyTo = init.stickyTo?init.stickyTo:0;
        let scrollInterval;

        scrollInterval = setInterval(() => {
          let scrollerY = css(this.content, 'translateY');
          let sticky_y = css(this.sticky, 'translateY');
          let scrollStep = -scrollerY / (time / 15);
          if (-scrollerY > -dis) {
            css(this.content, 'translateY', scrollerY + scrollStep);
            if(this.sticky && this.clacHeight){
              //css(this.sticky,'translateZ',0.01);
              css(this.sticky,'translateY',sticky_y - scrollStep);
            }
            this.loadMoreText = ''
          } else {
            clearInterval(scrollInterval);
            if(this.sticky && this.clacHeight){
              //css(this.sticky,'translateZ',0.01);
              css(this.sticky,'translateY',stickyTo);
            }
            css(this.content, 'translateY', dis);
            this.loadMoreText = '加载更多'
          }
        }, 15);

      },

      /* 滚动到顶部 */
      scrollTop(init){
        cancelAnimationFrame(this.content.timer);
        let type=init.type?init.type:'linear';
        let time=init.time?init.time:'300';
        let dir=init.dir?init.dir:'top';
        let scrollInterval = null;
        let scrollMargin = null;

        switch (type){
          case 'linear':
            if(dir==='top') {
              scrollInterval = setInterval(() => {
                let scrollerY = css(this.content, 'translateY');
                let scrollStep = -scrollerY / (time / 15);
                if (Math.abs(scrollerY) > 1) {
                  css(this.content, 'translateY', scrollerY + scrollStep);
                } else {
                  clearInterval(scrollInterval);
                }
              }, 15);
            }else{
              let sh = this.wrap.clientHeight;
              let ch = this.content.clientHeight;
              if(ch-sh>1){
                css(this.content,'translateY',sh-ch);
              }
            }
            break;

          case 'easeOut':
            let scrollStep = Math.PI / ( time / 15 ),
              scrollCount = 0;
            scrollInterval = setInterval(()=> {
              let scrollerY = css(this.content, 'translateY'),
                cosParameter = Math.abs(scrollerY) / 2;
              if ( Math.abs(scrollerY) > 1 ){
                scrollCount ++;
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                css(this.content,'translateY',scrollerY+scrollMargin);
              }
              else {
                clearInterval(scrollInterval);
              }
            }, 15 );
            break;
        }
      },

      /* 滚动到底部 */
      scrollBottom(init){
        cancelAnimationFrame(this.content.timer);
        let type=init.type?init.type:'linear';
        let time=init.time?init.time:'300';
        let scrollInterval = null;
        switch (type) {
          case 'linear':
            scrollInterval = setInterval(() => {
              let scrollerY = css(this.content, 'translateY');
              let wrapY = css(this.wrap, 'height');
              let contentY = css(this.content, 'height');
              let scrollStep = -(contentY-wrapY) / (time / 15);
              if (Math.abs(scrollerY) < (contentY-wrapY)-1) {
                css(this.content, 'translateY', scrollerY + scrollStep);
              } else {
                clearInterval(scrollInterval)
              }
            }, 15);
            break;
        }
      }

    },
    mounted() {
      let This = this;
      this.wrap = this.$refs.commonScrollWrap;
      this.content=this.wrap.querySelector('.common-swiper-content');
      this.refreshWrap=this.wrap.querySelector('.refreshWrap');
      this.sticky=this.wrap.querySelector('.sticky-head');
      this.clacHeight=this.wrap.querySelector('.clac-height');
      this.loadText=this.wrap.querySelector('.load-text');
      swiper({
        wrap: This.wrap,
        dir: 'y',
        backOut: This.backOut?This.backOut:'out',
        start() {
          This.newScroll = true; // 触摸的时候就是一次新的开始
          This.contentHeight = This.content.clientHeight;

          let node = document.activeElement; //当前focus的dom元素 如果当前元素聚焦，点击的时候让键盘下去
          if(node){
            if (node.nodeName == "TEXTAREA" || node.nodeName == 'INPUT') {
              node.blur();
            }
          }
        },
        move() {
          let scrollerY = css(This.content, 'translateY');

          // 拖动吸顶
          This.stickyFn();

          // 拖动的时候 给父级传参数【拖动的距离】
          This.$emit('translateDis',scrollerY)


          let node = document.activeElement; //当前focus的dom元素
          if(node){
            if (node.nodeName == "TEXTAREA" || node.nodeName == 'INPUT') { //如果是input或textarea
              if(node.style.textShadow === '') {
                node.style.textShadow = 'rgba(0,0,0,0) 0 0 0'; //改变某个不可见样式，触发dom重绘
              } else {
                node.style.textShadow = '';
              }
            }
          }


        },
        end() {
          let scrollerY = css(This.content, 'translateY');

          This.loadMoreTimer && clearTimeout(This.loadMoreTimer);
          /* 下拉刷新页面 */
          if (This.onRefresh && typeof This.onRefresh === 'function') {
            // 判断 下拉的距离对否大于菊花的高度
            if (scrollerY > This.refreshWrap.clientHeight) {
              cancelAnimationFrame(This.content.timer);
              // 手指抬起的时候 停留到菊花的位置
              startMove({
                el: This.content,
                type: "easeOutStrong",
                time: 300,
                target: {
                  translateY: This.refreshWrap.clientHeight
                },
                callBack: function () {
                  This.isLoading=false;
                  This.newScroll && This.onRefresh(); // 执行完之后就是一个新的拉动
                  This.newScroll = false;
                }
              });
            }
          }

          /* 上拉加载更多 */
          if (This.onLoadMore && typeof This.onLoadMore === 'function' && This.loadText) {
            if (-scrollerY > This.content.clientHeight + This.loadText.clientHeight - This.wrap.clientHeight) {
              cancelAnimationFrame(This.content.timer);
              startMove({
                el: This.content,
                type: "easeOutStrong",
                time: 300,
                target: {
                  translateY: -(This.content.clientHeight + This.loadText.clientHeight - This.wrap.clientHeight)
                },
                callIn: function(){
                  This.stickyFn();
                },
                callBack: function () {
                  This.isLoading=true;
                  This.loadMoreText = '加载中...';
                  This.newScroll && This.onLoadMore();
                  This.newScroll = false; // 方法传出去之后一次新的拉动结束
                }
              })
            }
          }
        }
      });
    },
    destroyed(){
      this.onLoadMoreFinish();
      this.onRefreshFinish();
    }
  }
</script>

<style>
  .common-scroll-wrap-new {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .common-scroll-wrap-new .load-text {
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    color: #666;
    font-size: 0.28rem;
    position: absolute;
    bottom: -0.9rem;
    left: 0;
    width: 100%;
  }

  .common-scroll-wrap-new .refreshWrap {
    position: absolute;
    z-index: -1;
    height: 60px;
    top: -60px;
    width: 100%;
  }

  @-webkit-keyframes loading {
    from {
      opacity: 1;
      width: 5px;
      height: 20px;
    }
    to {
      opacity: 0.25;
      width: 5px;
      height: 20px;
    }
  }

  .common-scroll-wrap-new .chrysanthemum {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    bottom: 50%;
    display: inline-block;
    zoom: 0.3; /*通过修改这个值(值的区间为0-1)的大小来设置菊花的大小*/
  }

  .common-scroll-wrap-new .chrysanthemum div {
    width: 3px;
    height: 16px;
    background: #a4a2a4;
    position: absolute;
    left: 100%;
    top: 100%;
    opacity: 0;
    -webkit-animation: loading 1.2s linear infinite;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(1) {
    -webkit-transform: rotate(0deg) translate(0, -34px);
    -webkit-animation-delay: 0s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(2) {
    -webkit-transform: rotate(30deg) translate(0, -34px);
    -webkit-animation-delay: 0.1s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(3) {
    -webkit-transform: rotate(60deg) translate(0, -34px);
    -webkit-animation-delay: 0.2s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(4) {
    -webkit-transform: rotate(90deg) translate(0, -34px);
    -webkit-animation-delay: 0.3s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(5) {
    -webkit-transform: rotate(120deg) translate(0, -34px);
    -webkit-animation-delay: 0.4s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(6) {
    -webkit-transform: rotate(150deg) translate(0, -34px);
    -webkit-animation-delay: 0.5s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(7) {
    -webkit-transform: rotate(180deg) translate(0, -34px);
    -webkit-animation-delay: 0.6s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(8) {
    -webkit-transform: rotate(210deg) translate(0, -34px);
    -webkit-animation-delay: 0.7s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(9) {
    -webkit-transform: rotate(240deg) translate(0, -34px);
    -webkit-animation-delay: 0.8s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(10) {
    -webkit-transform: rotate(270deg) translate(0, -34px);
    -webkit-animation-delay: 0.9s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(11) {
    -webkit-transform: rotate(300deg) translate(0, -34px);
    -webkit-animation-delay: 1.0s;
  }

  .common-scroll-wrap-new .chrysanthemum .line:nth-of-type(12) {
    -webkit-transform: rotate(330deg) translate(0, -34px);
    -webkit-animation-delay: 1.1s;
  }
</style>

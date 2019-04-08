<template>
  <transition name="fade">
    <div v-show="action=='show'" class="toast">
      <div class="modal" v-text="toastText"></div>
    </div>
  </transition>
</template>

<script>
/*

*/
import Lib from 'assets/js/Lib';
export default {
  data() {
    return {
    }
  },
  components: {
    
  },
  props: {
    toastText: {
      type: String,
      default: '提醒！'
    },
    action: {
      type: String,
      required: true,
      validator: v => {
        (v!='show'&&v!='hide')?alert('toast组件action，传值错误，只允许传递，show/hide'):'';
        return v
      }
    }
  },
  mounted(){

  },
  //相关操作事件
  methods: {

  }
}
</script>

<style scoped lang="sass">
  @import '../assets/css/common.sass'
  .center
    text-align: center !important
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s;
  .fade-enter, .fade-leave-to 
    opacity: 0;
  .toast
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    bottom: 0
    right: 0
    z-index: 10000
    .modal
      @include border-radius(10rem/$rem)
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      min-width: 180rem/$rem
      padding: 30rem/$rem 20rem/$rem
      line-height: 1.2
      text-align: center
      font-size: 28rem/$rem
      color: #fff
      background: rgba(0, 0, 0, .6)
</style>

<template>
<transition name="fade" class="" >
    <div v-show="action=='show'" class="alertConfirmBOx">
          <div class="modal">
              <div class="content">
                  <slot></slot>
              </div>
              <div class="pbtns" v-if="need">
                  <input type="button"  v-show="_type=='confirm'" @click="sendCancelFn"  class="btn btn-white" :value="cancelText">
                  <input type="button" @click="sendSuccessFn"  :class="_type=='alert'?'btn btn-red btn-red-w':'btn btn-red'" :value="successText">
              </div>
              <div class="ps" @click="sendCancelFn" v-else></div>
          </div>
          <div class="desktop"></div>
    </div>
  </transition>
</template>

<script>
/*
    必须传递:action控制显示  show/hide 
            _type控制是弹窗还是确认框   alert/confirm
            successFn 确认按钮回掉函数
            cancelFn  取消按钮回掉函数
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
    testObj:{type: Object},
    action:{
      type: String,
      required: true,
      validator: v => {
        (v!='show'&&v!='hide')?alert('AlertConfirm组件action，传值错误，只允许传递，show/hide'):'';
        return v
      }
    },
    _type:{
      type: String,
      required: true,
      validator: v => {
        (v!='alert'&&v!='confirm')?alert('AlertConfirm组件_type，传值错误，只允许传递，alert/confirm'):'';
        return v
      }
    },
    need: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    successText: {
      type: String,
      default: '确认'
    }
  },
  mounted(){
  },
  //相关操作事件
  methods: {
    sendSuccessFn:function(){
      this.$emit('successFn')
    },
    sendCancelFn:function(){
      this.$emit('cancelFn')
    }
  }
}
</script>

<style scoped lang="sass">
  @import '../assets/css/common.sass'
  $rem: 46.875
  .center
    text-align: center !important
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s;
  .fade-enter, .fade-leave-to 
    opacity: 0;
  .alertConfirmBOx
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 10000
    .modal
      @include box-sizing()
      @include border-radius(10rem/$rem)
      position: fixed
      z-index: 10002
      top: 50%
      left: 50%
      transform: translate(-50%,-50%)
      width: 80%
      background: #fff
      opacity: 1
      .content
        padding: 50rem/$rem 40rem/$rem 60rem/$rem
        line-height: 40rem/$rem
        font-size: 28rem/$rem
        color: #2f2f2f
      .pbtns
        @include clearfix()
        border-top: 1rem/$rem solid #ebeaeb
        .btn
          @include box-sizing()
          width: 50%
          height: 80rem/$rem
          padding: 0
          line-height: 80rem/$rem
          text-align: center
          font-size: 30rem/$rem
          border: 0 none
          -webkit-appearance: none
          background: transparent
          &.btn-white
            float: left
            color: $color99
          &.btn-red
            float: right
            color: #695F96
            border-left: 1rem/$rem solid #ebeaeb
            &.btn-red-w
              float: none
              width: 100%
              border-left: 0 none
      .ps
        @include border-radius(50%)
        position: absolute
        left: 50%
        bottom: -90rem/$rem
        transform: translateX(-50%)
        width: 56rem/$rem
        height: 56rem/$rem
        border: 1rem/$rem solid #fff
        &::before
          content: ''
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%) rotate(-45deg)
          width: 40rem/$rem
          height: 1px
          background: #fff
        &::after
          content: ''
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%) rotate(45deg)
          width: 40rem/$rem
          height: 1px
          background: #fff

    .desktop
        // display: none
        position: fixed
        z-index: 10001
        left: 0
        top: 0
        right: 0
        bottom: 0
        width: 100%
        height: 100%
        opacity: 1
        background: rgba(0,0,0,.6)
</style>

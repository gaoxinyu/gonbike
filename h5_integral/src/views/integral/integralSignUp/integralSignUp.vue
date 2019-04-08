<template>
    <div class="wrap">
      <div class="sign_up_top">
        <div class="text1">已连续签到0天</div>
        <div class="text2">坚持每天签到可获得更多积分哦</div>
      </div>
      <div class="sign_up_progress">
        <div class="progress_block" :class="{'signed':isSigned}">
          <i class="icon icon_coin_large"></i>
          <div>1天</div>
        </div>
        <div class="progress_line"></div>
        <div class="progress_block">
          <i class="icon icon_coin_large"></i>
          <div>2天</div>
        </div>
        <div class="progress_line"></div>
        <div class="progress_block">
          <i class="icon icon_coin_large"></i>
          <div>3天</div>
        </div>
        <div class="progress_line"></div>
        <div class="progress_block">
          <i class="icon icon_coin_large"></i>
          <div>4天</div>
        </div>
        <div class="progress_line"></div>
        <div class="progress_block">
          <i class="icon icon_coin_large"></i>
          <div>5天</div>
        </div>
        <div class="progress_line"></div>
        <div class="progress_block">
          <i class="icon icon_coin_large"></i>
          <div>6天</div>
        </div>
        <div class="progress_line"></div>
        <div class="progress_block">
          <i class="icon icon_coin_large"></i>
          <div>7天</div>
        </div>
        <div class="amount" v-for="(item, index) in 7" :key="index">50分</div>
      </div>
      <div class="sign_up_btn" @click="signUpClick">签到 + 50分<i class="icon icon_coin_large"></i></div>
      <div class="alert_shadow" v-show="showSuccess" @touchmove.prevent>
        <div class="success_box">
          <div class="success_icon"></div>
          <div class="text1">签到成功</div>
          <div class="text2">积分+50</div>
          <div class="close_btn" @click="close">我知道了</div>
        </div>
      </div>
    </div>
</template>
<script>
  import Lib from '@/assets/js/Lib'
  import PullTo from 'vue-pull-to'
  export default {
    data() {
      return {
        isSigned: true,
        showSuccess: false
      }
    },
    components: {
      PullTo
    },
    created() {
      console.log('created')
    },
    mounted() {
      console.log('mounted')
    },
    methods: {
      signUpClick() {
        this.showSuccess = true
      },
      close() {
        this.showSuccess = false
      }
    }
  }
</script>
<style lang="sass">
  @import '../../../assets/css/common.sass'
  body
    background: #FFFFFF
    .wrap
      width: 100%
      .sign_up_top
        width: 670rem/$rem
        height: 336rem/$rem
        background-image: url(../../../assets/images/bgimg/sign_up_bg@2x.png)
        background-size: 100% 100%
        margin: 56rem/$rem 0 0 40rem/$rem
        overflow: hidden
        .text1
          font-size: 36rem/$rem
          font-weight: bold
          color: #FFFFFF
          margin: 95rem/$rem 0 0 24rem/$rem
        .text2
          font-size: 26rem/$rem
          font-weight: 500
          color: #FFFFFF
          opacity: 0.6
          margin: 31rem/$rem 0 0 29rem/$rem
      .sign_up_progress
        display: flex
        width: 656rem/$rem
        flex-wrap: wrap
        margin: 30rem/$rem 0 0 51rem/$rem
        .progress_block
          width: 80rem/$rem
          height: 120rem/$rem
          border-radius: 10rem/$rem
          background: $colorf0
          color: $color99
          .icon
            width: 40rem/$rem
            height: 40rem/$rem
            margin: 20rem/$rem 0 0 20rem/$rem
          div
            font-size: 26rem/$rem
            font-weight: 500
            margin-left: 20rem/$rem
        .progress_line
          width: 16rem/$rem
          height: 8rem/$rem
          background: $colorf0
          margin-top: 36rem/$rem
        .amount
          font-size: 26rem/$rem
          font-weight: 500
          color: $color99
          line-height: 70rem/$rem
          &:nth-child(14)
            margin-left: 13rem/$rem
          margin-left: 39rem/$rem
      .sign_up_btn
        display: flex !important
        align-items: center
        justify-content: center
        @include btnScale(300rem, 68rem)
        margin: 60rem/$rem 0 0 225rem/$rem
        .icon
          width: 40rem/$rem
          height: 40rem/$rem
          margin-left: 15rem/$rem
      .signed
        background: #FFBD00 !important
        color: #FFFFFF !important
      .signed_amount
        color: $color67 !important
      .alert_shadow
        width: 100%
        height: 100%
        position: fixed
        top: 0
        left: 0
        background: rgba(0,0,0,0.6)
      .success_box
        width: 630rem/$rem
        height: 469rem/$rem
        background: #FFFFFF
        border-radius: 10rem/$rem
        position: absolute
        top: 435rem/$rem
        left: 60rem/$rem
        text-align: center
        .success_icon
          width: 330rem/$rem
          height: 220rem/$rem
          background-image: url(../../../assets/images/icon/cup_icon@2x.png)
          background-size: 100% 100%
          margin: -100rem/$rem 0 0 150rem/$rem
        .text1
          font-size: 40rem/$rem
          font-weight: bold
          color: #333233
          margin-top: 61rem/$rem
        .text2
          font-size: 30rem/$rem
          font-weight: 500
          color: #333233
          margin-top: 40rem/$rem
        .close_btn
          @include btnScale(400rem, 80rem)
          margin: 62rem/$rem 0 0 115rem/$rem

</style>

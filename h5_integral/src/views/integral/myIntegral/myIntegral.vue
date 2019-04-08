<template>
    <div class="wrap">
      <head-top :c="true" :needRightBtn="true" :rightBtn="{title: '积分明细',url: './myIntegralList.html'}"></head-top>
      <div class="integral_top">
        <div class="text1">{{userRecord.use}}</div>
        <div class="text2">可用积分</div>
        <div class="integral_detail">
          <div>全部积分 {{userRecord.all}}</div>
          <div>冻结积分 {{userRecord.used}}<i class="icon icon_faq_red"></i></div>
        </div>
      </div>
      <div class="activity_list">
        <div class="column">
          <div class="integral_title">购买通票</div>
          <div class="integral_desc">不限车</div>
          <div class="integral_right_btn" @click="goTicket">去购买</div>
        </div>
        <div class="column">
          <div class="integral_title">激活微交卡</div>
          <div class="integral_desc">推出的骑行实体卡</div>
          <div class="integral_right_btn" @click="goBusCard">去激活</div>
        </div>
        <div class="column">
          <div class="integral_title">邀请好友</div>
          <div class="integral_desc">与好友一起骑车</div>
          <div class="integral_right_btn" @click="goInvite">去邀请</div>
        </div>
        <div class="column">
          <div class="integral_title">完成骑行</div>
          <div class="integral_desc">越骑行，越永久</div>
          <div class="integral_right_btn" @click="goCycling">去骑车</div>
        </div>
      </div>
      <popup _type="alert" :action="alertAction" @successFn="alertHide"><p class="text">{{alertText}}</p></popup>
      <cover :showText="loadDoneText" v-if="!loadDone" :isLoad="refresh"></cover>
    </div>
</template>
<script>
  import Lib from '@/assets/js/Lib'
  import Popup from '@/components/popup.vue'
  import cover from '@/components/cover.vue'
  import headTop from '@/components/headTop.vue'

  export default {
    components: {
      Popup,
      cover,
      headTop
    },
    data() {
      return {
        token: '',
        alertAction: 'hide',
        alertText: '',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        userRecord: {
          all: '',
          used: '',
          use: ''
        }
      }
    },
    created() {
    },
    mounted() {
      this.token = Lib.store.getStore('token')
      this.init()
    },
    methods: {
      init() {
        this.getUserInfo().then(() => {
          this.loadDone = true
        }).catch(res => {
          this.alertAction = 'show'
          this.alertText = res
          this.refresh = true
          this.loadDoneText = res
        })
      },
      alertHide() {
        this.alertAction = 'hide'
      },
      getUserInfo() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.bike}/me`,
            data: {sessionId: this.token},
            success: res => {
              if (res.statusCode === 200) {
                this.userRecord.used = res.data.outgoLockedBonusPoints
                this.userRecord.use = res.data.bonusPoints
                this.userRecord.all = (Number(this.userRecord.used) + Number(this.userRecord.use)) || '未知'
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getUserInfo请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getUserInfo网络好像出问题了，请重新尝试')
            }
          })
        })
      },
      goTicket() {
        Lib.bridge.goNative('Ticket')
      },
      goBusCard() {
        Lib.bridge.goNative('BusCard')
      },
      goInvite() {
        Lib.bridge.goNative('Invite')
      },
      goCycling() {
        Lib.bridge.goHome()
      }
    }
  }
</script>
<style lang="sass">
  @import '../../../assets/css/common.sass'
  @import '../../../assets/css/icon.sass'
  .wrap
    width: 100%
    padding: 88rem/$rem 0 0
    .integral_top
      min-height: 382rem/$rem
      background-image: url(./img/integral_bg@2x.png)
      background-size: 100% 100%
      text-align: center
      overflow: hidden
      .text1
        font-size: 72rem/$rem
        font-weight: 500
        color: #fff
        margin-top: 60rem/$rem
      .text2
        font-size: 26rem/$rem
        opacity: 0.6
        font-weight: 500
        color: #fff
        margin-top: 10rem/$rem
      .integral_detail
        position: relative
        display: flex
        align-items: center
        justify-content: center
        margin-top: 45rem/$rem
        font-size: 28rem/$rem
        color: #fff
        &::before
          content: ''
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%)
          width: 2rem/$rem
          height: 100%
          font-size: 0
          line-height: 0
          background: #fff
        div
          flex: 1
          height: 34rem/$rem
          text-align: center
          line-height: 34rem/$rem
          &:nth-child(1),
          &:nth-child(2)
            display: flex
            align-items: center
            justify-content: center
            .icon
              width: 34rem/$rem
              height: 34rem/$rem
              margin-left: 7rem/$rem
    .activity_list
      @include border-radius(10rem/$rem)
      @include box-sizing()
      width: 93%
      margin: -90rem/$rem auto 0
      padding: 50rem/$rem 25rem/$rem
      background: #fff
      .column
        position: relative
        margin-bottom: 75rem/$rem
        &:last-child
          margin-bottom: 0
        .integral_title
          font-size: 36rem/$rem
          font-weight: 700
        .integral_desc
          margin-top: 20rem/$rem
          font-size: 28rem/$rem
          color: $color99
        .integral_right_btn
          @include btnScale(180rem, 68rem, 28rem)
          position: absolute
          right: 0
          top: 50%
          transform: translateY(-50%)
          line-height: 68rem/$rem
</style>

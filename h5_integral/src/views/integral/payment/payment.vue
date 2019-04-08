<template>
    <div class="wrap">
      <head-top></head-top>
      <div v-if="this.order.paymentKind == 'pending'">
        <div class="payment_top">
          <div class="payment_count">
            <div class="min"><span>{{countDown.min.substring(0,1)}}</span><span>{{countDown.min.substring(1,2)}}</span></div>
            <div class="sec"><span>{{countDown.sec.substring(0,1)}}</span><span>{{countDown.sec.substring(1,2)}}</span></div>
          </div>
          <div class="payment_status"><i class="icon icon_clock"></i>支付剩余时间</div>
          <div class="payment_tips">已冻暂时扣除所需{{order.payIntegral}}积分，请继续支付{{order.payMoney}}元</div>
          <div class="payment_detail" @click="payDetail">订单详情</div>
        </div>
        <div class="payment_method">
          <h4 class="title"><span>请选择支付方式</span></h4>
          <ul class="list" v-if="payment && payment.length > 0">
            <li class="item" :class="{dis: item.payCode == 'liandou' && (user.amount < order.payMoney) }" v-for="(item, index) in payment" :key="index">
              <div class="img"><img :src="item.pictureUrl" /></div>
              <div class="name">{{item.payName}} {{item.payCode == 'liandou' ? ((user.amount < order.payMoney) ? user.amount + '（不足以支付）' : user.amount) : ''}}</div>
              <div class="radio" :class="{chk: order.payMethod == item.payCode}"><label :for="item.payCode" @click="chk"><input type="radio" :id="item.payCode" name="payment" checked :disabled="item.payCode == 'liandou' && (user.amount < order.payMoney)" /></label></div>
            </li>
          </ul>
        </div>
        <div class="payment_btn" @click="goPay">确认支付</div>
      </div>
      <div class="order_completed" v-else>您已完成订单支付，请到订单详情查看</div>
      <popup _type="alert" :action="alertAction" @successFn="alertHide"><p class="text">{{alertText}}</p></popup>
      <popup _type="confirm" :action="confirmAction" :need="confirmBtn" @successFn="confirmHide" @cancelFn="confirmHide" :cancelText="cancelText" :successText="successText"><div class="confirm_body" v-html="confirmBody"></div></popup>
      <toast :action="toastAction" :toastText="toastText"></toast>
      <cover :showText="loadDoneText" v-if="!loadDone" :isLoad="refresh"></cover>
      <div class="loading" v-show="loading"><img src="../../../assets/images/loading.gif" /></div>
    </div>
</template>
<script>
  import Lib from '@/assets/js/Lib'
  import Popup from '@/components/popup.vue'
  import cover from '@/components/cover.vue'
  import toast from '@/components/toast.vue'
  import headTop from '@/components/headTop.vue'
  export default {
    components: {
      Popup,
      cover,
      toast,
      headTop
    },
    data() {
      return {
        token: '',
        toastAction: 'hide',
        confirmAction: 'hide',
        alertAction: 'hide',
        toastText: '',
        alertText: '',
        confirmBody: `<div>1</div>`,
        confirmBtn: false,
        successText: '确认',
        cancelText: '取消',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        loading: false,
        payStatus: false,
        payment: {

        },
        order: {
          serveTime: '',
          createTime: '',
          id: Lib.common.getUrlQuery('orderId'),
          payIntegral: '',
          payMoney: '',
          payMethod: 'alipay',
        },
        user: {
          name: '',
          phone: '',
          address: '',
          amount: ''
        },
        goods: {
          name: '',
          img: ''
        },
        endTimeStamp: '',
        serverTimeStamp: '',
        countDown: {
          min: '00',
          sec: '00'
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
        this.getUserRecord().then(() => {
          this.getPaymentType().then(() => {
            this.getOrderDetail(this.order.id).then(() => {
              if (this.order.paymentKind == 'pending') {
                this.getCountDown(this.serverTimeStamp, this.endTimeStamp)
              } else {
                this.loadDone = true
              }
            }).catch(res => {
              this.alertAction = 'show'
              this.alertText = res
              this.refresh = true
              this.loadDoneText = res
            })
          }).catch(res => {
            this.alertAction = 'show'
            this.alertText = res
            this.refresh = true
            this.loadDoneText = res
          })
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
      confirmHide() {
        this.confirmAction = 'hide'
      },
      goWhere() {

      },
      chk(e) {
        console.log(e.target.checked,e.target.id)
        if (e.target.checked) {
          this.order.payMethod = e.target.id
        }
      },
      getCountDown() {
        let countDown = setInterval(() => {
          let nowTime = new Date(this.serverTimeStamp)
          let endTime = new Date(this.endTimeStamp)
          let t = endTime.getTime() - nowTime.getTime()
          if ( t <= 0) {
            console.log(1111)
            this.countDown.min = '00'
            this.countDown.sec = '00'
            this.countDown.status = 'end'
            this.loadDone = true
            clearInterval(countDown)
            window.history.go(-1)
            return
          }
          let hour = Math.floor(t/1000/60/60%24)
          let min = Math.floor(t/1000/60%60)
          let sec = Math.floor(t/1000%60)
          if (hour < 10) {
              hour = "0" + hour
          }
          if (min < 10) {
              min = "0" + min
          }
          if (sec < 10) {
              sec = "0" + sec
          }
          this.countDown.min = min.toString()
          this.countDown.sec = sec.toString()
          this.serverTimeStamp += 1000
          this.loadDone = true
        },1000)
      },
      getUserRecord() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.bike}/me?time=${this.requestTime}`,
            data: {sessionId: this.token},
            success: res => {
              if (res.statusCode === 200) {
                this.user.amount = res.data.creditAmount
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                // token过期
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getUserRecord请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getUserRecord网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getPaymentType() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/payOrder/kind`,
            headers: {
              token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                this.payment = res.data.items
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {  
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getPaymentType请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getPaymentType网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getOrderDetail(orderId) {
        let order = this.order
        let goods = this.goods
        let user = this.user
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/orders`,
            data: {
              orderId
            },
            headers: {
              token: this.token
            },
            success: res => {
              if (res.statusCode === 200) { 
                order.serveTime = res.serverTime.substring(0, 19).replace(/-/g,'/')
                order.createTime = res.data.items.createdAt.substring(0, 19).replace(/-/g,'/')
                order.payIntegral = res.data.items.payIntegralSum
                order.payMoney = res.data.items.payMoneySum
                order.paymentKind = res.data.items.paymentKind

                goods.name = res.data.items.orderItemList[0].specName
                goods.img = res.data.items.orderItemList[0].url
                
                user.name = res.data.items.orderShipping.receiverName
                user.phone = res.data.items.orderShipping.receiverPhone
                user.address = `${res.data.items.orderShipping.receiverState} ${res.data.items.orderShipping.receiverCity} ${res.data.items.orderShipping.receiverDistrict} ${res.data.items.orderShipping.receiverAddress}`

                this.endTimeStamp = Lib.common.transTime(order.createTime) + 1800000
                this.serverTimeStamp = Lib.common.transTime(order.serveTime)
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {  
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getOrderDetail请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getOrderDetail网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      payDetail() {
        let goods = this.goods
        let user = this.user
        let order = this.order

        this.confirmAction = 'show'
        this.successText = '确定'
        this.cancelText = '取消'
        this.confirmBody = `<div class="goodsimg"><img src="${goods.img}" /></div>
                            <div class="column"><span class="tit">收货人：</span><span class="txt">${user.name}</span></div>
                            <div class="column"><span class="tit">联系方式：</span><span class="txt">${user.phone}</span></div>
                            <div class="column"><span class="tit">收货地址：</span><span class="txt">${user.address}</span></div>
                            <div class="column"><span class="tit">商品名称：</span><span class="txt">${goods.name}</span></div>
                            <div class="column"><span class="tit">订单总额：</span><span class="txt">${order.payIntegral}分+${order.payMoney}元</span></div>
                            `
      },
      goPay() {
        this.loading = true
        new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'post',
            url: `${Lib.config.ajaxPort.shop}/payOrder`,
            data: {orderId: this.order.id, payKind: this.order.payMethod},
            headers: {
              token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                if (this.order.payMethod === 'liandou') {
                  resolve()
                } else {
                  this.loading = false
                  this.confirmAction = 'show'
                  this.confirmBtn = true
                  this.successText = '确定'
                  this.cancelText = '其他支付方式'
                  this.confirmBody = `<p>支付完成前请不要关闭本窗口</p>`
                  Lib.bridge.doPay({
                    service: res.data.service, 
                    data: {orderString: res.data.instructionString}
                  }, res => {
                    this.payStatus = res.success
                    if (this.payStatus) {
                      this.confirmAction = 'hide'
                      this.toastAction = 'show'
                      this.toastText = '支付完成，请稍等...'
                      this.payDone()
                    } else {
                      if (!this.confirmAction) {
                        this.confirmAction = !this.confirmAction
                      }
                      this.confirmBody = `<p class="text" style="text-align: center">支付失败</p>`
                    }
                  })
                }
              } else if (res.statusCode === 401 || res.statusCode === 402){
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.status, 'goPay请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('goPay网络好像不太稳定，请重新尝试')
            }
          })
        }).then(() => {
          this.loading = false
          window.history.go(-1)
        }).catch(res => {
          this.loading = false
          this.alertAction = 'show'
          this.alertText = res
        })
      },
      payDone() {
        new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'put',
            url: `${Lib.config.ajaxPort.shop}/payOrder/result`,
            data: {orderId: this.order.id, payKind: this.order.payMethod},
            headers: {
              token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402){
                  Lib.bridge.getUserToken(this.token, res => {
                    if (res && res.token) {
                      Lib.store.setStore('token', res.token)
                      window.history.go(0)
                    }
                  })
                } else {
                  reject()
                }
            },
            error: res => {
              reject()
            }
          })
        }).then(() => {
          this.toastAction = 'hide'
          setTimeout(() => {
            window.history.go(-1)
          }, 500)
        }).catch(() => {
          this.payDone()
        })
      }
    }
  }
</script>
<style lang="sass">
  @import '../../../assets/css/common.sass'
  @import '../../../assets/css/icon.sass'
  body
    background: #fff!important
  .wrap
    width: 100%
    padding: 88rem/$rem 0 80rem/$rem 0
    .order_completed
      font-size: 30rem/$rem
      text-align: center
    .payment_top
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      padding: 30rem/$rem 0
      .payment_count
        display: flex
        width: 224rem/$rem
        height: 70rem/$rem
        margin-bottom: 40rem/$rem
        color: #fff
        font-size: 60rem/$rem
        background: url(../../../assets/images/count_dot@2x.png) no-repeat center
        background-size: 10rem/$rem 30rem/$rem
        > div
          @include clearfix()
          width: 94rem/$rem
          height: 70rem/$rem
          padding-left: 2rem/$rem
          line-height: 70rem/$rem
          span
            @include border-radius(5rem/$rem)
            float: left
            width: 40rem/$rem
            height: 70rem/$rem
            text-align: center
            background: $color67
            &:last-child
              float: right
        .sec
          margin-left: 37rem/$rem
      .payment_status
        display: flex
        align-items: center
        line-height: 50rem/$rem
        font-size: 34rem/$rem
        color: #333233
        .icon
          width: 36rem/$rem
          height: 36rem/$rem
          margin-right: 17rem/$rem
      .payment_tips
        margin-top: 15rem/$rem
        font-size: 28rem/$rem
        color: $color66
        span
          color: $color67
      .payment_detail
        @include btnScale(200rem, 60rem, 28rem, $color67)
        @include borderAll($color67, 60rem)
        margin-top: 50rem/$rem
        background: transparent
    .payment_method
      margin-top: 45rem/$rem
      padding: 0 24rem/$rem
      .title
        display: flex
        align-items: center
        justify-content: center
        position: relative
        width: 100%
        &::after
          content: ''
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%) scale(.5)
          width: 200%
          height: 1px
          background: #ebeaeb
        span
          z-index: 1
          padding: 0 15rem/$rem
          font-size: 30rem/$rem
          background: #fff
      .list
        margin-top: 10rem/$rem
        .item
          @include borderbottom
          display: flex
          align-items: center
          padding: 30rem/$rem 0
          &.dis
            color: $color99
            .radio
              width: 40rem/$rem
              height: 40rem/$rem
              background: url(../../../assets/images/chk_dis@2x.png) no-repeat center
              background-size: 100% 100%
          .img
            width: 60rem/$rem
            height: 60rem/$rem
            margin-right: 30rem/$rem
            background: $colorf4
          .name
            flex: 1
            font-size: 28rem/$rem
          .radio
            width: 40rem/$rem
            height: 40rem/$rem
            background: url(../../../assets/images/chk@2x.png) no-repeat center
            background-size: 100% 100%
            &.chk
              background-image: url(../../../assets/images/chked@2x.png)
            label
              display: block
              width: 100%
              height: 100%
            input
              opacity: 0
    .payment_btn
      @include btnScale(600rem, 80rem, 30rem)
      margin: 80rem/$rem auto 0
    .confirm_body
      .goodsimg
        @include border-radius(10rem/$rem)
        width: 250rem/$rem
        height: 160rem/$rem
        overflow: hidden
        margin: 0 auto 35rem/$rem
        background: $colorf4
      .column
        display: flex
        padding: 10rem/$rem 0
        font-size: 28rem/$rem
        .tit
          width: 150rem/$rem
        .txt
          flex: 1
</style>

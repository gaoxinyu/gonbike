<template>
    <div class="wrap">
      <head-top :title="'订单记录'" ></head-top>
      <div class="detail_top ing" v-if="order.paymentKind == 'pending'">
        <div class="detail_count">
          <div class="min"><span>{{countDown.min.substring(0,1)}}</span><span>{{countDown.min.substring(1,2)}}</span></div>
          <div class="sec"><span>{{countDown.sec.substring(0,1)}}</span><span>{{countDown.sec.substring(1,2)}}</span></div>
        </div>
        <div class="order_status"><i class="icon icon_clock"></i>订单待支付</div>
        <div class="order_tips">逾期将自动取消订单</div>
        <div class="buttons">
          <div class="btn cancel_btn" @click="comfirmOrder">取消订单</div>
          <a :href="`./payment.html?orderId=${order.id}`" class="btn gopay_btn">去支付</a>
        </div>
      </div>
      <div class="detail_top completed" v-else-if="order.paymentKind == 'completed'">
        <div class="order_status"><i class="icon icon_completed"></i>支付完成</div>
        <div class="order_tips" v-if="!order.shippingNumber">暂未生成快递单号请稍后再来查看</div>
        <div class="express_info" v-else>
          <div class="order_tips">快递名称：{{order.shippingName}}</div>
          <div class="order_tips">快递单号：<span>{{order.shippingNumber}}</span></div>
          <div class="express_btn" @click="queryExpress">查询物流轨迹</div>
        </div>
        <div class="express_detail" v-show="showExp">
          <ul class="detail_list" v-if="express && express.length > 0">
            <li class="item first"><div class="time">时间</div><div class="content">地点和跟踪进度</div></li>
            <li class="item" v-for="(item, index) in express" :key="index">
              <div class="time">{{item.time.substring(0, 19).split(' ')[0]}}<br>{{item.time.substring(0, 19).split(' ')[1]}}</div>
              <div class="content">{{item.context}}</div>
            </li>
            <li class="close" @click="closeExpress">收起</li>
          </ul>
          <p class="detail_empty" v-else>暂时没有相关快递信息</p>
        </div>
      </div>
      <div class="detail_top closed" v-else>
        <div class="order_status"><i class="icon icon_failed"></i>订单关闭</div>
        <div class="order_tips">关闭原因：{{order.kind == 'outTime' ? '订单超时' : (order.kind == 'userCancel' ? '用户取消' : '')}}</div>
      </div>
      <div class="receiver">
        <i class="icon icon_site"></i>
        <div class="info">
          <div class="name">收件人:{{user.name}}</div>
          <div class="phone">{{user.phone}}</div>
        </div>
        <div class="address">{{user.address}}</div>
      </div>
      <div class="order_detail">
        <div class="goods_info">
          <div class="img"><img :src="goods.img" /></div>
          <div class="info">
            <div class="title">{{goods.name}}</div>
            <div class="desc">{{goods.specify}}</div>
          </div>
        </div>
        <div class="details">
          <div><span>支付金额:</span><span class="content">{{`${order.payIntegral}分+${order.payMoney}元（包邮）`}}</span></div>
          <div v-if="order.paymentType"><span>支付方式:</span><span class="content">{{order.paymentType}}</span></div>
          <div><span>订单编号:</span><span class="content">{{order.id}}</span></div>
          <div><span>下单时间:</span><span class="content">{{order.createTime}}</span></div>
        </div>
      </div>
      <popup _type="alert" :action="alertAction" @successFn="alertHide"><p class="text">{{alertText}}</p></popup>
      <popup _type="confirm" :action="confirmAction" @successFn="cancelOrder(order.id)" @cancelFn="confirmHide" :cancelText="'我再想想'" :successText="'确认取消'"><div class="confirm_body">好货稍纵即逝，取消后需要重新下单哦</div></popup>
      <cover :showText="loadDoneText" v-if="!loadDone" :isLoad="refresh"></cover>
      <div class="loading" v-show="loading"><img src="../../../assets/images/loading.gif" /></div>
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
        requestTime: '',
        token: '',
        loading: false,
        alertAction: 'hide',
        alertText: '',
        confirmAction: 'hide',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        order: {
          serveTime: '',
          createTime: '',
          id: Lib.common.getUrlQuery('orderId'),
          paymentKind: '',
          payIntegral: '',
          payMoney: '',
          paymentType: '',
          kind: '',
          shippingName: '',
          shippingNumber: ''
        },
        showExp: false,
        express: '',
        user: {
          name: '',
          phone: '',
          address: ''
        },
        goods: {
          name: '',
          img: '',
          specify: ''
        },
        endTimeStamp: '',
        serverTimeStamp: '',
        countDown: {
          min: '00',
          sec: '00',
          status: ''
        }
      }
    },
    created() {
      this.requestTime = new Date().getTime()
    },
    mounted() {
      this.token = Lib.store.getStore('token')
      this.init()
    },
    methods: {
      init() {
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
      },
      alertHide() {
        this.alertAction = 'hide'
      },
      confirmHide() {
        this.confirmAction = 'hide'
      },
      getCountDown() {
        let countDown = setInterval(() => {
          let nowTime = new Date(this.serverTimeStamp)
          let endTime = new Date(this.endTimeStamp)
          let t = endTime.getTime() - nowTime.getTime()
          if ( t <= 0) {
            this.loading = true
            this.countDown.min = '00'
            this.countDown.sec = '00'
            this.countDown.status = 'end'
            this.loadDone = true
            clearInterval(countDown)
            window.history.go(0)
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
      getOrderDetail(orderId) {
        let order = this.order
        let user = this.user
        let goods = this.goods
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/orders?time=${this.requestTime}`,
            data: {
              orderId
            },
            headers: {
              token: this.token
            },
            success: res => {
              console.log(res)
              if (res.statusCode === 200) { 
                order.serveTime = res.serverTime.substring(0, 19).replace(/-/g,'/')
                order.createTime = res.data.items.createdAt.substring(0, 19).replace(/-/g,'/')
                order.paymentKind = res.data.items.paymentKind
                order.paymentType = res.data.items.paymentType
                order.payIntegral = res.data.items.payIntegralSum
                order.payMoney = res.data.items.payMoneySum
                order.kind = res.data.items.kind
                order.shippingNumber = res.data.items.shippingNumber
                order.shippingName = res.data.items.shippingName

                goods.name = res.data.items.orderItemList[0].goodTitle
                goods.specify = res.data.items.orderItemList[0].specName
                goods.img = res.data.items.orderItemList[0].url
                
                user.name = res.data.items.orderShipping.receiverName
                user.phone = res.data.items.orderShipping.receiverPhone
                user.address = `${res.data.items.orderShipping.receiverState} ${res.data.items.orderShipping.receiverCity} ${res.data.items.orderShipping.receiverDistrict} ${res.data.items.orderShipping.receiverAddress}`

                this.endTimeStamp = Lib.common.transTime(order.createTime) + 1800000
                this.serverTimeStamp = Lib.common.transTime(order.serveTime)
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402){
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.status, 'getOrderDetail请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getOrderDetail网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      comfirmOrder() {
        this.confirmAction = 'show'
      },
      cancelOrder() {
        this.confirmHide()
        new Promise((resolve, reject) => {
          this.loading = true
          Lib.common.ajax({
            type: 'delete',
            url: `${Lib.config.ajaxPort.shop}/orders`,
            data: {orderId: this.order.id},
            headers: {
              token: this.token
            },
            success: res => {
              console.log(res)
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
                reject(res.status, 'cancelOrder请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('cancelOrder网络好像不太稳定，请重新尝试')
            }
          })
        }).then(() => {
          window.history.go(0)
        }).catch(res => {
          this.loading = false
          this.alertAction = 'show'
          this.alertText = res
        })
      },
      queryExpress() {
        if (!this.showExp) {
          new Promise((resolve, reject) => {
            this.loading = true
            Lib.common.ajax({
              type: 'get',
              url: `${Lib.config.ajaxPort.shop}/expresses`,
              data: {shippingNumber: this.order.shippingNumber},
              headers: {
                token: this.token
              },
              success: res => {
                console.log(res)
                if (res.statusCode === 200) {
                  this.express = res.data.items
                  resolve()
                } else if (res.statusCode === 401 || res.statusCode === 402){
                  Lib.bridge.getUserToken(this.token, res => {
                    if (res && res.token) {
                      Lib.store.setStore('token', res.token)
                      window.history.go(0)
                    }
                  })
                } else {
                  reject(res.status, 'queryExpress请求好像出问题了，请重新尝试')
                }
              },
              error: res => {
                reject('queryExpress网络好像不太稳定，请重新尝试')
              }
            })
          }).then(() => {
            this.loading = false
            this.showExp = true
          }).catch(res => {
            this.loading = false
            this.alertAction = 'show'
            this.alertText = res
          })
        }
      },
      closeExpress() {
        this.showExp = false
        this.express = null
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
    .detail_top
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      overflow: hidden
      background: #fff
      &.ing
        padding: 30rem/$rem 0 40rem/$rem
      &.completed, &.closed
        padding: 55rem/$rem 0
      .detail_count
        display: flex
        width: 224rem/$rem
        height: 70rem/$rem
        margin-bottom: 40rem/$rem
        color: #fff
        font-size: 60rem/$rem
        background: url('../../../assets/images/count_dot@2x.png') no-repeat center
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
      .order_status
        display: flex
        align-items: center
        line-height: 50rem/$rem
        font-size: 34rem/$rem
        color: #333233
        .icon
          width: 36rem/$rem
          height: 36rem/$rem
          margin-right: 17rem/$rem
      .order_tips
        margin-top: 26rem/$rem
        font-size: 28rem/$rem
        color: $color66
        span
          color: $color67
      .buttons
        display: flex
        justify-content: center
        margin: 55rem/$rem  0 0
        .btn
          @include btnScale(200rem, 60rem, 28rem)
          background: #fff
        .cancel_btn
          @include borderAll($color99, 60rem)
          color: $color66
        .gopay_btn
          @include borderAll($color67, 60rem)
          color: $color67
          margin-left: 40rem/$rem
      .express_btn
        @include btnScale(200rem, 60rem, 28rem)
        @include borderAll($color67, 60rem)
        margin: 55rem/$rem auto 0
        color: $color67
        background: #fff
    .express_detail
      padding: 20rem/$rem 30rem/$rem
      font-size: 28rem/$rem
      .detail_list
        .item
          display: flex
          align-items: center
          padding: 20rem/$rem 0
          &.first
            text-align: center
          .time
            width: 200rem/$rem
          .content
            flex: 1
        .close
          @include btnScale(200rem, 60rem, 28rem)
          @include borderAll($color67, 60rem)
          margin: 30rem/$rem auto 0
          color: $color67
          background: transparent
    .receiver
      position: relative
      margin-top: 20rem/$rem
      padding: 40rem/$rem 27rem/$rem 25rem/$rem 97rem/$rem
      background: #fff
      .icon
        position: absolute
        left: 24rem/$rem
        top: 40rem/$rem
        width: 34rem/$rem
        height: 46rem/$rem
      .info
        @include clearfix()
        line-height: 46rem/$rem
        font-size: 32rem/$rem
        .name
          float: left
          width: 40%
          font-weight: 700
        .phone
          float: right
          width: 59%
          text-align: right
          font-weight: 700
      .address
        margin-top: 15rem/$rem
        line-height: 50rem/$rem
        font-size: 28rem/$rem
    .order_detail
      margin-top: 20rem/$rem
      background: #fff
      .goods_info
        @include borderbottom()
        display: flex
        padding: 23rem/$rem
        overflow: hidden
        .img
          width: 160rem/$rem
          height: 160rem/$rem
          overflow: hidden
          background: $colorf4
        .info
          flex: 1
          padding: 10rem/$rem 20rem/$rem 0 25rem/$rem
          .title
            font-size: 28rem/$rem
            min-height: 60rem/$rem
            font-weight: 700
          .desc
            margin-top: 35rem/$rem
            font-size: 26rem/$rem
      .details
        padding: 30rem/$rem 23rem/$rem
        > div
          font-size: 28rem/$rem
          color: $color66
          margin-bottom: 40rem/$rem
          &:last-child
            margin: 0
          .content
            color: $color33
            margin-left: 70rem/$rem
</style>

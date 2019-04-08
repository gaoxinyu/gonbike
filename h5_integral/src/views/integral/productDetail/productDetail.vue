<template>
    <div class="wrap">
      <head-top :title="'商品详情'" ></head-top>
      <div class="product_img">
        <div v-if="goods.imglist.length > 0">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in goods.imglist" :key="index"><img :src="item.url" /></swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <img :src="goods.imgUrl" v-else />
      </div>
      <div class="product_info">
        <div class="info">
          <h2 class="name">{{goods.name}}</h2>
          <div class="prices">
            <i class="icon icon_coin_small"></i>
            <span class="num1">{{goods.integral}}分+</span>
            <span class="num2">￥{{goods.money}}</span>
            <span class="num3" v-if="goods.showOri">原价{{goods.price}}元</span>
          </div>
        </div>
        <div class="select"  @click="standardsShow">
          <span class="title">规格</span>
          <span class="text">{{goods.specifyName}}</span>
          <i class="icon icon_arr_right"></i>
        </div>
      </div>
      <div class="product_logistics">
        <div class="address" @click="goAddress">
          <span class="title">配送至</span>
          <span class="text" v-if="!userAddress">请选择收获地址</span>
          <div class="detail_text" v-else>
            <div class="line1">{{`${userAddress.name} ${userAddress.phone}`}}</div>
            <div class="line2">{{`${userAddress.ssq} ${userAddress.dd}`}}</div>
          </div>
          <i class="icon icon_arr_right"></i>
        </div>
        <div class="freight">
          <span class="title">运费</span>
          <span class="text">免运费</span>
        </div>
      </div>
      <div class="product_detail">
        <h4 class="title">商品详情</h4>
        <div class="content" v-html="goods.detail"></div>
      </div>
      <div class="product_charge" :class="{un : goods.stockNum == 0 || goods.kind != 'shelve'}" @click="checkOrder">
        {{goods.kind != 'shelve' ? '商品已下架' : goods.stockNum != 0 ? '立即兑换' : '商品已兑完'}}
      </div>
      <transition name="fade">
        <div class="standards_box" v-show="standardsBox.box">
          <a href="javascript:;" class="icon icon_close btn_close" @click="standardsHide"></a>
          <div class="content">
            <div class="info">
              <div class="img"><img :src="goods.imgUrl" /></div>
              <div class="dinfo">
                <h6 class="name">{{goods.name}}</h6>
                <div class="prices">
                  <i class="icon icon_coin_small"></i>
                  <span class="num1">{{goods.integral}}分+</span>
                  <span class="num2">￥{{goods.money}}</span>
                </div>
                <div class="other">原价{{goods.price}}元</div>
              </div>
            </div>
            <div class="select">
              <h4 class="title">请选择颜色</h4>
              <ul class="list">
                <li class="item" :class="{sel : chooseIndex == index}" @click="standardsSel(index,item.id)" v-for="(item, index) in goods.specifyList" :key="index">{{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade"><div class="mask" v-show="standardsBox.mask" @click="standardsHide"></div></transition>
      <popup _type="alert" :action="alertAction" @successFn="alertHide"><p class="text">{{alertText}}</p></popup>
      <popup _type="confirm" :action="confirmAction" @successFn="goWhere" @cancelFn="confirmHide" :cancelText="cancelText" :successText="successText"><div class="confirm_body" v-html="confirmBody"></div></popup>
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
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      Popup,
      cover,
      toast,
      swiper,
      swiperSlide,
      headTop
    },
    data() {
      return {
        requestTime: '',
        token: '',
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          pagination: {
            el: '.swiper-pagination'
          },
          speed: 500,
          centeredSlides: true,
          slidesPerView: 1,
          initialSlide: 0,
        },
        toastAction: 'hide',
        confirmAction: 'hide',
        alertAction: 'hide',
        toastText: '',
        alertText: '',
        confirmBody: `<div>1</div>`,
        successText: '确认',
        cancelText: '取消',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        loading: false,
        firstLoad: true,
        chooseIndex: 0,
        standardsBox: {
          mask: false,
          box: false
        },
        id: '',
        goodsId: '',
        goods: {
          imglist: [],
          imgUrl: '',
          name: '',
          integral: '',
          money: '',
          price: '',
          specifyName: '',
          specifyList: '',
          detail: '',
          kind: '',
          stockNum: ''
        },
        userAddress: {
          name: '',
          phone: '',
          ssq: '',
          dd: ''
        },
        user: {
          bonusPoints: '',
          needForegift: '',
          foregift: ''
        },
        order: {
          id: '',
          addressId: '',
          itemId: ''
        },
        chkStatus: 0
      }
    },
    created() {
      this.requestTime = new Date().getTime()
    },
    mounted() {
      this.token = Lib.store.getStore('token')
      this.id = Lib.common.getUrlQuery('id')
      this.goodsId = Lib.common.getUrlQuery('goodsId')
      this.init()
    },
    methods: {
      init() {
        this.getUserRecord().then(() => {
          this.getUserAddress().then(() => {
            this.getGoodsDetail(this.id, this.goodsId).then(() => {
              this.loadDone = true
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
      standardsShow() {
        this.standardsBox.box = true
        this.standardsBox.mask = true
      },
      standardsSel(actIndex,id) {
        if(this.chooseIndex === actIndex){
          return false
        } else {
          this.chooseIndex = actIndex
          this.loading = true
          this.getGoodsDetail(id,this.goodsId).then(() => {
            this.loading = false
          }).catch(res => {
            this.loading = false
            this.alertAction = 'show'
            this.alertText = res
          })
        }
      },
      standardsHide() {
        this.standardsBox.box = false
        this.standardsBox.mask = false
      },
      getGoodsDetail(id, goodsId) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/goodsItems?time=${this.requestTime}`,
            data: {id: id, goodsId: goodsId},
            headers:{
                token: this.token
            },
            success: res => {
              if (res.statusCode === 200){
                this.order.itemId = res.chooseItem.id
                this.goods.imglist = res.goods.imageList
                this.goods.imgUrl = res.goods.url
                this.goods.integral = (res.chooseItem.preferentialPrice && parseInt(res.chooseItem.preferentialPrice) > 0) ? res.chooseItem.preferentialIntegral : res.chooseItem.originalIntegral
                this.goods.money = (res.chooseItem.preferentialPrice && parseInt(res.chooseItem.preferentialPrice) > 0) ? (res.chooseItem.preferentialPrice - res.chooseItem.preferentialMoney).toFixed(2) : (res.chooseItem.originalPrice - res.chooseItem.originalMoney).toFixed(2)
                this.goods.showOri = (res.chooseItem.preferentialPrice && parseInt(res.chooseItem.preferentialPrice) > 0) ? true : false
                this.goods.price = res.chooseItem.originalPrice
                this.goods.name = res.goods.name
                this.goods.specifyName = res.chooseItem.name
                this.goods.detail = res.goods.textByteStr
                this.goods.specifyList = res.data.items
                this.goods.specifyList.map((item, index) => {
                if(item.choose && this.firstLoad){
                    this.firstLoad = false
                    let temp = this.goods.specifyList.splice(index,1)
                    this.goods.specifyList.unshift(temp[0])
                  }
                })
                this.goods.kind = res.chooseItem.kind
                this.goods.stockNum = res.chooseItem.stockNum
                resolve()
              } else if (res.statusCode === 401 && res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getGoodsDetail请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getGoodsDetail网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getUserRecord() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.bike}/me?time=${this.requestTime}`,
            data: {sessionId: this.token},
            success: res => {
              if (res.statusCode === 200) {
                this.user.foregift = res.data.foregift
                this.user.needForegift = res.data.needForegift
                this.user.bonusPoints = res.data.bonusPoints
                resolve()
              } else if (res.statusCode === 401 && res.statusCode === 402) {
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
            error: res => {
              reject('getUserRecord网络好像不太稳定，请重新尝试')
            }
          })
        }) 
      },
      getUserAddress() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/addresses?time=${this.requestTime}`,
            headers:{
              token: this.token
            },
            success: res => {
              if (res.statusCode == 200) {
                if (res.data.items && res.data.items.length > 0) {
                  res.data.items.map(item => {
                    if (item.isDefault) {
                      this.userAddress.name = item.receName
                      this.userAddress.phone = item.receTel
                      this.userAddress.ssq = `${item.state} ${item.city} ${item.district}`
                      this.userAddress.dd = item.streetName
                      this.order.addressId = item.id
                    }
                  })
                } else {
                  this.userAddress = null
                }
                resolve()
              } else if (res.statusCode === 401 && res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getUserAddress请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getUserAddress网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      goAddress() {
        window.location.assign('./address.html')
      },
      checkOrder() {
        let user = this.user
        let goods = this.goods
        let uaddress = this.userAddress

        if (this.standardsBox.box) {
          this.standardsBox.box = false
          this.standardsBox.mask = false
        }

        // 是否下架
        if (goods.kind != 'shelve') {
          this.toastText = '商品下架'
          this.toastAction = 'show'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }
        // 是否库存为0
        if (goods.stockNum == 0) {
          this.toastText = '商品库存不足'
          this.toastAction = 'show'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }

        if (user.needForegift && user.foregift === 0) {
          this.chkStatus = 1
          this.confirmAction = 'show'
          this.successText = '去看看'
          this.cancelText = '我知道了'
          this.confirmBody = `<p class="text">只有已交押金或者获得了免押权益的用户才可以兑换哦</p>`
          return
        }

        if (user.bonusPoints < parseFloat(goods.integral) ) {
          console.log('积分不够')
          this.chkStatus = 2
          this.confirmAction = 'show'
          this.successText = '去看看'
          this.cancelText = '我知道了'
          this.confirmBody = `<p class="text">你的积分不足以兑换商品哦</p>`
          return
        }

        if (!this.userAddress) {
          this.goAddress()
          return
        }

        this.confirmAction = 'show'
        this.successText = '确定'
        this.cancelText = '取消'
        this.chkStatus = 3
        this.confirmBody = `<h6 class="title">确认兑换</h6>
                            <div class="column"><span class="tit">收货人：</span><span class="txt">${uaddress.name}</span></div>
                            <div class="column"><span class="tit">联系方式：</span><span class="txt">${uaddress.phone}</span></div>
                            <div class="column"><span class="tit">收货地址：</span><span class="txt">${uaddress.ssq} ${uaddress.dd}</span></div>
                            <div class="column"><span class="tit">商品名称：</span><span class="txt">${goods.name}</span></div>
                            `
      },
      sendOrder() {
        this.confirmHide()
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'post',
            url: `${Lib.config.ajaxPort.shop}/orders`,
            data: {
              addressId: this.order.addressId,
              orderItemList: [{
                itemId: this.order.itemId,
                quantity: 1
              }],
              orderShipping: {
                receiverAddressId: this.order.addressId
              }
            },
            headers:{
              token: this.token
            },
            success: res => {
              console.log(res)
              if (res.statusCode === 200) {
                this.order.id = res.data[0]
                resolve()
              } else if (res.statusCode === 401 && res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'sendOrder请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('sendOrder网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      goWhere() {
        if (this.chkStatus === 1) {
          Lib.bridge.goNative('MyDeposit')
        } else if(this.chkStatus === 2) {
          window.location.replace('./myIntegral.html')
        } else {
          this.loading = true
          this.sendOrder().then(() => {
            this.loading = false
            window.location.replace(`./orderDetail.html?orderId=${this.order.id}`)
          }).catch(res => {
            this.loading = false
            this.alertAction = 'show'
            this.alertText = res
          })
        }
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
    .product_img
      width: 100%
      height: 350rem/$rem
      overflow: hidden
      background: $colorf4
      .swiper-container
        width: 100%
        height: 350rem/$rem
        .swiper-pagination-bullet-active
          background: #fff
    .product_info
      padding: 0 24rem/$rem
      background: #fff
      .info
        @include borderbottom()
        padding: 35rem/$rem 0
        .name
          height: 40rem/$rem
          line-height: 40rem/$rem
          font-size: 34rem/$rem
          font-weight: 700
        .prices
          display: flex
          align-items: center
          height: 40rem/$rem
          margin-top: 20rem/$rem
          line-height: 40rem/$rem
          font-size: 28rem/$rem
          .icon
            width: 32rem/$rem
            height: 32rem/$rem
            margin-right: 10rem/$rem
          .num2
            color: #f00
          .num3
            margin-left: 20rem/$rem
            font-size: 24rem/$rem
            text-decoration: line-through
            color: $color99
      .select
        display: flex
        padding: 35rem/$rem 0
        font-size: 28rem/$rem
        align-items: center
        .title
          width: 115rem/$rem
          color: $color66
        .text
          flex: 1
          color: $color33
        .icon
          width: 12rem/$rem
          height: 22rem/$rem          
    .product_logistics
      margin: 20rem/$rem 0
      padding: 0 24rem/$rem
      font-size: 28rem/$rem
      background: #fff
      .address,.freight
        position: relative
        display: flex
        align-items: center
        padding: 40rem/$rem 0 20rem/$rem
        .title
          align-self: baseline
          width: 115rem/$rem
          color: $color66
        .text
          flex: 1
          color: $color99
        .detail_text
          flex: 1
          max-width: 550rem/$rem
          .line1
            margin-bottom: 15rem/$rem
          .line2
            width: 100%
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        .icon
          position: absolute
          top: 40rem/$rem
          right: 0
          width: 12rem/$rem
          height: 22rem/$rem
      .freight
        padding: 20rem/$rem 0 40rem/$rem
        .text
          color: $color33
    .product_detail
      padding: 0 0 98rem/$rem 0
      background: #fff
      .title
        padding: 40rem/$rem 25rem/$rem
        font-size: 30rem/$rem
        font-weight: 700
      .content
        overflow: hidden
    .product_charge
      position: fixed
      z-index: 999
      bottom: 0
      left: 0
      right: 0
      width: 100%
      height: 98rem/$rem
      line-height: 98rem/$rem
      text-align: center
      font-size: 34rem/$rem
      color: #fff
      background: $color67
      &.un
        background: $color66
    .standards_box
      @include box-sizing()
      position: fixed
      z-index: 1000
      bottom: 98rem/$rem
      left: 0
      right: 0
      width: 100%
      padding: 64rem/$rem 24rem/$rem
      border-top-left-radius: 20rem/$rem
      border-top-right-radius: 20rem/$rem
      background: #fff
      .btn_close
        position: absolute
        right: 24rem/$rem
        top: 24rem/$rem
        width: 28rem/$rem
        height: 28rem/$rem
      .content
        .info
          @include clearfix
          .img
            @include border-radius(10rem/$rem)
            float: left
            width: 250rem/$rem
            height: 160rem/$rem
            overflow: hidden
            background: $colorf4
          .dinfo
            margin-left: 250rem/$rem
            padding: 10rem/$rem 25rem/$rem 0
            .name
              width: 100%
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              font-size: 30rem/$rem
            .prices
              display: flex
              align-items: center
              height: 40rem/$rem
              margin-top: 15rem/$rem
              line-height: 40rem/$rem
              font-size: 28rem/$rem
              .icon
                width: 32rem/$rem
                height: 32rem/$rem
                margin-right: 10rem/$rem
              .num2
                color: #f00
            .other
              height: 30rem/$rem
              margin-top: 15rem/$rem
              line-height: 30rem/$rem
              font-size: 24rem/$rem
              color: $color99
              text-decoration: line-through
      .select
        margin-top: 60rem/$rem
        .title
          height: 40rem/$rem
          line-height: 40rem/$rem
          font-size: 28rem/$rem
          color: $color66
        .list
          display: flex
          flex-wrap: wrap
          margin-top: 30rem/$rem
          .item
            &.sel
              color: #fff
              background: $color67
            @include border-radius(30rem/$rem)
            height: 60rem/$rem
            padding: 0 40rem/$rem
            margin-right: 20rem/$rem
            margin-bottom: 20rem/$rem
            line-height: 60rem/$rem
            font-size: 26rem/$rem
            background: $colorf5
    .mask
      position: fixed
      z-index: 900
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .6)
    .confirm_body
      .title
        margin-bottom: 30rem/$rem
        font-size: 32rem/$rem
        text-align: center
      .column
        display: flex
        padding: 10rem/$rem 0
        font-size: 28rem/$rem
        .tit
          width: 150rem/$rem
        .txt
          flex: 1
    .fade-enter-active, .fade-leave-active
      transition: all .3s ease
    .fade-enter, .fade-leave-to
      opacity: 0
</style>

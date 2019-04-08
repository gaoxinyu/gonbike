<template>
    <div class="wrap">
      <head-top :needRightBtn="true" :rightBtn="{title: '兑换记录',url: './exchangeRecord.html'}" ></head-top>
      <div class="top">
        <h1 class="title">永久甄选<a href="javascript:;" class="link icon icon_faq">有疑问</a></h1>
        <div class="integral_info">
          <div class="info">
            <i class="icon icon_coin_large"></i>
            <span class="text">可用积分：<a href="./myIntegralList.html"><em>{{userRecord}}</em></a></span>
          </div>
          <a href="./myIntegral.html" class="btn">获取积分</a></div>
      </div>
      <div class="main">
        <div class="swiper_wrap">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in adGroups" :key="index"><a :href="item.data.url"><img :src="item.data.imageUrl" /></a></swiper-slide>
          </swiper>
        </div>
        <div class="module_block first_block" v-for="(item, index) in goods.tags" :key="index">
          <div class="block_top">
            <h4 class="title">{{item.name}}</h4>
            <a :href="`./productList.html?tagCode=${item.code}`" class="more">全部商品<i class="icon icon_arr_right"></i></a>
          </div>
          <div class="block_items" v-if="goods.stores[item.code] && goods.stores[item.code].length > 0">
           <div class="item" v-for="(i, t) in goods.stores[item.code]" :key="t">
              <a :href="`./productDetail.html?id=${i.id}&goodsId=${i.goodsId}`" class="item_link">
                <div class="img"><img :src="i.url" /></div>
                <h6 class="name">{{i.name}}</h6>
                <div class="prices">
                  <i class="icon icon_coin_small"></i>
                  <span class="num1">{{i.preferentialPrice && parseFloat(i.preferentialPrice) > 0 ? i.preferentialIntegral : i.originalIntegral}}分 + </span>
                  <span class="num2">￥{{i.preferentialPrice && parseFloat(i.preferentialPrice) > 0 ? (i.preferentialPrice - i.preferentialMoney).toFixed(2) : (i.originalPrice - i.originalMoney).toFixed(2)}}</span>
                </div>
                <div class="other">
                  <span class="num" v-if="i.preferentialPrice && parseFloat(i.preferentialPrice) > 0">原价{{i.originalPrice}}元</span>
                  <span class="num" v-if="i.originalMoney && parseFloat(i.originalMoney) > 0">积分抵{{i.originalMoney}}元</span>
                </div>
              </a>
            </div>
          </div>
          <div class="block_items block_empty" v-else>暂无商品</div>
        </div>
      </div>
      <cover :showText="loadDoneText" v-if="!loadDone" :isLoad="refresh"></cover>
      <popup _type="alert" :action="alertAction" @successFn="alertHide"><p>{{alertText}}</p></popup>
    </div>
</template>
<script>
  import Lib from '@/assets/js/Lib'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import cover from '@/components/cover'
  import popup from '@/components/popup'
  import headTop from '@/components/headTop'
  export default {
    components: {
      swiper,
      swiperSlide,
      cover,
      popup,
      headTop
    },data() {
      return {
        requestTime: '',
        token: '',
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          speed: 500,
          centeredSlides: true,
          slidesPerView: 1.3,
          initialSlide: 0,
        },
        alertAction: 'hide',
        alertText: '',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        userRecord: '',
        adGroups: '',
        goods: {
          tags: {},
          stores: {}
        }
      }
    },
    created() {
      this.firstUrl()
      this.requestTime = new Date().getTime()
    },
    mounted() {
      this.token = Lib.store.getStore('token')
      this.init()
    },
    methods: {
      alertHide() {
        this.alertAction = 'hide'
      },
      init() {
        this.getUserRecord().then(() => {
          this.getIndexAd().then(() => {
            this.getTags().then(() => {
              this.goods.tags.forEach((e, i) => {
                this.getGoods(e.code, e.indexQuery).then(() => {
                  if (i == this.goods.tags.length - 1) {
                    this.loadDone = true
                  }
                }).catch(res => {
                  this.alertText = res
                  this.alertAction = 'show'
                  this.refresh = true
                  this.loadDoneText = res
                })
              })
            }).catch(res => {
              this.alertText = res
              this.alertAction = 'show'
              this.refresh = true
              this.loadDoneText = res
            })
          }).catch(res => {
            this.alertText = res
            this.alertAction = 'show'
            this.refresh = true
            this.loadDoneText = res
          })
        }).catch(res => {
          console.log('user data', res)
          this.alertText = res
          this.alertAction = 'show'
          this.refresh = true
          this.loadDoneText = res
        })
      },
      firstUrl() {
        Lib.store.setStore('FIRST_URL', location.pathname)
      },
      getUserRecord() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.bike}/me?time=${this.requestTime}`,
            data: {sessionId: this.token},
            success: res => {
              if (res.statusCode === 200) {
                this.userRecord = res.data.bonusPoints
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
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
      getIndexAd() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.goffice}/AdGroups`,
            data: {code: 'shoptopbanner',application: 'Bike', channel: 'Appstore', version: '1.1'},
            success: res =>{
              if (res.statusCode === 200) {
                this.adGroups = res.data.items[0].ads
                resolve()              
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getIndexAd请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getIndexAd网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getTags() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/tags/pub/list`,
            success: res =>{
              if (res.statusCode === 200) {
                this.goods.tags = res.items
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getTags请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getTags网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getGoods(tagCode, limits) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/goodsItems?time=${this.requestTime}`,
            data: {tagCode: tagCode, take: limits},
            headers:{
                token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                this.$set(this.goods.stores, tagCode, res.data.items)
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getGoods请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getGoods网络好像不太稳定，请重新尝试')
            }
          })
        })
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
    .top
      width: 100%
      min-height: 200rem/$rem
      padding: 34rem/$rem 24rem/$rem
      @include box-sizing()
      background: $white
      .title
        display: flex
        align-items: center
        line-height: 54rem/$rem
        font-size: 48rem/$rem
        .link
          width: 40rem/$rem
          height: 40rem/$rem
          line-height: 54rem/$rem
          margin-left: 16rem/$rem
          overflow: hidden
          text-indent: -999rem
      .integral_info
        position: relative
        height: 50rem/$rem
        .info
          display: flex
          margin-top: 40rem/$rem
          line-height: 50rem/$rem
          font-size: 28rem/$rem
          align-items: center
          .icon
            width: 40rem/$rem
            height: 40rem/$rem
            margin-right: 16rem/$rem
          .text
            em
              font-weight: 700
              font-style: normal
        .btn
          @include btnScale()
          position: absolute
          right: 0
          top: 50%
          transform: translateY(-50%)
    .main
      .swiper_wrap
        @include box-sizing()
        height: 344rem/$rem
        padding: 32rem/$rem 0
        background: $colorf0
        .swiper-slide
          height: 280rem/$rem
          transform: scale(.9)
          background: $white
          &.swiper-slide-active
            transition: 300ms;
            transform: scale(1)
      .module_block
        margin-top: 20rem/$rem
        background: $white
        &.first_block
          margin-top: 0
        .block_top
          position: relative
          height: 48rem/$rem
          padding: 40rem/$rem 24rem/$rem 40rem/$rem
          .title
            height: 48rem/$rem
            line-height: 48rem/$rem
            font-size: 36rem/$rem
            font-weight: 700
          .more
            position: absolute
            right: 24rem/$rem
            top: 50%
            transform: translateY(-50%)
            font-size: 28rem/$rem
            .icon
              width: 12rem/$rem
              height: 22rem/$rem
              margin-left: 16rem/$rem
        .block_items
          @include clearfix()
          min-height: 240rem/$rem
          padding: 0 24rem/$rem 70rem/$rem
          &.block_empty
            line-height: 200rem/$rem
            text-align: center
            font-size: 30rem/$rem
          .item
            width: 327rem/$rem
            margin-top: 75rem/$rem
            &:nth-child(odd)
              float: left
            &:nth-child(even)
              float: right
            &:nth-child(1),
            &:nth-child(2)
              margin-top: 0
            &>a
              display: block
              width: 100%
              .img
                width: 100%
                height: 210rem/$rem
                overflow: hidden
                background: $colorf4
                @include border-radius(10rem/$rem)
              .name
                width: 100%
                height: 32rem/$rem
                margin-top: 20rem/$rem
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
                line-height: 32rem/$rem
                font-size: 30rem/$rem
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
              .other
                @include clearfix()
                margin-top: 20rem/$rem
                min-height: 30rem/$rem
                line-height: 30rem/$rem
                font-size: 22rem/$rem
                color: $color99
                .num
                  &:nth-child(odd)
                    float: left
                  &:nth-child(even)
                    float: right
</style>

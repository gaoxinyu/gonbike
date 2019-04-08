<template>
    <div class="wrap" ref="wrap">
      <head-top :title="'全部商品'" ref="top"></head-top>
      <div ref="scroller">
        <pull-to :bottom-load-method="upLoad" :bottom-config="bConfig" v-if="goodsItem.length > 0">
          <ul class="items">
            <li class="item" v-for="(item, index) in goodsItem" :key="index">
              <div class="img"><img :src="item.url" /></div>
              <div class="info">
                <h6 class="name">{{item.name}}</h6>
                <div class="prices">
                  <i class="icon icon_coin_small"></i>
                  <span class="num1">{{item.preferentialPrice && parseInt(item.preferentialPrice) > 0 > 0 ? item.preferentialIntegral : item.originalIntegral}}分 + </span>
                  <span class="num2">￥{{item.preferentialPrice && parseInt(item.preferentialPrice) > 0 ? (item.preferentialPrice - item.preferentialMoney).toFixed(2) : (item.originalPrice - item.originalMoney).toFixed(2)}}</span>
                </div>
              </div>
              <a :href="`./productDetail.html?id=${item.id}&goodsId=${item.goodsId}`" class="btn" :class="{dis: item.stockNum == 0 || item.kind != 'shelve'}">兑换</a>
            </li>
          </ul>
        </pull-to>
        <empty-list v-else></empty-list>
      </div>
      <cover :showText="loadDoneText" v-if="!loadDone" :isLoad="refresh"></cover>
      <popup _type="alert" :action="alertAction" @successFn="alertHide"><p class="text">{{alertText}}</p></popup>
    </div>
</template>
<script>
  import Lib from '@/assets/js/Lib'
  import PullTo from 'vue-pull-to'
  import { getRect } from '@/assets/js/dom'
  import cover from '@/components/cover'
  import popup from '@/components/popup'
  import headTop from '@/components/headTop'
  import emptyList from '@/components/emptyList'
  export default {
    components: {
      PullTo,
      cover,
      popup,
      emptyList,
      headTop
    },
    data() {
      return {
        requestTime: '',
        token: '',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        alertAction: 'hide',
        alertText: '',
        bConfig:{
          pullText: '正在努力加载...',
          triggerText: '松开载入更多',
          loadingText: '正在努力加载',
          doneText: '加载成功',
          failText: '没有更多内容啦',
          loadedStayTime: 400,
          stayDistance: 50,
          triggerDistance: 70
        },
        tagCode: '',
        skip: 0,
        goodsItem: {}
      }
    },
    created() {
      this.requestTime = new Date().getTime()
    },
    mounted() {
      this.$refs.scroller.style.height = getRect(this.$refs.wrap).height - getRect(this.$refs.top.$el).height + 'px'
      this.token = Lib.store.getStore('token')
      this.tagCode = Lib.common.getUrlQuery('tagCode')
      this.init()
    },
    methods: {
      alertHide() {
        this.alertAction = 'hide'
      },
      upLoad(loaded) {
        this.getNewGoods(this.tagCode, this.skip).then(res => {
          this.skip += 10
          loaded('done')
        }).catch(res => {
          this.alertAction = 'show'
          this.alertText = res
        })
      },
      init() {
        this.getGoods(this.tagCode).then(res => {
          this.loadDone = true
          this.skip = 10
        }).catch(res => {
          this.alertAction = 'show'
          this.alertText = res
          this.refresh = true
          this.loadDoneText = res
        })
      },
      getGoods(tagCode, skip = 0, take = 10) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/goodsItems?time=${this.requestTime}`,
            data: {tagCode: tagCode, take: 10, skip: skip},
            headers:{
                token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                if (res.data.items && res.data.items.length > 0) {
                  this.goodsItem = res.data.items
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
                reject(res.statusCode, 'getGoods请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getGoods网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getNewGoods(tagCode, skip, take = 10) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/goodsItems`,
            data: {tagCode: tagCode, take: 10, skip: skip},
            headers:{
                token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                if (res.data.items && res.data.items.length > 0) {
                  this.$nextTick(() => {
                      this.goodsItem = this.goodsItem.concat(res.data.items)
                  })
                } else {
                  this.bConfig.pullText = '没有更多内容啦'
                  this.bConfig.triggerText = '没有更多内容啦'
                  this.bConfig.loadingText = '没有更多内容啦'
                  this.bConfig.doneText = '没有更多内容啦'
                }
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getNewGoods请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getNewGoods网络好像不太稳定，请重新尝试')
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
  body, html
    height: 100%
  .wrap
    @include box-sizing()
    width: 100%
    height: 100%
    padding: 88rem/$rem 0 0
    .items
      width: 100%
      .item
        @include borderbottom()
        display: flex
        align-items: center
        padding: 24rem/$rem
        background: #fff
        &:last-child
          &:after
            display: none
        .img
          @include border-radius(10rem/$rem)
          width: 250rem/$rem
          height: 160rem/$rem
          overflow: hidden
          background: $colorf4
        .info
          width: 290rem/$rem
          padding: 25rem/$rem 25rem/$rem 20rem/$rem
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
            margin-top: 20rem/$rem
            line-height: 40rem/$rem
            font-size: 24rem/$rem
            .icon
              width: 32rem/$rem
              height: 32rem/$rem
              margin-right: 10rem/$rem
            .num2
              color: #f00
        .btn
          @include btnScale()
          @include borderAll($color67, 48rem/$rem)
          flex: 1
          font-size: 28rem/$rem
          color: $color67
          background: transparent
          &.dis
            color: #fff
            background: $color99
            &::after
              display: none
    .empty_list
      position: relative
      width: 100%
      height: 100%
      .ww
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        .no_data_bg
          width: 304rem/$rem
          height: 240rem/$rem
          background-image: url(../../../assets/images/no_data@2x.png)
          background-size: 100% 100%
        .no_data_text
          margin-top: 60rem/$rem
          font-size: 28rem/$rem
          text-align: center
  .action-block
    .default-text
      font-size: 28rem/$rem
</style>

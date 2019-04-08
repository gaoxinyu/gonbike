<template>
    <div class="wrap" ref="wrap">
      <head-top :title="'兑换记录'" ref="top"></head-top>
      <div ref="scroller">
        <pull-to :bottom-load-method="upLoad" :bottom-config="bConfig" v-if="userOrder && userOrder.length > 0">
          <ul class="items">
            <li class="item" v-for="(item, index) in userOrder" :key="index">
              <a :href="`./orderDetail.html?orderId=${item.id}`">
                <div class="img"><img :src="item.orderItemList ? item.orderItemList[0].url : ''" /></div>
                <div class="info">
                  <div class="title">{{item.orderItemList ? item.orderItemList[0].specName : ''}}</div>
                  <div class="status">
                    <span class="text1" v-if="item.paymentKind === 'pending'">待支付</span>
                    <span class="text2" v-else-if="item.paymentKind === 'completed'">订单完成</span>
                    <span class="text3" v-else>订单关闭</span>
                  </div>
                </div>
                <div class="icon icon_arr_right"></div>
              </a>
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
  import { getRect } from '@/assets/js/dom'
  import PullTo from 'vue-pull-to'
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
        alertAction: 'hide',
        alertText: '',
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
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
        skip: 0,
        userOrder: ''
      }
    },
    created() {
      this.requestTime = new Date().getTime()
    },
    mounted() {
      this.token = Lib.store.getStore('token')
      this.$refs.scroller.style.height = getRect(this.$refs.wrap).height - getRect(this.$refs.top.$el).height + 'px'
      this.init()
    },
    methods: {
      init() {
        this.getOrderList(0).then(res => {
          this.loadDone = true
          this.skip = 10
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
      upLoad(loaded) {
        this.getNewOrder(this.skip).then(res => {
          this.skip += 10
          loaded('done')
        }).catch(res => {
          this.alertAction = 'show'
          this.alertText = res
        })
      },
      getOrderList(skip, take = 10) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/orders?time=${this.requestTime}`,
            data: {skip, take},
            headers: {
              token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                // if (res.data.items && res.data.items.length > 0) {
                this.userOrder = res.data.items
                // }
                resolve()
              } else if (res.statusCode === 401 || res.statusCode === 402) {
                Lib.bridge.getUserToken(this.token, res => {
                  if (res && res.token) {
                    Lib.store.setStore('token', res.token)
                    window.history.go(0)
                  }
                })
              } else {
                reject(res.statusCode, 'getOrderList请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getOrderList网络好像不太稳定，请重新尝试')
            }
          })
        })
      },
      getNewOrder(skip, take = 10) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/orders`,
            data: {skip, take},
            headers:{
                token: this.token
            },
            success: res => {
              if (res.statusCode === 200) {
                if (res.data.items && res.data.items.length > 0) {
                  this.$nextTick(() => {
                      this.userOrder = this.userOrder.concat(res.data.items)
                  })
                } else {
                  this.bConfig.pullText = '没有更多内容啦'
                  this.bConfig.triggerText = '没有更多内容啦'
                  this.bConfig.loadingText = '没有更多内容啦'
                  this.bConfig.doneText = '没有更多内容啦'
                }
                resolve()
              } else {
                if (res.statusCode === 401 || res.statusCode === 402) {
                  Lib.bridge.getUserToken(this.token, res => {
                    if (res && res.token) {
                      Lib.store.setStore('token', res.token)
                    }
                  })
                }
                reject(res.statusCode, 'getNewOrder请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getNewOrder网络好像不太稳定，请重新尝试')
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
  html,body
    height: 100%
    background: $colorf0
  .wrap
    @include box-sizing()
    width: 100%
    height: 100%
    padding: 88rem/$rem 0 0
    .items
      width: 100%
      .item
        > a
          @include borderbottom()
          display: flex
          align-items: center
          padding: 24rem/$rem
          background: #fff
          .img
            @include border-radius(10rem/$rem)
            width: 250rem/$rem
            height: 160rem/$rem
            overflow: hidden
            background: $colorf4
          .info
            flex: 1
            padding: 30rem/$rem 25rem/$rem
            .title
              max-width: 300rem/$rem
              margin-bottom: 30rem/$rem
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              font-size: 30rem/$rem
            .status
              font-size: 28rem/$rem
              .text1
                color: $color67
              .text2
                color: $color99
              .text3
                color: #f00
          .icon
            width: 12rem/$rem
            height: 22rem/$rem
            float: right
  .action-block
    .default-text
      font-size: 28rem/$rem
</style>

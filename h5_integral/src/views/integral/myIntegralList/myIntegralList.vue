<template>
    <div class="wrap" ref="wrap">
      <head-top :title="'积分明细'" ref="top"></head-top>
      <div ref="scroller">
        <pull-to :bottom-load-method="upLoad" :bottom-config="bConfig" v-if="list">
          <ul class="items">
            <li class="item" v-for="(item, index) in list" :key="index">
              <div class="c">
                <div class="title">{{item.summary}}</div>
                <div class="amount" :class="{'red': item.amount < 0}">{{item.amount}}</div>
              </div>
              <div class="date">{{item.createdAt.substring(0,19)}}</div>
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
        list: '',
        skip: 0
      }
    },
    created() {
    },
    mounted() {
      this.token = Lib.store.getStore('token')
      this.$refs.scroller.style.height = getRect(this.$refs.wrap).height - getRect(this.$refs.top.$el).height + 'px'
      this.init()
    },
    methods: {
      init() {
        this.getUserRecordList().then(() => {
          this.loadDone = true
          this.skip = 10
        }).catch(res => {
          this.alertText = res
          this.alertAction = 'show'
          this.refresh = true
          this.loadDoneText = res
        })
      },
      alertHide() {
        this.alertAction = 'hide'
      },
      upLoad(loaded) {
        this.getNewList(this.skip).then(res => {
          this.skip += 10
          loaded('done')
        }).catch(res => {
          this.alertAction = 'show'
          this.alertText = res
        })
      },
      getUserRecordList() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.bike}/me/accountTransactions`,
            data: {sessionId: this.token,accountkind: 'BonusPoints', skip: 0},
            success: res => {
              if (res.statusCode === 200) {
                // if (res.data.items && res.data.items.length > 0) {
                this.list = res.items
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
                reject(res.statusCode, 'getUserRecordList请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getUserRecordList网络好像出问题了，请重新尝试')
            }
          })
        })
      },
      getNewList(skip) {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.bike}/me/accountTransactions`,
            data: {sessionId: this.token,accountkind: 'BonusPoints', skip},
            success: res => {
              if (res.statusCode === 200) {
                if (res.data.items && res.data.items.length > 0) {
                  this.$nextTick(() => {
                    this.list = res.items
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
                reject(res.statusCode, 'getNewList请求好像出问题了，请重新尝试')
              }
            },
            error: res => {
              reject('getNewList网络好像出问题了，请重新尝试')
            }
          })
        })
      }
    },
  }
</script>
<style lang="sass">
  @import '../../../assets/css/common.sass'
  body, html
    height: 100%
  .wrap
    @include box-sizing()
    width: 100%
    height: 100%
    padding: 88rem/$rem 0 0
    .item
      @include borderbottom()
      padding: 30rem/$rem 25rem/$rem
      background: #fff
      &:last-child
        &::after
          display: none
      .c
        @include clearfix()
        .title
          float: left
          font-size: 28rem/$rem
        .amount
          float: right
          font-size: 28rem/$rem
          .red
            color: #ff283c
      .date
        clear: both
        margin-top: 15rem/$rem
        font-size: 24rem/$rem
        color: $color99
  .action-block
    .default-text
      font-size: 28rem/$rem
</style>

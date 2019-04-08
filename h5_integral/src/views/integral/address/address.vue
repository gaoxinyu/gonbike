<template>
    <div class="wrap">
      <head-top :title="'收货地址'" ></head-top>
      <div class="column col_text">
        <div class="title">收货人</div>
        <div class="cont">
          <input type="text" class="input" placeholder="请输入收货人名字" @blur="getNameValue" :value="userAddress.name" />
        </div>
      </div>
      <div class="column col_text">
        <div class="title">联系方式</div>
        <div class="cont">
          <input type="text" class="input" placeholder="请输入收货人联系方式" @blur="getPhoneValue" :value="userAddress.phone"/>
        </div>
      </div>
      <div class="column col_select">
        <div class="title">地址</div>
        <div class="cont" @click="linkToCity">
          <input type="text" placeholder="请选择收货地址" class="input" readonly :value="userAddress.ssq"/>
          <i class="icon icon_arr_right"></i>
        </div>
      </div>
      <div class="column col_darea">
        <div class="title">详细地址</div>
        <div class="cont">
          <textarea class="textarea" rows="2" placeholder="请填写详细地址门牌" @blur="getDdValue" :value="userAddress.dd"></textarea>
        </div>
      </div>
      <div class="btns">
        <a href="javascript:;" class="btn btn_cancel" @click="cancelSubmit">取消</a>
        <a href="javascript:;" class="btn btn_submit" @click="submitData">保存地址</a>
      </div>
      <transition name="slide-left">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      <popup _type="alert" :action="alertAction" @successFn="closePop"><p class="text">{{alertText}}</p></popup>
      <cover :showText="loadDoneText" v-if="!loadDone" :isLoad="refresh"></cover>
      <toast :action="toastAction" :toastText="toastText"></toast>
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
        loadDone: false,
        loadDoneText: '加载中...',
        refresh: false,
        alertAction: 'hide',
        alertText: '',
        toastAction: 'hide',
        toastText: '',
        recordAddress: '',
        userAddress: {
          name: '',
          phone: '',
          ssq: '',
          dd: '',
          ids: []
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
        this.getUserAddress().then(() => {
          this.loadDone = true
          if (Lib.store.getStore('address')) {
            this.userAddress.ssq = Lib.store.getStore('address')
            Lib.store.removeStore('address')
            if(this.userAddress.ssq.length > 15) {
              this.userAddress.ssq = this.userAddress.ssq.slice(0,13) + '...'
            }
          }
          if (Lib.store.getStore('addressId') && Lib.store.getStore('addressId').length > 0) {
            this.userAddress.ids = []
            this.userAddress.ids = Lib.store.getStore('addressId').split(',')
            Lib.store.removeStore('addressId')
          }
          if (Lib.store.getStore('addressData') && Lib.store.getStore('addressData').length > 0) {
            this.userAddress.name = Lib.store.getStore('addressData')[0]
            this.userAddress.phone = Lib.store.getStore('addressData')[1]
            this.userAddress.dd = Lib.store.getStore('addressData')[2]
            Lib.store.removeStore('addressData')
          }
        }).catch(res => {
          this.alertAction = 'show'
          this.alertText = res
          this.refresh = true
          this.loadDoneText = res
        })
      },
      closePop() {
        this.alertAction = 'hide'
      },
      getNameValue(e) {
        this.userAddress.name = e.target.value
      },
      getPhoneValue(e) {
        this.userAddress.phone = e.target.value
      },
      getDdValue(e) {
        this.userAddress.dd = e.target.value
      },
      getUserAddress() {
        return new Promise((resolve, reject) => {
          Lib.common.ajax({
            type: 'get',
            url: `${Lib.config.ajaxPort.shop}/addresses`,
            headers:{
                token: this.token
            },
            success: res => {
              if (res.statusCode == 200) {
                if (res.data.items && res.data.items.length > 0) {
                  res.data.items.map(item => {
                    if (item.isDefault) {
                      console.log(item.isDefault)
                      this.userAddress.name = item.receName
                      this.userAddress.phone = item.receTel
                      this.userAddress.ssq = `${item.state} ${item.city} ${item.district}`
                      this.userAddress.dd = item.streetName
                      this.userAddress.ids = [item.stateId,item.cityId,item.districtId]
                    }
                  })
                }
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
                reject(res.statusCode, 'getUserAddress请求好像出问题了，请重新尝试')
              }
            },
            error: err => {
              reject('getUserAddress网络好像出问题了，请重新尝试')
            }
          })
        })
      },
      linkToCity() {
        this.storeData()
        this.$router.push({path: '/citys'})
      },
      storeData() {
        Lib.store.setStore('addressData', [this.userAddress.name, this.userAddress.phone, this.userAddress.dd])
      },
      submitData() {
        if (!this.userAddress.name) {
          this.toastAction = 'show'
          this.toastText = '请填写收件人'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }
        if (!this.userAddress.phone) {
          this.toastAction = 'show'
          this.toastText = '请填写联系方式'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }

        if (this.userAddress.phone && !/^0?1[3-9][0-9]\d{8}$/.test(this.userAddress.phone)) {
          this.toastAction = 'show'
          this.toastText = '请填写正确联系方式'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }

        if (!this.userAddress.ssq) {
          this.toastAction = 'show'
          this.toastText = '请填写地址'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }

        if (!this.userAddress.dd) {
          this.toastAction = 'show'
          this.toastText = '请填写详细地址'
          setTimeout(() => {
            this.toastAction = 'hide'
          },800)
          return
        }

        Lib.common.ajax({
          type: 'post',
          url: `${Lib.config.ajaxPort.shop}/addresses`,
          data: {
            receName: this.userAddress.name,
            receTel: this.userAddress.phone,
            stateId: this.userAddress.ids[0],
            cityId: this.userAddress.ids[1],
            districtId: this.userAddress.ids[2],
            streetName: this.userAddress.dd
          },
          headers:{
            token: this.token
          },
          success: res => {
            console.log(res)
            if (res.statusCode === 200) {
              this.toastAction = 'show'
              this.toastText = '保存成功'
              setTimeout(() => {
                this.toastAction = 'hide'
                window.history.go(-1)
              },800)
            } else if (res.statusCode === 401 || res.statusCode === 402) {
              // token过期
              Lib.bridge.getUserToken(this.token, res => {
                if (res && res.token) {
                  Lib.store.setStore('token', res.token)
                  window.history.go(0)
                }
              })
            } else {
              this.alertText = res.statusCode + 'submitData请求好像出问题了，请重新尝试'
              this.alertAction = 'show'
            }
          },
          error: err => {
            this.alertText = 'submitData网络好像不太稳定，请重新尝试'
            this.alertAction = 'show'
          }
        })
      },
      cancelSubmit() {
        window.history.go(-1)
      }
    },
  }
</script>
<style lang="sass">
  @import '../../../assets/css/common.sass'
  @import '../../../assets/css/icon.sass'
  body
    background: #fff!important
  .wrap
    height: 100%
    padding: 88rem/$rem 24rem/$rem 0
    .column
      @include borderbottom()
      display: flex
      padding: 45rem/$rem 0
      font-size: 30rem/$rem
      line-height: 58rem/$rem
      &.col_text
        height: 58rem/$rem
      &.col_darea
        .cont
          height: auto
      &.col_select
        .icon
          position: absolute
          right: 0
          top: 50%
          transform: translateY(-50%)
          width: 12rem/$rem
          height: 22rem/$rem
      .title
        width: 150rem/$rem
        height: 58rem/$rem
        color: $color66
      .cont
        position: relative
        flex: 1
        height: 58rem/$rem
        .placeholder
          position: absolute
          z-index: -1
          top: 0
          left: 0
          height: 58rem/$rem
          padding: 0 0 0 15rem/$rem
          line-height: 58rem/$rem
          color: $color99
        .input
          @include box-sizing()
          display: block
          width: 100%
          height: 58rem/$rem
          padding: 5rem/$rem 15rem/$rem
          background: transparent
        .textarea
          @include box-sizing()
          display: block
          width: 100%
          padding: 0 15rem/$rem
          line-height: 58rem/$rem
          font-size: 30rem/$rem
          border: 0 none
          background: transparent
    .btns
      @include clearfix()
      margin-top: 80rem/$rem
      .btn
        @include btnScale(330rem, 80rem, 30rem)
        &:first-child
          @include borderAll($color67, 80rem)
          float: left
          background: transparent
          color: $color67
        &:last-child
          float: right
    .slide-left-enter-active, .slide-left-leave-active
      transition: all .3s ease
    .slide-left-enter, .slide-left-leave-to
      opacity: 0
      transform: translateX(100%)
    
</style>

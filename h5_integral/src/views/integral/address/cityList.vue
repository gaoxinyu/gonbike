<template>
    <div class="citys">
      <div class="city_select_title">
        <div class="title" :class="{act : step === 0}"><span class="text">选择省份</span><i class="icon icon_arr_right"></i></div>
        <div class="title" :class="{act : step === 1}"><span class="text">选择城市</span><i class="icon icon_arr_right"></i></div>
        <div class="title" :class="{act : step === 2}"><span class="text">选择地区</span></div>
      </div>
      <div class="city_select_list">
        <ul class="list">
          <li class="item" v-for="(item, index) in address" :key="index" @click="queryCity(item.id, item.name)">{{item.name}}</li>
        </ul>
      </div>
      <popup _type="alert" :action="alertAction" @successFn="closePop"><p class="text">{{alertText}}</p></popup>
      <div class="loading" v-show="loading"><img src="../../../assets/images/loading.gif" /></div>
    </div>
</template>
<script>
  import Lib from '@/assets/js/Lib'
  import Popup from '@/components/popup.vue'
  export default {
    components: {
      Popup
    },
    data() {
      return {
        token: '',
        step: 0,
        address: [],
        province: '',
        city: '',
        ares: '',
        provinceId: '',
        cityId: '',
        aresId: '',
        loading: true,
        alertAction: 'hide',
        alertText: '',
      }
    },
    computed: {
    },
    created() {
      
    },
    mounted() {
      console.log('list mounted')
      this.token = Lib.store.getStore('token')
      this.loading = true
      if (this.step === 0) {
        if (Lib.store.getStore('100000')) {
          this.loading = false
          console.log('本地已缓存缓存省份信息')
          this.address = Lib.store.getStore('100000')
        } else {
          console.log('本地没有缓存省份信息')
          this.queryAddress(100000)
        }
      }
      console.log('list created')
    },
    deactivated() {
      window.location.reload()
    },
    methods: {
      closePop() {
        this.alertAction = 'hide'
      },
      queryAddress(id) {
        Lib.common.ajax({
          type: 'get',
          url: `${Lib.config.ajaxPort.shop}/areas`,
          data: {parentId: id},
          headers:{
              token: this.token
          },
          success: res => {
            this.loading = false
            if (res.statusCode === 200) {
              if(res.data.items.length > 0){
                if (this.step === 0) {
                  Lib.store.setStore(id, res.data.items)
                } else if (this.step === 1) {
                  Lib.store.setStore(id, res.data.items)
                } else if (this.step === 2) {
                  Lib.store.setStore(id, res.data.items)
                }
              }
              this.address = res.data.items
            } else {
              if (res.statusCode === 401) {

              }
              this.alertText = res.message
              this.alertAction = 'show'
            }
          },
          error: res => {
            this.alertText = '网络好像不太稳定，请重新尝试'
            this.alertAction = 'show'
          }
        })
      },
      queryCity(id, name) {
        this.loading = true
        if (this.step === 0) {
          this.province = name
          this.provinceId = id
          this.step = 1
          this.queryAddress(id)
        } else if (this.step === 1) {
          this.step = 2
          this.city = name
          this.cityId = id
          this.queryAddress(id)
        } else {
          this.loading = false
          this.area = name
          this.areaId = id
          Lib.store.setStore('address', `${this.province} ${this.city} ${this.area}`)
          Lib.store.setStore('addressId', `${this.provinceId},${this.cityId},${this.areaId}`)
          this.$router.go(-1)
          console.log(this.province, this.city, this.area)
        }
      }
    },
  }
</script>
<style lang="sass" scoped>
  @import '../../../assets/css/common.sass'
  .citys
    position: fixed
    z-index: 999
    top: 88rem/$rem
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    padding: 0
    overflow-y: auto
    -webkit-overflow-scrolling: touch
    background: #fff
    .city_select_title
      display: flex
      padding: 30rem/$rem 5rem/$rem
      .title
        position: relative
        flex: 1
        text-align: center
        font-size: 30rem/$rem
        &.act
          .text
            position: relative
            &::after
              content: ''
              position: absolute
              bottom: -10rem/$rem
              left: 0
              width: 100%
              height: 4rem/$rem
              background: $color67
        .icon
          position: absolute
          right: -6rem/$rem
          top: 50%
          transform: translateY(-50%)
          width: 12rem/$rem
          height: 22rem/$rem
    .city_select_list
      .list
        padding: 0 25rem/$rem
        .item
          padding: 35rem/$rem 0
          font-size:28rem/$rem
</style>

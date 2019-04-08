<template>
    <div class="header" :class="{white: c}">
        <div class="back" @click="goBack"></div>
        <h1 class="title">{{title}}</h1>
        <a :href="rightBtn.url" v-if="needRightBtn" class="rightBtn">{{rightBtn.title}}</a>
    </div>
</template>

<script>

import Lib from 'assets/js/Lib';

export default {
    data() {
        return {
            firstUrl: ''
        }
    },
    props: {
        c: {
            type: Boolean,
            default: false
        },
        needRightBtn: {
            type: Boolean,
            default: false
        },
        rightBtn: {
            type: Object
        },
        title: {
            type: String,
            default: ''
        }
    },
    //已成功挂载，相当ready()
    mounted(){
        this.firstUrl = Lib.store.getStore('FIRST_URL')
        console.log('前一页地址', document.referrer)
    },
    //相关操作事件
    methods: {
        goBack() {
            if (this.firstUrl == window.location.pathname) {
                Lib.bridge.goBack()
            } else {
                if (document.referrer === '') {
                    window.location.assign('/')
                } else {
                    window.history.go(-1)
                }
            }
        }
    }
}
</script>

<style lang="sass">
    @import '../assets/css/common.sass'
    .header
        position: fixed
        z-index: 1000
        top: 0
        left: 0
        width: 100%
        height: 88rem/$rem
        background: #fff
        .back
            position: absolute
            top: 50%
            left: 0
            transform: translateY(-50%)
            width: 17rem/$rem
            height: 88rem/$rem
            padding: 0 25rem/$rem
            background: url(../assets/images/back@2x.png) no-repeat center
            background-size: 17rem/$rem 32rem/$rem
        .title
            line-height: 88rem/$rem
            font-size: 34rem/$rem
            text-align: center
        .rightBtn
            position: absolute
            top: 50%
            right: 0
            transform: translateY(-50%)
            padding: 0 25rem/$rem
            font-size: 32rem/$rem
            color: $color66
        &.white
            background: $color67
            .back
                background-image: url(../assets/images/back_white@2x.png)
            .rightBtn
                color: #fff
</style>

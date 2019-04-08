<template>
    <transition name="fade">
        <div class="cover">
            <div class="ww">
                <div class="cover_img"><img src="../assets/images/loading.gif" /></div>
                <p class="cover_text">{{showText}}</p>
                <div class="refresh" @click="refresh" v-if="isLoad">刷新</div>
            </div>
        </div>
    </transition>
</template>

<script>

import Lib from 'assets/js/Lib';

export default {
    props: {
        showText: {
            default: '加载中',
            type: String
        },
        isLoad: {
            type: Boolean,
            default: false
        }
    },
    //已成功挂载，相当ready()
    mounted(){
    },
    //相关操作事件
    methods: {
        refresh() {
            window.location.reload()
        }
    }
}
</script>

<style lang="sass">
    @import '../assets/css/common.sass'
    .cover
        position: fixed
        z-index: 9999
        top: 0
        left: 0
        right: 0
        bottom: 0
        width: 100%
        background: #f0eff0
        .ww
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            .cover_img
                width: 143rem/$rem
                margin: 0 auto 20rem/$rem
            .cover_text
                font-size: 28rem/$rem
                line-height: 1.2
                text-align: center
            .refresh
                @include btnScale()
                margin: 100rem/$rem auto 0
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-to
      opacity: 0
</style>

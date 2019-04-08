<template>
    <div class="empty_list">
        <div class="ww">
            <div class="no_data_bg"></div>
            <p class="no_data_text">这里空空如也～</p>
        </div>
    </div>
</template>

<script>

import Lib from 'assets/js/Lib';

export default {
    data() {
        return {

        }
    },
    components: {

    },
    props: {
        
    },
    //实例初始化最之前，无法获取到data里的数据
    beforeCreate(){


    },  
    //在挂载开始之前被调用
    beforeMount(){


    }, 
    //已成功挂载，相当ready()
    mounted(){



    },
    //相关操作事件
    methods: {




    }
}
</script>

<style lang="sass">
    $rem: 46.875
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
                background-image: url(../assets/images/no_data@2x.png)
                background-size: 100% 100%
            .no_data_text
                margin-top: 60rem/$rem
                font-size: 28rem/$rem
                text-align: center
</style>

<template>
<div :style="'display: inline-block; transform:rotate('+ angle +'deg); -ms-transform:rotate('+ angle +'deg); -moz-transform:rotate('+ angle +'deg); -webkit-transform:rotate('+ angle +'deg); -o-transform:rotate('+ angle +'deg);'">
  <slot></slot>
</div>
</template>

<script>

export default {
  name: 'Rotate',
  props: {
    angle: {    // 角度
      type: Number,
      default: 0,
      required: true,
    }
  },   
}
</script>
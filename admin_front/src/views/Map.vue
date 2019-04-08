<template>
<div class="map-view"> 
  <div class="box">
    <div class="box-header with-border">测试地图</div>
    <div class="box-body">
      <!--<div id="mapView" style="height: 740px; width:100%;"></div>-->
      <g-map style="height: 740px; width:100%;" :center="center" :zoom="12" >
        <g-marker 
          v-for="m in markers"
          :position="m.position"
          :clickable="true"
          @g-click="center=m.position" 
          :visible="true"
        ></g-marker>
      </g-map>
    </div>
  </div>
</div>
</template>

<script>
import GMap from '../components/googleMap/map.vue'
import GMarker from '../components/googleMap/marker.vue'

export default {
  mounted() {
    
  },
  data() {
    return {
      center: {lat: 1.367019, lng: 103.83753},   // 新加坡 
      markers: [{
        position: {lat: 1.367019, lng: 103.83753}
      }, {
        position: {lat: 1.3210262, lng: 103.7626857}
      }, {
        position: {lat: 1.320683, lng: 103.818304}
      }]
    }
  },
  methods: {
    
  },
  components: {
    GMap, GMarker
  }
}
</script>

<style lang="scss">
.map-view{
  height: 100%;

}
</style>
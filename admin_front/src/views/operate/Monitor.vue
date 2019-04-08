<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">{{ $t('monitor.box.title1') }}</h3>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('monitor.query.bikeId')">
              <el-input v-model="query.bikeId" :placeholder="$t('monitor.query.bikeIdPlaceHolder')"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('monitor.query.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('monitor.query.optStatus')">
              <el-select v-model="query.operationStatus">
                <el-option
                  v-for="item in optStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('monitor.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
        <!--<div class="row">
          <div class="col-md-4 col-xs-12">-->
            <!--<el-form-item :label="$t('monitor.query.radius')">
              <el-select v-model="query.radius">
                <el-option
                  v-for="item in radiusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>-->
          <!--</div>

          <div class="col-md-4 col-xs-12">-->
            <!--<el-form-item :label="$t('monitor.query.address')">
              <div class="input-group">
                <input id="searchInput" v-model="address" type="text" class="el-input__inner form-control" :placeholder="$t('monitor.query.addressPlaceholder')">
                <span class="btn btn-info input-group-addon" @click="clearAddress">{{ $t('monitor.query.clearAddress') }}</span>
              </div>
            </el-form-item>-->
          <!--</div>
          <div class="col-md-4 col-xs-12">-->
            <!--<el-button class="pull-left" type="text" @click="showMap = !showMap" :loading="loading">{{ $t('monitor.query.showMap') }}</el-button>-->
            <!--<el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('monitor.query.query') }}</el-button>
          </div>-->
        <!--</div>-->
      </el-form>


    </div>
  </div>

  <!--<div class="box box-solid" v-show="showMap">
    <div class="box-body">
      <div class="row">
        <div class="col-lg-12">
          <div id="map" style="height: 600px; width:100%;"></div>
        </div>
      </div>
    </div>
  </div>-->

  <div class="box box-success">
    <div class="box-header with-border">
      <h3 class="box-title">{{ $t('monitor.box.title2', {length: filterBikes.length}) }}</h3>
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="pageFilterBikes"
        highlight-current-row
        @current-change="selectRow"
        max-height="600"
        border style="width: 100%">
        <el-table-column prop="id" :label="$t('monitor.table.id')"></el-table-column>
        <el-table-column prop="statusString" :label="$t('monitor.table.status')"></el-table-column>
        <el-table-column prop="optStatusString" :label="$t('monitor.table.optStatus')"></el-table-column>
        <el-table-column prop="electricity" :label="$t('monitor.table.electricity')"></el-table-column>
        <el-table-column prop="useTimeString" :label="$t('monitor.table.useTime')"></el-table-column>
        <el-table-column prop="addressString" :label="$t('monitor.table.address')" width="420"></el-table-column>
        <el-table-column fixed="right" :label="$t('monitor.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('monitor.table.operate') }}</el-button>
              <div><el-button type="text" size="small" :disabled="loading" @click="detail(scope.$index, scope.row)">{{ $t('monitor.table.detail') }}</el-button></div>
              <!--<div><el-button type="text" size="small" @click="setCenter(scope.$index, scope.row)">{{ $t('monitor.table.setCenter') }}</el-button></div>-->
              <div><el-button type="text" size="small" @click="goTrip(scope.$index, scope.row)">{{ $t('monitor.table.goTrip') }}</el-button></div>
              <div><el-button type="text" size="small" @click="reset(scope.$index, scope.row)">{{ $t('monitor.table.reset') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goReport(scope.$index, scope.row)">{{ $t('monitor.table.goReport') }}</el-button></div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="row text-center">
        <div class="col-md-12">
          <el-pagination
            layout="total, prev, pager, next"
            :total="page.count"
            :page-size="page.per"
            :current-page="page.current"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <el-dialog :title="$t('monitor.dialog.title0')" :visible.sync="detailVisible">
    <div class="box box-success">
      <div class="box-header">{{ $t('monitor.dialog.title1') }}</div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-4">{{ $t('monitor.dialog.id') }}：{{selectedBike.id || "--"}}</div>
          <div class="col-md-4">{{ $t('monitor.dialog.optStatus') }}：{{selectedBike.optStatusString || "--"}}</div>
          <div class="col-md-4">{{ $t('monitor.dialog.status') }}：{{selectedBike.statusString || "--"}}</div>

        </div>
        <div class="row">
          <div class="col-md-4">{{ $t('monitor.dialog.electricity') }}：{{selectedBike.electricity || "--"}}</div>
        </div>
        <p>{{ $t('monitor.dialog.address') }}：{{selectedBike.address}}</p>
      </div>
    </div>

    <div class="box box-success">
      <div class="box-header">{{ $t('monitor.dialog.title2') }}</div>
      <div class="box-body">
        <p>{{ $t('monitor.dialog.orderNo') }}：{{order.orderNo || "--"}}</p>
        <div class="row">
          <div class="col-md-6">{{ $t('monitor.dialog.userId') }}：{{order.userId || "--"}}</div>
          <div class="col-md-6">{{ $t('monitor.dialog.price') }}：{{order.currencySymbol ? order.currencySymbol + " " + order.price : order.price || "--"}}</div>
        </div>
        <div class="row">
          <div class="col-md-6">{{ $t('monitor.dialog.minutes') }}：{{order.minutes !== null ? order.minutes + " min" : "--"}}</div>
          <div class="col-md-6">{{ $t('monitor.dialog.distance') }}：{{order.distance !== null ? order.distance + " m" : "--"}}</div>
        </div>
        <div class="row">
          <div class="col-md-6">{{ $t('monitor.dialog.startTime') }}：{{order.startTime || "--"}}</div>
          <div class="col-md-6">{{ $t('monitor.dialog.endTime') }}：{{order.endTime || "--"}}</div>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from "../../api"
import moment from "moment"
import {customTime} from "../../utils/filters.js"
// import bikeFault1 from "../../assets/img/bike-fault-1.png"
// import bikeFault2 from "../../assets/img/bike-fault-2.png"
// import bikeFault3 from "../../assets/img/bike-fault-3.png"
// import bikeFault4 from "../../assets/img/bike-fault-4.png"
// import {loaded} from '../../components/googleMap/utils/manager.js'
import Mixins from '../../mixins/index.js'

let map = null;
let infowindow = null;

export default {
  mixins: [Mixins.query],
  mounted() {
    // loaded.then(() => {
    //   this.initMap();
    //   this.initSearchInput();
      // this.handleQuery();
    // });
  },
  data() {
    return {
      loading: false,
      detailVisible: false,
      showMap: true,
      bike: {},
      selectedBike: {},
      order: {},
      filterBikes: [],
      pageFilterBikes: [],
      query: {
        bikeId: this.$route.query.bikeId || '',         // 单车id
        status: null,         // 单车状态
        operationStatus: null,// 运营状态
        radius: null,
        longitude: null,
        latitude: null,
      },
      address: null,
      center: {lat: 1.333194, lng: 103.736132},   // 新加坡
      // center: {lat: 31.206697, lng: 121.455031},   // 上海
      zoom: 14,
      markers: [],
      page: {
        count: 0,
        current: 0,
        per: 10
      },
      statusOptions: [
        {label: this.$t('monitor.js.all'), value: null},
        {label: this.$t('monitor.js.status0'), value: 0},
        {label: this.$t('monitor.js.status1'), value: 1},
        {label: this.$t('monitor.js.status2'), value: 2},
        {label: this.$t('monitor.js.status3'), value: 3},
        {label: this.$t('monitor.js.status4'), value: 4},
        {label: this.$t('monitor.js.status5'), value: 5},
      ],
      optStatusOptions: [
        {label: this.$t('monitor.js.all'), value: null},
        {label: this.$t('monitor.js.optStatus1'), value: 1},
        {label: this.$t('monitor.js.optStatus2'), value: 2},
        {label: this.$t('monitor.js.optStatus3'), value: 3},
        {label: this.$t('monitor.js.optStatus4'), value: 4},
      ],
      radiusOptions: [
        {label: this.$t('monitor.js.all'), value: null},
        {label: this.$t('monitor.js.radius1'), value: 1},
        {label: this.$t('monitor.js.radius3'), value: 3},
        {label: this.$t('monitor.js.radius5'), value: 5},
        {label: this.$t('monitor.js.radius10'), value: 10},
      ]
    }
  },
  computed: {
    computedFilterBikes() {
      return this.filterBikes.map((item) => {
        return {
            ...item,
            addressString: item.address ? item.address : (item.latitude && item.longitude ? ('(' + item.longitude + ', ' + item.latitude + ')') : ''),
            statusString: item.status == "0" ? this.$t('monitor.js.status0') : item.status == "1" ? this.$t('monitor.js.status1') : item.status == "2" ? this.$t('monitor.js.status2')
                        : item.status == "3" ? this.$t('monitor.js.status3') : item.status == "4" ? this.$t('monitor.js.status4') : item.status == "5" ? this.$t('monitor.js.status5') : "",
            optStatusString: item.operationStatus == 1 ? this.$t('monitor.js.optStatus1')
                           : item.operationStatus == 2 ? this.$t('monitor.js.optStatus2')
                           : item.operationStatus == 3 ? this.$t('monitor.js.optStatus3')
                           : item.operationStatus == 4 ? this.$t('monitor.js.optStatus4')
                           : item.operationStatus == 0 ? this.$t('monitor.js.optStatus0') : "" ,
            // useTimeString: item.useTime ? moment(item.useTime).format("YYYY-MM-DD HH:mm:ss") : "",
            useTimeString: item.useTime ? customTime(item.useTime) : "",
            geoAddress: item.longitude + " ; " + item.latitude,
          }
      })
    },
  },
  methods: {
    initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: this.zoom
      });
      infowindow = new google.maps.InfoWindow();
      map.addListener('zoom_changed', () => {
        const zoom = map.getZoom();
        if(zoom >= 18) {
          this.markers.forEach((marker) => marker.setLabel(marker.getTitle()) );
        } else {
          this.markers.forEach((marker) => marker.setLabel(null) );
        }
      });
    },
    initSearchInput() {
      let autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('searchInput')), {
        types: ['address'],
        componentRestrictions: {'country': ['sg', 'tw']}
      });

      let places = new google.maps.places.PlacesService(map);

      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        if (place.geometry) {
          const location = place.geometry.location;
          map.panTo(location);
          map.setCenter(location);
          this.address = place.formatted_address;
          this.query.longitude = location.lng;
          this.query.latitude = location.lat;
          this.handleQuery();
        } else {
          document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
      });
    },
    setCenter(index, row) {
      this.showMap = true;
      map.setCenter({lat: +row.latitude, lng: +row.longitude});
      this.markers.forEach((marker) => {
        if(marker.getTitle() === row.id) {
          this.showInfowindow(row, marker);
        }
      });
    },
    selectRow(row) {
      // this.setCenter(0, row);
    },
    showInfowindow(item, marker) {
      const content = '<div>' + this.$t('monitor.js.id') + item.id +'</div><div>' + this.$t('monitor.js.optStatus') + item.optStatusString
              +'</div><div>' + this.$t('monitor.js.status') + item.statusString +'</div>' + '<div>' + this.$t('monitor.js.electricity') + item.electricity +'</div>';
      infowindow.setContent(content);
      infowindow.open(map, marker);
    },
    handleQuery() {
      this.query.pageNum = 1;
      this.showMap = true;
      if(this.query.bikeId && this.query.bikeId.trim().indexOf(' ') > 0) {
        this.query.bikeId = this.query.bikeId.trim().replace(/ /g, ',');  // 从excel直接拷贝一列单车编号，粘贴到输入框。 讲空格替换成逗号分隔
      }
      api.getFilterBikeList(this, this.query).then((filterBikes) => {
        this.page.count = this.computedFilterBikes.length;
        this.page.current = 1;
        this.pageFilterBikes = this.computedFilterBikes.slice(0, 10);

        // this.markers.map((marker)=>{marker.setMap(null);});
        // this.markers = this.computedFilterBikes.map((item, index) => {
        //   let marker = new google.maps.Marker({
        //     position: {lat: +item.latitude, lng: +item.longitude},
        //     // label: item.id,
        //     title: item.id,
        //     icon: item.operationStatus == 1 ? bikeFault1 : item.operationStatus == 2 ? bikeFault2
        //         : item.operationStatus == 3 ? bikeFault3 : item.operationStatus == 4 ? bikeFault4 : bikeFault1,
        //     map: map,
        //   });

        //   // marker.addListener('click', () => {

        //   // });

        //   marker.addListener('dblclick', () => {
        //     map.setZoom(map.getZoom() + 2);
        //     map.setCenter(marker.getPosition());
        //   });

        //   marker.addListener('mouseover', () => {
        //     this.showInfowindow(item, marker);
        //   });

        //   // if(index === 0) {
        //     // map.setCenter(marker.getPosition());
        //     // this.showInfowindow(item, marker);
        //   // }

        //   return marker;
        // })

      })
    },
    detail(index, row) {
      // this.$router.push({name: "bikeinfo", params: { id: row.id }});
      this.selectedBike = row;
      api.getBikeDetail(this, {bikeId: row.id}).then(() => {
        this.detailVisible = true;
      });
    },
    clearAddress() {
      if(this.address){
        this.address = null;
        this.query.longitude = null;
        this.query.latitude = null;
        this.handleQuery();
      }
    },
    handleInputClose(ev) {
      this.query.bikeId = null;
    },
    goTrip(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/operate/trip?bikeId=" + row.id);
    },
    goReport(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/customer/report?bikeId=" + row.id);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.pageFilterBikes = this.computedFilterBikes.slice((this.page.current - 1) * this.page.per, this.page.current * this.page.per);
    },
    reset(index, row) {
      this.$confirm(this.$t('monitor.js.resetTitle', {bikeId: row.id}), this.$t('monitor.js.tip'), {
        confirmButtonText: this.$t('monitor.js.ok'),
        cancelButtonText: this.$t('monitor.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.resetBike(this, {bikeId: row.id}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {

      });
    },
  },
  components: {
  }
}
</script>

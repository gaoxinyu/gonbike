<template>
<div class="red-bag-info">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('bikeinfo.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <div class="box box-border">
        <div class="box-header">{{ $t('bikeinfo.query.basic') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBikeIcon" border style="width: 100%">
            <el-table-column prop="id" :label="$t('bikeinfo.table.id')" width="60"></el-table-column>
            <el-table-column prop="iconName" :label="$t('bikeinfo.table.name')" width="120"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('bikeinfo.table.createdAt')" width="100"></el-table-column>
            <el-table-column prop="startTimeString" :label="$t('bikeinfo.table.startTime')" width="80"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('bikeinfo.table.endTime')" width="150"></el-table-column>
            <el-table-column prop="statusString" :label="$t('bikeinfo.table.status')"></el-table-column>
            <el-table-column prop="countryName" :label="$t('bikeinfo.table.countryId')"></el-table-column>
            <el-table-column prop="cityName" :label="$t('bikeinfo.table.cityId')"></el-table-column>
            <el-table-column prop="iconUrl" :label="$t('bikeinfo.table.iconstyle')">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="handlePic(scope.row.iconUrl)">
                  <img class="icon-img" :src="scope.row.iconUrl">
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="iconInfo" :label="$t('bikeinfo.table.iconInfo')"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box box-border">
        <div class="box-header">{{ $t('bikeinfo.query.log') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBikeIconLog" border style="width: 100%">
            <el-table-column prop="operateTimeString" :label="$t('bikeinfo.table.operateTime')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('bikeinfo.table.operater')"></el-table-column>
            <el-table-column prop="deal" :label="$t('bikeinfo.table.operator')"></el-table-column>
          </el-table>
          <!-- <div class="row text-center">
            <div class="col-md-12">
              <el-pagination
                layout="total, prev, pager, next"
                :total="page.count"
                :page-size="page.per"
                :current-page="page.current"
                @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.common],
  mounted() {
    // api.getBikeIconLogList(this, {id: this.bikeicon.id});
  },
  data() {
    return {
      loading: false,
      bikeicon: sessionStorage.viewBikeIcon ? JSON.parse(sessionStorage.viewBikeIcon) : {},
      bikeiconLog: [],
      page: {
        count: 0
      },
      statusOptions: [
        { label: this.$t('bikeicon.js.all'), value: null },
        { label: this.$t('bikeicon.js.status0'), value: 0 },
        { label: this.$t('bikeicon.js.status1'), value: 1 },
        { label: this.$t('bikeicon.js.status2'), value: 2 },
        { label: this.$t('bikeicon.js.status3'), value: 3 }
      ]
    }
  },
  computed: {
    computedBikeIcon() {
      return [this.bikeicon].map((item) => {
        return {
          ...item,
          createAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: item.iconStatus ? this.getNameById(this.statusOptions, item.iconStatus) : '',
          // iconInfo: item.confType + item.days + item.times + item.confBikeCount + item.contentType + item.immediateEffect
          iconInfo: (item.confType ? this.$t('bikeinfo.table.confType' + item.confType) : '')
                  + (item.currentBikeCount ? this.$t('bikeinfo.table.confBikeCount', {name: item.currentBikeCount}) : '')
                  + ((item.days && (item.confType == 3 || item.confType == 4)) ? this.$t('bikeinfo.table.days', {name: item.days}) : '')
                  + ((item.times && (item.confType == 3 || item.confType == 4)) ? this.$t('bikeinfo.table.times' + item.confType, {name: item.times}) : '')
                  + (item.contentType ? this.$t('bikeinfo.table.contentType' + item.contentType) : '')
                  + ( (item.confType == 3 || item.confType == 4) ? ((item.immediateEffect) ? this.$t('bikeinfo.table.immediateyes') : this.$t('bikeinfo.table.immediateno')) : '')
        }
      })
    },
    computedBikeIconLog() {
      return this.bikeiconLog.map((item) => {
        return {
          ...item,
          operateTimeString: item.dealTime ? moment(item.dealTime).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: "bikeicon"})
    },
    // handleCurrentChange(val) {
    //   this.query.pageNum = val;
    //   api.getPayMethodLog(this, this.query);
    // }
  }
}

</script>
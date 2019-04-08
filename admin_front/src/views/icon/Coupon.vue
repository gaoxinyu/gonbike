<template>
  <div class="red-bag-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('iconcoupon.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('iconcoupon.query.add') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('iconcoupon.query.createdAt')">
                <el-date-picker
                  v-model="createdAt"
                  type="daterange"
                  :placeholder="$t('iconcoupon.query.chooseTime')"
                  @change="handleCreatedAt"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <!-- <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('iconcoupon.query.beginTime')">
                <el-date-picker
                  v-model="beginTime"
                  type="date"
                  :placeholder="$t('iconcoupon.query.chooseTime')"
                  @change="handleBeginTime"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('iconcoupon.query.endTime')">
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  :placeholder="$t('iconcoupon.query.chooseTime')"
                  @change="handleEndTime"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row"> -->
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('iconcoupon.query.countryId')">
                <el-select v-model="query.countryId" @change="getCountryInfo">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('iconcoupon.query.cityId')">
                <el-select v-model="query.cityId" :disabled="cityOptions.length === 0">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <!-- <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('iconcoupon.query.status')">
                <el-select v-model="query.status">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div> -->
            <div class="col-md-3 col-xs-12"></div>

            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('iconcoupon.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>

      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedRedbagList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('iconcoupon.table.id')" width="60"></el-table-column>
            <!-- <el-table-column prop="activityCouponId" :label="$t('iconcoupon.table.activityCouponId')"></el-table-column> -->
            <!-- <el-table-column prop="activityCouponType" :label="$t('iconcoupon.table.activityCouponType')"></el-table-column> -->
            <el-table-column prop="name" :label="$t('iconcoupon.table.name')" width="120"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('iconcoupon.table.createdAt')" width="120"></el-table-column>
            <!-- <el-table-column prop="startTimeString" :label="$t('iconcoupon.table.startTime')" width="80"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('iconcoupon.table.endTime')" width="150"></el-table-column>
            <el-table-column prop="statusString" :label="$t('iconcoupon.table.status')"></el-table-column> -->
            <el-table-column prop="countryName" :label="$t('iconcoupon.table.countryId')"></el-table-column>
            <el-table-column prop="cityName" :label="$t('iconcoupon.table.cityId')"></el-table-column>
            <el-table-column prop="name" :label="$t('iconcoupon.table.couponName')" width="120"></el-table-column>
            <!-- <el-table-column prop="contentCount" :label="$t('iconcoupon.table.num')"></el-table-column> -->
            <el-table-column prop="remark" :label="$t('iconcoupon.table.remark')"></el-table-column>
            <el-table-column fixed="right" :label="$t('iconcoupon.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('iconcoupon.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editRedbag(scope.$index, scope.row)">{{ $t('iconcoupon.table.edit') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="viewRedbag(scope.$index, scope.row)">{{ $t('iconcoupon.table.view') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="deleteRedbag(scope.$index, scope.row)">{{ $t('iconcoupon.table.delete') }}</el-button>
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
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import moment from 'moment'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: false,
      createdAt: null,
      beginTime: null,
      endTime: null,
      redbaglist: [],
      query: {
        countryId: null,
        cityId: null,
        createdAtBegin: null,
        createdAtEnd: null,
        // startTime: null,
        // endTime: null,
        // status: null
        contentType: 3
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      statusOptions: [
        { label: this.$t('iconcoupon.js.all'), value: null }
      ]
    }
  },
  computed: {
    computedRedbagList() {
      return this.redbaglist.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: item.status ? this.getNameById(this.statusOptions, item.status) : ''
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'addiconcoupon' });
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getRedbagList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
      }
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.createdAtBegin = moment(datas.split(' - ')[0]).toDate().getTime();
        this.query.createdAtEnd = moment(datas.split(' - ')[1]).toDate().getTime();
      } else {
        this.query.createdAtBegin = null;
        this.query.createdAtEnd = null;
      }
    },
    // handleBeginTime(time) {
    //   this.query.startTime = moment(time).toDate().getTime();
    // },
    // handleEndTime(time) {
    //   this.query.endTime = moment(time).toDate().getTime();
    // },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        // 添加一个所有
        this.cityOptions.unshift({ label: this.$t('iconcoupon.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    editRedbag(index, row) {
      sessionStorage.editIconCoupon = JSON.stringify(row);
      this.$router.push({ name: 'editiconcoupon' });
    },
    viewRedbag(index, row) {
      sessionStorage.viewIconCoupon = JSON.stringify(row);
      this.$router.push({ name: 'infoiconcoupon' });
    },
    deleteRedbag(index, row) {
      this.$confirm(this.$t('iconcoupon.js.deleteMessage', {name: row.name}), this.$t('iconcoupon.js.tip'), {
        confirmButtonText: this.$t('iconcoupon.js.ok'),
        cancelButtonText: this.$t('iconcoupon.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteRedbag(this, {id: row.id}).then(() => {
          api.getRedbagList(this, this.query);
        });
      }).catch(() => {
           
      });
    }
  }
}
</script>
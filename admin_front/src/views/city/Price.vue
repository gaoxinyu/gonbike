<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('price.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="handleUnitTimesConfig">{{ $t('price.query.updateUnitTimesConfig') }}</button>
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('price.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('price.query.countryId')">
              <el-select v-model="query.countryId">
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
            <el-form-item :label="$t('price.query.bikeCode')">
              <el-input v-model="query.bikeCode" :placeholder="$t('price.query.bikeCodePlaceholder')"></el-input>
            </el-form-item>
          </div>


          <div class="col-md-3 col-xs-12">

          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('recharge.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>

      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedPrices" border style="width: 100%">
        <!--<el-table-column prop="id" :label="$t('price.table.id')" width="60"></el-table-column>-->
        <el-table-column prop="countryString" :label="$t('price.table.country')" width="100"></el-table-column>
        <el-table-column prop="cityString" :label="$t('price.table.city')" width="100"></el-table-column>
        <el-table-column prop="levelOneString" :label="$t('price.table.levelOne')" width="156"></el-table-column>
        <el-table-column prop="levelTwoString" :label="$t('price.table.levelTwo')" width="166"></el-table-column>
        <el-table-column prop="levelThreeString" :label="$t('price.table.levelThree')" width="166"></el-table-column>
        <el-table-column prop="levelFourString" :label="$t('price.table.levelFour')" width="160"></el-table-column>
        <el-table-column prop="freeString" :label="$t('price.table.free')" ></el-table-column>
        <el-table-column prop="freeminString" :label="$t('price.table.others')" ></el-table-column>
        <el-table-column fixed="right" :label="$t('price.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('price.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('price.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('price.table.detail') }}</el-button>
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

  <el-dialog :title="$t('price.dialog.title')" :visible.sync="unitTimesVisible" width="30%">
    <el-input type="number" v-model.number="unitTime.maxTime">
      <template slot="prepend">{{ $t('price.dialog.maxTime') }}</template>
      <template slot="append">{{ $t('price.dialog.timeUnit') }}</template>
    </el-input>
    <p></p>
    <p>{{ $t('price.dialog.tips') }}</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="unitTimesVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="updateUnitTimesConfig" :disabled="maxTimeDisabled">{{ $t('common.ok') }}</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      prices: [],
      createdAt: '',
      query: {
        pageNum: 1,
        bikeCode: '',
        countryId: null,
        cityId: '',
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
      unitTimesVisible: false,
      unitTime: {},
    }
  },
  computed: {
    computedPrices() {
      return this.prices.map((item) => {
        return {
          ...item,
          // unitPriceString: item.currencySymbol + ' ' + item.unitPrice + '/' + item.unitMinutes,
          freeString: this.$t('price.js.free', {freeTimesPerDay: item.freeTimesPerDay, freeMinutes: item.freeMinutes}),   //'每天前 ' + item.freeTimesPerDay + ' 次免费骑行 ' + item.freeMinutes + ' 分钟'
          freeminString: this.$t('price.js.freemin', {freemin: (item.noBillingTime ? item.noBillingTime : 1)}),
          countryString: item.countryName,
          cityString: item.cityName,
          // areaString: (item.countryName || '') + (item.cityName ? '-' + item.cityName : ''),
          levelOneString: item.levelOne ? (item.levelOne.currencySymbol + ' ' + item.levelOne.unitPrice + '/' + item.levelOne.unitMinutes + 'min') : '',
          levelTwoString: item.levelTwo ? (item.levelTwo.currencySymbol + ' ' + item.levelTwo.unitPrice + '/' + item.levelTwo.unitMinutes + 'min') : '',
          levelThreeString: item.levelThree ? (item.levelThree.currencySymbol + ' ' + item.levelThree.unitPrice + '/' + item.levelThree.unitMinutes + 'min') : '',
          levelFourString: item.levelFour ? (item.levelFour.currencySymbol + ' ' + item.levelFour.unitPrice + '/' + item.levelFour.unitMinutes + 'min'): '',
        }
      })
    },
    maxTimeDisabled() {
      return !(this.unitTime.maxTime && 
              this.unitTime.maxTime > 0 && 
              (this.unitTime.maxTime+'').indexOf('.') < 0 && 
              (this.unitTime.maxTime+'').length <= 10);
    }
  },
  methods: {
    goAdd() {
      window.open(location.href + "add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getPriceList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getPriceList(this, this.query);
    },
    handleCreatedAt(time) {
      this.query.createdAt = time;
    },
    edit(index, row) {
      sessionStorage.price = JSON.stringify(row);
      this.$router.push({name: "editprice"});
    },
    detail(index, row) {
      sessionStorage.price = JSON.stringify(row);
      window.open(location.href + "/info");
    },
    handleUnitTimesConfig() {
      this.getMaxUnitPrice().then(() => {
        this.unitTimesVisible = true;
      });
    },
    getMaxUnitPrice() {
      return api.getMaxUnitPrice(this)
    },
    updateUnitTimesConfig() {
      api.updateMaxUnitPrice(this, this.unitTime).then(() => {
        this.unitTimesVisible = false;
      })
    }
  }
}
</script>

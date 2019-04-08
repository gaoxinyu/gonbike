<template>
  <div class="setting-radius-view">
    <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('radius.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('common.add') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('radius.query.countryId')">
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
            <el-form-item :label="$t('radius.query.cityId')">
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
          <div class="col-md-3 col-xs-12">
            
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
        
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedBikeRadius" border style="width: 100%">
        <el-table-column prop="id" :label="$t('radius.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('radius.table.countryName')"></el-table-column>
        <el-table-column prop="cityName" :label="$t('radius.table.cityName')"></el-table-column>
        <el-table-column prop="radius" :label="$t('radius.table.radius')"></el-table-column>
        <el-table-column prop="num" :label="$t('radius.table.num')"></el-table-column>
        
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="goEdit(scope.$index, scope.row)">{{ $t('common.edit') }}</el-button></div>
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

  <el-dialog :title="$t('radius.query.title1')" width="30%" :visible.sync="configRadiusVisible">
    <el-form label-position="left" label-width="90px" class="required">
      <el-form-item :label="$t('radius.table.countryName')">
        <el-select v-model="form.countryId" @change="getCitysOnlyByCountry" v-if="!isEdit">
          <el-option
            v-for="item in areaOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="form.countryName" disabled v-if="isEdit"></el-input>
      </el-form-item>
      <el-form-item :label="$t('radius.table.cityName')" class="required">
        <el-select v-model="form.cityId"  v-if="!isEdit">
          <el-option
            v-for="item in cityOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="form.cityName" disabled v-if="isEdit"></el-input>
      </el-form-item>
     
      <el-form-item :label="$t('radius.table.radius')" class="required">
        <el-input v-model.number="form.radius" type="number"></el-input>
      </el-form-item>
      <el-form-item :label="$t('radius.table.num')" class="required">
        <el-input v-model.number="form.num" type="number" :placeholder="$t('radius.table.integerPlaceholder')"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="configRadiusVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="save" :disabled="submitDisabled" :loading="loading">{{ $t('common.ok') }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: true,
      configRadiusVisible: false,
      bikeRadiusList: [],
      isEdit: true,
      query: {
        pageNum: 1,
        countryId: null,
        cityId: null,
      },
      form: {
        countryId: null,
        cityId: null,
        cityName: null,
        cityName: null,
        radius: null,
        num: null,
      },
      page: {
        count: 0
      },
      cityOptions: [
        {label: this.$t('common.all'), value: null},
      ],
      areaOptions: this.getAreaOptions(),
      areaOnlyOptions: this.getAreaOnlyOptions(),
      cityOnlyOptions: [],
    }
  },
  computed: {
    computedBikeRadius() {
      return this.bikeRadiusList.map(item => {
        return {
          ...item,

        }
      })
    },
    submitDisabled() {
      return !(this.form.countryId && this.form.cityId && 
               this.form.radius > 0 && this.form.num > 0 &&
               (this.form.num + '').indexOf('.') < 0);      // 必须是正整数
    }
  },
  methods: {
    goAdd() {
      this.clear();
      this.isEdit = false;
      this.configRadiusVisible = true;
    },
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('common.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
      })
    },
    getCitysOnlyByCountry() {
      api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOnlyOptions = [];
        this.citys.forEach(city => {
          this.$set(this.cityOnlyOptions, this.cityOnlyOptions.length, {label: city.name, value: city.id});
        });
        this.form.cityId = null;
      })
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getBikeRadiusList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getBikeRadiusList(this, this.query)
      }
    },
    goEdit(index, row) {
      this.isEdit = true;
      this.form = {...row};
      this.configRadiusVisible = true;
    },
    clear() {
      this.form = {
        countryId: null,
        cityId: null,
        cityName: null,
        cityName: null,
        radius: null,
        num: null,
      };
    },
    save() {
      if(this.isEdit) {
        api.updateBikeRadius(this, this.form).then(() => {
          this.configRadiusVisible = false;
          this.handleQuery();
        });
      } else {
        api.saveBikeRadius(this, this.form).then(() => {
          this.configRadiusVisible = false;
          this.handleQuery();
        });
      }
    },
  }
}

</script>
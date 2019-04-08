<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('tag.query.title') }}
      <div class="pull-right box-tools">
        <el-button class="pull-right" type="primary" @click="goAdd('single')" :loading="loading">{{ $t('tag.query.singleAdd') }}</el-button>
        <el-button class="pull-right magin-r-10" type="primary" @click="goAdd('batch')" :loading="loading" :plain="true">{{ $t('tag.query.batchAdd') }}</el-button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.countryId')">
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
            <el-form-item :label="$t('report.query.cityId')">
              <el-select v-model="query.cityId" @change="getTagCategorys">
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
            <el-form-item :label="$t('tag.query.categoryId')">
              <el-select v-model="query.categoryId">
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('tag.query.type')">
              <el-select v-model="query.type">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('tag.query.modifyTime')">
              <el-date-picker
                v-model="modifyTime"
                type="daterange"
                @change="handleModifyTime"
                value-format="yyyy-MM-dd"
                :placeholder="$t('tag.query.chooseTime')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('tag.query.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('tag.query.coordinate')">
              <el-input v-model="coordinate" :placeholder="$t('tag.query.coordinatePlaceholder')"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('tag.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedtags" border style="width: 100%">
        <el-table-column prop="id" :label="$t('tag.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('tag.table.countryName')" min-width="100"></el-table-column>
        <el-table-column prop="cityName" :label="$t('tag.table.cityName')" min-width="100"></el-table-column>
        <el-table-column prop="typeString" :label="$t('tag.table.type')" min-width="80"></el-table-column>
        <el-table-column prop="categoryName" :label="$t('tag.table.categoryName')" min-width="140"></el-table-column>
        <el-table-column prop="name" :label="$t('tag.table.name')" min-width="200"></el-table-column>
        <el-table-column prop="coordinateString" :label="$t('tag.table.coordinate')" min-width="150"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('tag.table.updatedAt')" min-width="140"></el-table-column>
        <el-table-column prop="updatedNameString" :label="$t('tag.table.updatedName')" min-width="150"></el-table-column>
        <el-table-column prop="remark" :label="$t('tag.table.remark')"></el-table-column>
        <el-table-column fixed="right" :label="$t('tag.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('tag.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('tag.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="deleteTag(scope.$index, scope.row)" >{{ $t('tag.table.deleteTag') }}</el-button></div>
              <!--<div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('bike.table.detail') }}</el-button></div>-->
              <div><el-button type="text" size="small" @click="goBike(scope.$index, scope.row)">{{ $t('tag.table.goBike') }}</el-button></div>
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

</div>
</template>

<script>
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
    this.getTagCategorys();
  },
  data () {
    return {
      loading: false,
      modifyTime: null,
      coordinate: null,
      tags: [],
      query: {
        pageNum: 1,
        countryId: null,
        cityId: null,
        categoryId: null,
        type: null,
        beginModifyTime: null,
        endModifyTime: null,
        name: null,
        longitude: null,
        latitude: null,
      },
      page: {
        count: 0
      },
      categoryOptions: [
        {label: this.$t('tag.js.all'), value: null},
        
      ],
      typeOptions: [
        {label: this.$t('tag.js.all'), value: null},
        {label: this.$t('tag.js.type1'), value: 1},
      ],
      cityOptions: [
        {label: this.$t('tag.js.all'), value: null}
      ],
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedtags() {
      return this.tags.map((item) => {
        return {
            ...item,
            typeString: item.type === 1 ? this.$t('tag.js.type1') : '',
            coordinateString: item.longitude + ',' + item.latitude,
            updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : '',
            updatedNameString: item.updatedName + (item.realName ?  ' | ' + item.realName : ''),
          }
      })
    },
  },
  methods: {
    goAdd(value) {
      this.$router.push({name: "addtag", query: {type: value}});
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        this.handleCoordinate();
        api.getLaunchTags(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      this.handleCoordinate();
      api.getLaunchTags(this, this.query)
    },
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('tag.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
        this.getTagCategorys();
      })
    },
    getTagCategorys() {
      api.getTagCategorys(this, {countryId: this.query.countryId, cityId: this.query.cityId}).then(tagCategorys => {
        this.categoryOptions = [{label: this.$t('tag.js.all'), value: null}];
        this.query.categoryId = null;
        tagCategorys.forEach(category => {
          this.$set(this.categoryOptions, this.categoryOptions.length, { label: category.name, value: category.id })
        })
      })
    },
    handleModifyTime(datas) {
      if(datas) {
        this.query.beginModifyTime = datas[0];
        this.query.endModifyTime = datas[1];
      } else {
        this.query.beginModifyTime = '';
        this.query.endModifyTime = '';
      }
    },
    handleCoordinate() {
      if(this.coordinate){
        this.query.longitude = this.coordinate.split(',')[0];
        this.query.latitude = this.coordinate.split(',')[1];
      } else {
        this.query.longitude = null;
        this.query.latitude = null;
      }
    },
    edit(index, row) {
      sessionStorage.tag = JSON.stringify(row);
      this.$router.push({name: "edittag"});
    },
    goBike(index, row) {
      window.open(location.href.split(location.pathname)[0] + '/stock/bike?tagId=' + row.id + '&tagName=' + row.name);
    },
    deleteTag(index, row) {
      this.$confirm(this.$t('tag.js.deleteMessage', {name: row.name}), this.$t('tag.js.tip'), {
        confirmButtonText: this.$t('tag.js.ok'),
        cancelButtonText: this.$t('tag.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteLaunchTag(this, {id: row.id}).then(() => {
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
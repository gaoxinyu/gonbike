<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('category.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd"><i class="fa fa-plus"></i></button>
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
              <el-select v-model="query.cityId">
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
            <el-form-item :label="$t('category.query.type')">
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
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('category.query.modifyTime')">
              <el-date-picker
                v-model="modifyTime"
                type="daterange"
                @change="handleModifyTime"
                value-format="yyyy-MM-dd"
                :placeholder="$t('category.query.chooseTime')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('category.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedTagCategorys" border style="width: 100%">
        <el-table-column prop="id" :label="$t('category.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('category.table.countryName')"></el-table-column>
        <el-table-column prop="cityName" :label="$t('category.table.cityName')"></el-table-column>
        <el-table-column prop="typeString" :label="$t('category.table.type')"></el-table-column>
        <el-table-column prop="name" :label="$t('category.table.name')"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('category.table.updatedAt')"></el-table-column>
        <el-table-column prop="updatedNameString" :label="$t('category.table.updatedName')" min-width="180"></el-table-column>
        <el-table-column prop="remark" :label="$t('category.table.remark')"></el-table-column>
        <el-table-column fixed="right" :label="$t('category.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('category.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('category.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="deleteCategory(scope.$index, scope.row)" >{{ $t('category.table.deleteCategory') }}</el-button></div>
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

  <el-dialog :title="$t('category.form.title')" :visible.sync="addVisible">
    <el-form label-position="left" label-width="70px">
      <el-form-item :label="$t('category.form.countryId')">
        <el-select v-model="form.countryId" @change="getCitysByCountry1" :disabled="!isAdd">
          <el-option
            v-for="item in addAreaOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('category.form.cityId')">
        <el-select v-model="form.cityId" :disabled="addCityOptions.length === 0 || !isAdd">
          <el-option
            v-for="item in addCityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('category.form.type')">
        <el-select v-model="form.type">
          <el-option
            v-for="item in typeOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('category.form.name')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item :label="$t('category.form.remark')">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="form.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addVisible = false">{{ $t('category.form.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('category.form.submit') }}</el-button>
    </span>
  </el-dialog>

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
    this.getCitysByCountry1();
  },
  data () {
    return {
      loading: true,
      modifyTime: null,
      coordinate: null,
      tagCategorys: [],
      addVisible: false,
      isAdd: true,
      query: {
        pageNum: 1,
        countryId: null,
        cityId: null,
        type: null,
        beginModifyTime: null,
        endModifyTime: null,
      },
      form: {
        countryId: 153,
        cityId: 1,
        type: 1,
        name: null,
        remark: null,
      },
      page: {
        count: 0
      },
      typeOptions: [
        {label: this.$t('category.js.all'), value: null},
        {label: this.$t('category.js.type1'), value: 1},
      ],
      typeOnlyOptions: [
        {label: this.$t('category.js.type1'), value: 1},
      ],
      cityOptions: [
        {label: this.$t('category.js.all'), value: null}
      ],
      addCityOptions: [],
      addAreaOptions: this.getAreaOnlyOptions(),
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedTagCategorys() {
      return this.tagCategorys.map((item) => {
        return {
            ...item,
            typeString: item.type === 1 ? this.$t('category.js.type1') : '',
            updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : '',
            updatedNameString: item.updatedName + (item.realName ?  ' | ' + item.realName : ''),
          }
      })
    },
  },
  methods: {
    goAdd() {
      this.isAdd = true;
      this.addVisible = true;
      this.form.name = null;
      this.form.remark = null;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getTagCategorys(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getTagCategorys(this, this.query)
    },
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('category.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
      })
    },
    getCitysByCountry1() {
      api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.addCityOptions = this.citys.map(city => {
          return { label: city.name, value: city.id }
        });
        if(this.addCityOptions.length > 0 && this.isAdd) {
          this.form.cityId = this.addCityOptions[0].value;
        } 
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
    edit(index, row) {
      this.isAdd = false;
      this.addVisible = true;
      this.form = row;
      this.getCitysByCountry1();
    },
    submit() {
      const apiString = this.isAdd ? 'saveTagCategory' : 'updateTagCategory';
      api[apiString](this, this.form).then(() => {
        this.addVisible = false;
        this.handleQuery();
      });
    },
    
    deleteCategory(index, row) {
      const len = row.tagList.length;
      const message = len > 0 ? this.$t('category.js.deleteMessage1', {len: len}) : this.$t('category.js.deleteMessage', {name: row.name});
      this.$confirm(message, this.$t('category.js.tip'), {
        confirmButtonText: this.$t('category.js.ok'),
        cancelButtonText: this.$t('category.js.cancel'),
        type: 'warning'
      }).then(() => {
        if(len === 0) {
          api.deleteTagCategory(this, {id: row.id}).then(() => {
            this.handleQuery();
          });
        }
      }).catch(() => {
           
      });
    },
  },
  components: {
  }
}
</script>
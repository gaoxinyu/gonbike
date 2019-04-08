<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('city.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="AddCityConfig">{{ $t('city.query.add') }}</button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('city.query.countryId')">
                <el-select v-model="query.countryId" filterable @change="getCountryInfo">
                  <el-option
                    v-for="item in countrys"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('city.query.cityId')">
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
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="querying">{{ $t('city.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="querying" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="box box-solid">
      <div class="box-body">
        <el-table :data="computedCityLists" border style="width: 100%">
          <el-table-column prop="id" :label="$t('city.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('city.table.countryId')"></el-table-column>
          <el-table-column prop="name" :label="$t('city.table.ecityId')" :render-header="addClass"></el-table-column>
          <el-table-column prop="nameEn" :label="$t('city.table.cityId')"></el-table-column>
          <el-table-column prop="helmetString" :label="$t('city.table.helmet')" width="130"></el-table-column>
          <el-table-column fixed="right" :label="$t('city.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('city.table.operate') }}</el-button>
                <div><el-button type="text" size="small" @click="editHelmet(scope.$index, scope.row)">{{ $t('city.table.editHelmet') }}</el-button></div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="row text-center">
          <div class="col-md-12">
            <el-pagination
              layout="total, prev, pager, next"
              :total="pages.count"
              :page-size="pages.per"
              :current-page="pages.current"
              @current-change="handleCurrentChange"
              ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- add dialog -->
    <el-dialog :title="$t('city.dialog.title')" :visible.sync="dialogVisible">
      <el-form label-position="left" label-width="90px">
        <el-form-item :label="$t('city.form.countryId')" class="required">
          <el-select v-model="form.countryId" filterable>
            <el-option
              v-for="item in onlyCountrys"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.en }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('city.form.ecityId')" class="required">
          <el-input v-model="form.name"></el-input>
          <p class="error">{{ $t('city.form.tip') }}</p>
        </el-form-item>
        <el-form-item :label="$t('city.form.cityId')" class="required">
          <el-input v-model="form.nameEn"></el-input>
        </el-form-item>

        <el-form-item :label="$t('city.dialog.helmet')">
          <el-select v-model="form.helmet">
            <el-option
              v-for="item in helmetRowOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item :label="$t('city.form.cityId')">
          <el-select v-model="form.cityId" multiple :disabled="onlyCityOptions.length === 0">
            <el-option
              v-for="item in onlyCityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('city.form.cancel') }}</el-button>
        <el-button type="primary" @click="addSubmit" :disabled="submitDisabled">{{ $t('city.form.submit') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('city.dialog.title3')" width="30%" :visible.sync="editHelmetVisible">
      <el-form label-position="left" label-width="80px">
        <el-form-item :label="$t('city.form.countryId')" class="required">
          <el-input v-model="helmetRow.countryName" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('city.form.ecityId')" class="required">
          <el-input v-model="helmetRow.name"></el-input>
          <p class="error">{{ $t('city.form.tip') }}</p>
        </el-form-item>
        <el-form-item :label="$t('city.form.cityId')" class="required">
          <el-input v-model="helmetRow.nameEn"></el-input>
        </el-form-item>
        
        <el-form-item :label="$t('city.dialog.helmet')">
          <el-select v-model="helmetRow.helmet">
            <el-option
              v-for="item in helmetRowOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editHelmetVisible = false">{{ $t('city.dialog.cancel') }}</el-button>
        <el-button type="primary" @click="editHelmetSubmit">{{ $t('city.dialog.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api';
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query],
  mounted() {
    api.getCountryList(this).then(() => { this.countrys.unshift({id: null, name: this.$t('city.js.all')}); this.onlyCountrys = this.countrys.filter(item => item.id)} );
    api.getCountryCityList(this, this.query);
    this.getCountryInfo();
  },
  data() {
    return {
      querying: false,
      onlyCountrys: [],
      countrys: [],
      query: {
        countryId: null,
        cityId: null
      },
      pages: {
        count: 0
      },
      citylists: [],
      onlyCityOptions: [],
      cityOptions: [],
      dialogVisible: false,
      form: {
        countryId: null,
        name: null,
        nameEn: null,
        helmet: null
        // cityId: []
      },
      helmetRow: {},
      helmetRowOptions: [],
      helmetOptions: [
        {label: this.$t('city.js.all'), value: null},
        {label: this.$t('city.js.helmet0'), value: 0},
        {label: this.$t('city.js.helmet1'), value: 1},
      ],
      editHelmetVisible: false
    }
  },
  computed: {
    computedCityLists() {
      return this.citylists.map((item) => {
        return {
          ...item,
          helmetString: item.helmet === 1 ? this.$t('city.js.helmet1') : (item.helmet === 0 ? this.$t('city.js.helmet0') : ''),
        }
      })
    },
    submitDisabled() {
      return !(this.form.countryId && this.form.name && this.form.nameEn);
    }
  },
  methods: {
    AddCityConfig() {
      this.helmetRowOptions = this.helmetOptions.filter(helmet => helmet.value != null);
      this.dialogVisible = true;
    },
    addSubmit() {
      api.saveCountryCity(this, this.form).then(() => {
        this.form = {
          countryId: null,
          name: null,
          nameEn: null,
          helmet: null
          // cityId: []
        };
        this.dialogVisible = false;
      }).then(() => {
        this.query.pageNum = 1;
        this.querying = true;
        api.getCountryCityList(this, this.query).then(() => this.querying = false);
      });
    },
    handleQuery() {
      this.query.pageNum = 1;
      this.querying = true;
      api.getCountryCityList(this, this.query).then(() => this.querying = false);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getCountryCityList(this, this.query)
    },
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
        this.cityOptions.unshift({ label: this.$t('city.js.all'), value: null })
        this.query.cityId = null; //(this.cityOptions.length > 0) ? this.cityOptions[0].value : '';
      })
    },
    // getCountryInfo1() {
    //   api.getCountryInfo(this, {id: this.form.countryId});
    //   this.getCitysByCountry1();
    // },
    // getCitysByCountry1() {
    //   api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
    //     this.onlyCityOptions = this.citys.map(city => {
    //       return {
    //         label: city.name,
    //         value: city.id,
    //       }
    //     });
    //   })
    // },
    editHelmet(index, row) {
      this.helmetRowOptions = this.helmetOptions.filter(helmet => helmet.value != null);
      this.helmetRow = row;
      this.editHelmetVisible = true;
    },
    editHelmetSubmit() {
      api.updateCountryCity(this, this.helmetRow)
        .then(() => this.editHelmetVisible = false)
        .then(() => api.getCountryCityList(this, this.query));
    },
    addClass(h, { column, $index }) {
      return h('label', [column.label, h('span', {style: {color: '#f00'}}, this.$t('city.js.tip'))]);
    }
  }
}
</script>

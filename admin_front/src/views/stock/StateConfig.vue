<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('stateconfig.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goAddStateConfig"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('stateconfig.query.countryId')">
                <el-select v-model="query.countryId" filterable>
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
              <el-form-item :label="$t('stateconfig.query.code')">
                <el-input :placeholder="$t('stateconfig.query.tip')" v-model="query.code" :maxlength="3"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('stateconfig.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedStateConfigs" border style="width: 100%">
            <el-table-column prop="id" :label="$t('stateconfig.table.id')" width="80"></el-table-column>
            <el-table-column prop="countryNameWithCode" :label="$t('stateconfig.table.countryName')"></el-table-column>
            <el-table-column prop="codeString" :label="$t('stateconfig.table.code')"></el-table-column>
            <el-table-column fixed="right" :label="$t('stateconfig.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('stateconfig.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="updateStateConfig(scope.$index, scope.row)">{{ $t('stateconfig.table.edit') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="viewStateConfig(scope.$index, scope.row)">{{ $t('stateconfig.table.view') }}</el-button>
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
                >
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- addStateConfig dialog -->
    <el-dialog :title="$t('stateconfig.dialog.title0')" :visible.sync="addVisible">
      <el-form label-position="left" label-width="90px">
        <el-form-item :label="$t('stateconfig.form.countryId')" class="required">
          <el-select v-model="form.countryId" filterable>
            <el-option
              v-for="item in formCountrys"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('stateconfig.form.code')" class="required">
          <el-input type="text" :placeholder="$t('stateconfig.form.tip')" v-model="form.code" :maxlength="3"></el-input>
        </el-form-item>
        <el-form-item :label="$t('stateconfig.form.coderule')">
          <label class="error"> {{ form.code }} xxx xxx</label>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">{{ $t('stateconfig.form.cancel') }}</el-button>
        <el-button type="primary" @click="addSubmit" :disabled="addDisabled">{{ $t('stateconfig.form.submit') }}</el-button>
      </span>
    </el-dialog>
    <!-- editStateConfig dialog -->
    <el-dialog :title="$t('stateconfig.dialog.title1')" :visible.sync="editVisible">
      <el-form label-position="left" label-width="90px">
        <el-form-item :label="$t('stateconfig.form.countryId')" class="required">
          <el-input type="text" :placeholder="$t('stateconfig.form.tip')" v-model="editForm.countryName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('stateconfig.form.code')" class="required">
          <el-input type="text" :placeholder="$t('stateconfig.form.tip')" v-model="editForm.code"></el-input>
        </el-form-item>
        <el-form-item :label="$t('stateconfig.form.coderule')">
          <label class="error"> {{ editForm.code }} xxx xxx</label>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">{{ $t('stateconfig.form.cancel') }}</el-button>
        <el-button type="primary" @click="editSubmit" :disabled="editDisabled">{{ $t('stateconfig.form.submit') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api';
import moment from "moment";
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query],
  mounted() {
    api.getBikeCodeList(this, this.query);
    api.getCountryList(this).then(() => {
      this.countrys.unshift({id: null, name: this.$t('stateconfig.query.all')});
      this.formCountrys = this.countrys.filter(item => item.id);
    });

  },
  data() {
    return {
      loading: false,
      stateconfigs: [],
      query: {
        countryId: null,
        code: null
      },
      pages: {
        count: 0
      },
      // areaOptions: Options.areaOptions,
      countrys: [],
      formCountrys: [],
      // add dialog
      addVisible: false,
      // addOptions: Options.areaOnlyOptions,
      form: {
        countryId: null,
        code: null
      },
      // edit dialog
      editVisible: false,
      editForm: {}
    }
  },
  computed: {
    computedStateConfigs() {
      return this.stateconfigs.map((item) => {
        return {
          ...item,
          countryNameWithCode: item.countryName ? item.countryName  + (item.code ? (' ( ' + item.code + ' )') : '') : '',
          codeString: item.code ? item.code + ' xxx xxx' : ''
        }
      });
    },
    addDisabled() {
      return !(this.form.countryId && this.form.code);
    },
    editDisabled() {
      return !(this.editForm.countryId && this.editForm.code);
    }
  },
  methods: {
    goAddStateConfig() {
      this.form = {
        countryId: null,
        code: null
      }
      this.addVisible = true;
    },
    handleQuery() {
      if(this.query.code && this.query.code.length !== 3) {
        this.$message({ message: this.$t('stateconfig.query.codeTip'), type: 'warning' });
        return;
      }
      api.getBikeCodeList(this, this.query);
    },
    viewStateConfig(index, row) {
      sessionStorage.stconfInfo = JSON.stringify(row);
      this.$router.push({name: 'stateconfiginfo'});
    },
    updateStateConfig(index, row) {
      sessionStorage.stateConfig = JSON.stringify(row);
      this.editForm = JSON.parse(sessionStorage.stateConfig);
      this.editVisible = true;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getBikeCodeList(this, this.query);
      }
    },
    addSubmit() {
      if(this.form.code && this.form.code.length !== 3) {
        this.$message({ message: this.$t('stateconfig.form.codeTip'), type: 'warning' });
        return;
      }
      api.saveBikeCode(this, this.form).then(() => {
        this.addVisible = false;
        this.query = {
          countryId: null,
          code: null
        };
        api.getBikeCodeList(this, this.query);
      });
    },
    editSubmit() {
      if(this.editForm.code && this.editForm.code.length !== 3) {
        this.$message({ message: this.$t('stateconfig.form.codeTip'), type: 'warning' });
        return;
      }
      api.updateBikeCode(this, this.editForm).then(() => {
        this.editVisible = false;
        this.query = {
          countryId: null,
          code: null
        };
        api.getBikeCodeList(this, this.query);
      });
    }
  }
}
</script>

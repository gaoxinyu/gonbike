<template>
  <div class="user-auto-pay">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('autopay.query.title') }}
        <el-button class="pull-right" type="primary" @click="autoCancel">{{ $t('autopay.query.autocancel') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('autopay.query.countryId')">
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
              <el-form-item :label="$t('autopay.query.phone')">
                <el-input v-model="query.phone"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('autopay.query.days')">
                <el-input v-model="query.days"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('autopay.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
        <p class="error">{{ $t('autopay.query.tip') }}</p>
      </div>
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedAutopays" border style="width: 100%">
          <el-table-column prop="id" :label="$t('autopay.table.id')" width="60"></el-table-column>
          <el-table-column prop="phone" :label="$t('autopay.table.phone')"></el-table-column>
          <el-table-column prop="countryName" :label="$t('autopay.table.countryId')"></el-table-column>
          <el-table-column prop="days" :label="$t('autopay.table.days')"></el-table-column>
          <el-table-column prop="renewPriceString" :label="$t('autopay.table.renewPrice')"></el-table-column>
          <el-table-column prop="renewTimeString" :label="$t('autopay.table.renewTime')"></el-table-column>
          <el-table-column fixed="right" :label="$t('autopay.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('autopay.table.operate') }}</el-button>
                <el-button type="text" size="small" @click="cancelAutopay(scope.$index, scope.row)" >{{ $t('autopay.table.cancelauto') }}</el-button>
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
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],

  mounted() {
    api.getAutoPays(this, this.query);
  },

  data() {
    return {
      loading: false,
      autopays: [],
      query: {
        countryId: null,
        phone: null,
        days: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions()
    }
  },

  computed: {
    computedAutopays() {
      return this.autopays.map((item) => {
        return {
          ...item,
          renewPriceString: (item.currencySymbol ? item.currencySymbol : '') + (item.renewPrice ? item.renewPrice : ''),
          renewTimeString: item.renewTime ? moment(item.renewTime).format('YYYY-MM-DD HH:mm:ss') : ''
        }
      })
    }
  },

  methods: {
    handleQuery() {
      api.getAutoPays(this, this.query);
    },

    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getAutoPays(this, this.query);
      }
    },

    autoCancel() {
      this.$router.push('autocancel');
    },

    cancelAutopay(index, row) {
      this.$confirm(this.$t('autopay.js.deleteMessage', {name: row.phone}), this.$t('autopay.js.tip'), {
        confirmButtonText: this.$t('autopay.js.ok'),
        cancelButtonText: this.$t('autopay.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.cancelAutopay(this, {id: row.id}).then(() => {
          api.getAutoPays(this, this.query);
        });
      }).catch(() => {
           
      });
    }
  }
}
</script>

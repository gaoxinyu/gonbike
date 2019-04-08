<template>
<div class="pay-way">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('payway.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="addPayWay">{{ $t('payway.table.add') }}</button>
      </div>
    </div>
    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedPayWays" border style="width: 100%">
          <el-table-column prop="countryId" :label="$t('payway.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('payway.table.country')" width="160"></el-table-column>
          <el-table-column prop="deposit" :label="$t('payway.table.deposit')"></el-table-column>
          <el-table-column prop="balance" :label="$t('payway.table.balance')"></el-table-column>
          <el-table-column prop="delivery" :label="$t('payway.table.delivery')"></el-table-column>
          <el-table-column fixed="right" :label="$t('payway.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('payway.table.operate') }}</el-button>
                <div><el-button type="text" size="small" @click="editPayWay(scope.$index, scope.row)">{{ $t('payway.table.edit') }}</el-button></div>
                <div><el-button type="text" size="small" @click="viewPayWay(scope.$index, scope.row)">{{ $t('payway.table.view') }}</el-button></div>
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
</div>
</template>

<script>
import api from '../../api'

export default {
  mounted() {
    api.getCountryPayMethod(this);
  },
  data() {
    return {
      loading: false,
      countryPayMethod: [],
      query: {

      },
      page: {
        count: 0
      }
    }
  },
  computed: {
    computedPayWays() {
      return this.countryPayMethod.map((item) => {
        return {
          ...item
        }
      })
    }
  },
  methods: {
    addPayWay() {
      this.$router.push({name: 'addpay'});
    },
    editPayWay(index, row) {
      sessionStorage.editpay = JSON.stringify(this.countryPayMethod[index]);
      this.$router.push({name: 'editpay'});
    },
    viewPayWay(index, row) {
      sessionStorage.viewpay = JSON.stringify(this.countryPayMethod[index]);
      this.$router.push({name: 'payinfo'});
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getCountryPayMethod(this, this.query);
    }
  }
}
</script>
